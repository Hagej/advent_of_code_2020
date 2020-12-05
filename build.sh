BASE_PATH=$(pwd)
DIR=$1
echo -e "Building and running in: $BASE_PATH/$DIR"
cd "$BASE_PATH/$DIR"
tsc index.ts && node index.js
cd "$BASE_PATH"
