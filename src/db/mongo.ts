import { MONGO_URI } from '$env/static/private'
import { MongoClient } from 'mongodb'

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env')
}

export const mongo: MongoClient = await MongoClient.connect(MONGO_URI)
export const db = mongo.db('titeenit')
console.log('Connected to MongoDB')
