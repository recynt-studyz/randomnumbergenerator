'use client'

import { useState, useEffect } from 'react'

const TEAM_COLORS = [
  'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
  'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
  'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
  'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
  'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
  'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800',
  'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
]

const LABEL_COLORS = [
  'text-violet-700 dark:text-violet-300',
  'text-blue-700 dark:text-blue-300',
  'text-emerald-700 dark:text-emerald-300',
  'text-amber-700 dark:text-amber-300',
  'text-pink-700 dark:text-pink-300',
  'text-indigo-700 dark:text-indigo-300',
  'text-teal-700 dark:text-teal-300',
  'text-orange-700 dark:text-orange-300',
  'text-rose-700 dark:text-rose-300',
  'text-cyan-700 dark:text-cyan-300',
]

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function TeamGeneratorTool() {
  const [namesRaw, setNamesRaw] = useState('')
  const [teamCount, setTeamCount] = useState(2)
  const [useTeamSize, setUseTeamSize] = useState(false)
  const [teamSize, setTeamSize] = useState(3)
  const [customNames, setCustomNames] = useState<string[]>([])
  const [teams, setTeams] = useState<string[][]>([])
  const [animKey, setAnimKey] = useState(0)
  const [copiedTeam, setCopiedTeam] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

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
    try { localStorage.setItem('rng-names-list', val) } catch { /* ignore */ }
  }

  function generate() {
    if (allNames.length === 0) return
    const shuffled = fisherYates(allNames)

    let n = teamCount
    if (useTeamSize) {
      n = Math.ceil(shuffled.length / teamSize)
    }
    n = Math.max(2, Math.min(n, shuffled.length))

    const result: string[][] = Array.from({ length: n }, () => [])
    shuffled.forEach((name, i) => {
      result[i % n].push(name)
    })

    setTeams(result)
    setAnimKey(k => k + 1)

    // Init custom names if not set
    if (customNames.length !== n) {
      setCustomNames(Array.from({ length: n }, (_, i) => `Team ${i + 1}`))
    }
  }

  function copyTeam(idx: number) {
    const text = `${customNames[idx] || `Team ${idx + 1}`}:\n${teams[idx].join(', ')}`
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTeam(idx)
      setTimeout(() => setCopiedTeam(null), 1200)
    })
  }

  function copyAll() {
    const text = teams.map((team, i) =>
      `${customNames[i] || `Team ${i + 1}`}:\n${team.join(', ')}`
    ).join('\n\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 1500)
    })
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Names input */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          Names (one per line or comma separated)
        </label>
        <textarea
          value={namesRaw}
          onChange={e => handleNamesChange(e.target.value)}
          placeholder={"Alice\nBob\nCharlie\nDave\nEve\nFrank"}
          rows={6}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
        {allNames.length > 0 && (
          <p className="text-xs text-gray-400 mt-1">{allNames.length} name{allNames.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Team count / size */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={!useTeamSize} onChange={() => setUseTeamSize(false)} className="accent-violet-600" />
              Number of teams
            </label>
          </label>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => setTeamCount(c => Math.max(2, c - 1))} disabled={useTeamSize} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold disabled:opacity-50 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">−</button>
            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{teamCount}</span>
            <button onClick={() => setTeamCount(c => Math.min(10, c + 1))} disabled={useTeamSize} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold disabled:opacity-50 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">+</button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={useTeamSize} onChange={() => setUseTeamSize(true)} className="accent-violet-600" />
              Members per team
            </label>
          </label>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => setTeamSize(s => Math.max(1, s - 1))} disabled={!useTeamSize} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold disabled:opacity-50 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">−</button>
            <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{teamSize}</span>
            <button onClick={() => setTeamSize(s => s + 1)} disabled={!useTeamSize} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold disabled:opacity-50 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">+</button>
          </div>
        </div>
      </div>

      {/* Generate */}
      <button
        onClick={generate}
        disabled={allNames.length === 0}
        className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-50 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        GENERATE TEAMS
      </button>

      {/* Results */}
      {teams.length > 0 && (
        <div key={animKey} className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{teams.length} teams</h3>
            <div className="flex gap-2">
              <button onClick={copyAll} className="text-xs px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 transition">
                {copiedAll ? 'Copied!' : 'Copy all'}
              </button>
              <button onClick={generate} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                Regenerate
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teams.map((team, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${TEAM_COLORS[i % TEAM_COLORS.length]}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    value={customNames[i] || `Team ${i + 1}`}
                    onChange={e => {
                      const next = [...customNames]
                      next[i] = e.target.value
                      setCustomNames(next)
                    }}
                    className={`font-bold text-sm bg-transparent border-none outline-none w-32 ${LABEL_COLORS[i % LABEL_COLORS.length]}`}
                  />
                  <button
                    onClick={() => copyTeam(i)}
                    className="text-xs px-2 py-1 rounded-lg bg-white/60 dark:bg-black/20 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-black/40 transition"
                  >
                    {copiedTeam === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="space-y-1">
                  {team.map((name, j) => (
                    <div key={j} className="text-sm text-gray-700 dark:text-gray-300 font-medium">{name}</div>
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-2">{team.length} member{team.length !== 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
