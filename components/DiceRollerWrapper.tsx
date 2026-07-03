'use client'

import dynamic from 'next/dynamic'

const DiceRollerTool = dynamic(() => import('./DiceRollerTool'), { ssr: false })

export default function DiceRollerWrapper() {
  return <DiceRollerTool />
}
