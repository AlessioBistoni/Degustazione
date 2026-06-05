import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { useLocale } from '../i18n/LocaleContext'
import { UI } from '../i18n/uiStrings'
import type { WineViewModel } from '../types/wine'
import { JourneyIcon } from './JourneyIcons'

type Props = {
  wine: WineViewModel | null
  onClose: () => void
}

const SLIDE_COUNT = 3
const SWIPE_LOCK_PX = 8
const SWIPE_TRIGGER_PX = 34

type CarouselSwipe = {
  pointerId: number
  startX: number
  startY: number
  lastX: number
  lastY: number
  startOffset: number
  startIndex: number
  lock: 'horizontal' | 'vertical' | null
}

const listParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 12 },
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
  if (el?.closest('button, a, [data-no-drag], .sheet-carousel')) return
  dragControls.start(e)
}

export function WineDetailSheet({ wine, onClose }: Props) {
  const { locale } = useLocale()
  const t = UI[locale]
  const dragControls = useDragControls()
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const carouselSwipeRef = useRef<CarouselSwipe | null>(null)
  const slideIndexRef = useRef(0)
  const suppressCarouselClickRef = useRef(false)
  const [slideIndex, setSlideIndex] = useState(0)

  const dragConstraints = useMemo(
    () => ({
      top: 0 as const,
      bottom: Math.max(320, Math.round((typeof window !== 'undefined' ? window.innerHeight : 780) * 0.58)),
    }),
    [],
  )

  const applyCarouselOffset = useCallback((offset: number, animated: boolean) => {
    const track = carouselTrackRef.current
    if (!track) return
    track.style.transition = animated ? '' : 'none'
    track.style.transform = `translate3d(${offset}px, 0, 0)`
  }, [])

  const setActiveSlide = useCallback((index: number, animated = true) => {
    const next = Math.min(SLIDE_COUNT - 1, Math.max(0, index))
    slideIndexRef.current = next
    setSlideIndex(next)
    const width = carouselRef.current?.clientWidth ?? 0
    if (width) applyCarouselOffset(-next * width, animated)
    return next
  }, [applyCarouselOffset])

  const goToSlide = useCallback((index: number) => {
    const el = carouselRef.current
    if (!el) return
    el.classList.remove('sheet-carousel-dragging')
    setActiveSlide(index)
  }, [setActiveSlide])

  const onCarouselPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return
    const target = e.target as HTMLElement | null
    if (target?.closest('button')) return
    const el = carouselRef.current
    if (!el || el.clientWidth === 0) return
    const startIndex = slideIndexRef.current
    carouselSwipeRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      startOffset: -startIndex * el.clientWidth,
      startIndex,
      lock: null,
    }
  }, [])

  const onCarouselPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const swipe = carouselSwipeRef.current
    const el = carouselRef.current
    if (!swipe || !el || swipe.pointerId !== e.pointerId) return

    const dx = e.clientX - swipe.startX
    const dy = e.clientY - swipe.startY
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    if (!swipe.lock && Math.max(absX, absY) >= SWIPE_LOCK_PX) {
      swipe.lock = absX > absY * 0.9 ? 'horizontal' : 'vertical'
      if (swipe.lock === 'horizontal') {
        el.classList.add('sheet-carousel-dragging')
        e.currentTarget.setPointerCapture(e.pointerId)
      } else {
        el.classList.remove('sheet-carousel-dragging')
      }
    }

    swipe.lastX = e.clientX
    swipe.lastY = e.clientY

    if (swipe.lock !== 'horizontal') {
      return
    }
    e.preventDefault()
    const width = el.clientWidth
    const minOffset = -(SLIDE_COUNT - 1) * width
    let offset = swipe.startOffset + dx
    if (offset > 0) offset *= 0.28
    if (offset < minOffset) offset = minOffset + (offset - minOffset) * 0.28
    applyCarouselOffset(offset, false)
  }, [applyCarouselOffset])

  const finishCarouselSwipe = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const swipe = carouselSwipeRef.current
    const el = carouselRef.current
    if (!swipe || !el || swipe.pointerId !== e.pointerId) return

    carouselSwipeRef.current = null
    el.classList.remove('sheet-carousel-dragging')

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }

    if (swipe.lock !== 'horizontal') return

    const dx = swipe.lastX - swipe.startX
    const next =
      Math.abs(dx) >= SWIPE_TRIGGER_PX
        ? swipe.startIndex + (dx < 0 ? 1 : -1)
        : swipe.startIndex
    suppressCarouselClickRef.current = true
    window.setTimeout(() => {
      suppressCarouselClickRef.current = false
    }, 140)
    goToSlide(next)
  }, [goToSlide])

  const onCarouselClickCapture = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!suppressCarouselClickRef.current) return
    e.preventDefault()
    e.stopPropagation()
  }, [])

  useEffect(() => {
    if (!wine) return
    setActiveSlide(0, false)
  }, [setActiveSlide, wine?.id])

  useEffect(() => {
    const onResize = () => setActiveSlide(slideIndexRef.current, false)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [setActiveSlide])

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
            className="sheet sheet-carousel-mode"
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

              <header className="sheet-head sheet-head-compact">
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
              ref={carouselRef}
              className="sheet-carousel"
              data-no-drag
              aria-label={t.a11yCarousel}
              onPointerDown={onCarouselPointerDown}
              onPointerMove={onCarouselPointerMove}
              onPointerUp={finishCarouselSwipe}
              onPointerCancel={finishCarouselSwipe}
              onClickCapture={onCarouselClickCapture}
            >
              <div ref={carouselTrackRef} className="sheet-carousel-track">
                <section className="sheet-panel sheet-panel-cover" aria-label={t.slideCover}>
                  <div className="sheet-cover-stage">
                    <img
                      className="sheet-cover-bottle"
                      src={wine.bottleImage}
                      alt=""
                      decoding="async"
                    />
                    <div className="sheet-cover-veil" aria-hidden />
                    <div className="sheet-cover-caption">
                      <p className="sheet-cover-name">{wine.name}</p>
                      <p className="sheet-cover-pairing-teaser">{wine.pairing.dishName}</p>
                    </div>
                  </div>
                </section>

                <section className="sheet-panel sheet-panel-scroll" aria-label={t.slideWine}>
                  <div className="sheet-panel-inner">
                    <p className="journey-eyebrow">{t.journeyLabel}</p>
                    <motion.ol
                      className="journey"
                      variants={listParent}
                      initial="hidden"
                      animate="show"
                      key={locale + wine.id + '-wine'}
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
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-pill"
                          >
                            <span className="link-pill-text">{l.label}</span>
                            <span className="link-pill-arrow" aria-hidden>
                              ↗
                            </span>
                          </a>
                        ))}
                      </div>
                    </section>
                  </div>
                </section>

                <section className="sheet-panel sheet-panel-scroll" aria-label={t.slidePairing}>
                  <div className="sheet-panel-inner">
                    <p className="journey-eyebrow">{t.pairingLabel}</p>
                    <article className="pairing-card pairing-card-hero">
                      <h3 className="pairing-dish-title">{wine.pairing.dishName}</h3>
                    </article>
                    <article className="pairing-card">
                      <h4 className="pairing-subheading">{t.pairingDishHeading}</h4>
                      <p className="pairing-body">{wine.pairing.dishTraits}</p>
                    </article>
                    <article className="pairing-card pairing-card-accent">
                      <h4 className="pairing-subheading">{t.pairingWhyHeading}</h4>
                      <p className="pairing-body">{wine.pairing.pairingWhy}</p>
                    </article>
                    <p className="sheet-note">{wine.disclaimer}</p>
                  </div>
                </section>
              </div>
            </div>

            <div className="sheet-carousel-footer" data-no-drag>
              <div className="sheet-dots" role="tablist" aria-label={t.a11yCarousel}>
                {[t.slideCover, t.slideWine, t.slidePairing].map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={slideIndex === i}
                    aria-label={label}
                    className={`sheet-dot${slideIndex === i ? ' sheet-dot-active' : ''}`}
                    onClick={() => goToSlide(i)}
                  />
                ))}
              </div>
              {slideIndex === 0 && <p className="sheet-swipe-hint">{t.swipeHint}</p>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
