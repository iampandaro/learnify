import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { Link } from '@/app/navigation'

type Item = { title: string; text: string }

const h2 = 'text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-[40px] lg:leading-tight'
const lead = 'text-base leading-relaxed text-neutral-500 sm:text-lg'
const btnPrimary = 'inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-background transition hover:brightness-110'
const btnGhost = 'inline-flex items-center justify-center rounded-full border border-coral bg-background px-6 py-3 font-medium text-black transition hover:bg-coral/10'

const Shell = ({ id, children }: { id?: string; children: ReactNode }) => (
	<section id={id} className="border-t border-black/5">
		<div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">{children}</div>
	</section>
)

const Check = () => (
	<svg aria-hidden viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-[#59E546]" fill="currentColor">
		<path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm4 6.3-4.6 5a.9.9 0 0 1-1.3 0L6 10.7a.9.9 0 1 1 1.3-1.2l1.4 1.5 4-4.4A.9.9 0 0 1 14 7.8Z" />
	</svg>
)

const Icon = () => (
	<span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
		<svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
		</svg>
	</span>
)

const Window = ({ children }: { children: ReactNode }) => (
	<div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_60px_-24px_rgba(79,70,229,0.3)]">
		<div className="flex gap-1.5 border-b border-black/5 px-4 py-3" aria-hidden>
			{['#FF6B6B', '#FFD446', '#59E546'].map((c) => (
				<span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
			))}
		</div>
		<div className="p-4 text-left text-sm sm:text-base">{children}</div>
	</div>
)

const Centered = ({ title, text, children }: { title: string; text: string; children?: ReactNode }) => (
	<div className="flex flex-col items-center gap-10 text-center">
		<div className="flex max-w-2xl flex-col gap-4">
			<h2 className={h2}>{title}</h2>
			<p className={lead}>{text}</p>
		</div>
		{children}
	</div>
)

function Split({ title, text, points, reverse, children }: { title: string; text: string; points: string[]; reverse?: boolean; children: ReactNode }) {
	return (
		<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<div className={`flex flex-col gap-5 ${reverse ? 'lg:order-2' : ''}`}>
				<h2 className={h2}>{title}</h2>
				<p className={lead}>{text}</p>
				<ul className="flex flex-col gap-3 text-neutral-700">
					{points.map((p) => (
						<li key={p} className="flex gap-3"><Check />{p}</li>
					))}
				</ul>
			</div>
			{children}
		</div>
	)
}

const PROGRESS = [100, 72, 45, 15]

export function FeatureSections() {
	const t = useTranslations('Landing')
	const commands = t.raw('palette.items') as string[]
	const lessons = t.raw('adaptive.items') as string[]
	const services = t.raw('integrations.services') as string[]
	const steps = t.raw('plans.steps') as string[]
	const speed = t.raw('speed.features') as Item[]

	return (
		<>
			<Shell id="features">
				<Centered title={t('palette.title')} text={t('palette.text')}>
					<Window>
						<div className="mb-3 rounded-lg border border-black/10 px-3 py-2 text-neutral-400">{t('palette.placeholder')}</div>
						<ul className="flex flex-col gap-1">
							{commands.map((c, i) => (
								<li key={c} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${i === 0 ? 'bg-primary/10 font-medium text-primary' : 'text-neutral-700'}`}>
									<span aria-hidden className="h-2 w-2 rounded-full bg-current opacity-60" />{c}
								</li>
							))}
						</ul>
					</Window>
				</Centered>
			</Shell>

			<Shell>
				<Centered title={t('adaptive.title')} text={t('adaptive.text')}>
					<Window>
						<ul className="flex flex-col gap-4">
							{lessons.map((l, i) => (
								<li key={l}>
									<div className="mb-1.5 flex justify-between text-neutral-700"><span>{l}</span><span className="text-neutral-400">{PROGRESS[i]}%</span></div>
									<div className="h-2 rounded-full bg-black/5"><div className="h-full rounded-full bg-primary" style={{ width: `${PROGRESS[i]}%` }} /></div>
								</li>
							))}
						</ul>
					</Window>
				</Centered>
			</Shell>

			<Shell>
				<Split title={t('integrations.title')} text={t('integrations.text')} points={t.raw('integrations.points') as string[]}>
					<Window>
						<p className="mb-3 font-medium text-black">{t('integrations.card')}</p>
						<ul className="flex flex-col gap-2">
							{services.map((s) => (
								<li key={s} className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2.5 text-neutral-700">{s}<Check /></li>
							))}
						</ul>
					</Window>
				</Split>
			</Shell>

			<Shell>
				<Split reverse title={t('plans.title')} text={t('plans.text')} points={t.raw('plans.points') as string[]}>
					<Window>
						<p className="mb-3 font-medium text-black">{t('plans.card')}</p>
						<ul className="flex flex-col gap-2">
							{steps.map((s, i) => (
								<li key={s} className="flex items-center gap-3 rounded-lg border border-black/10 px-3 py-2.5 text-neutral-700">
									<span aria-hidden className={`grid h-5 w-5 place-items-center rounded-full border ${i < 2 ? 'border-primary bg-primary text-white' : 'border-black/20'}`}>{i < 2 && '✓'}</span>
									<span className={i < 2 ? 'text-neutral-400 line-through' : ''}>{s}</span>
								</li>
							))}
						</ul>
					</Window>
				</Split>
			</Shell>

			<Shell>
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<ul className="grid grid-cols-1 overflow-hidden rounded-2xl border border-black/10 bg-white sm:grid-cols-2">
						{speed.map((f, i) => (
							<li key={f.title} className={`flex flex-col gap-2 p-6 ${i % 2 ? 'sm:border-l' : ''} ${i > 0 ? 'border-t' : ''} ${i === 1 ? 'sm:border-t-0' : ''} border-black/10`}>
								<Icon />
								<h3 className="text-lg font-semibold text-black">{f.title}</h3>
								<p className="text-sm text-neutral-500">{f.text}</p>
							</li>
						))}
					</ul>
					<div className="flex flex-col gap-5">
						<h2 className={h2}>{t('speed.title')}</h2>
						<p className={lead}>{t('speed.text')}</p>
					</div>
				</div>
			</Shell>

			<Shell>
				<Centered title={t('privacy.title')} text={t('privacy.text')}>
					<ul className="grid w-full gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
						{(t.raw('privacy.features') as Item[]).map((f) => (
							<li key={f.title} className="flex flex-col gap-2">
								<Icon />
								<h3 className="font-semibold text-black">{f.title}</h3>
								<p className="text-sm text-neutral-500">{f.text}</p>
							</li>
						))}
					</ul>
				</Centered>
			</Shell>
		</>
	)
}

export function PricingSection() {
	const t = useTranslations('Landing.pricing')
	const plans = [
		{ key: 'free', href: '/dashboard', button: btnGhost, featured: false },
		{ key: 'pro', href: '/dashboard', button: btnPrimary, featured: true },
	] as const

	return (
		<Shell id="pricing">
			<div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
				<div className="flex flex-col gap-4">
					<h2 className={h2}>{t('title')}</h2>
					<p className={lead}>{t('text')}</p>
					<p className="text-sm text-neutral-400">{t('guarantee')}</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					{plans.map(({ key, href, button, featured }) => (
						<div
							key={key}
							className={`flex flex-col gap-5 rounded-2xl border bg-white p-7 ${
								featured
									? 'border-primary shadow-[0_24px_60px_-24px_rgba(79,70,229,0.4)]'
									: 'border-black/10'
							}`}
						>
							<h3 className="font-semibold text-black">{t(`${key}.name`)}</h3>
							<p className="flex flex-wrap items-baseline gap-x-2">
								<span className="text-4xl font-semibold text-black sm:text-5xl">{t(`${key}.price`)}</span>
								<span className="text-sm text-neutral-400">{t(`${key}.period`)}</span>
							</p>
							<ul className="flex flex-1 flex-col gap-2 text-sm text-neutral-600">
								{(t.raw(`${key}.perks`) as string[]).map((perk) => (
									<li key={perk} className="flex gap-2"><Check />{perk}</li>
								))}
							</ul>
							<Link href={href} className={button}>{t(`${key}.cta`)}</Link>
						</div>
					))}
				</div>
			</div>
		</Shell>
	)
}

export function FaqSection() {
	const t = useTranslations('Landing.faq')
	return (
		<Shell id="support">
			<div className="mx-auto flex max-w-3xl flex-col gap-8">
				<h2 className={h2}>{t('title')}</h2>
				<div className="divide-y divide-black/10 border-y border-black/10">
					{(t.raw('items') as { q: string; a: string }[]).map((item) => (
						<details key={item.q} className="group py-5">
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-black focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
								{item.q}
								<svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
							</summary>
							<p className="mt-3 text-neutral-500">{item.a}</p>
						</details>
					))}
				</div>
			</div>
		</Shell>
	)
}

export function CtaSection() {
	const t = useTranslations('Landing.cta')
	return (
		<section className="px-6 pb-16 sm:pb-24">
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border border-black/10 bg-primary/[0.04] px-6 py-16 text-center sm:py-24">
				<h2 className={`${h2} max-w-2xl`}>{t('title')}</h2>
				<p className={`${lead} max-w-xl`}>{t('text')}</p>
				<div className="flex flex-wrap justify-center gap-3">
					<Link href="/dashboard" className={btnPrimary}>{t('primary')}</Link>
					<Link href={{ pathname: '/', hash: 'features' }} className={btnGhost}>{t('secondary')}</Link>
				</div>
			</div>
		</section>
	)
}

export function Footer() {
	const t = useTranslations('Landing.footer')
	const nav = useTranslations('Navbar')
	const link = 'text-sm text-neutral-500 hover:text-neutral-900'
	return (
		<footer className="border-t border-black/5">
			<div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
				<div className="flex max-w-xs flex-col gap-3">
					<Image src="/logo_nav.png" alt="Learnify" width={120} height={41} className="h-auto w-[120px]" />
					<p className="text-sm text-neutral-500">{t('tagline')}</p>
				</div>
				<nav aria-label={t('product')} className="flex flex-col gap-2">
					<p className="text-sm font-semibold text-black">{t('product')}</p>
					<Link href={{ pathname: '/', hash: 'features' }} className={link}>{nav('features')}</Link>
					<Link href={{ pathname: '/', hash: 'pricing' }} className={link}>{nav('pricing')}</Link>
					<Link href="/dashboard" className={link}>{nav('openDashboard')}</Link>
				</nav>
				<nav aria-label={t('help')} className="flex flex-col gap-2">
					<p className="text-sm font-semibold text-black">{t('help')}</p>
					<Link href={{ pathname: '/', hash: 'support' }} className={link}>{nav('support')}</Link>
				</nav>
			</div>
			<p className="mx-auto max-w-6xl border-t border-black/5 px-6 py-6 text-xs text-neutral-400">© {new Date().getFullYear()} Learnify. {t('rights')}</p>
		</footer>
	)
}