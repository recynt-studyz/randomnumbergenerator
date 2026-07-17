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

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Does a Digital Coin Flip Work?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A digital coin flip reduces a 50/50 probability event to a single expression: <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">Math.random() &lt; 0.5</code>. JavaScript&apos;s Math.random() generates a number uniformly distributed between 0 and 1. If the value falls below 0.5 the result is Heads; at or above 0.5 it is Tails. Because the distribution is perfectly uniform, each outcome has an exact 50% probability — neither side is favoured by even a fraction of a percent.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A digital flip is actually statistically fairer than tossing a physical coin. Research has shown that physical coins can land on the same side they started slightly more often due to the physics of spinning and catching — a bias of approximately 51% toward the starting face. There is also the influence of grip strength, release technique, and catching angle. A digital flip has none of these variables: the outcome is drawn from a mathematically uniform distribution with no physical bias whatsoever, every single time.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Each flip is also fully independent of all previous flips. The common misconception known as the gambler&apos;s fallacy — the belief that after a run of Heads, Tails becomes &quot;due&quot; — does not apply here. Every single flip has exactly the same 50/50 probability regardless of history. The statistics panel on this tool lets you observe this in practice: over many flips, the ratio of Heads to Tails converges toward 50:50, but any individual flip remains completely unpredictable.
            </p>
          </div>

          {/* Worked Example */}
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 px-6 py-5 mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Worked Example: Making Decisions with a Coin Flip</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Two friends cannot agree on who pays for lunch. Rather than a prolonged negotiation, they open the coin flip tool on one phone and both watch the screen together. One calls Heads, the other Tails, and they press Flip. The result is instant, completely unbiased, and impossible for either person to influence or dispute — unlike a physical coin where the flipper could, consciously or not, apply a consistent technique that slightly skews outcomes.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Sports referees and tournament organisers use digital coin flips for exactly this reason: transparency and verifiability. When both parties can see the same screen and agree on the tool in advance, there is no room for claims of unfairness. The streak counter adds a further layer of transparency — if observers see that the previous 5 flips were all Heads, they can confirm from the statistics panel that this is simply a normal statistical run, not evidence of bias.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Other common uses: a game night host flips repeatedly to determine seating order for a 6-player board game; a project manager flips to decide which of two equally viable prototypes to build first; a teacher uses it to assign students to debate positions; a developer uses repeated flips to manually test that an A/B variant assignment is working correctly. In every case, a coin flip delivers a decision that all parties accept because the process is visibly and demonstrably fair.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Virtual Coin Flipping</h2>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">True 50/50 probability</strong> — Unlike physical coins which carry minor mechanical biases from manufacturing and use, a digital flip using Math.random() produces an exact 50% probability for each outcome on every flip. The fairness is mathematical, not mechanical, and never degrades with repeated use.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Statistical independence</strong> — Each flip is entirely independent of all previous flips. A long run of Heads does not increase the probability of Tails on the next flip. Understanding this independence is key to using coin flip results correctly and avoiding the gambler&apos;s fallacy.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Flip history and statistics</strong> — The running count of Heads and Tails, percentage breakdown, and current streak let you observe the law of large numbers in action: over many flips, results converge toward 50/50, even though any individual flip remains unpredictable. This makes the tool useful for teaching probability concepts as well as making decisions.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Accessibility and convenience</strong> — A digital coin flip is available on any device with a browser, requires no physical coin, works silently in any setting, and produces an unambiguous result with no possibility of the coin rolling away or landing on its edge.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Shared viewing and transparency</strong> — Because the flip happens on screen, all parties can watch simultaneously and verify the result. This shared visibility makes digital coin flips more trustworthy in group settings than a flip performed out of sight of the other party.
              </li>
            </ul>
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
