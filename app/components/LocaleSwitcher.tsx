'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useId, useRef, useState, useTransition } from 'react'
import { locales, type Locale } from '@/app/config'
import { usePathname, useRouter } from '@/app/navigation'

const OPTIONS: Record<Locale, { flag: string; label: string }> = {
	en: { flag: '🇬🇧', label: 'English (UK)' },
	ro: { flag: '🇷🇴', label: 'Română (RO)' },
}

// Same look as the navbar links
const LINK = 'text-md font-medium text-gray-700 hover:text-gray-900'

export default function LocaleSwitcher() {
	const t = useTranslations('LocaleSwitcher')
	const locale = useLocale() as Locale
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()
	const [open, setOpen] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)
	const menuId = useId()

	useEffect(() => {
		if (!open) return
		const onDown = (e: MouseEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false)
				rootRef.current?.querySelector<HTMLButtonElement>('[data-trigger]')?.focus()
			}
		}
		document.addEventListener('mousedown', onDown)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('mousedown', onDown)
			document.removeEventListener('keydown', onKey)
		}
	}, [open])

	function select(next: Locale) {
		setOpen(false)
		startTransition(() => {
			router.replace(pathname, { locale: next })
		})
	}

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
		e.preventDefault()
		if (!open) return setOpen(true)
		const items = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
		const i = items.indexOf(document.activeElement as HTMLButtonElement)
		const next = e.key === 'ArrowDown' ? i + 1 : i - 1
		items[(next + items.length) % items.length]?.focus()
	}

	const current = OPTIONS[locale]

	return (
		<div
			ref={rootRef}
			onKeyDown={onKeyDown}
			className={`relative ${isPending ? 'opacity-60' : ''}`}
		>
			<button
				type="button"
				data-trigger
				disabled={isPending}
				aria-label={t('label')}
				aria-expanded={open}
				aria-controls={menuId}
				onClick={() => setOpen((o) => !o)}
				className={`${LINK} inline-flex cursor-pointer items-center gap-2`}
			>
				<span aria-hidden>{current.flag}</span>
				<span lang={locale}>{current.label}</span>
				<svg
					aria-hidden
					viewBox="0 0 24 24"
					className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>

			<ul
				id={menuId}
				hidden={!open}
				className="absolute right-0 top-full z-50 mt-3 w-max min-w-full rounded-xl border border-black/5 bg-white p-1.5 shadow-lg"
			>
				{locales.map((loc) => (
					<li key={loc}>
						<button
							type="button"
							lang={loc}
							aria-current={loc === locale ? 'true' : undefined}
							onClick={() => select(loc)}
							className={`${LINK} flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-black/5 focus-visible:bg-black/5 focus-visible:outline-none ${
								loc === locale ? 'bg-black/5' : ''
							}`}
						>
							<span aria-hidden>{OPTIONS[loc].flag}</span>
							<span>{OPTIONS[loc].label}</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}