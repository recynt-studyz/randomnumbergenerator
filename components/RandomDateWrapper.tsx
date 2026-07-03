'use client'

import dynamic from 'next/dynamic'

const RandomDateTool = dynamic(() => import('./RandomDateTool'), { ssr: false })

export default function RandomDateWrapper() {
  return <RandomDateTool />
}
