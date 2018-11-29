var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("package/src/mongodb", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MongoDB {
        constructor(mongoDb, mongoose) {
            initDatabaseStruct(mongoDb, mongoose);
        }
        async insertData(tableSchema, data) {
            console.log(data, tableSchema);
            await tableSchema.collection.insert(data);
        }
        async getData(tableSchema, filter) {
            console.log(filter, tableSchema);
            return await tableSchema.find(filter);
        }
    }
    exports.MongoDB = MongoDB;
    function initDatabaseStruct(mongodb, mongoose) {
        const chineseCardsSchema = new mongoose.Schema({
            hanzi: { type: String, require: true, index: true },
            pinyinToneSpace: { type: String, require: true },
            definition: { type: String, require: true },
            image: { type: String, require: true, default: "" }
        });
        MongoDB.modChineseCards = mongodb.model('chineseCards', chineseCardsSchema);
    }
});
define("package-app-sdk/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ServerDecorator {
        constructor() { }
        static get(path) {
            return (target, name, descriptor) => {
                net_helper.get(path, name);
                return descriptor;
            };
        }
        static put(path, data) {
            return (target, name, descriptor) => {
                net_helper.put(path, name);
                return descriptor;
            };
        }
        static post(path) {
            return (target, name, descriptor) => {
                net_helper.post(path, name);
                return descriptor;
            };
        }
        static bootstrap(arg) {
            ServerDecorator._arg = arg;
            return arg;
        }
    }
    exports.ServerDecorator = ServerDecorator;
    exports.DB = mongoDB_helper;
});
define("package/src/server", ["require", "exports", "package-app-sdk/index", "package/src/mongodb"], function (require, exports, index_1, mongodb_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mongoDB = new mongodb_1.MongoDB(index_1.DB.mongodb, index_1.DB.mongoose);
    class Server {
        constructor(express) {
            this.express = express;
        }
        async getChineaseCards(query) {
            const list = await mongoDB.getData(mongodb_1.MongoDB.modChineseCards, query);
            console.log('query', query);
            return list;
        }
        async createChineseCards(cardsData) {
            await mongoDB.insertData(mongodb_1.MongoDB.modChineseCards, cardsData);
            console.log('post', cardsData);
            return cardsData;
        }
    }
    __decorate([
        index_1.ServerDecorator.get("/chineseCards")
    ], Server.prototype, "getChineaseCards", null);
    __decorate([
        index_1.ServerDecorator.post("/chineseCard")
    ], Server.prototype, "createChineseCards", null);
    exports.default = index_1.ServerDecorator.bootstrap({ Server: Server });
});
