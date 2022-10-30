const fs = require("fs");

fs.readdir("/inputs", (err, files) => {
    if (err !== null) {
        console.error("Could not read input from CID");
        console.error(err);
        return;
    } else if (files.length !== 1) {
        console.error("Incorrect amount of files");
        return;
    }

    const fileName = files[0];
    if (!/^0x[a-fA-F0-9]{40}\.json$/.test(fileName)) {
        console.error("File name does not match [Contract].json format");
    }
    const reSearch = /^0x[a-fA-F0-9]{40}/.exec(fileName);
    let result = { contractAdress: reSearch[0], addressCallCount: {}, oldestTimeStamp: 0, newestTimeStamp: 0, timePlot: [], transactionOverTime: [], valueOverTime: [] };

    try {
        const content = JSON.parse(fs.readFileSync(`/inputs/${fileName}`));
        // console.log(content[0]);

        if (content.length === 0) {
            fs.writeFileSync(`/outputs/${fileName}`, JSON.stringify(result));
            return;
        }

        // Plot data
        result.oldestTimeStamp = new Date(content[0].timestamp).getTime();
        result.newestTimeStamp = new Date(content[content.length - 1].timestamp).getTime();
        const sturges = 1 + Math.floor(Math.log2(content.length));
        const step = Math.floor((result.newestTimeStamp - result.oldestTimeStamp) / sturges);

        let blockStart = result.oldestTimeStamp;
        let blockCount = 0;
        let blockValue = 0;
        let nextStep = result.oldestTimeStamp + step;

        for (let transaction of content) {
            if (result.addressCallCount[transaction.from_address] === undefined)
                result.addressCallCount[transaction.from_address] = 0;
            result.addressCallCount[transaction.from_address]++;

            // Pass to next block
            const transactionTime = new Date(transaction.timestamp).getTime();
            while (transactionTime > nextStep) {
                result.timePlot.push(blockStart);
                result.transactionOverTime.push(blockCount);
                result.valueOverTime.push(blockValue);

                blockStart = nextStep;
                blockCount = 0;
                blockValue = 0;

                nextStep = blockStart + step;
            }

            blockCount++;
            blockValue += transaction.value;
        }

        fs.writeFileSync(`/outputs/${fileName}`, JSON.stringify(result));
    } catch (err) {
        console.error(err);
        return;
    }
});