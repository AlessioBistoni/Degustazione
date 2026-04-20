import { useLocale } from '../i18n/LocaleContext'
import { UI } from '../i18n/uiStrings'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const s = UI[locale]

  return (
    <div className="lang-toggle" role="group" aria-label={locale === 'it' ? 'Lingua' : 'Language'}>
      <button
        type="button"
        className="lang-toggle-btn"
        aria-pressed={locale === 'it'}
        onClick={() => setLocale('it')}
        title={s.langSwitchToIt}
      >
        {s.langCurrentIt}
      </button>
      <button
        type="button"
        className="lang-toggle-btn"
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
        title={s.langSwitchToEn}
      >
        {s.langCurrentEn}
      </button>
    </div>
  )
}
