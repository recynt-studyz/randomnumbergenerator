'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type SortOrder = 'unsorted' | 'asc' | 'desc'

function generateNumbers(
  min: number,
  max: number,
  count: number,
  decimals: number,
  unique: boolean,
  exclude: number[]
): number[] {
  if (min > max) return []
  const factor = Math.pow(10, decimals)
  const results: number[] = []
  const used = new Set<number>()
  const maxAttempts = count * 200
  let attempts = 0

  while (results.length < count && attempts < maxAttempts) {
    attempts++
    let raw = Math.random() * (max - min) + min
    let n = Math.round(raw * factor) / factor
    if (n < min) n = min
    if (n > max) n = max
    if (exclude.includes(n)) continue
    if (unique) {
      if (used.has(n)) continue
      used.add(n)
    }
    results.push(n)
  }
  return results
}

export default function RandomNumberTool() {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [results, setResults] = useState<number[]>([])
  const [animKey, setAnimKey] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [decimals, setDecimals] = useState(0)
  const [count, setCount] = useState(1)
  const [unique, setUnique] = useState(false)
  const [excludeRaw, setExcludeRaw] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('unsorted')
  const [history, setHistory] = useState<number[]>([])
  const [copied, setCopied] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const hasGenerated = useRef(false)

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        generate()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, decimals, count, unique, excludeRaw, sortOrder])

  const generate = useCallback(() => {
    const minN = parseFloat(min)
    const maxN = parseFloat(max)
    if (isNaN(minN) || isNaN(maxN) || minN > maxN) return
    const exclude = excludeRaw
      .split(',')
      .map(s => parseFloat(s.trim()))
      .filter(n => !isNaN(n))
    let nums = generateNumbers(minN, maxN, count, decimals, unique, exclude)
    if (sortOrder === 'asc') nums = [...nums].sort((a, b) => a - b)
    if (sortOrder === 'desc') nums = [...nums].sort((a, b) => b - a)
    setResults(nums)
    setAnimKey(k => k + 1)
    if (nums.length > 0) {
      setHistory(prev => [nums[0], ...prev].slice(0, 10))
    }
    hasGenerated.current = true
  }, [min, max, decimals, count, unique, excludeRaw, sortOrder])

  function setPreset(mn: number, mx: number) {
    setMin(String(mn))
    setMax(String(mx))
    const minN = mn, maxN = mx
    const exclude = excludeRaw.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n))
    let nums = generateNumbers(minN, maxN, count, decimals, unique, exclude)
    if (sortOrder === 'asc') nums = [...nums].sort((a, b) => a - b)
    if (sortOrder === 'desc') nums = [...nums].sort((a, b) => b - a)
    setResults(nums)
    setAnimKey(k => k + 1)
    if (nums.length > 0) setHistory(prev => [nums[0], ...prev].slice(0, 10))
  }

  function copyAll() {
    navigator.clipboard.writeText(results.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function downloadTxt() {
    const blob = new Blob([results.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'random-numbers.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyHistoryItem(n: number, idx: number) {
    navigator.clipboard.writeText(String(n)).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 1200)
    })
  }

  const stats = results.length > 1 ? {
    min: Math.min(...results),
    max: Math.max(...results),
    avg: results.reduce((a, b) => a + b, 0) / results.length,
    sum: results.reduce((a, b) => a + b, 0),
  } : null

  const presets = [
    { label: '1–6', min: 1, max: 6 },
    { label: '1–10', min: 1, max: 10 },
    { label: '1–100', min: 1, max: 100 },
    { label: '1–1000', min: 1, max: 1000 },
    { label: '0–1', min: 0, max: 1 },
  ]

  return (
    <div className="p-6 sm:p-8">
      {/* Quick presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map(p => (
          <button
            key={p.label}
            onClick={() => setPreset(p.min, p.max)}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/40 transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Min / Max inputs */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Min</label>
          <input
            type="number"
            value={min}
            onChange={e => setMin(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-center text-xl font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="flex items-end pb-3 text-gray-400 text-xl">—</div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Max</label>
          <input
            type="number"
            value={max}
            onChange={e => setMax(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-center text-xl font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        GENERATE
      </button>

      {/* Result display */}
      {results.length > 0 && (
        <div className="text-center mb-6">
          {results.length === 1 ? (
            <div
              key={animKey}
              className="animate-scale-in text-8xl sm:text-9xl font-black text-violet-600 dark:text-violet-400 leading-none my-4"
            >
              {results[0]}
            </div>
          ) : (
            <div key={animKey} className="animate-fade-in">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                {results.map((n, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 py-3 text-lg font-bold text-violet-700 dark:text-violet-300 text-center"
                  >
                    {n}
                  </div>
                ))}
              </div>
              {stats && (
                <div className="grid grid-cols-4 gap-2 text-sm mb-3">
                  {[
                    { label: 'Min', val: stats.min },
                    { label: 'Max', val: stats.max },
                    { label: 'Avg', val: Math.round(stats.avg * 100) / 100 },
                    { label: 'Sum', val: stats.sum },
                  ].map(s => (
                    <div key={s.label} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-2">
                      <div className="text-xs text-gray-400">{s.label}</div>
                      <div className="font-bold text-gray-800 dark:text-white">{s.val}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={copyAll}
                  className="px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-200 transition"
                >
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
                <button
                  onClick={downloadTxt}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Download .txt
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Advanced options */}
      <div className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <button
          onClick={() => setShowAdvanced(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <span>More options</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showAdvanced && (
          <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Decimal places: {decimals}</label>
              <input
                type="range" min={0} max={10} value={decimals}
                onChange={e => setDecimals(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">How many numbers</label>
              <input
                type="number" min={1} max={1000} value={count}
                onChange={e => setCount(Math.min(1000, Math.max(1, Number(e.target.value))))}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox" id="unique" checked={unique}
                onChange={e => setUnique(e.target.checked)}
                className="accent-violet-600"
              />
              <label htmlFor="unique" className="text-sm text-gray-600 dark:text-gray-400">Unique numbers only</label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Exclude numbers (comma separated)</label>
              <input
                type="text" value={excludeRaw}
                onChange={e => setExcludeRaw(e.target.value)}
                placeholder="e.g. 7, 13"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sort results</label>
              <div className="flex gap-2">
                {(['unsorted', 'asc', 'desc'] as SortOrder[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSortOrder(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      sortOrder === s
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {s === 'unsorted' ? 'Unsorted' : s === 'asc' ? 'Ascending' : 'Descending'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-gray-400 mb-4">Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-mono text-xs">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-mono text-xs">Enter</kbd> to generate a new number</p>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Recent results</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((n, i) => (
              <button
                key={i}
                onClick={() => copyHistoryItem(n, i)}
                title="Click to copy"
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  copiedIdx === i
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300'
                }`}
              >
                {copiedIdx === i ? 'Copied!' : n}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
