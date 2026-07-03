'use client'

import dynamic from 'next/dynamic'

const SpinWheelTool = dynamic(() => import('./SpinWheelTool'), { ssr: false })

export default function SpinWheelWrapper() {
  return <SpinWheelTool />
}
