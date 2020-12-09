BASE_PATH=$(pwd)
DIR=$1
BLUE='\033[0;34m'
NC='\033[0m'
echo -e "Building and running in: $BASE_PATH/$DIR\n"
cd "$BASE_PATH/$DIR"
tsc index.ts
if [ -f "debug.txt" ]; then
    echo -e "RUNNING USING DEBUG DATA\n"
    result=$(node index.js debug.txt)
    echo -e "RESULT: ${BLUE}$result${NC}\n" 
else 
    echo -e "NO DEBUG DATA FOUND\n"
fi
if [ -f "input.txt" ]; then
    echo -e "RUNNING USING INPUT DATA\n"
    result=$(node index.js input.txt)
    echo -e "RESULT: ${BLUE}$result${NC}\n" 
    echo -e "RUN FINISHED\n"
else 
    echo -e "NO INPUT DATA FOUND\n"
fi
cd "$BASE_PATH"
