import { ServerDecorator, DB } from '../../package-app-sdk/index';
import { MongoDB } from './mongodb';
const mongoDB = new MongoDB(DB.mongodb, DB.mongoose);

class Server {
    constructor(public express: any) {}

    @ServerDecorator.get("/chineseCards")
    async getChineaseCards(query: any) {
        const list = await mongoDB.getData(MongoDB.modChineseCards, query);
        console.log('query', query);
        return list;
    }

    @ServerDecorator.post("/chineseCard")
    async createChineseCards(cardsData: any) {
        await mongoDB.insertData(MongoDB.modChineseCards, cardsData);
        console.log('post', cardsData);
        return cardsData;
    }
}

export default ServerDecorator.bootstrap({ Server: Server });
