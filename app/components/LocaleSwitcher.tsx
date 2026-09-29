'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useId, useRef, useState, useTransition } from 'react'
import { locales, type Locale } from '@/app/config'
import { usePathname, useRouter } from '@/app/navigation'

const OPTIONS: Record<Locale, { flag: string; label: string }> = {
	en: { flag: '🇬🇧', label: 'English (UK)' },
	ro: { flag: '🇷🇴', label: 'Română (RO)' },
}

type Props = {
	/**
	 * `inline`: for use inside the mobile menu. Full-width row, and the language
	 * list opens in the flow of the page instead of as a floating popover.
	 */
	inline?: boolean
}

export default function LocaleSwitcher({ inline = false }: Props) {
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
			// scroll: false keeps the reader on the section they were viewing
			router.replace(pathname, { locale: next, scroll: false })
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

	const triggerClass = inline
		? 'flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3 text-lg font-medium text-gray-700 hover:bg-black/5'
		: 'inline-flex items-center gap-2 text-base font-medium text-gray-700 hover:text-gray-900'

	const listClass = inline
		? 'mt-1 flex flex-col gap-1 pl-4'
		: 'absolute right-0 top-full z-50 mt-3 w-max min-w-full rounded-xl border border-black/5 bg-white p-1.5 shadow-lg'

	const itemClass = inline
		? 'flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-lg font-medium text-gray-700 hover:bg-black/5'
		: 'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-black/5 hover:text-gray-900'

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
				className={`${triggerClass} cursor-pointer focus-visible:outline-2 focus-visible:outline-primary`}
			>
				<span className="inline-flex items-center gap-2">
					<span aria-hidden>{current.flag}</span>
					<span lang={locale}>{current.label}</span>
				</span>
				<svg
					aria-hidden
					viewBox="0 0 24 24"
					className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>

			<ul id={menuId} hidden={!open} className={listClass}>
				{locales.map((loc) => (
					<li key={loc}>
						<button
							type="button"
							lang={loc}
							aria-current={loc === locale ? 'true' : undefined}
							onClick={() => select(loc)}
							className={`${itemClass} cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
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