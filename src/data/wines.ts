import type { Locale } from '../i18n/LocaleContext'
import type { WineId, WineSheetCopy, WineViewModel } from '../types/wine'

/** Ordine di degustazione (dal rosé al rosso più strutturato). */
export const WINE_ORDER: WineId[] = ['asla-rosato', 'trebbiano-bocale', 'opra-madrevite']

const META: Pick<WineViewModel, 'id' | 'bottleImage'>[] = [
  { id: 'asla-rosato', bottleImage: '/wines/asla-rosato.png' },
  { id: 'trebbiano-bocale', bottleImage: '/wines/trebbiano-bocale.png' },
  { id: 'opra-madrevite', bottleImage: '/wines/opra-madrevite.png' },
]

const COPY: Record<WineId, { it: WineSheetCopy; en: WineSheetCopy }> = {
  'asla-rosato': {
    it: {
      name: 'Asla',
      producer: 'Leonardo Bussoletti',
      shortLabel: 'Ciliegiolo di Narni rosato · annata 2025 · bio',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'San Gemini e Narni: vigneti tra 230 e 290 m su terreni argilloso-calcarei di medio impasto, guyot, resa contenuta (circa 700–800 g per pianta). Ciliegiolo 100% in agricoltura biologica certificata — il rosato “Asla” è un omaggio alle Cronache di Narnia.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Vinificazione in bianco a grappolo intero; vendemmia manuale in cassette da 20 kg, fermentazione spontanea per circa venti giorni, poi affinamento sui depositi fini in acciaio a temperatura controllata per circa sei mesi. Grado indicativo: 12,5% vol.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Rosa tenue e luminoso; al naso pompelmo rosa, agrumi, leggere spezie e mineralità salina. In bocca è fresco, delicato e sapido — un rosato di beva immediata, con finale pulito e verticale.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Tra 8 e 10 °C, in calice medio. Non serve decantazione: l’annata giovane esprime subito profumi e freschezza.',
        },
      ],
      pairing: {
        dishName: 'Frittata con erbe selvatiche',
        dishTraits:
          'Uova morbide e burrose, note erbacee e leggermente amare delle erbe di campo, profilo sobrio senza sapori aggressivi. Texture compatta ma non pesante.',
        pairingWhy:
          'L’acidità del rosato taglia la ricchezza dell’uovo senza coprire le erbe; la mineralità e il pompelmo rosa rispecchiano la freschezza vegetale del piatto. Un abbinamento umbro “da merenda” che resta leggero e armonico.',
      },
      links: [
        {
          label: 'Asla Ciliegiolo Rosé — scheda ufficiale',
          href: 'https://www.leonardobussoletti.it/le-cronache-di-narnia/asla-ciliegiolo-rose/',
        },
      ],
      disclaimer:
        'Testi per la degustazione da materiali pubblici Bussoletti; l’annata in calice può variare.',
    },
    en: {
      name: 'Asla',
      producer: 'Leonardo Bussoletti',
      shortLabel: 'Ciliegiolo di Narni rosé · 2025 vintage · organic',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'San Gemini and Narni: vineyards at 230–290 m on medium-textured clay-limestone soils, cordon-trained, low yields (around 700–800 g per vine). 100% organic Ciliegiolo—the “Asla” rosé nods to The Chronicles of Narnia.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'White vinification of whole clusters; hand harvest in 20 kg crates, spontaneous fermentation for about twenty days, then ageing on fine lees in temperature-controlled stainless steel for roughly six months. Approx. 12.5% abv.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Pale, bright pink; pink grapefruit, citrus, gentle spice and saline minerality. Fresh, delicate and savoury on the palate—a drink-now rosé with a clean, vertical finish.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Serve at 8–10 °C in a medium glass. No decanting needed—the young vintage shows its aromatics right away.',
        },
      ],
      pairing: {
        dishName: 'Wild-herb frittata',
        dishTraits:
          'Soft, buttery eggs with herbal, slightly bitter field greens; restrained flavours and a compact but not heavy texture.',
        pairingWhy:
          'The rosé’s acidity cuts through the egg richness without masking the herbs; minerality and pink grapefruit echo the dish’s green freshness—a light, harmonious Umbrian pairing.',
      },
      links: [
        {
          label: 'Asla Ciliegiolo Rosé — official page',
          href: 'https://www.leonardobussoletti.it/le-cronache-di-narnia/asla-ciliegiolo-rose/',
        },
      ],
      disclaimer: 'Notes for this tasting from public Bussoletti materials; the vintage poured may differ.',
    },
  },
  'trebbiano-bocale': {
    it: {
      name: 'Trebbiano Spoletino',
      producer: 'Bocale',
      shortLabel: 'Spoleto DOC · annata 2023',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'Montefalco (PG): la famiglia Valentini recupera il Trebbiano spoletino autoctono su circa 9 ettari, di cui oltre 5 vitati. Vendemmia manuale nella prima decade di ottobre, in un paesaggio collinare dove il bianco esprime eleganza e capacità evolutiva.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Macerazione pellicolare a freddo 12–18 ore, chiarifica statica, fermentazione con lieviti indigeni a circa 18 °C, poi affinamento sui lieviti e sei mesi in acciaio. Giallo paglierino con riflessi verdolini.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Agrumi, pesca e foglia di pomodoro che evolvono verso note più speziate; bocca fresca, sapida, strutturata, con finale salino e rinfrescante. Un bianco “da pasto” con personalità.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Intorno ai 12–14 °C (la cantina indica anche ~18 °C per esprimere tutta la complessità). Bicchiere da bianco strutturato.',
        },
      ],
      pairing: {
        dishName: 'Tagliatelle al tartufo',
        dishTraits:
          'Pasta al burro o fonduta leggera, aroma intenso e umami del tartufo bianco, sapidità del parmigiano. Piatto aromatico ma non piccante, con grasso che avvolge il palato.',
        pairingWhy:
          'Struttura e sapidità del Trebbiano reggono l’umami del tartufo senza coprirlo; le note di foglia di pomodoro e il finale salino dialogano con burro e formaggio. È l’abbinamento classico umbro: bianco minerale e tartufo.',
      },
      links: [
        {
          label: 'Trebbiano Spoletino — Bocale',
          href: 'https://www.bocale.wine/prodotto/trebbiano-spoletino/',
        },
      ],
      disclaimer:
        'Testi sintetizzati da schede pubbliche Bocale; parametri possono variare per annata.',
    },
    en: {
      name: 'Trebbiano Spoletino',
      producer: 'Bocale',
      shortLabel: 'Spoleto DOC · 2023 vintage',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'Montefalco (PG): the Valentini family works indigenous Trebbiano Spoletino across roughly 9 hectares, over 5 under vine. Hand harvest in early October on hills where the white shows elegance and ageing potential.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'Cold skin maceration for 12–18 hours, static settling, indigenous yeast fermentation at around 18 °C, lees ageing and six months in stainless steel. Straw yellow with green hints.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Citrus, peach and tomato leaf evolving toward spicier notes; fresh, savoury, structured palate with a saline, refreshing finish—a food-friendly white with character.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Around 12–14 °C (the winery also suggests ~18 °C for full complexity). Use a generous white wine glass.',
        },
      ],
      pairing: {
        dishName: 'Tagliatelle with truffle',
        dishTraits:
          'Pasta with butter or a light sauce, intense white-truffle umami, savoury Parmesan. Aromatic but not spicy, with coating fat on the palate.',
        pairingWhy:
          'The wine’s structure and salinity support truffle umami without overpowering it; tomato-leaf notes and the saline finish match butter and cheese—the classic Umbrian white-and-truffle pairing.',
      },
      links: [
        {
          label: 'Trebbiano Spoletino — Bocale',
          href: 'https://www.bocale.wine/prodotto/trebbiano-spoletino/',
        },
      ],
      disclaimer: 'Summarised from public Bocale product pages; details may vary by vintage.',
    },
  },
  'opra-madrevite': {
    it: {
      name: 'Opra',
      producer: 'Madrevite',
      shortLabel: 'Gamay del Trasimeno DOC · annata 2024',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'Castiglione del Lago, riva del Trasimeno: vigneti a 320 m, esposizione sud-ovest, guyot ad alta densità. Il Gamay del Trasimeno è un biotipo storico di Grenache, coltivato da secoli sul lago — viticoltura sostenibile senza vigneto “monocultura”.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Fermentazione spontanea senza lieviti aggiunti, macerazione variabile per annata; la cantina sperimenta anche un governo all’uso toscano per intensificare frutto e spezie. Dieci mesi in cemento, poi almeno tre in bottiglia. Grado indicativo: 13% vol.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Rubino vivo; prugna, amarena, macchia mediterranea e chiodo di garofano. Sorso fragrante, scorrevole, tannini fini e setosi, finale di ciliegia croccante — rosso beverino e moderno.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Leggermente fresco, 14–16 °C, per esaltare freschezza e fragranza. Versatile da primi a carni leggere.',
        },
      ],
      pairing: {
        dishName: 'Pollo all’arrabbiata',
        dishTraits:
          'Pollo tenero, sugo di pomodoro piccante con aglio e peperoncino, sapidità e calore aromatico. Piatto succoso, con acidità del pomodoro e una nota “piccante” che chiede equilibrio.',
        pairingWhy:
          'Il Gamay porta frutto rosso e spezie senza tannini grezzi: l’acidità bilancia il pomodoro, la morbidezza del sorso mitiga il peperoncino. Un rosso leggero che non compete col piccante — accompagna invece di sovrastare.',
      },
      links: [
        {
          label: 'Opra — scheda Madrevite',
          href: 'https://www.madrevite.it/prodotto/opra/',
        },
      ],
      disclaimer:
        'Testi per la degustazione da materiali pubblici Madrevite; l’annata in calice può variare.',
    },
    en: {
      name: 'Opra',
      producer: 'Madrevite',
      shortLabel: 'Gamay del Trasimeno DOC · 2024 vintage',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'Castiglione del Lago on Lake Trasimeno: vineyards at 320 m, south-west exposure, high-density guyot. Gamay del Trasimeno is a historic Grenache biotype grown for centuries on the lake—sustainable viticulture in a biodiverse landscape.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'Spontaneous fermentation with indigenous yeasts, vintage-dependent maceration; the winery also experiments with governo all’uso toscano for extra fruit and spice. Ten months in concrete, then at least three in bottle. Approx. 13% abv.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Bright ruby; plum, sour cherry, Mediterranean scrub and clove. Fragrant, flowing palate, fine silky tannins, crisp cherry finish—a juicy, modern red.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Serve slightly cool, 14–16 °C, to highlight freshness and fragrance. Works from pasta to lighter meats.',
        },
      ],
      pairing: {
        dishName: 'Arrabbiata chicken',
        dishTraits:
          'Tender chicken in a spicy tomato sauce with garlic and chilli; savoury, warm aromatics. Juicy on the plate, with tomato acidity and heat that need balance.',
        pairingWhy:
          'Gamay brings red fruit and spice without harsh tannins: acidity matches the tomato, the soft palate eases the chilli. A light red that doesn’t fight the heat—it accompanies rather than overwhelms.',
      },
      links: [
        {
          label: 'Opra — Madrevite product page',
          href: 'https://www.madrevite.it/prodotto/opra/',
        },
      ],
      disclaimer: 'Notes for this tasting from public Madrevite materials; the vintage poured may differ.',
    },
  },
}

export function getWines(locale: Locale): WineViewModel[] {
  return META.map((m) => ({
    ...m,
    ...COPY[m.id][locale],
  }))
}
