const express = require("express");
const router = express.Router();
const { diveJson } = require("../utils/file_tools");
const kingdoms = require("./kingdoms");

const vassals = require("./vassals");

router.get("/:vassal", (req, res) => {
	let url = req.originalUrl;

	if (url[url.length - 1] === "/") {
		url = url.slice(0, url.length - 1);
	}

	let passArray = req.diveArray;

	passArray.push("vassals");
	passArray.push(req.params.vassal);

	let data = diveJson(passArray);

	let obj = {
		title: data[0],
		data: Object.keys(data[1]["kingdoms"]),
		currentPath: url,
		nextPath: "kingdoms"
	}

	res.render('vassals', obj);
});

router.use("/:vassal/kingdoms", (req, res, next) => {
	req.diveArray.push('vassals');
	req.diveArray.push(req.params.vassal);

	next();

});

module.exports = router;