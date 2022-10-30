# export IPFS_CONNECT="/ip4/127.0.0.1/tcp/4001/p2p/12D3KooWBMZrB5B7vYnn9uAADE7QeRa4zLdg47wvqJpxurswt8AF"
bacalhau docker run \
  --wait \
  --wait-timeout-secs 200 \
  --id-only \
  --inputs bafybeicv2icmyz26kqkjg5c3hcadjr5xlgtjsytypv7sj4svkwicje5fau \
  quintenbons/testlisbon
