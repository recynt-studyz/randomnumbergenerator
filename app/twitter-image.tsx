import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Random Number Generator & Random Tools'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', marginBottom: 28 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="68" height="68" rx="12" stroke="white" strokeWidth="5" />
            <circle cx="26" cy="26" r="7" fill="white" />
            <circle cx="54" cy="26" r="7" fill="white" />
            <circle cx="40" cy="40" r="7" fill="white" />
            <circle cx="26" cy="54" r="7" fill="white" />
            <circle cx="54" cy="54" r="7" fill="white" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 18,
            maxWidth: 900,
          }}
        >
          Random Number Generator &amp; Random Tools
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.78)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          Coin flip, dice roller, password generator, name picker and more. Free, instant, private.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', 'Instant', 'Private', 'No Signup'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(124,58,237,0.35)',
                border: '1px solid rgba(167,139,250,0.5)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
