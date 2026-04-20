import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { getWines } from './data/wines'
import type { WineId } from './types/wine'
import { useLocale } from './i18n/LocaleContext'
import { UI } from './i18n/uiStrings'
import { LanguageToggle } from './components/LanguageToggle'
import { WineDetailSheet } from './components/WineDetailSheet'
import './App.css'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 28 },
  },
}

function App() {
  const { locale } = useLocale()
  const t = UI[locale]
  const wines = useMemo(() => getWines(locale), [locale])
  const [selectedId, setSelectedId] = useState<WineId | null>(null)
  const selected = useMemo(
    () => (selectedId ? wines.find((w) => w.id === selectedId) ?? null : null),
    [selectedId, wines],
  )

  return (
    <div className="page">
      <div className="topbar">
        <LanguageToggle />
      </div>

      <motion.header
        className="hero"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
      </motion.header>

      <motion.div
        className="grid"
        variants={container}
        initial="hidden"
        animate="show"
        key={locale}
      >
        {wines.map((wine) => (
          <motion.button
            key={wine.id}
            type="button"
            className="wine-card"
            variants={item}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedId(wine.id)}
          >
            <div className="wine-card-glow" aria-hidden />
            <div className="wine-bottle-slot">
              <img
                className="wine-bottle-img"
                src={wine.bottleImage}
                alt={`${wine.name} — ${wine.producer}`}
                decoding="async"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="wine-meta">
              <span className="wine-name">{wine.name}</span>
              <span className="wine-producer">{wine.producer}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <WineDetailSheet wine={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}

export default App
