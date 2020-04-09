#!/usr/bin/env bash

FILE=./data/systemData.json
GZFILE=./data/systemData.json.gz
BFILE=./data/systemDataB.json
FPATH=:./data/

if [ -f "$FILE" ]; then
  rm -rf $GZFILE $FILE $BFILE
  sleep 2

  wget https://www.edsm.net/dump/systemsPopulated.json.gz -O $GZFILE
  gunzip $GZFILE
  python -m json.tool ./data/systemData.json > ./data/systemDataB.json
  rm -rf ./data/systemData.json && mv ./data/systemDataB.json ./data/systemData.json
else
  wget https://www.edsm.net/dump/systemsPopulated.json.gz -O $GZFILE
  gunzip $GZFILE
  python -m json.tool ./data/systemData.json > ./data/systemDataB.json
  rm -rf ./data/systemData.json && mv ./data/systemDataB.json ./data/systemData.json
fi
