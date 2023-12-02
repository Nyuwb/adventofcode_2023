// Second day of Advent of Code 2023
const fs = require('fs');
const cubeLimit = {
	red: 12,
	green: 13,
	blue: 14
};

// Part one
fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) throw err;
	let sum = 0;
    // Getting all games
	[...data.matchAll(/^Game (\d*): (.*)$/gm)].forEach(game => {
		let gameId = game[1];
		let gameContent = game[2];
		let gamePossible = true;
		// Checking the gameContent
		Object.keys(cubeLimit).map(color => {
			let limit = cubeLimit[color];
			let regexColor = new RegExp('(\\d*) ' + color, 'g');
			[...gameContent.matchAll(regexColor)].forEach(value => {
				if (value[1] > limit) {
					// One value is too high... it's not possible !
					gamePossible = false;
				}
			});
		});
		// Adding the game if every color is possible
		if (gamePossible) {
			sum += Number(gameId);
		}
	});
    console.log('The sum of the IDs of the possible games is', sum);
});

