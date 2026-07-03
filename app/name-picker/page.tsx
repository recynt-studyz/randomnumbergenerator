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
