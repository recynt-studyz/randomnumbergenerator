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

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Are Random Letters Selected?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The generator builds a character pool based on your settings — the full alphabet (A–Z), vowels only (A, E, I, O, U), or consonants only — then applies <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">Math.floor(Math.random() * pool.length)</code> to select a random index. Because every index in the pool is equally likely, every letter in your selected subset has an identical probability of being chosen. For the full 26-letter alphabet, each letter has a 1-in-26 chance (approximately 3.85%) on every draw.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              This equal-probability distribution is intentional but worth understanding: it differs significantly from the actual frequency of letters in natural English text. In written English, &quot;E&quot; appears roughly 13% of the time while &quot;Z&quot; appears less than 0.1% of the time — a 130-fold difference. For most word game and creative uses, equal probability is the right choice. However, if you want a distribution that mirrors natural English — for Scrabble practice or language learning exercises — keep this difference in mind when interpreting results.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The exclusion feature lets you remove specific letters from the pool entirely. When you exclude the letter &quot;Q&quot;, for example, the generator rebuilds the pool without it, and the remaining 25 letters each get an equal 1-in-25 chance. Exclusions persist across multiple generations in the same session, making it easy to simulate game scenarios where certain letters have already been used or are unavailable.
            </p>
          </div>

          {/* Worked Example */}
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 px-6 py-5 mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Worked Example: Scrabble Practice Sessions</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A competitive Scrabble player wants to practice forming words under realistic conditions. In Scrabble, each player draws 7 tiles from a bag containing 100 tiles distributed according to the game&apos;s specific frequency weighting (12 Es, 9 As, 1 Z, 1 Q, etc.). She uses the random letter generator set to &quot;How many: 7&quot; to quickly simulate a tile draw, giving her 7 letters to practice word formation. She generates a new hand each time, practicing her anagram skills across dozens of simulated draws in a single session.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              She also uses the exclusion feature to practice handling difficult letter combinations. By excluding all vowels except &quot;I&quot; and generating 7-letter hands, she forces herself to practice forming words with minimal vowels — one of the most common challenging situations in competitive play. The exclusion feature makes the generator a flexible training tool that can target specific weaknesses rather than providing only generic random practice.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Other uses: a classroom teacher generates random letters for alphabet learning activities with young children, producing one letter at a time in large-format display mode; a creative writing teacher uses random letters as the starting point for free-association writing prompts; a word game host generates the round&apos;s target letter for games like &quot;categories&quot; where players must name items in a category starting with that letter; a developer tests string-processing code with random letter inputs; a child plays a guessing game using the NATO phonetic alphabet to identify the letter from its code word (Alpha, Bravo, Charlie...).
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Random Letter Generation</h2>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Alphabet subset selection</strong> — Choosing between the full alphabet, vowels only, or consonants only significantly changes the character of the results. Vowels-only mode is useful for phonics exercises; consonants-only mode generates the kind of challenging letter combinations common in advanced word games.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Letter exclusions</strong> — Removing specific letters from the pool simulates real-world constraints: tiles already placed in a Scrabble game, letters already guessed in a word-guessing game, or specific letters you want to practice avoiding. Exclusions apply immediately and persist for the session.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Multiple letter generation</strong> — Generating up to 100 letters simultaneously is useful for batch operations: creating random letter grids, simulating tile draws, generating random acronyms, or populating educational worksheets with random letter exercises.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Case control</strong> — Uppercase output is clearest for classroom and game settings where letters need to be immediately legible. Lowercase is standard for linguistic exercises. Mixed case is useful when generating random letter sequences that need to look like natural text strings.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">NATO phonetic alphabet</strong> — Displaying the NATO phonetic word for each generated letter (Alpha, Bravo, Charlie...) transforms the tool into a communication training aid. It is useful for aviation, military, emergency services, and anyone who needs to spell names or codes clearly over voice channels where letter confusion could cause errors.
              </li>
            </ul>
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
