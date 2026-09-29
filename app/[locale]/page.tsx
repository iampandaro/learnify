import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { use } from "react"
import { locales } from "@/app/config"
import Hero from "@/app/components/Hero"

type Props = {
	params: Promise<{ locale: string }>
}

export default function Home({ params }: Props) {
	const { locale } = use(params)
	if (!hasLocale(locales, locale)) notFound()
	setRequestLocale(locale)

	return (
		<main>
			<Hero />
			<div className="h-screen"></div>
		</main>
	)
}