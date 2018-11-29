import * as express from 'express';
import * as vm from 'vm';
import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import * as requirejs from 'requirejs';
import * as mongoose from 'mongoose';

mongoose.connect(
    'mongodb://127.0.0.1:27017/server-market-app',
    {
        poolSize: 200,
        socketTimeoutMS: 6000000,
        connectTimeoutMS: 6000000,
    }
);
const router = express.Router();
let server_module;
const net_helper = {
    get(path: string, method_name: string) {
        console.log('net helper get：', path, method_name);
        router.get(path, async (req, res) => {
            try {
                const result = await server_module[method_name](req.query);
                console.log('result:', result);
                res.json({
                    success: true,
                    result,
                });
            } catch (error) {
                res.json({
                    success: false,
                    error: util.inspect(error),
                });
            }
        });
    },
    post(path: string, method_name: string) {
        console.log('net helper post:', path, method_name);
        router.post(path, async (req, res) => {
            try {
                const result = await server_module[method_name](req.body);
                console.log('result:', result);
                res.json({
                    success: true,
                    result,
                });
            } catch (error) {
                res.json({
                    success: false,
                    error: util.inspect(error),
                });
            }
        });
    },
};
const mongoDB_helper = { mongodb: mongoose.connection, mongoose };
const codePath = path.join(__dirname, 'package/dist/package-app.js');
// 运行app，注入相关对象
(() => {
    const code = fs.readFileSync(codePath, 'utf-8');

    const sandbox = {
        define: requirejs.define.bind(requirejs),
        console: console,
        net_helper,
        mongoDB_helper,
    };

    vm.runInNewContext(code, sandbox);
    // 初始化app
    requirejs(['package/src/server'], module => {
        console.log('a', module.default);
        server_module = new module.default.Server();
    });
})();

export default router;
