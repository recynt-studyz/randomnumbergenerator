'use client'

import dynamic from 'next/dynamic'

const NamePickerTool = dynamic(() => import('./NamePickerTool'), { ssr: false })

export default function NamePickerWrapper() {
  return <NamePickerTool />
}
