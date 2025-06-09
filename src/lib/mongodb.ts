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
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 5,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    globalWithMongo._mongoClientPromise = client.connect().catch(err => {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // В продакшене создаем новое подключение
  client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 5,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
  clientPromise = client.connect().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  });
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    // Проверяем соединение
    await db.command({ ping: 1 });
    console.log('Successfully connected to MongoDB.');
    
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB. Please check your connection settings.');
  }
}

// Обработка закрытия соединения при завершении работы приложения
process.on('SIGINT', async () => {
  try {
    await client?.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
}); 