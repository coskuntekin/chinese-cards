"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter_1 = require("./apiRouter");
const default_config_1 = require("./default-config");
let startPort = 8080;
if (startPort) {
    default_config_1.config.peerList.forEach(createSever);
}
function createSever(option) {
    const app = express();
    const port = startPort + option.index;
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/api/system", apiRouter_1.apiRouter(option));
    app.use((req, res) => {
        res.status(404).send({ error: "api not fund" });
    });
    app.use((error, req, res) => {
        res.status(500).send({ error: error });
    });
    app.listen(port, () => console.log(` peer sever ${option.index + 1} listening on port:${port}!`));
}
//# sourceMappingURL=app.js.map