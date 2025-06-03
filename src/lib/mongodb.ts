import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please add your Mongo Database to .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // В режиме разработки используем глобальную переменную
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // В продакшене создаем новое подключение
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const client = await clientPromise;
  const db = client.db(dbName);
  return { client, db };
}

export default connectToDatabase; 