'use client'

import { useState } from 'react'

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0)
  const diff = d.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}

function weekNumber(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 1)
  return Math.ceil(((d.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7)
}

function daysFromToday(d: Date): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(d)
  target.setHours(0, 0, 0, 0)
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff > 0) return `${diff.toLocaleString()} days from now`
  return `${Math.abs(diff).toLocaleString()} days ago`
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

interface DateResult {
  date: Date
  formatted: string
  dayOfYear: number
  weekNum: number
  fromToday: string
  daysInYear: number
}

function makeDateResult(d: Date): DateResult {
  const year = d.getFullYear()
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  return {
    date: d,
    formatted: formatDate(d),
    dayOfYear: dayOfYear(d),
    weekNum: weekNumber(d),
    fromToday: daysFromToday(d),
    daysInYear: isLeap ? 366 : 365,
  }
}

export default function RandomDateTool() {
  const today = new Date()
  const [startDate, setStartDate] = useState('2000-01-01')
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0])
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<DateResult[]>([])
  const [animKey, setAnimKey] = useState(0)
  const [copied, setCopied] = useState(false)

  function generate() {
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) return
    const dates: DateResult[] = []
    for (let i = 0; i < count; i++) {
      dates.push(makeDateResult(randomDate(start, end)))
    }
    setResults(dates)
    setAnimKey(k => k + 1)
  }

  function applyPreset(mode: string) {
    const now = new Date()
    switch (mode) {
      case 'birthday':
        setStartDate('1920-01-01')
        setEndDate(now.toISOString().split('T')[0])
        setCount(1)
        break
      case 'historical':
        setStartDate('1776-07-04')
        setEndDate('1999-12-31')
        setCount(1)
        break
      case 'future':
        setStartDate(now.toISOString().split('T')[0])
        setEndDate(new Date(now.getFullYear() + 50, 11, 31).toISOString().split('T')[0])
        setCount(1)
        break
      case 'thisyear': {
        const y = now.getFullYear()
        setStartDate(`${y}-01-01`)
        setEndDate(`${y}-12-31`)
        setCount(1)
        break
      }
    }
  }

  function downloadTxt() {
    const text = results.map(r => r.formatted).join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'random-dates.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Fun modes */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: 'Random Birthday', mode: 'birthday' },
          { label: 'Historical Date', mode: 'historical' },
          { label: 'Future Date', mode: 'future' },
          { label: 'Day This Year', mode: 'thisyear' },
        ].map(p => (
          <button
            key={p.mode}
            onClick={() => applyPreset(p.mode)}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/40 transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Date range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">End date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">How many dates:</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setCount(c => Math.max(1, c - 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">−</button>
          <span className="w-10 text-center font-bold text-gray-900 dark:text-white">{count}</span>
          <button onClick={() => setCount(c => Math.min(100, c + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">+</button>
        </div>
      </div>

      {/* Generate */}
      <button
        onClick={generate}
        className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-xl font-bold transition-colors shadow-lg mb-6"
      >
        GENERATE DATE
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div key={animKey} className="animate-fade-in">
          {results.length === 1 ? (
            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 p-6 mb-4">
              <div className="text-2xl font-black text-violet-700 dark:text-violet-300 mb-4">{results[0].formatted}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-white dark:bg-gray-800 p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">From today</div>
                  <div className="text-sm font-bold text-gray-800 dark:text-white">{results[0].fromToday}</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-800 p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Day of year</div>
                  <div className="text-sm font-bold text-gray-800 dark:text-white">Day {results[0].dayOfYear} of {results[0].daysInYear}</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-800 p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Week number</div>
                  <div className="text-sm font-bold text-gray-800 dark:text-white">Week {results[0].weekNum}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              {results.map((r, i) => (
                <div key={i} className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                  <div className="font-semibold text-gray-800 dark:text-white">{r.formatted}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.fromToday} · Week {r.weekNum}</div>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(results.map(r => r.formatted).join('\n')).then(() => {
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1500)
                    })
                  }}
                  className="px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium hover:bg-violet-200 transition"
                >
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
                <button onClick={downloadTxt} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  Download .txt
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
