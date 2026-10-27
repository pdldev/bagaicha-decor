import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  return new ImageResponse(
    <div style={{ background: '#faf6ef', color: '#2a211c', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', width: '1200px', height: '630px', fontFamily: 'serif' }}>
      <div style={{ color: '#7b2d3b', fontSize: 28 }}>Bagaicha · Pokhara</div>
      <div style={{ fontSize: 76, marginTop: 24 }}>{slug.join(' / ')}</div>
      <div style={{ color: '#d98e04', fontSize: 24, marginTop: 32 }}>Flower decor and events</div>
    </div>,
  )
}
