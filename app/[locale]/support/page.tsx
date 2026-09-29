import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import { CtaSection, FaqSection, Footer } from '@/app/components/Sections'

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
	setRequestLocale(use(params).locale)

	return (
		<main className="pt-16">
			<FaqSection />
			<CtaSection />
			<Footer />
		</main>
	)
}
