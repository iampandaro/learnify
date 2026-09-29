import { LocalePrefix, Pathnames } from "next-intl/routing"

export const locales = ["en", "ro"] as const
export const defaultLocale = "en" as const

export type Locale = (typeof locales)[number]
export type Locales = typeof locales

export const pathnames: Pathnames<Locales> = {
	"/": "/",
	"/dashboard": "/dashboard",
	"/features": "/features",
	"/pricing": "/pricing",
	"/support": "/support",
}

export const localePrefix: LocalePrefix<Locales> = "always"