'use client'

import { useState, useEffect, useCallback } from 'react'

const DICE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100

interface RollRecord {
  sides: number
  count: number
  rolls: number[]
  sum: number
}

const DND_PRESETS = [
  { label: 'Attack Roll', sides: 20 as DiceType, count: 1 },
  { label: 'Damage (1d8)', sides: 8 as DiceType, count: 1 },
  { label: 'Saving Throw', sides: 20 as DiceType, count: 1 },
  { label: '2d6 Damage', sides: 6 as DiceType, count: 2 },
]

export default function DiceRollerTool() {
  const [diceType, setDiceType] = useState<DiceType>(6)
  const [diceCount, setDiceCount] = useState(1)
  const [results, setResults] = useState<number[]>([])
  const [rolling, setRolling] = useState(false)
  const [rollHistory, setRollHistory] = useState<RollRecord[]>([])
  const [shakeKey, setShakeKey] = useState(0)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rng-dice-type')
      if (saved) setDiceType(Number(saved) as DiceType)
    } catch { /* ignore */ }
  }, [])

  const roll = useCallback((sides = diceType, count = diceCount) => {
    if (rolling) return
    setRolling(true)
    setShakeKey(k => k + 1)
    setTimeout(() => {
      const rolls: number[] = []
      for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1)
      }
      setResults(rolls)
      setRollHistory(prev => [{
        sides,
        count,
        rolls,
        sum: rolls.reduce((a, b) => a + b, 0),
      }, ...prev].slice(0, 10))
      setRolling(false)
    }, 400)
  }, [rolling, diceType, diceCount])

  function selectDice(sides: DiceType) {
    setDiceType(sides)
    try { localStorage.setItem('rng-dice-type', String(sides)) } catch { /* ignore */ }
  }

  const sum = results.reduce((a, b) => a + b, 0)
  const diceTypes: DiceType[] = [4, 6, 8, 10, 12, 20, 100]

  return (
    <div className="p-6 sm:p-8">
      {/* Dice type selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {diceTypes.map(d => (
          <button
            key={d}
            onClick={() => selectDice(d)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              diceType === d
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300'
            }`}
          >
            d{d}
          </button>
        ))}
      </div>

      {/* Number of dice */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Number of dice:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDiceCount(c => Math.max(1, c - 1))}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition"
          >−</button>
          <span className="w-8 text-center text-xl font-bold text-gray-900 dark:text-white">{diceCount}</span>
          <button
            onClick={() => setDiceCount(c => Math.min(10, c + 1))}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition"
          >+</button>
        </div>
      </div>

      {/* Roll button */}
      <button
        onClick={() => roll()}
        disabled={rolling}
        className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-70 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        {rolling ? 'Rolling...' : `ROLL ${diceCount}d${diceType}`}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="text-center mb-6">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {results.map((r, i) => (
              <div
                key={`${shakeKey}-${i}`}
                className={`flex flex-col items-center justify-center ${rolling ? 'dice-shake' : ''}`}
              >
                {diceType === 6 ? (
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-gray-800 border-2 border-violet-200 dark:border-violet-700 shadow-md flex items-center justify-center text-4xl select-none">
                    {DICE_FACES[r]}
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-200 dark:border-violet-700 shadow-md flex items-center justify-center">
                    <span className="text-2xl font-black text-violet-700 dark:text-violet-300">{r}</span>
                  </div>
                )}
                <span className="text-xs text-gray-400 mt-1">d{diceType}</span>
              </div>
            ))}
          </div>
          {results.length > 1 && (
            <div className="text-3xl font-black text-violet-600 dark:text-violet-400">
              Total: {sum}
            </div>
          )}
          {results.length === 1 && (
            <div className="text-6xl font-black text-violet-600 dark:text-violet-400">{results[0]}</div>
          )}
        </div>
      )}

      {/* DnD presets */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">D&D Quick Rolls</h3>
        <div className="flex flex-wrap gap-2">
          {DND_PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => {
                setDiceType(p.sides)
                setDiceCount(p.count)
                roll(p.sides, p.count)
              }}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      {rollHistory.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Roll history</h3>
          <div className="space-y-1.5">
            {rollHistory.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm"
              >
                <span className="font-mono text-gray-600 dark:text-gray-400">
                  {r.count}d{r.sides}: [{r.rolls.join(', ')}]
                </span>
                <span className="font-bold text-violet-600 dark:text-violet-400">= {r.sum}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
