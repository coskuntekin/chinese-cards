"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isolatePeerList = [];
for (let index = 0; index < 114; index++) {
    let heightHashSeed = "";
    const height = 300 + Math.floor(Math.random() * 20);
    switch (true) {
        case index < 60:
            heightHashSeed = "dddddd";
            break;
        default:
            break;
    }
    isolatePeerList.push({
        netInterval: 10,
        index,
        magic: "123",
        heightHashSeed: heightHashSeed ? heightHashSeed : "default" + (index % 3),
        height: height,
        peerPlatform: "Linux",
        port: 8080 + index,
        hostname: "192.168.22.136",
        protocol: "http:",
    });
}
//给每个节点增加peerList
const peerList = isolatePeerList.map((ele, index) => {
    //每个节点的peerlist数量
    const num = 8;
    const peerList = isolatePeerList
        .slice()
        .concat(isolatePeerList)
        .slice(index + 1, index + 1 + num);
    return Object.assign({}, ele, { peerList });
});
exports.config = {
    peerList,
};
//# sourceMappingURL=default-config.js.map