'use client'

import { useState, useEffect, useCallback } from 'react'

const NATO = {
  A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo',
  F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliet',
  K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar',
  P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango',
  U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee',
  Z: 'Zulu',
}

const VOWELS = ['A', 'E', 'I', 'O', 'U']
const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

type CaseMode = 'upper' | 'lower' | 'mixed'
type Filter = 'all' | 'vowels' | 'consonants'

export default function RandomLetterTool() {
  const [caseMode, setCaseMode] = useState<CaseMode>('upper')
  const [count, setCount] = useState(1)
  const [excluded, setExcluded] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<Filter>('all')
  const [letters, setLetters] = useState<string[]>([])
  const [showPhonetic, setShowPhonetic] = useState(false)
  const [copied, setCopied] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const generate = useCallback(() => {
    let pool = ALL_LETTERS.filter(l => !excluded.has(l))
    if (filter === 'vowels') pool = pool.filter(l => VOWELS.includes(l))
    if (filter === 'consonants') pool = pool.filter(l => !VOWELS.includes(l))
    if (pool.length === 0) return

    const result: string[] = []
    for (let i = 0; i < count; i++) {
      let letter = pool[Math.floor(Math.random() * pool.length)]
      if (caseMode === 'lower') letter = letter.toLowerCase()
      if (caseMode === 'mixed') letter = Math.random() < 0.5 ? letter.toLowerCase() : letter
      result.push(letter)
    }
    setLetters(result)
    setAnimKey(k => k + 1)
  }, [caseMode, count, excluded, filter])

  useEffect(() => { generate() }, [generate])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') {
        e.preventDefault()
        generate()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [generate])

  function toggleExclude(letter: string) {
    setExcluded(prev => {
      const next = new Set(prev)
      if (next.has(letter)) next.delete(letter)
      else next.add(letter)
      return next
    })
  }

  function copyAll() {
    navigator.clipboard.writeText(letters.join(' ')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Case */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Case</label>
          <div className="flex gap-1.5">
            {([['upper', 'Uppercase'], ['lower', 'Lowercase'], ['mixed', 'Mixed']] as [CaseMode, string][]).map(([m, l]) => (
              <button
                key={m}
                onClick={() => setCaseMode(m)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  caseMode === m ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-violet-900/30'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Include</label>
          <div className="flex gap-1.5">
            {([['all', 'All'], ['vowels', 'Vowels'], ['consonants', 'Consonants']] as [Filter, string][]).map(([m, l]) => (
              <button
                key={m}
                onClick={() => setFilter(m)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  filter === m ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-violet-900/30'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">How many</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setCount(c => Math.max(1, c - 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">−</button>
            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{count}</span>
            <button onClick={() => setCount(c => Math.min(100, c + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">+</button>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        GENERATE
      </button>

      {/* Result */}
      {letters.length > 0 && (
        <div key={animKey} className="text-center mb-6 animate-scale-in">
          {letters.length === 1 ? (
            <div className="text-9xl font-black text-violet-600 dark:text-violet-400 leading-none py-4">
              {letters[0]}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 py-4">
              {letters.map((l, i) => (
                <span key={i} className="text-4xl font-black text-violet-600 dark:text-violet-400">{l}</span>
              ))}
            </div>
          )}
          <div className="flex gap-2 justify-center mt-2">
            <button onClick={copyAll} className="px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-200 transition">
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={() => setShowPhonetic(v => !v)}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {showPhonetic ? 'Hide' : 'Show'} phonetic
            </button>
          </div>

          {/* NATO phonetic */}
          {showPhonetic && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {letters.map((l, i) => {
                const upper = l.toUpperCase() as keyof typeof NATO
                return (
                  <div key={i} className="rounded-lg bg-violet-50 dark:bg-violet-900/20 px-3 py-2 text-center">
                    <div className="text-xl font-black text-violet-700 dark:text-violet-300">{l}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{NATO[upper]}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mb-6">
        Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs">Space</kbd> to generate
      </p>

      {/* Exclude letters */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Exclude letters ({excluded.size} excluded)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_LETTERS.map(l => (
            <button
              key={l}
              onClick={() => toggleExclude(l)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                excluded.has(l)
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 line-through'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-violet-900/30'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
