'use client'

import { useState, useEffect, useCallback } from 'react'

export default function YesOrNoTool() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<'YES' | 'NO' | null>(null)
  const [bias, setBias] = useState(50)
  const [yesCount, setYesCount] = useState(0)
  const [noCount, setNoCount] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [copied, setCopied] = useState(false)

  const ask = useCallback(() => {
    const answer: 'YES' | 'NO' = Math.random() * 100 < bias ? 'YES' : 'NO'
    setResult(answer)
    setAnimKey(k => k + 1)
    if (answer === 'YES') setYesCount(c => c + 1)
    else setNoCount(c => c + 1)
  }, [bias])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') {
        e.preventDefault()
        ask()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [ask])

  const total = yesCount + noCount

  function share() {
    const text = question
      ? `I asked "${question}" and got ${result}`
      : `I used the Yes/No generator and got ${result}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Question input */}
      <div className="mb-6">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Type your question here... (optional)"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Bias slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Bias</label>
          <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{bias}% chance of Yes</span>
        </div>
        <input
          type="range" min={10} max={90} value={bias}
          onChange={e => setBias(Number(e.target.value))}
          className="w-full accent-violet-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>More No</span>
          <span>50/50</span>
          <span>More Yes</span>
        </div>
      </div>

      {/* Ask button */}
      <button
        onClick={ask}
        className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        ASK
      </button>

      {/* Result */}
      {result && (
        <div key={animKey} className="text-center mb-6 animate-scale-in">
          <div
            className={`text-8xl sm:text-9xl font-black leading-none py-6 ${
              result === 'YES'
                ? 'text-emerald-500'
                : 'text-red-500'
            }`}
          >
            {result}
          </div>
          <div className="flex gap-2 justify-center mt-2">
            <button onClick={ask} className="px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-200 transition">
              Ask Again
            </button>
            {result && (
              <button onClick={share} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {copied ? 'Copied!' : 'Copy result'}
              </button>
            )}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mb-6">
        Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs">Space</kbd> to ask
      </p>

      {/* Statistics */}
      {total > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Total asks</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{total}</div>
          </div>
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Yes</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{yesCount}</div>
            <div className="text-xs text-emerald-500">{total > 0 ? ((yesCount / total) * 100).toFixed(1) : 0}%</div>
          </div>
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">No</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{noCount}</div>
            <div className="text-xs text-red-500">{total > 0 ? ((noCount / total) * 100).toFixed(1) : 0}%</div>
          </div>
        </div>
      )}
    </div>
  )
}
