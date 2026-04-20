import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'it' | 'en'

const STORAGE_KEY = 'degustazione-locale'

type Ctx = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<Ctx | null>(null)

function readStored(): Locale | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'it' || v === 'en') return v
  } catch {
    /* ignore */
  }
  return null
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStored() ?? 'it')

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'it' ? 'en' : 'it')
  }, [locale, setLocale])

  useEffect(() => {
    document.documentElement.lang = locale === 'it' ? 'it' : 'en'
  }, [locale])

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

/** Hook accoppiato a `LocaleProvider` nello stesso entrypoint del contesto. */
// eslint-disable-next-line react-refresh/only-export-components -- provider + hook
export function useLocale() {
  const c = useContext(LocaleContext)
  if (!c) throw new Error('useLocale must be used within LocaleProvider')
  return c
}
