'use client'

import dynamic from 'next/dynamic'

const RandomColorTool = dynamic(() => import('./RandomColorTool'), { ssr: false })

export default function RandomColorWrapper() {
  return <RandomColorTool />
}
