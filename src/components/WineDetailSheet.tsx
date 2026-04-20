import { useEffect, useMemo, type PointerEvent } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { useLocale } from '../i18n/LocaleContext'
import { UI } from '../i18n/uiStrings'
import type { WineViewModel } from '../types/wine'
import { JourneyIcon } from './JourneyIcons'

type Props = {
  wine: WineViewModel | null
  onClose: () => void
}

const listParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 420, damping: 32 },
  },
}

function startSheetDrag(
  dragControls: ReturnType<typeof useDragControls>,
  e: PointerEvent<HTMLElement>,
) {
  const el = e.target as HTMLElement | null
  if (el?.closest('button, a, [data-no-drag]')) return
  dragControls.start(e)
}

export function WineDetailSheet({ wine, onClose }: Props) {
  const { locale } = useLocale()
  const t = UI[locale]
  const dragControls = useDragControls()

  const dragConstraints = useMemo(
    () => ({
      top: 0 as const,
      bottom: Math.max(320, Math.round((typeof window !== 'undefined' ? window.innerHeight : 780) * 0.58)),
    }),
    [],
  )

  useEffect(() => {
    if (!wine) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [wine, onClose])

  return (
    <AnimatePresence mode="sync">
      {wine && (
        <>
          <motion.button
            key={`${wine.id}-bd`}
            type="button"
            className="sheet-backdrop"
            aria-label={t.a11yBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
          />
          <motion.div
            key={`${wine.id}-sh`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`wine-title-${wine.id}`}
            className="sheet"
            initial={{ y: '108%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '108%', opacity: 0.5 }}
            transition={{ type: 'spring', stiffness: 420, damping: 38, mass: 0.85 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={dragConstraints}
            dragElastic={{ top: 0.06, bottom: 0.28 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              const { offset, velocity } = info
              if (offset.y > 96 || velocity.y > 520) onClose()
            }}
          >
            <div
              className="sheet-pull-zone"
              onPointerDown={(e) => startSheetDrag(dragControls, e)}
            >
              <div className="sheet-handle-wrap" aria-hidden>
                <span className="sheet-handle" />
              </div>

              <header className="sheet-head sheet-head-rich sheet-head-with-bottle">
                <div className="sheet-bottle-hero" aria-hidden>
                  <img className="sheet-bottle-hero-img" src={wine.bottleImage} alt="" decoding="async" />
                </div>
                <div className="sheet-head-main">
                  <div className="sheet-head-text">
                    <p className="sheet-kicker">{wine.producer}</p>
                    <h2 id={`wine-title-${wine.id}`} className="sheet-title">
                      {wine.name}
                    </h2>
                    <p className="sheet-sub">{wine.shortLabel}</p>
                  </div>
                  <button type="button" className="sheet-close" data-no-drag onClick={onClose}>
                    {t.close}
                  </button>
                </div>
              </header>
            </div>

            <div
              className="sheet-drag-edge"
              aria-hidden
              onPointerDown={(e) => startSheetDrag(dragControls, e)}
            />

            <div className="sheet-body sheet-body-rich">
              <p className="journey-eyebrow">{t.journeyLabel}</p>

              <motion.ol
                className="journey"
                variants={listParent}
                initial="hidden"
                animate="show"
                key={locale + wine.id}
              >
                {wine.journey.map((step, index) => (
                  <motion.li key={step.kind + index} className="journey-step" variants={listItem}>
                    <div className="journey-rail" aria-hidden>
                      <span className="journey-node">{index + 1}</span>
                      {index < wine.journey.length - 1 && <span className="journey-line" />}
                    </div>
                    <article className="journey-card">
                      <div className="journey-card-top">
                        <span className="journey-icon-wrap">
                          <JourneyIcon kind={step.kind} className="journey-icon" />
                        </span>
                        <h3 className="journey-title">{step.title}</h3>
                      </div>
                      <p className="journey-body">{step.body}</p>
                    </article>
                  </motion.li>
                ))}
              </motion.ol>

              <section className="sheet-links-rich">
                <h3 className="sheet-links-heading">{t.discover}</h3>
                <div className="link-row">
                  {wine.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener" className="link-pill">
                      <span className="link-pill-text">{l.label}</span>
                      <span className="link-pill-arrow" aria-hidden>
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              <p className="sheet-note">{wine.disclaimer}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
