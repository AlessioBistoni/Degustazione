import type { ReactNode } from 'react'
import type { JourneyKind } from '../types/wine'

type IconProps = { className?: string }

function IconFrame({ children, className }: IconProps & { children: ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      {children}
    </svg>
  )
}

export function JourneyIcon({ kind, className }: { kind: JourneyKind; className?: string }) {
  const stroke = 'currentColor'
  const sw = 1.45
  switch (kind) {
    case 'terroir':
      return (
        <IconFrame className={className}>
          <path
            d="M4 18 L8 10 L12 14 L16 8 L20 12"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4 18 H20" stroke={stroke} strokeWidth={sw} strokeLinecap="round" opacity={0.45} />
        </IconFrame>
      )
    case 'cellar':
      return (
        <IconFrame className={className}>
          <path
            d="M7 20 V10 L12 7 L17 10 V20"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M9 20 V14 H15 V20" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </IconFrame>
      )
    case 'glass':
      return (
        <IconFrame className={className}>
          <path
            d="M8 4 H16 L14 18 C14 19.1 13.1 20 12 20 C10.9 20 10 19.1 10 18 L8 4 Z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M9 8 H15" stroke={stroke} strokeWidth={sw} strokeLinecap="round" opacity={0.45} />
        </IconFrame>
      )
    case 'service':
      return (
        <IconFrame className={className}>
          <path
            d="M12 5 C9 8 7 11 7 14 A5 5 0 0 0 17 14 C17 11 15 8 12 5Z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M10 17 H14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </IconFrame>
      )
    default:
      return null
  }
}
