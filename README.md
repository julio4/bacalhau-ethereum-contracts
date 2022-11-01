# Bacalhau-ethereum-contracts

This repository was used during the ETHLisbon Hackathon to make docker images for bacalhau to compute large files on IPFS.

The current state of this image has been pushed on a docker repo and holds the name of quintenbons/testlisbon:1.7,
but is just meant to serve as an example usage of bacalhau's computation over data. It can be used with bacalhau
with any CID designating a wrapping folder containing some ethereum contracts insights data like
`CID=bafybeihae62js4zi6xog7nuf5w2ipzxz3qb3fx4nspbb67oself36hdfhm` (source: transpose.io).

## Usage

- Push a file on IPFS and remember to save the CID. (web3.storage for example)

- Build and push docker image

#### `docker build . -t username/imagename:version && docker push username/imagename:version`

- Send a request to the bacalhau network to run your container

#### `bacalhau docker run username/imagename:version --inputs CID`

- Get the outputs from ipfs

#### `bacalhau get JOBID`

You can also directly get the outputs from IPFS using the CID.
