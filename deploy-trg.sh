#!/bin/bash -e

docker build -t localhost:5000/training-absch-cbd-int git@github.com:scbd/absch.cbd.int.git
docker push     localhost:5000/training-absch-cbd-int
