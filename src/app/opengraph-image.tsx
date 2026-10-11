// → app/opengraph-image.tsx  (replace entirely)
// satori requires .ttf/.otf and rejects woff2 — and crashes on ANY invalid file.
// Rules learned the hard way:
//   1. validate the OpenType signature before handing bytes to satori
//   2. NEVER pass fonts: [] — omit the key entirely so next/og uses its default
//   3. make the fallback visible (console.warn), not silent
import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = 'Elya Allahyari — I design the human side of AI.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type DisplayFont = {
  name: string
  data: ArrayBuffer
  weight: 400 | 700 // mirror satori's Weight union, not a loose number
  style: 'normal'
}

// Valid sfnt signatures: 00 01 00 00 (TrueType), OTTO (CFF), true, ttcf
function hasValidFontSignature(buf: Buffer): boolean {
  if (buf.length < 12) return false
  const sig = buf.subarray(0, 4).toString('latin1')
  return sig === '\x00\x01\x00\x00' || sig === 'OTTO' || sig === 'true' || sig === 'ttcf'
}

function loadDisplayFont(): DisplayFont | undefined {
  const candidates = [
    'public/fonts/SpaceGrotesk-Bold.ttf', // static bold — best result
    'public/fonts/SpaceGrotesk-VF.ttf', // variable TTF (renders default weight)
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
        weight: 700 as const, // literal — satisfies Weight
        style: 'normal' as const
      }
    } catch {
      // file missing — try the next candidate
    }
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
      {/* subtle teal glow — radial gradient instead of blur (satori-safe) */}
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
      {/* faint coral counter-glow */}
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

      {/* byline */}
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

      {/* the line */}
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

      {/* site url */}
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
      // omit the key entirely when no font — `fonts: []` crashes satori
      ...(font ? { fonts: [font] } : {})
    }
  )
}
