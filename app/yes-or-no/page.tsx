import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import YesOrNoWrapper from '@/components/YesOrNoWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Yes or No — Random Yes or No Generator',
  description:
    'Get a random yes or no answer instantly. Free yes or no generator with bias control, statistics tracking and question input.',
  alternates: { canonical: 'https://randomnumbergenerator.app/yes-or-no' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How does the yes or no generator work?',
    a: 'The generator uses Math.random() with a bias value. At the default 50/50 setting, any value below 0.5 gives YES and above gives NO. If you adjust the bias slider toward Yes, the threshold shifts — for example at 70% Yes bias, any value below 0.7 returns YES.',
  },
  {
    q: 'Is the yes or no result truly random?',
    a: 'Yes. At the default 50/50 bias, each result has an equal probability of being YES or NO. The result is generated fresh each time with no memory of past results.',
  },
  {
    q: 'Can I make yes more likely than no?',
    a: 'Yes. Use the bias slider to adjust the probability. Set it anywhere from 10% to 90% chance of Yes. The current probability is shown above the slider. This is useful when you want a weighted random outcome rather than a pure 50/50.',
  },
  {
    q: 'Can I use this for making decisions?',
    a: 'Absolutely. The yes/no generator is perfect for breaking indecision. Type your question (optional), set your bias if you want, and press ASK or Space. The large YES or NO answer is clear and immediate. Sometimes just seeing the result helps you realize what you actually wanted.',
  },
  {
    q: 'What is the probability of getting yes?',
    a: 'At the default setting, the probability of YES is exactly 50%. You can adjust this using the bias slider from 10% to 90%. The current probability is always displayed above the slider so you always know the exact odds.',
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
  name: 'Yes or No Generator',
  url: 'https://randomnumbergenerator.app/yes-or-no',
  description: 'Free yes or no random generator with bias control, question input, and statistics tracking.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Yes or No Generator',
  step: [
    { '@type': 'HowToStep', name: 'Enter your question', text: 'Optionally type your yes/no question in the input field. The question is just for your reference — the generator works fine without one.' },
    { '@type': 'HowToStep', name: 'Set bias (optional)', text: 'Adjust the bias slider if you want YES to be more or less likely than 50%. The default is a fair 50/50 split.' },
    { '@type': 'HowToStep', name: 'Click ASK or press Space', text: 'Press ASK to get your answer. YES appears in green, NO appears in red. Statistics track your results over multiple asks.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function YesOrNoPage() {
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
              Yes or No Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Get a random YES or NO answer instantly. Type your question, adjust the bias if needed, and press ASK.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1212121212" />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <YesOrNoWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1212121213" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the Yes or No generator
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              The yes/no generator is one of the simplest and most satisfying decision tools. When you are stuck between two options or want a quick unbiased answer, type your question and get an instant YES or NO. The statistics panel tracks your results over multiple asks, and the bias slider lets you weight the outcome toward YES or NO if one answer is more likely to be correct for your situation. Press Space for a rapid series of answers.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Does the Yes or No Generator Work?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              At its core, the generator evaluates <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">Math.random() &lt; bias</code>, where bias is a value between 0 and 1 (default 0.5 for a 50/50 split). If the random value falls below the bias threshold, the result is YES; otherwise it is NO. At the default 0.5 bias, each result has an exact 50% probability — a mathematically perfect coin flip mapped to a binary decision. This is simpler, faster, and more direct than a full coin flip simulation, making it ideal for rapid-fire decision-making.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The bias slider allows deliberate probability weighting. Setting the bias to 0.7 means YES has a 70% probability and NO has a 30% probability on each ask. This is useful when the question being asked is not a pure 50/50 proposition — when one answer is genuinely more likely to be correct but you want to introduce some randomness into the decision process. The current probability is always displayed above the slider so you can see exactly what odds you are working with.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Each result is fully independent of all previous results. A run of five consecutive YES answers does not make NO more likely on the sixth ask — the same 50% (or your chosen probability) applies every single time. The statistics panel is useful for observing this property: over many asks, the ratio of YES to NO converges toward your set probability, even though any individual result remains completely unpredictable.
            </p>
          </div>

          {/* Worked Example */}
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 px-6 py-5 mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Worked Example: Breaking a Decision Deadlock</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A couple has been debating for 15 minutes whether to cook dinner at home or order takeout. Both options have roughly equal appeal and neither person can commit. Rather than continuing the circular discussion, they agree to let randomness decide: YES means cook at home, NO means order takeout. One press of ASK and the decision is made instantly. The conversation ends — not because the random result was necessarily the &quot;best&quot; choice, but because both parties agreed in advance to accept it.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              This is one of the most powerful applications of random decision-making: it externalises the decision to a neutral, unchallengeable process. Neither party can feel that the other manipulated the outcome, and neither party has to take responsibility for the choice. Psychologists studying decision fatigue note that delegating low-stakes decisions to randomness preserves mental energy for higher-stakes choices — making a random yes/no tool surprisingly valuable in everyday life.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Other uses: a writer uses the yes/no generator to randomly decide plot branch directions while brainstorming, accepting whatever comes up to force creative exploration of paths they might not have chosen deliberately; a developer uses it to randomly assign test scenarios to QA reviewers; a teacher uses it to randomly decide whether a lesson will involve group work or individual work today; a traveller uses it to make quick itinerary decisions when all options seem equally good. In each case, the randomness removes friction and replaces indecision with forward momentum.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Random Yes/No Decisions</h2>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Default 50/50 probability</strong> — At the default setting, YES and NO each have an exactly equal 50% probability on every ask. This is the correct setting for genuine binary decisions where both outcomes are equally acceptable, such as settling a tie or choosing randomly between two equivalent options.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Bias adjustment</strong> — The bias slider shifts the probability anywhere from 10% to 90% in favour of YES. This is appropriate when one outcome is more likely to be correct but you want to introduce deliberate uncertainty — for example, saying &quot;I will probably go to the gym today, but let 30% randomness decide if I take the day off&quot; models real-world probabilistic decision-making.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Question framing</strong> — The quality of the decision depends entirely on how you frame the question. A well-framed yes/no question should have two equally actionable outcomes, a clear assignment of YES and NO to each option, and a genuine willingness to accept either result before pressing ASK.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Statistical independence</strong> — Every ask is independent of all previous results. Seeing a long run of YES answers does not make NO more likely — the probability resets to exactly your set value on every press. The statistics panel demonstrates this by showing how results converge toward your set probability over many asks.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Psychology of random decisions</strong> — When you disagree with the result of a random decision, that reaction is valuable information — it often reveals which outcome you actually preferred. Many people use yes/no generators not to make decisions blindly but to surface hidden preferences they could not articulate directly.
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1212121214" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
