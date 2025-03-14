import {
	PUBLIC_AUTHORIZATION_HEADER,
	PUBLIC_TITEENI_API,
} from "$env/static/public";

export const baseUrl = PUBLIC_TITEENI_API;

export const authCookieName = "x-Authorization";
export const authCookie = `${authCookieName}=${PUBLIC_AUTHORIZATION_HEADER}`;
