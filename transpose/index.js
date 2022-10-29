const fs = require("fs");

fs.readdir("/", (err, files) => {
    console.log("read dir container root");
    console.log(err, files);
});

fs.readdir("/inputs", (err, files) => {
    console.log("read dir container root");
    console.log(err, files);
});