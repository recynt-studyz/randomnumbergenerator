'use client'

import dynamic from 'next/dynamic'

const RandomNumberTool = dynamic(() => import('./RandomNumberTool'), { ssr: false })

export default function RandomNumberWrapper() {
  return <RandomNumberTool />
}
