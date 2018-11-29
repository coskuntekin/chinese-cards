import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import apiRouter from './apiRouter';
createSever(8090);

function createSever(port) {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(apiRouter);
    app.use((req, res) => {
        res.status(404).send({ error: 'api not fund' });
    });
    app.use((error, req, res) => {
        res.status(500).send({ error: error });
    });
    app.listen(port, () => console.log(`sever listening on port:${port}!`));
}
