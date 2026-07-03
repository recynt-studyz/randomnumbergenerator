import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RandomLetterWrapper from '@/components/RandomLetterWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Random Letter Generator — Generate Random Letters',
  description:
    'Generate random letters from A to Z instantly. Free random letter generator with uppercase, lowercase, NATO phonetic alphabet and multiple letter support.',
  alternates: { canonical: 'https://randomnumbergenerator.app/random-letter' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I generate a random letter?',
    a: 'Click GENERATE or press Space to generate a random letter from A to Z. The letter appears in large text immediately. You can choose uppercase, lowercase, or mixed case, and generate multiple letters at once.',
  },
  {
    q: 'Can I exclude certain letters?',
    a: 'Yes. Scroll down to the "Exclude letters" section and click any letters you want to exclude. They will be highlighted in red and crossed out, and the generator will never produce those letters. This is useful for games like Scrabble where certain tiles have already been used.',
  },
  {
    q: 'What is the NATO phonetic alphabet?',
    a: 'The NATO phonetic alphabet assigns a word to each letter to avoid confusion when spelling over radio or phone. A=Alpha, B=Bravo, C=Charlie, D=Delta, E=Echo, and so on through Z=Zulu. Click "Show phonetic" after generating to see the NATO word for each letter.',
  },
  {
    q: 'Can I generate only vowels or consonants?',
    a: 'Yes. Use the "Include" selector to choose between All letters, Vowels only (A, E, I, O, U), or Consonants only (all other letters). This is useful for word games and language learning exercises.',
  },
  {
    q: 'Can I generate multiple random letters at once?',
    a: 'Yes. Use the "How many" control to generate 1–100 random letters at once. Multiple letters are displayed in a large format and can be copied to clipboard with the Copy button.',
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
  name: 'Random Letter Generator',
  url: 'https://randomnumbergenerator.app/random-letter',
  description: 'Free random letter generator with uppercase, lowercase, vowel/consonant filter, NATO phonetic alphabet, and multiple letters.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Random Letter',
  step: [
    { '@type': 'HowToStep', name: 'Choose your settings', text: 'Select case (uppercase, lowercase, or mixed), choose whether to include all letters, vowels only, or consonants only, and set how many letters to generate.' },
    { '@type': 'HowToStep', name: 'Generate', text: 'Click GENERATE or press Space. Your random letter(s) appear in large text immediately.' },
    { '@type': 'HowToStep', name: 'Use the NATO phonetic', text: 'Click "Show phonetic" to display the NATO phonetic alphabet word for each generated letter. Useful for spelling over the phone or radio.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function RandomLetterPage() {
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
              Random Letter Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Generate random letters from A to Z instantly. Choose uppercase, lowercase, vowels, consonants, or exclude specific letters.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111112" />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RandomLetterWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1111111113" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the random letter generator
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              The random letter generator picks a random letter from your selected pool using Math.floor(Math.random() * pool.length). Use it for word games like Scrabble, Boggle, or word association games; for educational activities teaching the alphabet; for creative writing prompts; for generating random initials; or for any game or activity that needs a random letter. The NATO phonetic reference helps when you need to communicate letters clearly over voice or in writing.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1111111114" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
