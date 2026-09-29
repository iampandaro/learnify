import type { Metadata, Viewport } from "next"
import { Abhaya_Libre, Montserrat } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { locales } from "@/app/config"
import "../globals.css"
import Navbar from "../components/Navbar"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
})

const abhaya = Abhaya_Libre({
  variable: "--font-abhaya",
  weight: "800",
  subsets: ["latin", "latin-ext"],
})

// viewportFit "cover" lets us use env(safe-area-inset-*) on notched phones / foldables
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(locales, locale)) notFound()

  // Enables static rendering for this locale
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${abhaya.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
			<Navbar/>
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}