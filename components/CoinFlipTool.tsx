'use client'

import { useState, useEffect, useRef } from 'react'

type Side = 'heads' | 'tails'

export default function CoinFlipTool() {
  const [result, setResult] = useState<Side | null>(null)
  const [flipping, setFlipping] = useState(false)
  const [heads, setHeads] = useState(0)
  const [tails, setTails] = useState(0)
  const [streak, setStreak] = useState(0)
  const [history, setHistory] = useState<Side[]>([])
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') {
        e.preventDefault()
        flip()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipping])

  function flip() {
    if (flipping) return
    setFlipping(true)

    if (coinRef.current) {
      coinRef.current.classList.remove('flipping')
      void coinRef.current.offsetWidth
      coinRef.current.classList.add('flipping')
    }

    setTimeout(() => {
      const side: Side = Math.random() < 0.5 ? 'heads' : 'tails'
      setResult(side)
      setFlipping(false)
      if (side === 'heads') {
        setHeads(h => h + 1)
      } else {
        setTails(t => t + 1)
      }
      setHistory(prev => {
        const next = [side, ...prev].slice(0, 20)
        // compute streak
        let s = 1
        for (let i = 1; i < next.length; i++) {
          if (next[i] === next[0]) s++
          else break
        }
        setStreak(s)
        return next
      })
      if (coinRef.current) {
        coinRef.current.classList.remove('flipping')
      }
    }, 800)
  }

  function reset() {
    setHeads(0)
    setTails(0)
    setStreak(0)
    setHistory([])
    setResult(null)
  }

  const total = heads + tails

  return (
    <div className="p-6 sm:p-8">
      {/* Coin visual */}
      <div className="flex justify-center mb-8">
        <div className="coin-container" style={{ width: 140, height: 140 }}>
          <div
            ref={coinRef}
            className="coin-inner"
            style={{ width: 140, height: 140 }}
          >
            {/* Heads face */}
            <div
              className="coin-face"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #d97706)',
                boxShadow: '0 4px 24px rgba(245,158,11,0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
                border: '4px solid #d97706',
              }}
            >
              <span className="text-4xl font-black text-yellow-900 select-none">H</span>
            </div>
            {/* Tails face */}
            <div
              className="coin-face tails"
              style={{
                background: 'linear-gradient(135deg, #9ca3af, #d1d5db, #6b7280)',
                boxShadow: '0 4px 24px rgba(156,163,175,0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
                border: '4px solid #6b7280',
              }}
            >
              <span className="text-4xl font-black text-gray-700 select-none">T</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="text-center mb-6">
          <div className={`text-5xl font-black mb-1 ${result === 'heads' ? 'text-amber-500' : 'text-gray-500'}`}>
            {result === 'heads' ? 'HEADS' : 'TAILS'}
          </div>
        </div>
      )}

      {/* Flip button */}
      <button
        onClick={flip}
        disabled={flipping}
        className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:opacity-70 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        {flipping ? 'Flipping...' : 'FLIP'}
      </button>

      <p className="text-center text-xs text-gray-400 mb-6">
        Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs">Space</kbd> to flip
      </p>

      {/* Stats */}
      {total > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Total flips</div>
            <div className="text-xl font-bold text-gray-800 dark:text-white">{total}</div>
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Heads</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{heads}</div>
            <div className="text-xs text-amber-500">{total > 0 ? ((heads / total) * 100).toFixed(1) : 0}%</div>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Tails</div>
            <div className="text-xl font-bold text-gray-600 dark:text-gray-300">{tails}</div>
            <div className="text-xs text-gray-500">{total > 0 ? ((tails / total) * 100).toFixed(1) : 0}%</div>
          </div>
          <div className="rounded-xl bg-violet-50 dark:bg-violet-900/20 p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Streak</div>
            <div className="text-xl font-bold text-violet-600 dark:text-violet-400">{streak}</div>
            <div className="text-xs text-violet-500">{history[0] === 'heads' ? 'H' : history[0] === 'tails' ? 'T' : '—'}</div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Last {history.length} flips</h3>
            <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 transition">Reset stats</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {history.map((side, i) => (
              <span
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  side === 'heads'
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {side === 'heads' ? 'H' : 'T'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
