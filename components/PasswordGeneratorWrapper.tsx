'use client'

import dynamic from 'next/dynamic'

const PasswordGeneratorTool = dynamic(() => import('./PasswordGeneratorTool'), { ssr: false })

export default function PasswordGeneratorWrapper() {
  return <PasswordGeneratorTool />
}
