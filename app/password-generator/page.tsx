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
