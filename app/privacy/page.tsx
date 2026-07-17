import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — randomnumbergenerator.app',
  description: 'Privacy policy for randomnumbergenerator.app. We do not collect personal data. All randomization runs in your browser.',
  alternates: { canonical: 'https://randomnumbergenerator.app/privacy' },
  robots: { index: true, follow: true },
}

const faqs = [
  { q: 'What data does randomnumbergenerator.app collect?', a: 'We do not collect any data you enter into our tools. Numbers, names, passwords, color values, and all other inputs are processed entirely in your browser and are never sent to any server.' },
  { q: 'How is my data stored?', a: 'Certain preferences are saved in your browser\'s localStorage (dark mode, password settings, dice type, name lists). This data stays on your device and is never accessible to us or any third party.' },
  { q: 'Does the site use cookies?', a: 'We do not set any first-party tracking cookies. Google AdSense, which provides advertising, may set cookies. You can opt out of personalized advertising through Google\'s Ad Settings.' },
  { q: 'Is my password generation private?', a: 'Yes. The password generator uses the browser\'s built-in crypto.getRandomValues() API and runs completely in your browser. Generated passwords are never sent over the network or stored anywhere by us.' },
  { q: 'How can I clear my saved data?', a: 'You can clear all saved preferences by clearing your browser\'s localStorage for this site. In most browsers, go to DevTools → Application → Local Storage → randomnumbergenerator.app → Clear All.' },
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
  description: 'Free random tools suite — random number generator, coin flip, dice roller, password generator and more. All tools run in your browser.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use randomnumbergenerator.app Privately',
  step: [
    { '@type': 'HowToStep', name: 'Use tools without signing up', text: 'All tools on randomnumbergenerator.app are available instantly with no account required. Simply open the site and start using any tool.' },
    { '@type': 'HowToStep', name: 'Your inputs stay local', text: 'All calculations happen in your browser. No data you enter is transmitted to our servers — your numbers, names, passwords, and other inputs are completely private.' },
    { '@type': 'HowToStep', name: 'Clear saved preferences', text: 'To remove any locally saved preferences (theme, settings, name lists), clear localStorage for this site in your browser\'s developer tools.' },
  ],
}

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: July 3, 2026</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Overview</h2>
              <p className="text-sm leading-relaxed">
                randomnumbergenerator.app is committed to your privacy. All tools on this site run entirely in your browser using JavaScript. We do not collect, transmit, or store any data you enter into our tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Information we do not collect</h2>
              <ul className="text-sm leading-relaxed space-y-1 list-disc list-inside">
                <li>Numbers, names, or any inputs you enter into our tools</li>
                <li>Generated passwords or other results</li>
                <li>Your questions or decisions made using our Yes/No tool</li>
                <li>Team or name lists you enter</li>
                <li>Any personally identifiable information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Local storage</h2>
              <p className="text-sm leading-relaxed">
                To improve your experience, we save certain preferences locally in your browser (localStorage). This includes your dark mode preference, password generator settings, dice type preference, and name lists. This data never leaves your device and is not accessible to us or any third party. You can clear this data at any time by clearing your browser storage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Cookies and advertising</h2>
              <p className="text-sm leading-relaxed">
                We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google&apos;s Ad Settings. We do not use any analytics services that collect personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Third-party advertising</h2>
              <p className="text-sm leading-relaxed">
                This site displays advertisements served by Google AdSense (publisher ID: ca-pub-5035661017594256). Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visits to our site and other sites on the Internet. For more information about how Google uses data, visit Google&apos;s Privacy &amp; Terms page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Google Analytics</h2>
              <p className="text-sm leading-relaxed mb-3">
                This site uses Google Analytics 4 (GA4) to collect anonymous usage statistics — specifically, which pages are visited, how long visitors spend on each page, and general geographic region (country level). GA4 does not collect any of your tool inputs: the numbers you generate, names you enter, passwords you create, or any other data you provide to the tools on this site.
              </p>
              <p className="text-sm leading-relaxed">
                GA4 data is anonymized and aggregated. We use it solely to understand which tools are most useful, identify pages that may have technical problems, and guide decisions about which new tools to build. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-violet-600 dark:text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Password security</h2>
              <p className="text-sm leading-relaxed mb-3">
                Our password generator uses the Web Cryptography API&apos;s crypto.getRandomValues() function — not Math.random() — and runs entirely in your browser. This function draws entropy from the operating system&apos;s hardware random number generator, producing output that is cryptographically unpredictable. It is the same randomness source used by security software, TLS certificate generation, and operating system key generation.
              </p>
              <p className="text-sm leading-relaxed">
                Generated passwords are displayed on screen only. They are never transmitted over the network, never stored in our systems, and never logged anywhere. The only copy of your generated password is on your screen. We strongly recommend saving generated passwords in a reputable password manager (such as Bitwarden, 1Password, or your browser&apos;s built-in password manager) immediately after generation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">GDPR and CCPA</h2>
              <p className="text-sm leading-relaxed mb-3">
                For users in the European Economic Area (EEA), the United Kingdom, and California, the following applies: We do not sell your personal data. We do not collect personal data through our tools — all randomization runs locally in your browser and no tool inputs are transmitted to us. The only personal data that may be processed is standard web server access logs (IP address, browser type, referrer) retained by our hosting provider for a limited period for security purposes, and analytics data collected by Google Analytics as described above.
              </p>
              <p className="text-sm leading-relaxed">
                Under GDPR, our lawful basis for processing analytics data is legitimate interest (understanding how our free tools are used to improve them). Under CCPA, California residents have the right to know what data is collected and to opt out of sale of personal information — we do not sell personal information. If you have questions about your data rights under applicable law, contact us using the link in the footer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Contact</h2>
              <p className="text-sm leading-relaxed">
                If you have questions about this privacy policy or your data rights, use the Contact link in the footer to reach us. We aim to respond to all privacy-related inquiries within 5 business days.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
