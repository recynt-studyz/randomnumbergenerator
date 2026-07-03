import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import TeamGeneratorWrapper from '@/components/TeamGeneratorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Random Team Generator — Split into Random Teams',
  description:
    'Split a list of names into random teams instantly. Free team generator with custom team count, balanced splitting and copy all teams.',
  alternates: { canonical: 'https://randomnumbergenerator.app/team-generator' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I split people into random teams?',
    a: 'Enter all participant names (one per line or comma-separated), set the number of teams you want (2–10), and click GENERATE TEAMS. The tool shuffles all names using the Fisher-Yates algorithm and distributes them evenly across teams.',
  },
  {
    q: 'Can I create teams of a specific size?',
    a: 'Yes. Switch from "Number of teams" to "Members per team" using the radio buttons, then set the team size you want. The generator will create as many teams as needed to accommodate all participants at that size.',
  },
  {
    q: 'Are the teams balanced in size?',
    a: 'Yes. The generator distributes names as evenly as possible. If the total number of people does not divide evenly, some teams will have one extra member. For example, 10 people in 3 teams gives teams of 4, 3, 3.',
  },
  {
    q: 'Can I give teams custom names?',
    a: 'Yes. Each team card has an editable name field that defaults to "Team 1", "Team 2", etc. Click on the team name to type a custom name for each team.',
  },
  {
    q: 'Can I regenerate teams without re-entering names?',
    a: 'Yes. Click the Regenerate button to create a new random split of the same names into teams. Your name list is saved between sessions, so you do not need to re-enter names on your next visit.',
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
  name: 'Random Team Generator',
  url: 'https://randomnumbergenerator.app/team-generator',
  description: 'Free random team generator with Fisher-Yates shuffling, custom team count, member size control, and custom team names.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate Random Teams',
  step: [
    { '@type': 'HowToStep', name: 'Enter participant names', text: 'Type or paste all participant names into the text area, one per line or comma-separated.' },
    { '@type': 'HowToStep', name: 'Set team count or size', text: 'Choose the number of teams (2–10) or switch to members-per-team mode and set how many people per team.' },
    { '@type': 'HowToStep', name: 'Generate and copy', text: 'Click GENERATE TEAMS to see the random team assignments. Copy individual teams or all teams at once. Click Regenerate for a different random arrangement.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function TeamGeneratorPage() {
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
              Random Team Generator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Split any group of people into random balanced teams instantly. Perfect for sports, classrooms, games, and work activities.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1313131313" />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <TeamGeneratorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1313131314" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the random team generator
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              Our team generator uses the Fisher-Yates shuffle algorithm — the gold standard for unbiased random shuffling — to ensure every possible team arrangement is equally likely. Enter your participants, choose your team count, and get instantly balanced teams. Use it for sports team selection, classroom group work, hackathon team formation, game night, trivia competitions, or any activity requiring fair random team assignment. Each team card is copyable, and you can customize team names to match your activity.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="1313131315" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
