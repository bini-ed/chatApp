const express = require("express");
const protectURL = require("../middleware/authMiddleware");

const Chat = require("../controller/chatControllers");

const route = express.Router();

route.post("/accessChat", protectURL, Chat.accessChat);
route.get("/fetchChat", protectURL, Chat.fetchChat);
route.post("/groupChat", protectURL, Chat.createGroupChat);
route.put("/rename", protectURL, Chat.renameGroup);
route.put("/groupAdd", protectURL, Chat.addToGroup);
route.put("/groupRemove", protectURL, Chat.removeFromGroup);

module.exports = route;
