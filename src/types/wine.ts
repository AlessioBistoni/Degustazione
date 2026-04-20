export type WineId =
  | 'grechetto-blasi'
  | 'grechetto-casaioli'
  | 'travertino'
  | 'ciliegiolo-pilar'
  | 'marciliano'

export type WineLink = {
  label: string
  href: string
}

export type JourneyKind = 'terroir' | 'cellar' | 'glass' | 'service' | 'table'

export type JourneyStep = {
  kind: JourneyKind
  title: string
  body: string
}

export type WineSheetCopy = {
  name: string
  producer: string
  shortLabel: string
  journey: JourneyStep[]
  links: WineLink[]
  disclaimer: string
}

export type WineMeta = {
  id: WineId
  /** Percorso pubblico (es. `/wines/grechetto-blasi.png`) */
  bottleImage: string
}

export type WineViewModel = WineMeta & WineSheetCopy
