import createMiddleware from 'next-intl/middleware'
import { defaultLocale, localePrefix, locales, pathnames } from '@/app/config'

export default createMiddleware({
    locales,
    defaultLocale,
    pathnames,
    localePrefix
})

export const config = {
    // Match everything except API routes, Next internals and files with an extension
    matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
}
