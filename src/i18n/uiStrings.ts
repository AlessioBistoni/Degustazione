import type { Locale } from './LocaleContext'

export type UiStrings = {
  eyebrow: string
  title: string
  lede: string
  close: string
  journeyLabel: string
  discover: string
  langSwitchToIt: string
  langSwitchToEn: string
  langCurrentIt: string
  langCurrentEn: string
  a11yBackdrop: string
}

export const UI: Record<Locale, UiStrings> = {
  it: {
    eyebrow: 'Degustazione privata',
    title: 'In assaggio stasera',
    lede: 'Tocca una bottiglia per seguire il percorso in calice.',
    close: 'Chiudi',
    journeyLabel: 'Percorso in calice',
    discover: 'Approfondisci',
    langSwitchToIt: 'Passa a italiano',
    langSwitchToEn: 'Switch to English',
    langCurrentIt: 'ITA',
    langCurrentEn: 'ENG',
    a11yBackdrop: 'Chiudi scheda',
  },
  en: {
    eyebrow: 'Private tasting',
    title: 'Tonight’s line-up',
    lede: 'Tap a bottle to follow the glass journey.',
    close: 'Close',
    journeyLabel: 'In the glass',
    discover: 'Learn more',
    langSwitchToIt: 'Passa a italiano',
    langSwitchToEn: 'Switch to English',
    langCurrentIt: 'ITA',
    langCurrentEn: 'ENG',
    a11yBackdrop: 'Close sheet',
  },
}
