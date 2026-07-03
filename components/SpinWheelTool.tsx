'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const SEGMENT_COLORS = [
  '#7c3aed', '#db2777', '#ea580c', '#ca8a04', '#16a34a',
  '#0891b2', '#4f46e5', '#be123c', '#b45309', '#15803d',
  '#0e7490', '#6d28d9', '#c026d3', '#d97706', '#059669',
  '#0284c7', '#7c3aed', '#db2777', '#ea580c', '#ca8a04',
]

export default function SpinWheelTool() {
  const [optionsRaw, setOptionsRaw] = useState('Option 1\nOption 2\nOption 3\nOption 4\nOption 5')
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [removeWinner, setRemoveWinner] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const options = optionsRaw.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 20)

  const drawWheel = useCallback((rotation: number) => {
    const canvas = canvasRef.current
    if (!canvas || options.length < 2) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r = cx - 4
    const segAngle = (2 * Math.PI) / options.length

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    options.forEach((opt, i) => {
      const startAngle = rotation + i * segAngle
      const endAngle = startAngle + segAngle

      // Segment
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = SEGMENT_COLORS[i % SEGMENT_COLORS.length]
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Text
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(startAngle + segAngle / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = 'white'
      ctx.font = `bold ${Math.max(10, Math.min(16, 200 / options.length))}px Inter, sans-serif`
      ctx.shadowColor = 'rgba(0,0,0,0.4)'
      ctx.shadowBlur = 4
      const maxLen = 12
      const label = opt.length > maxLen ? opt.slice(0, maxLen) + '…' : opt
      ctx.fillText(label, r - 12, 5)
      ctx.restore()
    })

    // Center circle
    ctx.beginPath()
    ctx.arc(cx, cy, 18, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.shadowColor = 'rgba(0,0,0,0.2)'
    ctx.shadowBlur = 8
    ctx.fill()

    // Pointer (triangle at top)
    ctx.save()
    ctx.translate(cx, 6)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-12, -20)
    ctx.lineTo(12, -20)
    ctx.closePath()
    ctx.fillStyle = '#1f2937'
    ctx.shadowColor = 'rgba(0,0,0,0.3)'
    ctx.shadowBlur = 4
    ctx.fill()
    ctx.restore()
  }, [options])

  useEffect(() => {
    drawWheel(currentRotation)
  }, [drawWheel, currentRotation, options])

  function beep(ctx: AudioContext) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  }

  function spin() {
    if (spinning || options.length < 2) return

    const winnerIdx = Math.floor(Math.random() * options.length)
    const segAngle = (2 * Math.PI) / options.length
    // Spin at least 5 full rotations + land on winner
    const targetAngle = currentRotation - (5 + Math.random() * 5) * 2 * Math.PI
      - (winnerIdx * segAngle + segAngle / 2)
      + (Math.PI / 2) // top of wheel

    setSpinning(true)
    setWinner(null)

    const startTime = performance.now()
    const duration = 4000
    const startRotation = currentRotation

    if (soundOn && !audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }

    let lastSegment = -1

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // cubic-bezier ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      const rotation = startRotation + (targetAngle - startRotation) * eased
      setCurrentRotation(rotation)

      // Sound on segment change
      if (soundOn && audioCtxRef.current) {
        const normalizedAngle = (((-rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI))
        const currentSeg = Math.floor(normalizedAngle / segAngle) % options.length
        if (currentSeg !== lastSegment) {
          beep(audioCtxRef.current)
          lastSegment = currentSeg
        }
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setSpinning(false)
        setWinner(options[winnerIdx])
        if (removeWinner) {
          setOptionsRaw(prev => {
            const lines = prev.split('\n').map(s => s.trim()).filter(Boolean)
            const idx = lines.findIndex(l => l === options[winnerIdx])
            if (idx !== -1) lines.splice(idx, 1)
            return lines.join('\n')
          })
        }
      }
    }

    animRef.current = requestAnimationFrame(animate)
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Wheel */}
        <div className="flex flex-col items-center flex-shrink-0">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="rounded-full shadow-xl"
          />
          <button
            onClick={spin}
            disabled={spinning || options.length < 2}
            className="mt-4 px-12 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 text-white text-lg font-bold transition-colors shadow-lg"
          >
            {spinning ? 'Spinning...' : 'SPIN'}
          </button>
          {winner && !spinning && (
            <div className="mt-4 text-center animate-scale-in">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Winner</div>
              <div className="text-3xl font-black text-violet-600 dark:text-violet-400">{winner}</div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            Options (one per line, max 20)
          </label>
          <textarea
            value={optionsRaw}
            onChange={e => { setOptionsRaw(e.target.value); setWinner(null) }}
            rows={8}
            placeholder={"Option 1\nOption 2\nOption 3"}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          />
          {options.length < 2 && (
            <p className="text-xs text-red-500 mt-1">Add at least 2 options</p>
          )}
          {options.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">{options.length} option{options.length !== 1 ? 's' : ''}</p>
          )}

          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={removeWinner} onChange={e => setRemoveWinner(e.target.checked)} className="accent-violet-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Remove winner after spin</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={soundOn} onChange={e => setSoundOn(e.target.checked)} className="accent-violet-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sound effect on spin</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
