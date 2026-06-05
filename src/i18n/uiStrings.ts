import type { Locale } from './LocaleContext'

export type UiStrings = {
  eyebrow: string
  title: string
  lede: string
  close: string
  journeyLabel: string
  pairingLabel: string
  pairingDishHeading: string
  pairingWhyHeading: string
  discover: string
  swipeHint: string
  slideCover: string
  slideWine: string
  slidePairing: string
  langSwitchToIt: string
  langSwitchToEn: string
  langCurrentIt: string
  langCurrentEn: string
  a11yBackdrop: string
  a11yCarousel: string
}

export const UI: Record<Locale, UiStrings> = {
  it: {
    eyebrow: 'Degustazione privata',
    title: 'In assaggio stasera',
    lede: 'Tocca una bottiglia: scorri le schede per il vino e l’abbinamento in cucina.',
    close: 'Chiudi',
    journeyLabel: 'Il vino',
    pairingLabel: 'In tavola',
    pairingDishHeading: 'Il piatto',
    pairingWhyHeading: 'Perché insieme',
    discover: 'Approfondisci',
    swipeHint: 'Scorri verso sinistra',
    slideCover: 'Intro',
    slideWine: 'Vino',
    slidePairing: 'Abbinamento',
    langSwitchToIt: 'Passa a italiano',
    langSwitchToEn: 'Switch to English',
    langCurrentIt: 'ITA',
    langCurrentEn: 'ENG',
    a11yBackdrop: 'Chiudi scheda',
    a11yCarousel: 'Schede vino e abbinamento',
  },
  en: {
    eyebrow: 'Private tasting',
    title: 'Tonight’s line-up',
    lede: 'Tap a bottle, then swipe through the wine notes and the paired dish.',
    close: 'Close',
    journeyLabel: 'The wine',
    pairingLabel: 'At the table',
    pairingDishHeading: 'The dish',
    pairingWhyHeading: 'Why they work',
    discover: 'Learn more',
    swipeHint: 'Swipe left',
    slideCover: 'Intro',
    slideWine: 'Wine',
    slidePairing: 'Pairing',
    langSwitchToIt: 'Passa a italiano',
    langSwitchToEn: 'Switch to English',
    langCurrentIt: 'ITA',
    langCurrentEn: 'ENG',
    a11yBackdrop: 'Close sheet',
    a11yCarousel: 'Wine and pairing slides',
  },
}
