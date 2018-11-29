export class MongoDB {
  static modChineseCards: any;
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
function initDatabaseStruct(mongodb, mongoose) {
    const chineseCardsSchema = new mongoose.Schema({
        hanzi: { type: String, require: true, index: true },
        pinyinToneSpace: { type: String, require: true },
        definition: { type: String, require: true },
        image: { type: String, require: true, default:"" }
    });
    MongoDB.modChineseCards = mongodb.model('chineseCards', chineseCardsSchema);
}
