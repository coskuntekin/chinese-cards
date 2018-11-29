declare const net_helper: any;
declare const mongoDB_helper: any;
export class ServerDecorator {
    constructor() {}

    static get(path: string) {
        return (target, name, descriptor) => {
            net_helper.get(path, name);
            return descriptor;
        };
    }
    static put(path: string, data) {
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

  private static _arg: any;

  static bootstrap(arg: { Server: any }) {
      ServerDecorator._arg = arg;
      return arg;
  }
}

export const DB = mongoDB_helper;
