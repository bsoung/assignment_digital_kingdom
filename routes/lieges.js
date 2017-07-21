const express = require("express");
const router = express.Router();
const { diveJson } = require("../utils/file_tools");
const vassals = require("./vassals");

//
const kingdoms = require("./kingdoms");

router.get("/:liege", (req, res) => {
	let url = req.originalUrl;

	if (url[url.length - 1] === "/") {
		url = url.slice(0, url.length - 1);
	}

	let passArray = req.diveArray;

	passArray.push("lieges");
	passArray.push(req.params.liege);

	let data = diveJson(passArray);

	let obj = {
		title: data[0],
		currentPath: url,
		nextPath: "vassals",
		data: Object.keys(data[1]["vassals"])
	}

	res.render('lieges', obj);

	// res.render(`${data[0]}<br><pre>${data[1]}</pre>`);
});

router.use("/:liege/vassals", (req, res, next) => {
	req.diveArray.push('lieges');
	req.diveArray.push(req.params.liege);

	console.log(typeof vassals, "vassals what is this")
	console.log(typeof kingdoms, "kingdoms what is this")

	next();
}, vassals);

module.exports = router;