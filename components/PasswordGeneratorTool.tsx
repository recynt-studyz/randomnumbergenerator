'use client'

import { useState, useEffect, useCallback } from 'react'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'
const AMBIGUOUS = /[0Ol1]/g

function generatePassword(
  length: number,
  upper: boolean,
  lower: boolean,
  numbers: boolean,
  symbols: boolean,
  excludeAmbiguous: boolean,
  customSymbols: string
): string {
  let charset = ''
  if (upper) charset += UPPER
  if (lower) charset += LOWER
  if (numbers) charset += DIGITS
  if (symbols) charset += (customSymbols || SYMBOLS)
  if (excludeAmbiguous) charset = charset.replace(AMBIGUOUS, '')
  if (!charset) return ''

  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array).map(n => charset[n % charset.length]).join('')
}

function calcEntropy(charsetSize: number, length: number): number {
  if (charsetSize <= 0) return 0
  return Math.log2(Math.pow(charsetSize, length))
}

function getCharsetSize(
  upper: boolean, lower: boolean, numbers: boolean, symbols: boolean,
  excludeAmbiguous: boolean, customSymbols: string
): number {
  let size = 0
  if (upper) size += UPPER.length
  if (lower) size += LOWER.length
  if (numbers) size += DIGITS.length
  if (symbols) size += (customSymbols || SYMBOLS).length
  if (excludeAmbiguous) size = Math.max(0, size - 4)
  return size
}

function getStrength(bits: number): { label: string; color: string; bg: string; width: string } {
  if (bits < 28) return { label: 'Weak', color: 'text-red-600', bg: 'bg-red-500', width: 'w-1/4' }
  if (bits < 36) return { label: 'Fair', color: 'text-amber-600', bg: 'bg-amber-500', width: 'w-2/4' }
  if (bits < 60) return { label: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-500', width: 'w-3/4' }
  return { label: 'Very Strong', color: 'text-emerald-700', bg: 'bg-emerald-600', width: 'w-full' }
}

function timeToCrack(bits: number): string {
  const operations = Math.pow(2, bits)
  const guessesPerSecond = 1e9
  const seconds = operations / guessesPerSecond
  if (seconds < 1) return 'Instant'
  if (seconds < 60) return `${Math.round(seconds)} seconds`
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`
  if (seconds < 3.15e10) return `${Math.round(seconds / 31536000)} years`
  if (seconds < 3.15e13) return `${Math.round(seconds / 3.15e10)} thousand years`
  if (seconds < 3.15e16) return `${Math.round(seconds / 3.15e13)} million years`
  return 'Billions of years'
}

const SETTINGS_KEY = 'rng-password-settings'

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [customSymbols, setCustomSymbols] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(true)
  const [copied, setCopied] = useState(false)
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([])
  const [bulkCopied, setBulkCopied] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
      if (saved.length) setLength(saved.length)
      if (typeof saved.upper === 'boolean') setUpper(saved.upper)
      if (typeof saved.lower === 'boolean') setLower(saved.lower)
      if (typeof saved.numbers === 'boolean') setNumbers(saved.numbers)
      if (typeof saved.symbols === 'boolean') setSymbols(saved.symbols)
      if (typeof saved.excludeAmbiguous === 'boolean') setExcludeAmbiguous(saved.excludeAmbiguous)
      if (saved.customSymbols) setCustomSymbols(saved.customSymbols)
    } catch { /* ignore */ }
  }, [])

  const generate = useCallback(() => {
    const pw = generatePassword(length, upper, lower, numbers, symbols, excludeAmbiguous, customSymbols)
    setPassword(pw)
    setBulkPasswords([])
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ length, upper, lower, numbers, symbols, excludeAmbiguous, customSymbols }))
    } catch { /* ignore */ }
  }, [length, upper, lower, numbers, symbols, excludeAmbiguous, customSymbols])

  useEffect(() => { generate() }, [generate])

  function copyPassword() {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function generateBulk(n: number) {
    const pws: string[] = []
    for (let i = 0; i < n; i++) {
      pws.push(generatePassword(length, upper, lower, numbers, symbols, excludeAmbiguous, customSymbols))
    }
    setBulkPasswords(pws)
  }

  function downloadBulk() {
    const text = bulkPasswords.join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'passwords.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyBulk() {
    navigator.clipboard.writeText(bulkPasswords.join('\n')).then(() => {
      setBulkCopied(true)
      setTimeout(() => setBulkCopied(false), 1500)
    })
  }

  const charsetSize = getCharsetSize(upper, lower, numbers, symbols, excludeAmbiguous, customSymbols)
  const entropy = calcEntropy(charsetSize, length)
  const strength = getStrength(entropy)

  return (
    <div className="p-6 sm:p-8">
      {/* Password display */}
      <div className="relative mb-4">
        <div className="rounded-2xl border-2 border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/10 p-4 pr-24 min-h-[64px] flex items-center">
          <span className="font-mono text-lg break-all text-gray-900 dark:text-white leading-relaxed">
            {visible ? password : password.replace(/./g, '•')}
          </span>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
          <button
            onClick={() => setVisible(v => !v)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            aria-label="Toggle visibility"
          >
            {visible ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
          <button
            onClick={generate}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            aria-label="Regenerate"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
          <button
            onClick={copyPassword}
            className="p-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-white"
            aria-label="Copy"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Strength indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-semibold ${strength.color}`}>{strength.label}</span>
          <span className="text-xs text-gray-400">{Math.round(entropy)} bits entropy</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-300 ${strength.bg} ${strength.width}`} />
        </div>
        <p className="text-xs text-gray-400 mt-1">Time to crack: <span className="font-medium">{timeToCrack(entropy)}</span> at 1 billion guesses/second</p>
      </div>

      {/* Settings */}
      <div className="space-y-4 mb-6">
        {/* Length */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Length</label>
            <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{length}</span>
          </div>
          <input
            type="range" min={4} max={128} value={length}
            onChange={e => setLength(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
        </div>

        {/* Character sets */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Uppercase (A-Z)', val: upper, set: setUpper },
            { label: 'Lowercase (a-z)', val: lower, set: setLower },
            { label: 'Numbers (0-9)', val: numbers, set: setNumbers },
            { label: 'Symbols (!@#$)', val: symbols, set: setSymbols },
            { label: 'Exclude ambiguous (0, O, l, 1)', val: excludeAmbiguous, set: setExcludeAmbiguous },
          ].map(({ label, val, set }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer col-span-1">
              <input
                type="checkbox" checked={val}
                onChange={e => set(e.target.checked)}
                className="accent-violet-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
            </label>
          ))}
        </div>

        {/* Custom symbols */}
        {symbols && (
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Custom symbols (leave blank for defaults)</label>
            <input
              type="text"
              value={customSymbols}
              onChange={e => setCustomSymbols(e.target.value)}
              placeholder="!@#$%^&*"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        )}
      </div>

      {/* Bulk generate */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Bulk generate</h3>
        <div className="flex gap-2 flex-wrap">
          {[5, 10, 20].map(n => (
            <button
              key={n}
              onClick={() => generateBulk(n)}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 transition"
            >
              {n} passwords
            </button>
          ))}
        </div>
      </div>

      {/* Bulk results */}
      {bulkPasswords.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{bulkPasswords.length} passwords</h3>
            <div className="flex gap-2">
              <button onClick={copyBulk} className="text-xs px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 transition">
                {bulkCopied ? 'Copied!' : 'Copy all'}
              </button>
              <button onClick={downloadBulk} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                Download .txt
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            {bulkPasswords.map((pw, i) => (
              <div key={i} className="rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2 font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                {pw}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
