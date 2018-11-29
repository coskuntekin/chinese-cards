"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const crypto = require("crypto");
const extend = require("extend");
class ApiMethod {
    constructor(option) {
        this.methodOption = option;
    }
    getPeers() {
        debugger;
        return this.methodOption.peerList;
    }
    getNetInterval() {
        return this.methodOption.netInterval;
    }
    getOrigin() {
        const { methodOption } = this;
        console.log(methodOption);
        return `${methodOption.protocol}//${methodOption.hostname}:${methodOption.port || 80}`;
    }
    getPeerId() {
        return `🍌::${this.methodOption.magic}::🍄`;
    }
    getHeight() {
        return this.methodOption.height;
    }
    getPeerPlatform() {
        return this.methodOption.peerPlatform;
    }
    getPeerStatus() {
        return 7;
    }
    getIdHash(query) {
        const md5 = crypto.createHash("md5");
        const queryIds = query.heights.split(",");
        let idStr = "";
        for (let i = 0; i < queryIds.length; i++) {
            idStr += queryIds[i] + this.methodOption.heightHashSeed;
        }
        return md5.update(idStr).digest("hex");
    }
    getWebChannelLinkNum() {
        return (Math.random() * 1000) | 0;
    }
    getSystemTime() {
        return Date.now();
    }
}
function apiRouter(option) {
    const router = express.Router();
    const apiMethod = new ApiMethod(option);
    router.get("/peerInfo", async (req, res) => {
        debugger;
        if (!req.query.type) {
            return;
        }
        const query = req.query.type.split(",");
        const querySet = new Set(query);
        let params = req.query;
        let peerInfo = {};
        if (querySet.has("sourceIp")) {
            let sourceIp = (req.headers && req.headers["x-forwarded-for"]) || (req.connection && req.connection.remoteAddress);
            if (sourceIp && sourceIp.length) {
                peerInfo.sourceIp = sourceIp.toString().split(",")[0] || "";
            }
        }
        await Promise.all(query.map(async (ele) => {
            const method = `get${ele.replace(/^[a-z]/, s => s.toUpperCase())}`;
            if (apiMethod[method]) {
                peerInfo[ele] = await apiMethod[method](params);
            }
        }));
        res.json(extend({ success: true }, peerInfo));
    });
    return router;
}
exports.apiRouter = apiRouter;
//# sourceMappingURL=apiRouter.js.map