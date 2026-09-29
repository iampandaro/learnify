'use client'

import { useLocale } from 'next-intl'
import { useEffect, useId, useState } from 'react'
import { Link, usePathname } from '@/app/navigation'
import LocaleSwitcher from './LocaleSwitcher'

export type NavHref = { pathname: '/'; hash: string }

type Props = {
	items: { key: string; href: NavHref; label: string }[]
	dashboardLabel: string
	openLabel: string
	closeLabel: string
}

/**
 * Hamburger + dropdown panel, shown below the `lg` breakpoint.
 * The panel is positioned against the fixed <header>, scrolls if the screen is
 * short (landscape phones, flip phones) and closes on navigation, language
 * change, Escape, or when the viewport grows to desktop size.
 */
export default function MobileMenu({ items, dashboardLabel, openLabel, closeLabel }: Props) {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()
	const locale = useLocale()
	const panelId = useId()

	useEffect(() => {
		setOpen(false)
	}, [pathname, locale])

	useEffect(() => {
		if (!open) return
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		const mq = window.matchMedia('(min-width: 1024px)')
		const onChange = (e: MediaQueryListEvent) => {
			if (e.matches) setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		mq.addEventListener('change', onChange)

		return () => {
			document.body.style.overflow = previousOverflow
			document.removeEventListener('keydown', onKey)
			mq.removeEventListener('change', onChange)
		}
	}, [open])

	return (
		<div className="lg:hidden">
			<button
				type="button"
				aria-label={open ? closeLabel : openLabel}
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((o) => !o)}
				className="-mr-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-gray-800 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-primary"
			>
				<svg
					aria-hidden
					viewBox="0 0 24 24"
					className="h-6 w-6"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				>
					{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
				</svg>
			</button>

			<div
				id={panelId}
				hidden={!open}
				className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-black/5 bg-background shadow-lg"
			>
				<ul className="flex flex-col gap-1 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
					{items.map((item) => (
						<li key={item.key}>
							<Link
								href={item.href}
								onClick={() => setOpen(false)}
								className="block rounded-lg px-4 py-3 text-lg font-medium text-gray-700 hover:bg-black/5 hover:text-gray-900"
							>
								{item.label}
							</Link>
						</li>
					))}
					<li>
						<LocaleSwitcher inline />
					</li>
					<li className="mt-3">
						<Link
							href="/dashboard"
							onClick={() => setOpen(false)}
							className="flex items-center justify-center rounded-full bg-primary px-4 py-3 text-lg font-medium text-background transition duration-200 hover:brightness-110"
						>
							{dashboardLabel}
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}