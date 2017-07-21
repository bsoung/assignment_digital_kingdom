const fs = require("fs");

// read data
const _readJson = () => {
	let json = fs.readFileSync("./data/kingdoms.json");
	json = JSON.parse(json);
	return json;
}

const newKingdom = (king, queen, kingdomName) => {
	let data = _readJson();

	data.kingdoms[kingdomName] = {
		king: king,
		queen: queen,
		castles: {}
	};

	data = JSON.stringify(data, null, 2);

	console.log(data, "data?")

	fs.writeFileSync("./data/kingdoms.json", data, "utf-8");
}

const newCastle = (castleName, kingdomName) => {
	let data = _readJson();
	
	data.kingdoms[kingdomName]['castle'][castleName] = {};

	data = JSON.stringify(data, null, 2);

	console.log(data, "data?")

	fs.writeFileSync("./data/kingdoms.json", data, "utf-8");
}

const kingdomsJson = () => {
	let data = _readJson();
	let kingdoms = Object.keys(data.kingdoms);

	return kingdoms;
}

const diveJson = (params) => {
	let data = _readJson();

	params.forEach((param) => {
		data = data[param];
	});

	return [params[params.length - 1], data];
}

module.exports = {
	kingdomsJson,
	diveJson,
	newKingdom
}