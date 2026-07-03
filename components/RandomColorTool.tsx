'use client'

import { useState, useEffect, useCallback } from 'react'

interface Color {
  r: number
  g: number
  b: number
}

function toHex(c: Color): string {
  return '#' + [c.r, c.g, c.b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function toRgb(c: Color): string {
  return `rgb(${c.r}, ${c.g}, ${c.b})`
}

function rgbToHsl(c: Color): { h: number; s: number; l: number } {
  const r = c.r / 255, g = c.g / 255, b = c.b / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function toHslStr(c: Color): string {
  const { h, s, l } = rgbToHsl(c)
  return `hsl(${h}, ${s}%, ${l}%)`
}

function randomChannel(): number {
  return Math.floor(Math.random() * 256)
}

export default function RandomColorTool() {
  const [color, setColor] = useState<Color>({ r: 124, g: 58, b: 237 })
  const [lockH, setLockH] = useState(false)
  const [lockS, setLockS] = useState(false)
  const [lockL, setLockL] = useState(false)
  const [history, setHistory] = useState<Color[]>([])
  const [palette, setPalette] = useState<Color[]>([])
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const generateColor = useCallback(() => {
    setColor(prev => {
      const { h: ph, s: ps, l: pl } = rgbToHsl(prev)
      if (!lockH && !lockS && !lockL) {
        const r = randomChannel()
        const g = randomChannel()
        const b = randomChannel()
        const next = { r, g, b }
        setHistory(hist => [prev, ...hist].slice(0, 8))
        return next
      }
      // If any channel is locked, regenerate from HSL
      const nh = lockH ? ph : Math.floor(Math.random() * 360)
      const ns = lockS ? ps : Math.floor(Math.random() * 100)
      const nl = lockL ? pl : Math.floor(Math.random() * 100)
      const next = hslToRgb(nh, ns, nl)
      setHistory(hist => [prev, ...hist].slice(0, 8))
      return next
    })
    setPalette([])
  }, [lockH, lockS, lockL])

  function hslToRgb(h: number, s: number, l: number): Color {
    const hh = h / 360, ss = s / 100, ll = l / 100
    let r, g, b
    if (ss === 0) { r = g = b = ll } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss
      const p = 2 * ll - q
      r = hue2rgb(p, q, hh + 1/3)
      g = hue2rgb(p, q, hh)
      b = hue2rgb(p, q, hh - 1/3)
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
  }

  useEffect(() => {
    generateColor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') {
        e.preventDefault()
        generateColor()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [generateColor])

  function copyField(text: string, field: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1200)
    })
  }

  function generatePalette() {
    const colors: Color[] = []
    for (let i = 0; i < 5; i++) {
      colors.push({ r: randomChannel(), g: randomChannel(), b: randomChannel() })
    }
    setPalette(colors)
  }

  const hex = toHex(color)
  const rgb = toRgb(color)
  const hsl = toHslStr(color)

  const colorFields = [
    { label: 'HEX', value: hex },
    { label: 'RGB', value: rgb },
    { label: 'HSL', value: hsl },
  ]

  return (
    <div className="p-0">
      {/* Color swatch */}
      <div
        className="w-full rounded-t-2xl transition-colors duration-300"
        style={{ height: 220, background: hex }}
      />

      <div className="p-6 sm:p-8">
        {/* Generate button */}
        <button
          onClick={generateColor}
          className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-xl font-bold transition-colors shadow-lg mb-6"
        >
          New Color
        </button>

        <p className="text-center text-xs text-gray-400 mb-6">
          Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs">Space</kbd> for a new color
        </p>

        {/* Color values */}
        <div className="space-y-3 mb-6">
          {colorFields.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
              <div>
                <span className="text-xs font-bold text-gray-400 mr-3">{label}</span>
                <span className="font-mono text-sm text-gray-800 dark:text-white">{value}</span>
              </div>
              <button
                onClick={() => copyField(value, label)}
                className="px-3 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium hover:bg-violet-200 transition"
              >
                {copiedField === label ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>

        {/* Lock channels */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Lock channels</h3>
          <div className="flex gap-2">
            {[
              { label: 'Hue', val: lockH, set: setLockH },
              { label: 'Saturation', val: lockS, set: setLockS },
              { label: 'Lightness', val: lockL, set: setLockL },
            ].map(({ label, val, set }) => (
              <button
                key={label}
                onClick={() => set(v => !v)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  val
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-violet-900/30'
                }`}
              >
                {val ? '🔒' : '🔓'} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Palette generator */}
        <div className="mb-6">
          <button
            onClick={generatePalette}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 transition mb-3"
          >
            Generate palette of 5 colors
          </button>
          {palette.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {palette.map((c, i) => (
                <button
                  key={i}
                  onClick={() => copyField(toHex(c), `palette-${i}`)}
                  title={toHex(c)}
                  className="relative group rounded-xl overflow-hidden"
                  style={{ width: 56, height: 56, background: toHex(c) }}
                >
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition text-white text-xs font-bold">
                    {copiedField === `palette-${i}` ? '✓' : 'Copy'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color history */}
        {history.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Color history</h3>
            <div className="flex gap-2 flex-wrap">
              {history.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setColor(c)}
                  title={toHex(c)}
                  className="rounded-xl border-2 border-transparent hover:border-violet-400 transition"
                  style={{ width: 40, height: 40, background: toHex(c) }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
