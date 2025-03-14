import { PUBLIC_TITEENI_API } from '$env/static/public'

export const baseUrl = PUBLIC_TITEENI_API

export const authCookieName = 'x-Authorization'
export const authCookie = (token: string) => `${authCookieName}=${token}`
