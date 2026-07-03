'use client'

import dynamic from 'next/dynamic'

const TeamGeneratorTool = dynamic(() => import('./TeamGeneratorTool'), { ssr: false })

export default function TeamGeneratorWrapper() {
  return <TeamGeneratorTool />
}
