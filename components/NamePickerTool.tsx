'use client'

import { useState, useEffect } from 'react'

export default function NamePickerTool() {
  const [namesRaw, setNamesRaw] = useState('')
  const [pickCount, setPickCount] = useState(1)
  const [removePicked, setRemovePicked] = useState(false)
  const [remaining, setRemaining] = useState<string[]>([])
  const [picked, setPicked] = useState<string[]>([])
  const [sessionHistory, setSessionHistory] = useState<string[]>([])
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rng-names-list')
      if (saved) setNamesRaw(saved)
    } catch { /* ignore */ }
  }, [])

  function parseNames(raw: string): string[] {
    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length > 1) return lines
    return raw.split(',').map(s => s.trim()).filter(Boolean)
  }

  const allNames = parseNames(namesRaw)

  function handleNamesChange(val: string) {
    setNamesRaw(val)
    setRemaining([])
    setPicked([])
    try { localStorage.setItem('rng-names-list', val) } catch { /* ignore */ }
  }

  function initRemaining() {
    if (remaining.length === 0) return [...allNames]
    return remaining
  }

  function doPick() {
    const pool = removePicked ? initRemaining() : allNames
    if (pool.length === 0) return

    const n = Math.min(pickCount, pool.length)
    const indices = new Set<number>()
    while (indices.size < n) {
      indices.add(Math.floor(Math.random() * pool.length))
    }
    const newPicked = [...indices].map(i => pool[i])
    setPicked(newPicked)
    setAnimKey(k => k + 1)
    setSessionHistory(prev => [...newPicked, ...prev].slice(0, 20))

    if (removePicked) {
      const newRemaining = pool.filter((_, i) => !indices.has(i))
      setRemaining(newRemaining)
    }
  }

  function reset() {
    setRemaining([])
    setPicked([])
    setSessionHistory([])
  }

  const currentPool = removePicked ? (remaining.length > 0 ? remaining : allNames) : allNames

  return (
    <div className="p-6 sm:p-8">
      {/* Names input */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          Enter names (one per line or comma separated)
        </label>
        <textarea
          value={namesRaw}
          onChange={e => handleNamesChange(e.target.value)}
          placeholder={"Alice\nBob\nCharlie\nDave"}
          rows={6}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
        {allNames.length > 0 && (
          <p className="text-xs text-gray-400 mt-1">{allNames.length} name{allNames.length !== 1 ? 's' : ''} detected</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">How many to pick</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setPickCount(c => Math.max(1, c - 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">−</button>
            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{pickCount}</span>
            <button onClick={() => setPickCount(c => Math.min(allNames.length || 1, c + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">+</button>
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer self-end mb-1">
          <input type="checkbox" checked={removePicked} onChange={e => { setRemovePicked(e.target.checked); reset() }} className="accent-violet-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Remove picked names</span>
        </label>
      </div>

      {/* Remaining counter */}
      {removePicked && allNames.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {currentPool.length} of {allNames.length} names remaining
        </p>
      )}

      {/* Pick button */}
      <button
        onClick={doPick}
        disabled={allNames.length === 0 || (removePicked && currentPool.length === 0)}
        className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-50 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        {removePicked && currentPool.length === 0 ? 'All names picked!' : 'PICK'}
      </button>

      {/* Result */}
      {picked.length > 0 && (
        <div key={animKey} className="animate-scale-in text-center mb-6">
          {picked.length === 1 ? (
            <div className="text-5xl sm:text-6xl font-black text-violet-600 dark:text-violet-400 py-4">{picked[0]}</div>
          ) : (
            <div className="space-y-2">
              {picked.map((name, i) => (
                <div key={i} className="text-3xl font-bold text-violet-600 dark:text-violet-400">{name}</div>
              ))}
            </div>
          )}
          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={doPick}
              disabled={removePicked && currentPool.length === 0}
              className="px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-200 transition disabled:opacity-50"
            >
              Pick Again
            </button>
            {removePicked && (
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      {/* Session history */}
      {sessionHistory.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Picked this session</h3>
          <div className="flex flex-wrap gap-2">
            {sessionHistory.map((name, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
