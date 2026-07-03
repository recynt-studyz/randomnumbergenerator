'use client'

import dynamic from 'next/dynamic'

const YesOrNoTool = dynamic(() => import('./YesOrNoTool'), { ssr: false })

export default function YesOrNoWrapper() {
  return <YesOrNoTool />
}
