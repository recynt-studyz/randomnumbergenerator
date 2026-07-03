'use client'

import dynamic from 'next/dynamic'

const CoinFlipTool = dynamic(() => import('./CoinFlipTool'), { ssr: false })

export default function CoinFlipWrapper() {
  return <CoinFlipTool />
}
