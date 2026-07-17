import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import NamePickerWrapper from '@/components/NamePickerWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Random Name Picker — Pick a Random Name',
  description:
    'Pick a random name from your list instantly. Free random name picker for classrooms, giveaways, and decisions. Remove picked names for sequential selection.',
  alternates: { canonical: 'https://randomnumbergenerator.app/name-picker' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I pick a random name from a list?',
    a: 'Enter your names in the text area (one per line or comma-separated), then click PICK. The random name picker instantly selects a random name and displays it prominently. You can set how many names to pick at once.',
  },
  {
    q: 'Can I remove names after they are picked?',
    a: 'Yes. Enable the "Remove picked names" toggle and each picked name will be removed from the pool. This lets you pick names sequentially without repeats — perfect for assigning tasks, selecting presentation order, or running a giveaway with multiple winners.',
  },
  {
    q: 'How many names can I add?',
    a: 'There is no hard limit on the number of names you can enter. The name picker works with any list size, from 2 names to hundreds. Your names are saved in your browser so you do not need to re-enter them on your next visit.',
  },
  {
    q: 'Is the name picker truly random?',
    a: 'Yes. The picker selects a random index using Math.floor(Math.random() * names.length), giving every name an equal chance of being selected. The result is completely unbiased.',
  },
  {
    q: 'Can I use this for classroom random selection?',
    a: 'Absolutely. Teachers commonly use random name pickers to call on students fairly. Enter all student names, enable "Remove picked names" to ensure everyone gets called on before any name repeats, and use it throughout the class.',
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
  name: 'Random Name Picker',
  url: 'https://randomnumbergenerator.app/name-picker',
  description: 'Free random name picker with sequential elimination, multiple picks, and session history.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Pick a Random Name',
  step: [
    { '@type': 'HowToStep', name: 'Enter your names', text: 'Type or paste your list of names into the text area. Enter one name per line, or separate names with commas. The tool auto-detects the format.' },
    { '@type': 'HowToStep', name: 'Set your options', text: 'Choose how many names to pick at once. Optionally enable "Remove picked names" for sequential picking without repeats.' },
    { '@type': 'HowToStep', name: 'Click PICK', text: 'Press PICK to randomly select names from your list. The selected name appears prominently. Click Pick Again for another selection.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function NamePickerPage() {
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
              Random Name Picker
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Pick a random name from your list instantly. Perfect for classrooms, giveaways, and fair random selection. Enter any number of names.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="7777777777" />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <NamePickerWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="7777777778" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the random name picker
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              Our random name picker makes it easy to select a name fairly from any list. Teachers use it to call on students, event organizers use it for giveaway winner selection, and teams use it for fair task assignment. The sequential elimination mode removes each picked name from the pool so you can work through an entire list without repetition. Your name list is saved in your browser for convenience.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Does Random Name Selection Work?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The name picker selects from your list using <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">Math.floor(Math.random() * names.length)</code>, which produces a uniformly distributed random index. Every name in the list has an exactly equal probability of being selected on each pick — a probability of 1/n, where n is the number of remaining names. There is no weighting, no recency bias, and no hidden logic favouring or excluding any entry.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              When the &quot;Remove picked names&quot; mode is enabled, the tool implements sequential random selection without replacement — statistically equivalent to drawing names from a hat and setting each drawn slip aside. After each pick, the selected name is removed from the pool and the remaining names are redistributed with equal probability. This guarantees that every name will eventually be selected exactly once before any name repeats, which is not guaranteed when drawing with replacement.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The tool accepts names one per line or comma-separated, auto-detecting the format. Names are trimmed and deduplicated automatically so that accidental duplicates in a pasted list do not skew the probability toward any particular entry. Your list persists in browser localStorage between sessions, meaning you can close the tab and return without re-entering your names.
            </p>
          </div>

          {/* Worked Example */}
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 px-6 py-5 mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Worked Example: Fair Project Assignment</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A manager needs to assign 6 team members to 3 projects fairly, with 2 people per project. She enters all 6 names into the picker, enables &quot;Remove picked names,&quot; and sets the count to 2. She clicks Pick — the tool randomly selects 2 names for Project A and removes them from the pool. She clicks Pick again and gets 2 names for Project B. The final 2 remaining names go to Project C. The entire process took under 30 seconds and produced a verifiably random, fully unbiased result that no one on the team can dispute.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              This kind of sequential elimination is important not just for fairness but for perception of fairness. When team members see that the tool was used openly and that names were removed as they were picked, they understand that the assignment was genuinely random — not influenced by the manager&apos;s preferences. The tool acts as a neutral third party in decisions that might otherwise generate resentment.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Other uses: a teacher calls on students for class participation by picking names one at a time, ensuring every student is called before anyone is called twice; a podcast host randomly selects a listener question from submitted names; a prize draw organizer picks 3 winners from 200 submitted names, removing each winner before drawing the next to ensure no one wins twice; a sports league draws team matchups for a tournament bracket by picking pairs of team names sequentially.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Random Name Picking</h2>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">List preparation</strong> — The quality of the pick depends on the quality of the list. Each name should appear exactly once. The tool automatically trims whitespace and handles both line-separated and comma-separated formats, making it easy to paste directly from a spreadsheet or document.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">With vs without replacement</strong> — Picking with replacement (the default) allows the same name to appear multiple times across picks — appropriate for independent random selections. Picking without replacement (Remove picked names) ensures each name is selected at most once — appropriate for sequential assignments, prize draws, or working through a complete list.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Picking multiple names at once</strong> — Setting the count above 1 draws multiple names simultaneously from the same pool. This is useful for assigning groups, selecting multiple winners in a single step, or forming pairs from a list without picking the same person for both slots.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Transparency and open use</strong> — The impact of random name selection is greatest when performed openly. Showing the tool on a shared screen during a meeting or class eliminates any suspicion of bias and establishes trust in the outcome among all participants.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Persistent lists across sessions</strong> — Because your name list is saved in your browser, you can build and maintain lists over time — adding new names as people join, removing names as they leave — without starting from scratch each session.
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="7777777779" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
