import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


let mongod ;

const connect = async () => {
  mongod = await MongoMemoryServer.create();
 const mongoServer = mongod.getUri();

//  const mongooseOpts = {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    poolSize: 10
//  }
   await mongoose.connect(mongoServer, {});
};


const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
export default { connect, close, clear };