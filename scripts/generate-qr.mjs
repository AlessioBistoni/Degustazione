#!/usr/bin/env node
/**
 * Genera un QR PNG con l’icona calice (public/favicon.svg) al centro (correzione errori H).
 *
 * Uso:
 *   npm run qr -- "https://tuo-sito.vercel.app"
 *   npm run qr   (usa DEGUSTAZIONE_QR_URL dal .env o placeholder)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import QRCode from 'qrcode'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outPath = join(root, 'public', 'qr-degustazione.png')

const defaultUrl = 'https://example.com'
const url =
  process.argv.slice(2).join(' ').trim() ||
  process.env.DEGUSTAZIONE_QR_URL ||
  defaultUrl

if (url === defaultUrl) {
  console.warn(
    '[qr] Nessun URL passato: uso placeholder. Esempio: npm run qr -- "https://tuo-progetto.vercel.app"',
  )
}

const size = 1200
const qrBuffer = await QRCode.toBuffer(url, {
  errorCorrectionLevel: 'H',
  type: 'png',
  width: size,
  margin: 2,
  color: { dark: '#0d0d12', light: '#ffffff' },
})

const iconPath = join(root, 'public', 'favicon.svg')
if (!existsSync(iconPath)) {
  console.error('[qr] Manca', iconPath)
  process.exit(1)
}

const centerSize = Math.round(size * 0.24)
const centerPng = await sharp(readFileSync(iconPath), { density: 300 })
  .resize(centerSize, centerSize, { fit: 'contain', background: '#ffffff' })
  .png()
  .toBuffer()

const left = Math.floor((size - centerSize) / 2)
const top = Math.floor((size - centerSize) / 2)

const final = await sharp(qrBuffer)
  .composite([{ input: centerPng, left, top }])
  .png()
  .toBuffer()

writeFileSync(outPath, final)
console.log('[qr] OK →', outPath)
console.log('[qr] URL codificato:', url)
