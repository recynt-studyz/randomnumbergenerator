import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — randomnumbergenerator.app',
  description: 'About randomnumbergenerator.app. Free random number generator, coin flip, dice roller, password generator, name picker and more.',
  alternates: { canonical: 'https://randomnumbergenerator.app/about' },
}

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat min-h-[200px]" style={{ backgroundImage: "url('/herobgrng.webp')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <ToolHeader />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <main className="bg-white dark:bg-[#0f172a] flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About randomnumbergenerator.app</h1>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">What we do</h2>
              <p className="text-sm leading-relaxed">
                randomnumbergenerator.app is a free suite of random tools for everyday use. We built it because random number generators, coin flips, dice rollers, and other randomization tools should be fast, free, and work without any signup or account. Every tool on this site is available instantly the moment you arrive.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Our tools</h2>
              <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li><strong>Random Number Generator</strong> — Generate random numbers in any range with advanced options</li>
                <li><strong>Coin Flip</strong> — Virtual coin flip with statistics and streak tracking</li>
                <li><strong>Dice Roller</strong> — Roll d4, d6, d8, d10, d12, d20, and d100 dice</li>
                <li><strong>Password Generator</strong> — Cryptographically secure password generation</li>
                <li><strong>Name Picker</strong> — Pick random names from any list</li>
                <li><strong>Random Color</strong> — Generate random colors with HEX, RGB, and HSL values</li>
                <li><strong>Spin Wheel</strong> — Animated spin wheel with custom options</li>
                <li><strong>Random Date</strong> — Generate random dates between any range</li>
                <li><strong>Random Letter</strong> — Generate random letters with NATO phonetic support</li>
                <li><strong>Yes or No</strong> — Random yes/no generator with bias control</li>
                <li><strong>Team Generator</strong> — Split groups into random balanced teams</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How it works</h2>
              <p className="text-sm leading-relaxed">
                All randomization on this site uses JavaScript&apos;s Math.random() function, which provides pseudo-random numbers suitable for games, decisions, and everyday use. The password generator is the exception — it uses the cryptographically secure crypto.getRandomValues() API. All calculations happen entirely in your browser with zero server calls.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Privacy</h2>
              <p className="text-sm leading-relaxed">
                We take privacy seriously. None of your inputs are ever sent to a server. Everything runs locally in your browser. We use Google AdSense for advertising. See our <a href="/privacy" className="text-violet-600 dark:text-violet-400 hover:underline">Privacy Policy</a> for full details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Contact</h2>
              <p className="text-sm leading-relaxed">
                Have a suggestion for a new tool or found a bug? Use the Contact link in the footer to reach us.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
