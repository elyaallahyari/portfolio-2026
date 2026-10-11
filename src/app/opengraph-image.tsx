import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'Elya Allahyari — I design the human side of AI.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type DisplayFont = {
  name: string
  data: ArrayBuffer
  weight: 400 | 700
  style: 'normal'
}

function hasValidFontSignature(buf: Buffer): boolean {
  if (buf.length < 12) return false
  const sig = buf.subarray(0, 4).toString('latin1')
  return sig === '\x00\x01\x00\x00' || sig === 'OTTO' || sig === 'true' || sig === 'ttcf'
}

function loadDisplayFont(): DisplayFont | undefined {
  const candidates = [
    'public/fonts/SpaceGrotesk-Bold.ttf',
    'public/fonts/SpaceGrotesk-VF.ttf',
    'public/fonts/SpaceGrotesk-Regular.ttf'
  ]
  for (const rel of candidates) {
    try {
      const buf = fs.readFileSync(path.join(process.cwd(), rel))
      if (!hasValidFontSignature(buf)) {
        console.warn(`[og] skipping invalid font file (bad signature): ${rel}`)
        continue
      }
      return {
        name: 'Space Grotesk',
        data: new Uint8Array(buf).buffer as ArrayBuffer,
        weight: 700 as const,
        style: 'normal' as const
      }
    } catch {}
  }
  console.warn('[og] no valid TTF found in public/fonts/ — rendering with the default font')
  return undefined
}

export default async function Image() {
  const font = loadDisplayFont()

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 96px',
        backgroundColor: '#0b0c0e',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -180,
          right: -140,
          width: 620,
          height: 620,
          borderRadius: 9999,
          backgroundImage:
            'radial-gradient(closest-side, rgba(125,211,192,0.16), rgba(125,211,192,0))',
          display: 'flex'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -220,
          left: -120,
          width: 560,
          height: 560,
          borderRadius: 9999,
          backgroundImage:
            'radial-gradient(closest-side, rgba(255,107,74,0.12), rgba(255,107,74,0))',
          display: 'flex'
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          color: '#9c9789',
          fontSize: 28,
          marginBottom: 40
        }}
      >
        <span>Elya Allahyari</span>
        <span aria-hidden>·</span>
        <span>Frontend engineer, human-centered AI</span>
      </div>

      <div
        style={{
          display: 'flex',
          maxWidth: 1000,
          fontSize: 96,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: '#f4f1ea',
          fontWeight: 700
        }}
      >
        I design the human side of AI
        <span style={{ color: '#ff6b4a' }}>.</span>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: 56,
          color: '#7dd3c0',
          fontSize: 30
        }}
      >
        elyaallahyari.com
      </div>
    </div>,
    {
      ...size,
      ...(font ? { fonts: [font] } : {})
    }
  )
}
