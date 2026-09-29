import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/app/navigation'
import LocaleSwitcher from './LocaleSwitcher'
import MobileMenu, { type NavHref } from './MobileMenu'

const items: { key: 'home' | 'features' | 'pricing' | 'support'; href: NavHref }[] = [
	{ key: 'home', href: '/' },
	{ key: 'features', href: '/features' },
	{ key: 'pricing', href: '/pricing' },
	{ key: 'support', href: '/support' },
]

const Navbar = () => {
	const t = useTranslations('Navbar')
	const links = items.map(({ key, href }) => ({ href, label: t(key) }))

	return (
		<header className="fixed inset-x-0 top-0 z-30 w-full bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
			<nav
				aria-label={t('label')}
				className="flex items-center justify-between gap-4 py-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))] lg:py-4"
			>
				<Link href="/" aria-label={t('logoLabel')} className="shrink-0">
					<Image
						src="/logo_nav.png"
						alt=""
						width={150}
						height={51}
						priority
						className="h-auto w-28 sm:w-[150px]"
					/>
				</Link>

				{/* Desktop / large tablet */}
				<ul className="hidden items-center gap-4 lg:flex">
					{links.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="text-base font-medium text-gray-700 hover:text-gray-900"
							>
								{item.label}
							</Link>
						</li>
					))}
					<li>
						<LocaleSwitcher />
					</li>
					<li>
						<Link
							href="/dashboard"
							className="rounded-full bg-primary px-4 py-2 text-base font-medium text-background transition duration-200 hover:brightness-110"
						>
							{t('openDashboard')}
						</Link>
					</li>
				</ul>

				{/* Phones, foldables, small tablets */}
				<MobileMenu
					items={links}
					dashboardLabel={t('openDashboard')}
					openLabel={t('openMenu')}
					closeLabel={t('closeMenu')}
				/>
			</nav>
		</header>
	)
}

export default Navbar