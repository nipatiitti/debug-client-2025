import type { CurrentUser } from '$lib/types/Users'
import type { ObjectId } from 'mongodb'
import { getDb } from './mongo'

export type DbUser = CurrentUser & { _id?: ObjectId; token: string }

export const upsertUser = async (user: CurrentUser, token: string) => {
  const db = await getDb()
  const users = db.collection('users')
  await users.updateOne({ id: user.id }, { $set: { ...user, token } }, { upsert: true })
}

export const getUser = async (id: string) => {
  const db = await getDb()
  const users = db.collection('users')
  return users.findOne({ id }) as Promise<DbUser | null>
}

export const getUserByToken = async (token: string) => {
  const db = await getDb()
  const users = db.collection('users')
  return users.findOne({ token }) as Promise<DbUser | null>
}
