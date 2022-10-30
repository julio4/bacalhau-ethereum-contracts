# Bacalhau-ethereum-contracts

This repository was used during the ETHLisbon Hackathon to make docker images for bacalhau to compute large files on IPFS.

The current state of this image has been pushed on a docker repo and holds the name of quintenbons/testlisbon:1.7, it can be used on bacalhau
with any CID designating a wrapping folder containing some ethereum contracts insights data like
`CID=bafybeihae62js4zi6xog7nuf5w2ipzxz3qb3fx4nspbb67oself36hdfhm` (source: transpose.io).

## Usage

- Build and push docker image

#### `cd transpos && docker build . -t username/imagename:version && docker push username/imagename:version`

- Send a request to the bacalhau network to run your container

#### `bacalhau docker run username/imagename:version --inputs CID`

- Get the outputs from ipfs

#### `bacalhau get JOBID`

OR (if you have a node)

#### `ipfs get CID`
