import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CoinFlipWrapper from '@/components/CoinFlipWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Coin Flip — Flip a Virtual Coin Online Free',
  description:
    'Flip a virtual coin online instantly. Free coin flip simulator with heads or tails result, flip statistics, streak counter and flip history.',
  alternates: { canonical: 'https://randomnumbergenerator.app/coin-flip' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'Is a virtual coin flip fair?',
    a: 'Yes. Our coin flip uses Math.random() which produces a statistically fair 50/50 result. Each flip is completely independent of previous flips, just like a real coin. Over many flips you will see results converge toward exactly 50% heads and 50% tails.',
  },
  {
    q: 'What are the odds of flipping heads 10 times in a row?',
    a: 'The probability of flipping heads 10 times in a row is (0.5)^10 = 1/1024, or about 0.098%. While rare, it does happen. Each individual flip always has a 50% chance — past results do not affect future flips.',
  },
  {
    q: 'How is the coin flip result determined?',
    a: 'The result is determined by Math.random() < 0.5. If Math.random() returns a value less than 0.5, the result is Heads; otherwise it is Tails. The calculation happens instantly in your browser.',
  },
  {
    q: 'Can I use this for decisions?',
    a: 'Absolutely. A coin flip is a classic decision-making tool. Simply assign one option to Heads and another to Tails, then flip. The result is completely random and unbiased, making it perfect for settling disputes, making choices, or breaking ties.',
  },
  {
    q: 'What is the probability of heads vs tails?',
    a: 'The probability of heads is exactly 50% and the probability of tails is exactly 50%. Each flip is an independent event — the history of previous flips has no influence on the next result.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Coin Flip',
  url: 'https://randomnumbergenerator.app/coin-flip',
  description: 'Free virtual coin flip with animated flip effect, statistics, and history.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Flip a Virtual Coin',
  step: [
    { '@type': 'HowToStep', name: 'Click FLIP', text: 'Click the FLIP button or press the Space bar to flip the coin. The coin animates and reveals Heads or Tails.' },
    { '@type': 'HowToStep', name: 'View the result', text: 'The result (HEADS or TAILS) is displayed prominently in the matching color. The statistics panel updates automatically.' },
    { '@type': 'HowToStep', name: 'Track your stats', text: 'See total flips, heads percentage, tails percentage, and your current streak. The last 20 results are shown as H/T badges.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function CoinFlipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrng.webp')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Coin Flip — Flip a Virtual Coin Online
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Flip a virtual coin instantly. Free coin flip simulator with heads or tails result, statistics, and flip history. Press Space to flip.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="4444444444" />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <CoinFlipWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="4444444445" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the coin flip tool
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              Our virtual coin flip tool gives you an instant, fair heads or tails result every time. The coin flip uses Math.random() to produce a true 50/50 result with no bias. Use it for decision-making, games, giveaways, or anywhere you need a fair random choice between two options. The statistics panel helps you track results over multiple flips, while the streak counter shows your current run of the same outcome.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="4444444446" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
