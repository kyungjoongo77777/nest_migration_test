function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


let reuslt = getRandomInt(0, 5)


//http://43.206.15.77:3000  43.206.229.222
console.log("=====>", reuslt);
