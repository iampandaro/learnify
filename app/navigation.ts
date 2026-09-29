import { createNavigation } from "next-intl/navigation"

import { defaultLocale, localePrefix, locales, pathnames } from "./config"

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation({
		locales,
		defaultLocale,
		pathnames,
		localePrefix,
	})
