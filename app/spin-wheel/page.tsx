import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SpinWheelWrapper from '@/components/SpinWheelWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Spin the Wheel — Random Wheel Spinner Online',
  description:
    'Spin a random wheel with your custom options. Free online wheel spinner for decisions, giveaways and random selection. Add your own items and spin.',
  alternates: { canonical: 'https://randomnumbergenerator.app/spin-wheel' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How do I use the spin wheel?',
    a: 'Enter your options in the text area (one per line), then click SPIN. The colorful wheel spins and gradually slows to a stop, revealing the winning option. The result is shown prominently below the wheel.',
  },
  {
    q: 'Can I add custom options to the wheel?',
    a: 'Yes. Enter any text you like in the options area — names, choices, tasks, prizes, or anything else. The wheel supports up to 20 options. Each segment is automatically assigned a distinct color.',
  },
  {
    q: 'Is the spin wheel result truly random?',
    a: 'Yes. The winner is determined before the animation starts using Math.random(). The visual spin is for entertainment — the outcome is already randomly selected when you click SPIN, and the wheel animates to land on that result.',
  },
  {
    q: 'Can I remove options after they are picked?',
    a: 'Yes. Enable "Remove winner after spin" and each winning option is automatically removed from the wheel after the spin completes. This is great for giveaways where each prize should only be won once, or for working through a list one item at a time.',
  },
  {
    q: 'What can I use a spin wheel for?',
    a: 'Spin wheels are great for decision-making when you have multiple options, classroom activities (selecting students or activities), giveaway drawings, game show scenarios, random task assignment, choosing what to eat, or any situation requiring a fair random selection from a list.',
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
  name: 'Spin the Wheel',
  url: 'https://randomnumbergenerator.app/spin-wheel',
  description: 'Free online spin wheel with custom options, animated spinning, and remove-winner mode.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Spin Wheel',
  step: [
    { '@type': 'HowToStep', name: 'Enter your options', text: 'Type your options into the text area, one per line. The wheel updates in real time to show all your options as colored segments.' },
    { '@type': 'HowToStep', name: 'Click SPIN', text: 'Press the SPIN button to start the wheel. It spins rapidly, then decelerates smoothly and stops on a random winner.' },
    { '@type': 'HowToStep', name: 'View the winner', text: 'The winning option is displayed prominently below the wheel. Enable "Remove winner after spin" to eliminate options one by one.' },
  ],
}

const trustSignals = ['🎲 Truly Random', '⚡ Instant', '🔒 Private', '✓ Free']

export default function SpinWheelPage() {
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
              Spin the Wheel — Random Wheel Spinner
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Add your custom options and spin. Animated wheel with smooth deceleration. Perfect for decisions, giveaways, and random selection.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="9999999999" />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <SpinWheelWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="9999999998" />
          </div>

          <div className="rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-violet-900 dark:text-violet-300 mb-2">
              About the spin wheel
            </h2>
            <p className="text-sm text-violet-800 dark:text-violet-400 leading-relaxed">
              Our online spin wheel lets you create a custom decision wheel with your own options. The animated canvas wheel uses smooth cubic-bezier deceleration for a satisfying spin experience. The winner is determined by a fair random selection before the animation begins, ensuring the result is always unbiased. You can enable sound effects for a more engaging experience, and use the remove-winner mode for sequential elimination in giveaways or assignments.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Does the Spin Wheel Work?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The winner is determined before the visual animation begins. When you click SPIN, the tool immediately calls <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded text-violet-700 dark:text-violet-400">Math.floor(Math.random() * segments.length)</code> to select a random winning segment index. The animation is then calculated to decelerate and stop precisely on that pre-determined segment. This means the outcome is always genuinely random — the animation is purely visual feedback, not a factor in the result. You cannot influence the outcome by clicking faster or slower, and the spin duration is irrelevant to which segment wins.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The wheel is rendered on an HTML Canvas element, with each segment drawn as a proportional arc using the Canvas 2D API. All segments are equal in size — each occupies exactly 360/n degrees, where n is the number of options — giving every segment an identical probability of winning. The deceleration animation uses a cubic-bezier easing function that mimics the natural physics of a spinning wheel slowing down, making the experience feel satisfying and authentic even though the result was already fixed from the moment you pressed SPIN.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The optional tick sound effect (when available) uses the Web Audio API to generate a click sound each time the wheel pointer crosses a segment boundary during the spin. The number of ticks increases as the wheel accelerates and decreases as it decelerates, giving an audio cue that reinforces the visual sense of momentum and the dramatic slowdown toward the final result.
            </p>
          </div>

          {/* Worked Example */}
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 px-6 py-5 mb-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Worked Example: Staff Recognition Draw</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A restaurant manager runs a weekly draw to select which staff member earns a bonus hour off. All 8 staff members are added to the wheel — one name per segment. Every Friday after the shift, the manager opens the wheel on the POS screen where all staff can see it and presses SPIN. The wheel animates and decelerates onto a name. The result is completely uninfluenceable: even the manager pressing the button cannot predict which name will win.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Because all staff watch the spin together on the same screen, there is no question of the result being manipulated after the fact. The wheel is transparent in a way that a private draw or a random number generator used out of sight could never be. The visual theatre of the spin — the rapid rotation, the gradual slowdown, the pointer landing on a name — also makes the draw a small weekly event that the team looks forward to.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Other uses: a classroom teacher spins to pick which student presents next, with the remove-winner option ensuring every student presents before anyone goes twice; a podcast records a live giveaway draw using the wheel on screen share; a group of friends spins a wheel of restaurant names to settle a dinner debate; a developer uses the wheel during a retrospective to randomly select which team member speaks first; a game show host uses it to assign contestants to teams. The spin wheel&apos;s combination of genuine randomness and visual spectacle makes it uniquely suitable for situations where the audience is as important as the outcome.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Spin Wheel Selection</h2>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Pre-determined outcome</strong> — The winning segment is selected randomly before the animation starts, not after it stops. This means the result is genuinely random and cannot be influenced by any aspect of the visual spin — not speed, not timing, not the number of rotations.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Equal segment probability</strong> — Every segment on the wheel is the same size regardless of label length, meaning every option has an exactly equal probability of winning. Adding more options to the wheel reduces each individual option&apos;s probability proportionally and uniformly.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Remove-winner mode</strong> — When enabled, the winning segment is permanently removed from the wheel after each spin. This converts the wheel into a sequential random selector — ideal for giveaways with multiple prizes, assigning tasks from a list, or working through a group one member at a time.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Number of segments</strong> — The wheel supports up to 20 segments. With more segments, each label occupies a smaller arc and the text is automatically scaled. For best readability, shorter labels work better with more segments; longer labels are clearest on wheels with fewer options.
              </li>
              <li className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Visual transparency for group settings</strong> — Unlike a number generator used privately, a spin wheel displayed on a shared screen makes the random selection process visible to everyone simultaneously. This shared experience is what distinguishes the spin wheel as a tool for social and group decision-making.
              </li>
            </ul>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="9999999997" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
