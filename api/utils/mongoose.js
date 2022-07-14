module.exports = {
  mongooseToObect: function (mongoose) {
    return mongoose.toObject({ getters: true });
  },
  multiMongooseToObect: function (mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject({ getters: true }));
  },
};
