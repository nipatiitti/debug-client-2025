import { MONGO_URI } from '$env/static/private'
import { MongoClient } from 'mongodb'

export let mongo: MongoClient | null = null
export let db: ReturnType<MongoClient['db']> | null = null

// Initialize connection function
async function initMongo() {
  if (!mongo) {
    mongo = new MongoClient(MONGO_URI)
    await mongo.connect()
    db = mongo.db('titeenit')
    console.log('Connected to MongoDB')
  }
  return { mongo, db }
}

export const getDb = async () => {
  if (!db) {
    await initMongo()
  }
  return db!
}
