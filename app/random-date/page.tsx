import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RandomDateWrapper from '@/components/RandomDateWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Random Date Generator — Generate a Random Date',
  description:
    'Generate random dates between any date range. Free random date generator with day of week, day of year and multiple date generation.',
  alternates: { canonical: 'https://randomnumbergenerator.app/random-date' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I generate a random date?',
    a: 'Set a start date and end date using the date pickers, then click GENERATE DATE. A random date within your specified range appears instantly, along with the day of the week, how many days from today, day of the year, and week number.',
  },
  {
    q: 'Can I generate random dates within a specific range?',
    a: 'Yes. Use the start and end date fields to define any range you like. You can also use the quick preset buttons: Random Birthday generates a date between 1920 and today, Historical Date picks a date between 1776 and 1999, Future Date picks from today up to 50 years ahead, and Day This Year picks a random day in the current year.',
  },
  {
    q: 'What is the earliest date I can generate?',
    a: 'You can set any start date supported by the browser date input. Practically this goes back thousands of years, though date formatting works best for dates after 1000 CE. The JavaScript Date object handles dates reliably within a reasonable historical range.',
  },
  {
    q: 'Can I generate multiple random dates at once?',
    a: 'Yes. Use the "How many dates" control to generate 1–100 random dates at once. Multiple dates are shown as a sortable list with day of week and week number. You can copy all dates to clipboard or download them as a .txt file.',
  },
  {
    q: 'What day of the week will my random date be?',
    a: 'The day of the week is displayed for every generated date. If you need a date on a specific day of the week, you can generate multiple dates and look for the one with the desired day.',
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
  name: 'Random Date Generator',
  url: 'https://randomnumbergenerator.app/random-date',
  description: 'Free random date generator with date range control, day of week, day of year, week number, and multiple date generation.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Random Date',
  step: [
    { '@type': 'HowToStep', name: 'Set your date range', text: 'Use the start and end date pickers to define the range for your random date. Or use a quick preset like Random Birthday or Historical Date.' },
    { '@type': 'HowToStep', name: 'Click GENERATE DATE', text: 'Click the button to generate your random date instantly. The result shows the full date, day of week, days from today, day of year, and week number.' },
    { '@type': 'HowToStep', name: 'Generate multiple dates', text: 'Increase the count to generate up to 100 random dates at once. Copy all to clipboard or download as a text file.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function RandomDatePage() {
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
              Random Date Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Generate a random date between any two dates instantly. See the day of week, days from today, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1010101010" />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RandomDateWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1010101011" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the random date generator
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              The random date generator creates dates using a simple formula: start + Math.random() * (end - start). This ensures every date within your range has an equal probability of being selected. Use it to generate random birthdays, pick historical dates for trivia, create test data for software development, generate fictional timelines, or select random dates for any creative or analytical purpose.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1010101012" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
