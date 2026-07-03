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
