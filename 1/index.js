// First day of Advent of Code 2023
const fs = require('fs');
const regexDigit = /^[^\d]*(\d).*(\d{1})[^\d]*$|^[^\d]*(\d)[^\d]*$/gm;
const digitReplace = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

// Get the calibration values and calculate the sum
function calibrationSum(data, iteration = null)
{
    let calibrationList = [];
    [...data.matchAll(regexDigit)].forEach(digit => {
        let calibration = digit[1] + digit[2];
        // If it's matching the second regexp, then there is only one digit so we're duplicating it
        if (digit[3] != undefined) {
            calibration = digit[3] + digit[3];
        }
		if (iteration != null) console.log(digit[0], calibration);
        calibrationList.push(Number(calibration));
    });
    return calibrationList.reduce((sum, value) => sum + value);
}

// Part one
fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(
        '[FIRST] The sum of all the calibration values is :',
        calibrationSum(data)
    );
});

// Part two
fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) throw err;
    // Replacing words with numbers but keeping the word because of one rule
	// that is not mentionned : twone is not 2ne but 21... the letters in common
	// in two words need to be used for each word !
	Object.keys(digitReplace).forEach(word => {
        data = data.replace(
			new RegExp(word, 'g'), 
			word + digitReplace[word] + word // one => one1one
		);
    });
    console.log(
        '[SECOND] The sum of all the calibration values is :',
        calibrationSum(data, 'a')
    );
});

