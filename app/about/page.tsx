import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — randomnumbergenerator.app',
  description: 'About randomnumbergenerator.app. Free random number generator, coin flip, dice roller, password generator, name picker and more.',
  alternates: { canonical: 'https://randomnumbergenerator.app/about' },
  robots: { index: true, follow: true },
}

const faqs = [
  { q: 'What is randomnumbergenerator.app?', a: 'randomnumbergenerator.app is a free suite of random tools including a random number generator, coin flip, dice roller, password generator, name picker, random color generator, spin wheel, random date generator, random letter generator, yes/no generator, and team generator.' },
  { q: 'Are all the tools free to use?', a: 'Yes. Every tool on randomnumbergenerator.app is completely free with no signup, no account, and no usage limits.' },
  { q: 'How does the randomization work?', a: 'All tools use JavaScript\'s Math.random() function for randomization. The password generator uses the cryptographically secure crypto.getRandomValues() API. All calculations run entirely in your browser — nothing is sent to a server.' },
  { q: 'Is my data private?', a: 'Yes. All randomization happens locally in your browser. We do not collect, transmit, or store any data you enter into our tools. Your inputs never leave your device.' },
  { q: 'What browsers are supported?', a: 'randomnumbergenerator.app works in all modern browsers including Chrome, Firefox, Safari, and Edge on both desktop and mobile devices. No plugins or downloads are required.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'randomnumbergenerator.app',
  url: 'https://randomnumbergenerator.app',
  description: 'Free suite of random tools: random number generator, coin flip, dice roller, password generator, name picker, and more.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use randomnumbergenerator.app',
  step: [
    { '@type': 'HowToStep', name: 'Choose a tool', text: 'Use the navigation bar at the top to select any of the 11 free random tools: number, coin flip, dice, password, name picker, color, spin wheel, date, letter, yes/no, or teams.' },
    { '@type': 'HowToStep', name: 'Generate instantly', text: 'Each tool is ready to use immediately — no signup required. Results appear instantly in your browser.' },
    { '@type': 'HowToStep', name: 'Customize your results', text: 'Every tool has options for customization. Generate multiple results, set ranges, adjust settings, and copy or download your output.' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />
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
              <p className="text-sm leading-relaxed mb-3">
                randomnumbergenerator.app is a free suite of random tools for everyday use. We built it because random number generators, coin flips, dice rollers, and other randomization tools should be fast, free, and work without any signup or account. Every tool on this site is available instantly the moment you arrive — no loading screens, no registration walls, no paywalls.
              </p>
              <p className="text-sm leading-relaxed">
                The internet is full of randomization tools that are slow to load, cluttered with dark patterns, or require email addresses to use basic features. We built this site as the straightforward alternative: open the page, use the tool, get your result. That&apos;s the entire user journey. Eleven different tools, all free, all instant, all private.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Who uses random number tools</h2>
              <p className="text-sm leading-relaxed mb-3">
                Random number tools are used across a much wider range of contexts than most people initially expect. Teachers use random number generators and name pickers to call on students fairly and assign classroom activities without bias. Game masters running tabletop RPGs like Dungeons &amp; Dragons rely on dice rollers to keep their online sessions running smoothly. Developers use random number generators to populate test databases, seed simulations, and prototype probabilistic features.
              </p>
              <p className="text-sm leading-relaxed mb-3">
                Researchers use random selection tools for sampling: picking which survey respondents to follow up with, assigning participants to control and treatment groups in studies, and selecting audit targets from large datasets. Event organizers run prize draws, giveaway selections, and raffle picks. Sports coaches generate random team compositions to avoid the social dynamics of player-led picks. Designers use the random color generator for creative exploration and palette discovery.
              </p>
              <p className="text-sm leading-relaxed">
                Everyday decision-makers — people stuck between two equally appealing options — use coin flips, yes/no generators, and spin wheels to break deadlocks quickly and move forward. The common thread across all these uses is the same: a need for a result that is fair, unbiased, immediately available, and impossible to attribute to any individual&apos;s preference or influence.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Our tools</h2>
              <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li><strong>Random Number Generator</strong> — Generate random numbers in any range, with unique mode, decimal support, and bulk generation up to 1,000 numbers</li>
                <li><strong>Coin Flip</strong> — Virtual coin flip with animated result, flip statistics, streak counter, and full flip history</li>
                <li><strong>Dice Roller</strong> — Roll d4, d6, d8, d10, d12, d20, and d100 dice, with D&amp;D quick roll presets and roll history</li>
                <li><strong>Password Generator</strong> — Cryptographically secure password generation using crypto.getRandomValues(), with entropy calculation and bulk generation</li>
                <li><strong>Name Picker</strong> — Pick random names from any list, with sequential elimination mode and multiple picks per draw</li>
                <li><strong>Random Color</strong> — Generate random colors with HEX, RGB, and HSL values, HSL channel locking, and 5-color palette generation</li>
                <li><strong>Spin Wheel</strong> — Animated canvas spin wheel with up to 20 custom options, sound effects, and remove-winner mode</li>
                <li><strong>Random Date</strong> — Generate random dates between any range with day-of-week, day-of-year, and week number metadata</li>
                <li><strong>Random Letter</strong> — Generate random letters with vowel/consonant filtering, letter exclusions, and NATO phonetic alphabet display</li>
                <li><strong>Yes or No</strong> — Random yes/no generator with adjustable probability bias from 10% to 90%</li>
                <li><strong>Team Generator</strong> — Split any group into random balanced teams using the Fisher-Yates shuffle algorithm</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">How it works — the technical approach</h2>
              <p className="text-sm leading-relaxed mb-3">
                All randomization on this site uses JavaScript&apos;s Math.random() function, which implements a pseudo-random number generator algorithm (typically xorshift128+ in modern browsers). The algorithm is seeded by the browser using hardware-level entropy sources, making the output statistically indistinguishable from true randomness for all practical purposes.
              </p>
              <p className="text-sm leading-relaxed mb-3">
                The password generator is the one exception to this approach. Because passwords are a security-critical application where predictability is a real attack vector, the password generator uses the Web Cryptography API&apos;s crypto.getRandomValues() function instead. This draws entropy directly from the operating system&apos;s hardware random number generator — the same source used by security software, VPNs, and TLS certificate generation. The result is genuinely unpredictable in a way that Math.random() cannot guarantee.
              </p>
              <p className="text-sm leading-relaxed">
                All calculations happen entirely in your browser with zero server calls. Your numbers, names, passwords, color values, and every other input you provide are processed locally in your JavaScript environment and never transmitted to any server. The site has no backend processing capability for your data — there is nothing to transmit it to.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Privacy-first design</h2>
              <p className="text-sm leading-relaxed mb-3">
                We take privacy seriously as a design principle rather than an afterthought. The decision to run all randomization in the browser was made deliberately: it means we are architecturally incapable of seeing your inputs, even if we wanted to. There is no server-side logging of what numbers you generate, what names you enter, what passwords you create, or what questions you ask the yes/no generator.
              </p>
              <p className="text-sm leading-relaxed">
                Certain preferences — your dark mode setting, your last dice type, your saved name lists, your password generator settings — are stored in browser localStorage to improve the experience across sessions. This data stays on your device and is not accessible to us or any third party. We use Google AdSense for advertising, which may involve cookies. See our <a href="/privacy" className="text-violet-600 dark:text-violet-400 hover:underline">Privacy Policy</a> for full details on data handling and your options.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Contact</h2>
              <p className="text-sm leading-relaxed">
                Have a suggestion for a new tool, found a bug, or want to report an issue? Use the Contact link in the footer to reach us. We read every message and use feedback to prioritise which tools to build and improve next.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
