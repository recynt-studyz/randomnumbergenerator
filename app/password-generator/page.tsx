import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PasswordGeneratorWrapper from '@/components/PasswordGeneratorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Password Generator — Strong Random Password',
  description:
    'Generate strong random passwords instantly. Free password generator with length control, character sets, strength indicator and entropy calculation.',
  alternates: { canonical: 'https://randomnumbergenerator.app/password-generator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I create a strong password?',
    a: 'A strong password is long (at least 16 characters), uses a mix of uppercase letters, lowercase letters, numbers, and symbols, avoids common words or patterns, and is unique to each account. Our password generator creates strong passwords automatically — just set your desired length and character sets.',
  },
  {
    q: 'What makes a password secure?',
    a: 'Password security comes from two factors: length and character set size. A 16-character password using all character types has 95^16 possible combinations — an astronomically large number. Our entropy calculator shows you exactly how strong your password is in bits.',
  },
  {
    q: 'Is the password generator safe to use?',
    a: 'Yes. Our password generator uses crypto.getRandomValues() — the browser\'s cryptographically secure random number generator — not Math.random(). All generation happens entirely in your browser. The password is never sent to any server.',
  },
  {
    q: 'How many characters should a password be?',
    a: 'For most accounts, 16 characters is a good minimum. For highly sensitive accounts (banking, email), use 20+ characters. Our generator defaults to 16 characters, which provides over 60 bits of entropy — considered Very Strong.',
  },
  {
    q: 'What are password entropy bits?',
    a: 'Entropy bits measure password strength mathematically. It represents log2(charset_size^length) — the number of bits needed to represent all possible passwords of that length and character set. More bits means more possible combinations and a stronger password. Under 28 bits is Weak; 60+ bits is Very Strong.',
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
  name: 'Password Generator',
  url: 'https://randomnumbergenerator.app/password-generator',
  description: 'Free cryptographically secure password generator with length control, character set customization, and entropy calculation.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Strong Password',
  step: [
    { '@type': 'HowToStep', name: 'Set password length', text: 'Drag the length slider to your desired password length (4–128 characters). 16 characters or more is recommended for strong passwords.' },
    { '@type': 'HowToStep', name: 'Choose character sets', text: 'Select which character types to include: uppercase letters, lowercase letters, numbers, and symbols. More character types means a stronger password.' },
    { '@type': 'HowToStep', name: 'Copy your password', text: 'Click the copy button to copy the password to your clipboard. Click regenerate for a new password, or use the bulk generate buttons for multiple passwords at once.' },
  ],
}

const trustSignals = ['🔒 Cryptographically Secure', '⚡ Instant', '🔒 Private', '✓ Free']

export default function PasswordGeneratorPage() {
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
              Password Generator — Strong Random Passwords
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Generate strong, cryptographically secure random passwords instantly. Customize length and character sets. Never leaves your browser.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="6666666666" />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <PasswordGeneratorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="6666666667" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the password generator
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              Unlike most online password generators that use Math.random(), our generator uses the Web Cryptography API&apos;s crypto.getRandomValues() function — the same cryptographic-grade randomness used by security software. This means your passwords are truly unpredictable. All generation happens locally in your browser; no password is ever transmitted to our servers. Use it to generate strong passwords for email, banking, social media, and any account that needs protection.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Cryptographic Randomness Matters for Passwords</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Most random number generators — including JavaScript&apos;s Math.random() — are pseudo-random: fast and statistically uniform, but ultimately deterministic and theoretically predictable given knowledge of the algorithm and its seed. For passwords, that predictability is a critical vulnerability. This generator instead uses the Web Cryptography API&apos;s <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">crypto.getRandomValues()</code> function, which draws entropy from the operating system&apos;s hardware-level random number generator — the same source used by security software, VPNs, and TLS certificate generation. The output is genuinely unpredictable, even to someone with full access to the browser&apos;s source code.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Password strength is measured in entropy bits: the number of bits required to represent every possible password of a given length and character set, calculated as <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">log2(charset_size ^ length)</code>. A 12-character password using only lowercase letters has approximately 56 bits of entropy. Adding uppercase, numbers, and symbols expands the character set from 26 to 95, raising the same 12-character password to approximately 79 bits — over 4 million times stronger. Length and character variety together determine how long a brute-force attack would take; at 80+ bits of entropy, that time exceeds the age of the observable universe with current hardware.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              All generation runs locally in your browser with no server involvement. Generated passwords are displayed on screen and never transmitted over the network — the server hosting this site has no knowledge of any password you create here. There are no logs, no databases, and no server-side processing of any kind. Your password exists only on your screen, for only as long as you choose to keep it there.
            </p>
          </div>

          {/* Worked Example */}
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 px-6 py-5 mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Worked Example: Securing a Business Account</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A small business owner needs a new password for her accounting software. She opens the password generator, sets the length to 20 characters, and enables all four character sets: uppercase, lowercase, numbers, and symbols. The generator produces a password such as <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">Xr7$mN2@qLpK9#vZ8!cA</code> with approximately 130 bits of entropy. At that strength, a system attempting one billion guesses per second would take longer than the age of the observable universe to exhaust all possibilities through brute force.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              She clicks Copy and pastes the password directly into her password manager — she never types it into a document, email, or chat. Because the password was generated fresh for this account and is stored only in her password manager, it is unique to this service. If the accounting software ever suffers a data breach, no other account of hers is at risk. This combination — long, random, unique per service, stored in a password manager — is the gold standard of modern password hygiene.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The bulk generation option is useful when setting up multiple accounts at once. A system administrator configuring 12 new service accounts can generate 12 unique passwords simultaneously, copy the batch output, and distribute them through an encrypted channel. Each password is generated with a completely independent call to crypto.getRandomValues(), so there is no statistical relationship between them that could be exploited to compromise multiple accounts from a single sample.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Strong Password Generation</h2>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Length — the single most important factor</strong> — Each additional character multiplies the number of possible passwords by the size of the character set. Going from 12 to 16 characters raises entropy by roughly 26 bits — a factor of 67 million more possible combinations — making length the highest-impact variable in password security.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Character variety</strong> — Including all four character types (uppercase, lowercase, numbers, symbols) expands the character set from 26 to 95. A 16-character password using all four types has approximately 99 bits of entropy compared to 75 bits with lowercase only — a 16-billion-fold increase in strength.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Avoiding dictionary words and patterns</strong> — Attackers run dictionary attacks and pattern-matching rules before attempting brute force. A randomly generated password contains no words, no keyboard patterns, and no personal information, making these attacks completely ineffective regardless of how sophisticated the attack toolkit is.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Uniqueness per service</strong> — Reusing a password across multiple accounts means a breach at one service exposes all others. Random generation makes it trivial to create a unique, strong password for every account, since you never need to remember it — a password manager handles storage and recall.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Password manager storage</strong> — The only practical way to use long, random, unique passwords for every account is to store them in a reputable password manager. The manager encrypts and recalls all passwords so you only need to remember one strong master passphrase.
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="6666666668" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
