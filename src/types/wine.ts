export type WineId = 'asla-rosato' | 'trebbiano-bocale' | 'opra-madrevite'

export type WineLink = {
  label: string
  href: string
}

export type JourneyKind = 'terroir' | 'cellar' | 'glass' | 'service'

export type JourneyStep = {
  kind: JourneyKind
  title: string
  body: string
}

export type FoodPairingCopy = {
  dishName: string
  /** Caratteristiche del piatto (sapori, texture, ingredienti). */
  dishTraits: string
  /** Perché funziona con questo vino. */
  pairingWhy: string
}

export type WineSheetCopy = {
  name: string
  producer: string
  shortLabel: string
  journey: JourneyStep[]
  pairing: FoodPairingCopy
  links: WineLink[]
  disclaimer: string
}

export type WineMeta = {
  id: WineId
  /** Percorso pubblico (es. `/wines/asla-rosato.png`) */
  bottleImage: string
}

export type WineViewModel = WineMeta & WineSheetCopy
