import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/app/navigation'
import LocaleSwitcher from './LocaleSwitcher'

const items = [
	{ key: 'home', href: '/' },
	{ key: 'features', href: '/features' },
	{ key: 'pricing', href: '/pricing' },
	{ key: 'support', href: '/support' },
] as const

const Navbar = () => {
	const t = useTranslations('Navbar')

	return (
		<header className="fixed top-0 left-0 right-0 z-10 w-full">
			<nav
				aria-label={t('label')}
				className="flex items-center justify-between px-8 py-4"
			>
				<Link href="/" aria-label={t('logoLabel')}>
					<Image src="/logo_nav.png" alt="" width={150} height={51} priority />
				</Link>

				<ul className="flex items-center justify-center gap-4">
					{items.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="text-md font-medium text-gray-700 hover:text-gray-900"
							>
								{t(item.key)}
							</Link>
						</li>
					))}
					<li>
						<LocaleSwitcher />
					</li>
					<li>
						<Link href="/dashboard" className="text-md font-medium text-background bg-[#4F46E5] px-4 py-2 rounded-full hover:brigthness-[150%] transition duration-200">
							Open Dashboard
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Navbar