import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DiceRollerWrapper from '@/components/DiceRollerWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Dice Roller — Roll Virtual Dice Online Free',
  description:
    'Roll virtual dice online instantly. Free dice roller supporting d4, d6, d8, d10, d12, d20 and d100. Roll multiple dice and see totals.',
  alternates: { canonical: 'https://randomnumbergenerator.app/dice-roller' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What does d20 mean?',
    a: 'd20 means a 20-sided die. The "d" notation is standard in tabletop gaming: the number after "d" tells you how many sides the die has. So d4 is a 4-sided die, d6 is a standard 6-sided die, d20 is a 20-sided die, and d100 is a 100-sided die (or percentile die).',
  },
  {
    q: 'How do I roll multiple dice at once?',
    a: 'Use the +/- buttons next to "Number of dice" to set how many dice to roll. You can roll up to 10 dice at once. The tool shows each die result individually plus the total sum. For example, rolling 3d6 shows three separate results and their combined total.',
  },
  {
    q: 'Is the dice roller truly random?',
    a: 'Yes. Each die roll uses Math.floor(Math.random() * sides) + 1, which gives each face an equal probability of appearing. The results are as random as a physical die roll.',
  },
  {
    q: 'What is the most common result when rolling 2d6?',
    a: 'The most common result when rolling 2d6 is 7. There are 6 ways to roll a 7 out of 36 possible combinations (16.7% chance). Results near the middle of the range (6, 7, 8) are most likely because there are more combinations that produce them.',
  },
  {
    q: 'How do I use dice rolling for Dungeons and Dragons?',
    a: 'D&D uses multiple dice types. Attack rolls and saving throws use a d20, damage uses d4–d12 depending on the weapon, and percentile checks use d100. Use the D&D Quick Rolls buttons for instant attack rolls, damage, saving throws, and skill checks with the correct dice pre-selected.',
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
  name: 'Dice Roller',
  url: 'https://randomnumbergenerator.app/dice-roller',
  description: 'Free online dice roller supporting d4, d6, d8, d10, d12, d20, d100 with multiple dice and roll history.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Roll Virtual Dice',
  step: [
    { '@type': 'HowToStep', name: 'Select your dice type', text: 'Click one of the dice type buttons: d4, d6, d8, d10, d12, d20, or d100. The selected die is highlighted in purple.' },
    { '@type': 'HowToStep', name: 'Choose number of dice', text: 'Use the +/- buttons to set how many dice to roll at once (1–10). For example, set 3 to roll 3d6.' },
    { '@type': 'HowToStep', name: 'Roll and see results', text: 'Click ROLL to see each die result and the total sum. The roll is added to your history at the bottom.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function DiceRollerPage() {
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
              Dice Roller — Roll Virtual Dice Online
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Roll virtual dice online instantly. Supports d4, d6, d8, d10, d12, d20 and d100. Roll multiple dice at once and see the total sum.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="5555555555" />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <DiceRollerWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="5555555556" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the dice roller
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              Our free online dice roller supports all standard tabletop RPG dice: d4, d6, d8, d10, d12, d20, and d100. Roll multiple dice simultaneously and see individual results plus the sum. The D&D quick roll buttons make it easy to perform common rolls in Dungeons and Dragons without configuring anything. For d6 rolls, traditional dice face visuals are displayed using classic Unicode dice symbols.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Are Dice Rolls Simulated Digitally?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Each die roll is computed with a single expression: <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">Math.floor(Math.random() * sides) + 1</code>. For a d20 this generates a uniformly distributed integer between 1 and 20; for a d6, between 1 and 6. Because Math.random() produces values with a perfectly uniform distribution, every face has an identical probability of appearing — exactly 1/sides — on every single roll, with no exceptions.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Digital dice are measurably fairer than physical dice in several ways. Physical dice wear over time: edges and corners gradually round down, and the plastic or resin density inside the die can shift, creating subtle biases toward certain faces. Precision casino dice are engineered to strict tolerances to minimise this, but standard gaming dice carry small, measurable biases. A digital dice roller has none of these physical imperfections — the probability distribution remains perfectly uniform for every roll, on every die type, indefinitely.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              When rolling multiple dice simultaneously, the tool calls the formula independently for each die, producing truly independent results. Rolling 3d6 executes three completely separate Math.random() calls. The individual results and their sum are displayed together, matching the information you would get from rolling three physical dice on a table and reading them simultaneously.
            </p>
          </div>

          {/* Worked Example */}
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 px-6 py-5 mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Worked Example: Online D&amp;D Campaign</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A Dungeons &amp; Dragons group plays their campaign over a video call. During character creation, each player needs to roll 4d6 and drop the lowest result for each ability score — a standard method for generating ability score arrays. A player selects d6, sets the count to 4, and clicks Roll. The tool shows all four individual results (for example: 5, 3, 6, 4) and the total. The player discards the lowest result (3) and records the remaining sum of 15 for Strength.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The persistent roll history at the bottom of the tool keeps a transparent log of every roll in the session. In online play, this is critical: when all players are on separate screens with no shared physical table, the history log acts as a verifiable record that results have not been manipulated between rolls. The game master and all players can review the complete session history at any point.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Beyond tabletop RPGs: a probability teacher uses repeated d6 rolls to demonstrate bell-curve distributions to students; a board game designer stress-tests dice mechanics by rolling thousands of virtual dice to verify that results match theoretical expectations; a family uses the d20 to assign numbered dinner choices; a statistician uses d100 rolls to generate random percentages for a simulation model. The dice roller&apos;s flexibility — seven die types and up to ten dice simultaneously — covers nearly every tabletop and statistical use case without any physical equipment.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Digital Dice Rolling</h2>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Die type selection</strong> — The seven supported types (d4, d6, d8, d10, d12, d20, d100) cover the full standard set used in tabletop RPGs, wargames, and probability exercises. Each type produces a perfectly uniform distribution across all its faces on every roll.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Number of dice and bell curves</strong> — Rolling multiple dice simultaneously generates a sum that follows a bell-curve distribution rather than a flat one. Rolling 2d6 makes 7 the most common result because there are more face combinations that produce it — a key property exploited deliberately in many game designs to make middle outcomes more frequent.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Advantage and disadvantage</strong> — Many RPG systems require rolling twice and keeping the higher (advantage) or lower (disadvantage) result. The D&amp;D Quick Rolls presets handle these mechanics directly, eliminating the manual step of comparing two independent rolls.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Roll history transparency</strong> — The persistent session history lets players and game masters review every roll. This is especially valuable in online play where physical dice are not visible to all participants and trust in the rolling process needs to be maintained across screens.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">No physical degradation</strong> — Physical dice vary in fairness based on manufacturing precision and degrade with use. Digital dice use a mathematically perfect uniform distribution that never wears out, making every session statistically equivalent to using brand-new precision casino dice.
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="5555555557" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
