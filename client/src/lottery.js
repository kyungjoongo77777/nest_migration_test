import _ from 'lodash'
import gen from 'random-seed'

export function randChar() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
    return randomCharacter
}


export function createRandomLotteryRows(numberOfRows, seed) {
    let rows, randomizer, i, r, rand, lotteryRows;
    lotteryRows = [];
    rand = new gen();
    seed = rand.cleanString(seed);
    rows = numberOfRows;
    r = 0;
    //create as many rows as in the rows var;
    while (r < rows) {
        let row = {};
        //create 7 ints
        let _numbers = [];
        i = 1;
        _numbers = makeOneLottery(seed)
        let isDuplication = checkIfDuplicateExists(_numbers)
        console.log("=====>", isDuplication)
        if (!isDuplication) {
            _numbers.sort(function (a, b) {
                return a - b;
            });

            lotteryRows.push(_numbers);
            r++;
        }
    }

    return lotteryRows;
}


function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}


function makeOneLottery(pSeed) {

    let randomizer;
    let i = 0;
    let numberList = [];

    while (i < 6) {
        //randomize the seed string
        let shuffledSeed = _.shuffle(pSeed);
        //push the random ints to array
        randomizer = (gen.create(shuffledSeed));
        // setting range
        let randomizedInt = randomizer.intBetween(1, 45);

        numberList.push(randomizedInt);
        i++;
    }

    return numberList;
}



