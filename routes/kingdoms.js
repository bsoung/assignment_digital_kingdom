const express = require("express");
const router = express.Router();

const { 
	kingdomsJson, 
	diveJson,
	newKingdom
} = require("../utils/file_tools");

const castles = require("./castles");

router.get("/", (req, res) => {
	let url = req.originalUrl;

	if (url[url.length - 1] === "/") {
		url = url.slice(0, url.length - 1);
	}

	let data = kingdomsJson();

	let obj = {
		title: "Kingdoms",
		data: data,
		currentPath: url,
	}

	res.render('kingdoms', obj);
});

router.post("/", (req, res) => {
	newKingdom(req.body.king, req.body.queen, req.body.kingdom);

	res.redirect("back");
})

router.get("/:kingdomName", (req, res) => {
	console.log("here??");

	let url = req.originalUrl;

	if (url[url.length - 1] === "/") {
		url = url.slice(0, url.length - 1);
	}

	let passArray = [];
	if (req.diveArray) {
		passArray = req.diveArray;
	}

	passArray.push("kingdoms");
	passArray.push(req.params.kingdomName);

	let data = diveJson(passArray);

	let obj = {
		title: data[0],
		currentPath: url,
		nextPath: "castles",
		king: data[1]['king'],
		queen: data[1]['queen'],
		data: Object.keys(data[1]["castles"])
	}

	console.log(obj.currentPath, 'currentPath');

	res.render('kingdom', obj);

	// res.render(data[0] + "<br><pre>" + data[1] + "</pre>");
});

router.post("/:kingdomName", (req, res) => {
	newKingdom(req.body.castle, req.params.kingdomName);

	res.redirect("back");
})

router.use("/:kingdomName/castles", function(req, res, next) {
	if (!req.diveArray) {
		req.diveArray = [];
	}

	req.diveArray.push("kingdoms");
	req.diveArray.push(req.params.kingdomName);

	next();
}, castles);

module.exports = router;