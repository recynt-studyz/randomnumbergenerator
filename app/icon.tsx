import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="22" height="22" rx="4" stroke="white" strokeWidth="2.5" />
          <circle cx="9" cy="9" r="2" fill="white" />
          <circle cx="19" cy="9" r="2" fill="white" />
          <circle cx="14" cy="14" r="2" fill="white" />
          <circle cx="9" cy="19" r="2" fill="white" />
          <circle cx="19" cy="19" r="2" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
