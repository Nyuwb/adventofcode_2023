// Second day of Advent of Code 2023
const fs = require('fs');
const util = require('util');
const cubeLimit = {
    red: 12,
    green: 13,
	blue: 14
};

/**
 * Returns a list of each game details (max of each color).
 * 
 * @param string data 
 * @returns array
 */
function getGameListDetails(data)
{
	let gameList = [];
	[...data.matchAll(/^Game (\d*): (.*)$/gm)].forEach(match => {
        let content = match[2];
		let game = {
			id: parseInt(match[1]),
			colors: {} // Store the max value for each color
		};
        // Checking the content for each color
        Object.keys(cubeLimit).map(color => {
            let regexColor = new RegExp('(\\d*) ' + color, 'g');
            [...content.matchAll(regexColor)].forEach(value => {
				let colorValue = parseInt(value[1]);
				if (game.colors[color] == undefined) {
					game.colors[color] = colorValue;
				}
				if (game.colors[color] < colorValue) {
					game.colors[color] = colorValue;
				}
			});
		});
		// Adding the current game to the list
		gameList.push(game);
	});
	return gameList;
}

// Part one
fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let sum = 0;
	let gameData = getGameListDetails(data);
	gameData.forEach(game => {
		if (game.colors.red <= cubeLimit.red
			&& game.colors.blue <= cubeLimit.blue
			&& game.colors.green <= cubeLimit.green
		) {
			sum += game.id;
		}
	});
    console.log('[FIRST] The sum of the IDs of the possible games is', sum);
});

// Part two
fs.readFile('data.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let sum = 0;
	let gameData = getGameListDetails(data);
	gameData.forEach(game => {
		sum += game.colors.red * game.colors.blue * game.colors.green;
	});
    console.log('[SECOND] The sum of the power of the sets is', sum);
});