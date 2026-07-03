'use client'

import dynamic from 'next/dynamic'

const RandomLetterTool = dynamic(() => import('./RandomLetterTool'), { ssr: false })

export default function RandomLetterWrapper() {
  return <RandomLetterTool />
}
