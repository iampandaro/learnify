import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { CSSProperties } from 'react'
import { Link } from '@/app/navigation'

/**
 * Responsive circuit lines
 * ------------------------
 * The design is 1440px wide and the lines are drawn around the button row
 * (design y = 425). To keep them correct at every resolution:
 *
 *  - The lines are split into a LEFT group and a RIGHT group. The left group is
 *    pinned to the left edge, the right group to the right edge, so they never
 *    detach from the screen edges on wide screens.
 *  - The long horizontal purple line between them is a plain <div> that
 *    stretches to fill whatever space is left.
 *  - Both groups are positioned relative to the button row, so design y = 425
 *    always sits exactly on the row's centre, whatever the text above does.
 *  - Groups scale with `--u` (1 design pixel): 1px on desktop, shrinking
 *    with the viewport down to a floor of 0.4px (0.3px on very narrow screens
 *    such as flip-phone cover displays). Strokes use
 *    `non-scaling-stroke`, so lines stay 3px thick at every size and always
 *    match the centre line.
 *  - Vertical lines that started at y = 0 in the design are extended far above,
 *    so they still reach the top of the hero when it is scaled down. The
 *    section clips the overflow.
 */
const px = (n: number) => `calc(${n} * var(--u))`

const stroke = { fill: 'none', strokeWidth: 3, vectorEffect: 'non-scaling-stroke' } as const

const groupStyle = (width: number): CSSProperties => ({
	position: 'absolute',
	top: `calc(50% - ${px(425)})`,
	width: px(width),
	height: px(624),
	overflow: 'visible',
})

function LinesLeft() {
	return (
		<svg
			aria-hidden
			viewBox="0 0 330 624"
			style={{ ...groupStyle(330), left: 0 }}
			className="pointer-events-none"
		>
			<path {...stroke} stroke="#FF6B6B" d="M24 -900V136.87C24 153.991 37.8792 167.87 55 167.87H208C225.121 167.87 239 181.749 239 198.87V348.419" />
			<path {...stroke} stroke="#59E546" d="M0 497.5H187C189.761 497.5 192 495.261 192 492.5V445.5C192 434.454 200.954 425.5 212 425.5H312.5" />
			<path {...stroke} stroke="#59E546" d="M0 292H187.307C190.069 292 192.307 294.239 192.307 297V405C192.307 416.046 201.262 425 212.307 425H313" />
			<path {...stroke} stroke="#4F46E5" d="M321.5 433.5V517.5C321.5 520.261 319.261 522.5 316.5 522.5H238C235.239 522.5 233 524.739 233 527.5V614.5C233 617.261 230.761 619.5 228 619.5H114.5" />
			<ellipse cx="239" cy="356.025" rx="5" ry="5.0716" fill="#FF6B6B" />
			<circle cx="321" cy="425" r="5" fill="#59E546" />
			<circle cx="107" cy="619" r="5" fill="#4F46E5" />
		</svg>
	)
}

function LinesRight() {
	return (
		<svg
			aria-hidden
			viewBox="1110 0 330 624"
			style={{ ...groupStyle(330), right: 0 }}
			className="pointer-events-none"
		>
			{/* Purple: enters from the right edge, drops, then runs left under the pink dot */}
			<path {...stroke} stroke="#4F46E5" d="M1440 175.477H1373C1370.24 175.477 1368 177.715 1368 180.477V419.999C1368 422.761 1365.76 424.999 1363 424.999H1138" />
			<path {...stroke} stroke="#FF6B6B" d="M1382.5 -900V170.477C1382.5 173.239 1380.26 175.477 1377.5 175.477H1209C1206.24 175.477 1204 177.716 1204 180.477V249.016" />
			<path {...stroke} stroke="#FFD446" d="M1429 -900V252.603C1429 255.378 1426.74 257.622 1423.97 257.603L1211.5 256.116" />
			<path {...stroke} stroke="#FF5DC4" d="M1279.3 -900L1266.06 420.065C1266.03 422.801 1263.8 425 1261.06 425H1146.5" />
			<path {...stroke} stroke="#E95DFF" d="M1145.5 425H1219.5C1222.26 425 1224.5 427.239 1224.5 430V503.5C1224.5 506.261 1226.74 508.5 1229.5 508.5H1340C1342.76 508.5 1345 510.739 1345 513.5V582.5C1345 585.261 1347.24 587.5 1350 587.5H1440" />
			<ellipse cx="1204" cy="255.611" rx="5" ry="5.0716" fill="#FFD446" />
			<circle cx="1138" cy="425" r="6.5" fill="#E95DFF" style={{ stroke: 'var(--background)', strokeWidth: 3 }} />
		</svg>
	)
}

/**
 * Progressive blur: stacked backdrop-blur layers, each masked to a band, with
 * blur strength doubling towards the bottom. A soft fade into the page
 * background on top makes the hero dissolve at its bottom edge.
 */
const BLUR_LAYERS = [0.5, 1, 2, 4, 8, 16]

function ProgressiveBlur() {
	const step = 100 / (BLUR_LAYERS.length + 1)
	const at = (n: number) => Math.min(100, +(n * step).toFixed(2))

	return (
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 sm:h-44 lg:h-52"
		>
			{BLUR_LAYERS.map((blur, i) => {
				const mask = `linear-gradient(to bottom, transparent ${at(i)}%, black ${at(i + 1)}%, black ${at(i + 2)}%, transparent ${at(i + 3)}%)`
				return (
					<div
						key={blur}
						className="absolute inset-0"
						style={{
							backdropFilter: `blur(${blur}px)`,
							WebkitBackdropFilter: `blur(${blur}px)`,
							maskImage: mask,
							WebkitMaskImage: mask,
						}}
					/>
				)
			})}
			<div
				className="absolute inset-0"
				style={{
					background:
						'linear-gradient(to bottom, transparent 30%, color-mix(in srgb, var(--background) 90%, transparent) 100%)',
				}}
			/>
		</div>
	)
}

const Hero = () => {
	const t = useTranslations('Hero')

	return (
		<section
			className="relative isolate overflow-hidden bg-background"
			style={{ '--u': 'min(clamp(0.4px, calc(100vw / 1440), 1px), calc(100vw / 800))' } as CSSProperties}
		>
			<div className="flex flex-col items-center gap-5 px-4 pt-28 text-center min-[400px]:px-6 sm:pt-32 lg:min-h-[230px] lg:pt-[165px]">
				<h1 className="text-3xl font-medium leading-[1.1] min-[400px]:text-4xl tracking-tight text-black sm:text-6xl lg:text-[72px]">
					{t.rich('title', {
						highlight: (chunks) => (
							<span className="font-display text-[1.12em] font-extrabold text-primary">
								{chunks}
							</span>
						),
					})}
				</h1>
				<p className="max-w-[720px] text-base font-medium leading-snug text-neutral-500 sm:text-2xl">
					{t('subtitle')}
				</p>
			</div>

			{/* Button row: the circuit lines are anchored to this row's centre */}
			<div className="relative mt-10 h-12 w-full sm:h-[61px] lg:mt-0">
				{/* Stretchy centre line, from the green dot (x=321) to the pink dot (x=1138) */}
				<div
					aria-hidden
					className="absolute h-[3px] -translate-y-1/2 bg-primary"
					style={{ top: '50%', left: px(321), right: px(302) }}
				/>
				<LinesLeft />
				<LinesRight />

				<div className="relative z-10 flex h-full items-center justify-center gap-2 min-[400px]:gap-4 sm:gap-[50px]">
					<Link
						href="/dashboard"
						className="flex h-full items-center whitespace-nowrap rounded-full bg-primary px-[clamp(0.75rem,4vw,1.25rem)] text-[clamp(0.75rem,3.8vw,1rem)] font-medium text-white transition-colors hover:bg-primary/90 sm:px-8 sm:text-2xl"
					>
						{t('openDashboard')}
					</Link>
					<Link
						href={{ pathname: '/', hash: 'features' }}
						className="flex h-full items-center whitespace-nowrap rounded-full border border-coral bg-background px-[clamp(0.75rem,4vw,1.25rem)] text-[clamp(0.75rem,3.8vw,1rem)] font-medium text-black transition-colors hover:bg-coral/10 sm:px-8 sm:text-2xl"
					>
						{t('learnMore')}
					</Link>
				</div>
			</div>

			<div className="relative isolate mx-auto mt-10 w-[calc(100%-2rem)] min-[400px]:w-[calc(100%-3rem)] max-w-300 lg:mt-[77px]">
				<div className="max-h-[200px] overflow-hidden rounded-t-2xl border border-b-0 border-primary bg-background sm:max-h-[380px] lg:max-h-[491px]">
					<Image
						src="/hero-preview.png"
						alt={t('previewAlt')}
						width={705}
						height={520}
						priority
						className="h-auto w-full"
					/>
				</div>
			</div>

			<ProgressiveBlur />
		</section>
	)
}

export default Hero