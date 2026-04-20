import type { Locale } from '../i18n/LocaleContext'
import type { WineId, WineSheetCopy, WineViewModel } from '../types/wine'

/** Ordine di degustazione (dall’aperitivo al rosso strutturato). */
export const WINE_ORDER: WineId[] = [
  'grechetto-blasi',
  'grechetto-casaioli',
  'travertino',
  'ciliegiolo-pilar',
  'marciliano',
]

const META: Pick<WineViewModel, 'id' | 'bottleImage'>[] = [
  { id: 'grechetto-blasi', bottleImage: '/wines/grechetto-blasi.png' },
  { id: 'grechetto-casaioli', bottleImage: '/wines/grechetto-casaioli.png' },
  { id: 'travertino', bottleImage: '/wines/travertino.png' },
  { id: 'ciliegiolo-pilar', bottleImage: '/wines/ciliegiolo-pilar.png' },
  { id: 'marciliano', bottleImage: '/wines/marciliano.png' },
]

const COPY: Record<WineId, { it: WineSheetCopy; en: WineSheetCopy }> = {
  'grechetto-blasi': {
    it: {
      name: 'Grechetto',
      producer: 'Cantina Blasi',
      shortLabel: 'Umbria · annata 2024',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'Umbertide, tra le pieghe appenniniche del Perugino: suoli argillosi e vigneti tra 300 e 450 m s.l.m. Il Grechetto — vitigno umbro — è allevato a cordone speronato in un microclima fresco e luminoso.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Fermentazione alcolica lenta a basse temperature (14–16 °C) per circa quindici giorni in acciaio; malolattica non svolta per preservare verticalità. Passaggio su fecce fini, poi affinamento in bottiglia. Grado indicativo: 13% vol.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Bianco di medio corpo, armonico: polpa bianca, agrumi e acidità che dà slancio. Ottimo filo conduttore per aprire la serata.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Tra 6 e 8 °C. Buon margine di evoluzione in bottiglia (indicativamente 3–4 anni) restando bevibile.',
        },
        {
          kind: 'table',
          title: 'A tavola',
          body: 'Aperitivi, antipasti leggeri, primi vegetariani, pesce al forno — “luce” prima dei rossi.',
        },
      ],
      links: [{ label: 'Grechetto — scheda prodotto', href: 'https://www.blasicantina.it/grechetto-umbria/' }],
      disclaimer:
        'Testi per la degustazione da materiali pubblici; l’annata in calice può variare.',
    },
    en: {
      name: 'Grechetto',
      producer: 'Cantina Blasi',
      shortLabel: 'Umbria · 2024 vintage',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'Umbertide, in the Perugia hills: clay soils and vineyards between 300 and 450 m a.s.l. Grechetto is trained cordon-spur in a bright, cool climate.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'Slow cool fermentation (14–16 °C) for about fifteen days in stainless steel; no malolactic to keep freshness. Time on fine lees, then bottle. Approx. 13% abv.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Medium-bodied and harmonious: white fruit, citrus, and lively acidity—an ideal opening wine.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Serve at 6–8 °C. Can evolve in bottle (roughly 3–4 years) while staying refreshing.',
        },
        {
          kind: 'table',
          title: 'At the table',
          body: 'Aperitifs, light starters, vegetarian pasta, baked fish—brightness before the reds.',
        },
      ],
      links: [{ label: 'Grechetto — product page', href: 'https://www.blasicantina.it/en/grechetto-umbria/' }],
      disclaimer: 'Notes for the tasting from public materials; the vintage poured may differ.',
    },
  },
  'grechetto-casaioli': {
    it: {
      name: 'Pelagalla',
      producer: 'Agricola Casaioli',
      shortLabel: 'Grechetto DOC Colli del Trasimeno · 2024',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'Fontignano (PG), sulle pendici dei Colli del Trasimeno: vigneto familiare in un paesaggio di lago e brezza. Il Grechetto qui esprime tensione minerale e profumo di macchia mediterranea.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Vendemmia manuale, fermentazione in acciaio; una parte breve in barrique (ordine di pochi mesi) e almeno tre mesi in bottiglia prima dell’uscita, secondo lo stile aziendale della linea Pelagalla.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Giallo paglierino con riflessi verdolini; note di frutta bianca, nocciola e sentori delicati. Struttura piacevole e chiusura fresca, quasi mandorlata.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Ideale tra 10 e 12 °C. Versatile tra aperitivo e primo corso.',
        },
        {
          kind: 'table',
          title: 'A tavola',
          body: 'Ravioli burro e salvia, pecorino leggermente stagionato, finger food umbri, lago e olio nuovo.',
        },
      ],
      links: [
        {
          label: 'Pelagalla — scheda prodotto',
          href: 'https://www.agricolacasaioli.it/prodotto/pelagalla-grechetto-doc-colli-del-trasimeno/',
        },
      ],
      disclaimer:
        'Testi sintetizzati da schede pubbliche Casaioli; parametri possono variare per annata.',
    },
    en: {
      name: 'Pelagalla',
      producer: 'Agricola Casaioli',
      shortLabel: 'Grechetto DOC Colli del Trasimeno · 2024',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'Fontignano (PG), on the Colli del Trasimeno slopes: a family vineyard between lake breezes and Mediterranean scrub. Grechetto shows mineral tension and aromatic lift.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'Hand harvest, stainless-steel fermentation, a short passage in barrique (a few months) and at least three months in bottle before release, per the Pelagalla style.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Straw yellow with green hints; white fruit, hazelnut, and a fresh, almost almond finish with pleasing structure.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Best around 10–12 °C—from aperitif to first course.',
        },
        {
          kind: 'table',
          title: 'At the table',
          body: 'Butter-and-sage ravioli, lightly aged pecorino, Umbrian small plates, lake fish and new oil.',
        },
      ],
      links: [
        {
          label: 'Pelagalla — product page',
          href: 'https://www.agricolacasaioli.it/prodotto/pelagalla-grechetto-doc-colli-del-trasimeno/',
        },
      ],
      disclaimer: 'Summarised from public Casaioli sheets; details may vary by vintage.',
    },
  },
  travertino: {
    it: {
      name: 'Travertino',
      producer: 'Cantina Cenci',
      shortLabel: 'Sangiovese Umbria IGT · annata 2024 (bio)',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'Cantina di montagna su colline ricche di travertino e calcare: suoli che restituiscono verticalità e una nota salina al rosso. Vigneto gestito in logica agro-ecologica.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Sangiovese (Grosso) selezionato a mano in cassette; diraspatura, fermentazione spontanea in acciaio e affinamento di circa sette mesi in acciaio — vino trasparente e bevibilissimo.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Rubino molto chiaro; ciliegia fresca, croccantezza e sale. Leggero, verticale, ideale come “respiro” tra bianchi e rossi più densi.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Leggermente fresco: indicativamente 14–16 °C. Non serve decantazione.',
        },
        {
          kind: 'table',
          title: 'A tavola',
          body: 'Salumi, bruschette, pizza gourmet, primi di verdura, formaggi dolci; ottimo anche leggermente fresco.',
        },
      ],
      links: [
        {
          label: 'Travertino — scheda prodotto',
          href: 'https://cantinacenci.it/products/travertino-sangiovese-igt-umbria-2024-bio',
        },
      ],
      disclaimer:
        'Testi da schede commerciali pubbliche Cenci; annata e grado alcolico possono variare.',
    },
    en: {
      name: 'Travertino',
      producer: 'Cantina Cenci',
      shortLabel: 'Sangiovese Umbria IGT · 2024 (organic)',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'Mountain-side vineyards on travertine- and limestone-rich hills: soils that give verticality and a subtle saline note. Managed with agro-ecological care.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'Sangiovese Grosso, hand-picked in crates; destemming, spontaneous fermentation in stainless steel, then roughly seven months’ ageing in steel—transparent and highly drinkable.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Very pale ruby; fresh cherry, crunch, and savouriness. Light, vertical—a “breath” between whites and heavier reds.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Serve slightly cool, around 14–16 °C. No decanting needed.',
        },
        {
          kind: 'table',
          title: 'At the table',
          body: 'Cured meats, bruschetta, vegetable pasta, mild cheeses; also pleasant lightly chilled.',
        },
      ],
      links: [
        {
          label: 'Travertino — product page',
          href: 'https://www.cantinacenci.it/en-usa/products/travertino-sangiovese-igt-umbria-2024-bio',
        },
      ],
      disclaimer: 'From public Cenci product pages; vintage and abv may vary.',
    },
  },
  'ciliegiolo-pilar': {
    it: {
      name: 'Ciliegiolo',
      producer: 'Andrea Pilar',
      shortLabel: 'Rosso IGT Umbria · annata 2024',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'Alta Umbria, cantina a Umbertide (PG): terre tendenzialmente sabbiose e alluvionali, ricche di scheletro e potassio, oltre i 350 m s.l.m. Un Ciliegiolo che nasce da un progetto artigiano, con poche viti per ettaro e massimo rispetto del paesaggio.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Diraspatura soffice e pigiatura parziale; fermentazione spontanea in acciaio per circa 15–20 giorni con macerazione molto breve. Malolattica guidata arieggiando il vino nuovo e rimescolando le fecce fini; qualche mese in acciaio con rimescoli periodici. Imbottigliamento senza chiarifica e senza additivi enologici, salvo piccole dosi di solforosa. Grado indicativo: 12% vol.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Rubino di media concentrazione; fiori e frutti rossi, tocchi erbacei e balsamici. Bocca succosa e saporita, armoniosa ma con buon nerbo — vino di sete, pensato per la convivialità.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Intorno ai 16–18 °C. Versatile da aperitivo a pasto; decantazione raramente necessaria su annate giovani.',
        },
        {
          kind: 'table',
          title: 'A tavola',
          body: 'Merende umbre, salumi, bruschette, primi di terra, carni alla griglia e formaggi medi: un rosso mediterraneo che non disdegna piatti più elaborati.',
        },
      ],
      links: [
        {
          label: 'Ciliegiolo — scheda sul sito Andrea Pilar',
          href: 'https://www.andreapilar.it/progetto/vini/',
        },
      ],
      disclaimer:
        'Testi sintetizzati dalla pagina ufficiale “Vini” di Andrea Pilar; l’annata in calice e i parametri analitici possono variare.',
    },
    en: {
      name: 'Ciliegiolo',
      producer: 'Andrea Pilar',
      shortLabel: 'Rosso IGT Umbria · 2024 vintage',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'High Umbria, based in Umbertide (PG): mostly sandy, alluvial soils rich in stones and potassium, above 350 m a.s.l. A handcrafted Ciliegiolo rooted in a low-intervention, terroir-first mindset.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'Gentle destemming with partial crushing; spontaneous fermentation in stainless steel for about 15–20 days with a very short maceration. Malolactic fermentation with aeration and lees stirring; a few months’ maturation in steel with periodic stirring. Bottled without clarification or oenological additives except small doses of sulphur dioxide. Approx. 12% abv.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Medium-depth ruby; red flowers and red fruit, with herbaceous and balsamic hints. Juicy, savoury, harmonious yet structured—a thirst-quenching, Mediterranean red.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Around 16–18 °C. Works from snack to main course; young vintages rarely need decanting.',
        },
        {
          kind: 'table',
          title: 'At the table',
          body: 'Umbrian merende, cured meats, bruschetta, hearty pasta, grilled meats and semi-aged cheeses; happy alongside more elaborate dishes too.',
        },
      ],
      links: [
        {
          label: 'Ciliegiolo — Andrea Pilar wines',
          href: 'https://www.andreapilar.it/en/project/wines/',
        },
      ],
      disclaimer:
        'Summarised from the official Andrea Pilar “Wines” page; the vintage poured and analytical details may vary.',
    },
  },
  marciliano: {
    it: {
      name: 'Marciliano',
      producer: 'Famiglia Cotarella',
      shortLabel: 'Rosso Umbria IGP · annata 2019',
      journey: [
        {
          kind: 'terroir',
          title: 'Il luogo',
          body: 'Tenuta Marciliano a Montecchio (Terni): 12 ettari intorno ai 350 m s.l.m., su terreni sedimentari tendenzialmente calcarei e argillosi. Un anfiteatro di vigne dove Cabernet Sauvignon e Cabernet Franc esprimono struttura e raffinatezza.',
        },
        {
          kind: 'cellar',
          title: 'In cantina',
          body: 'Vinificazione in controllo termico e percorso di affinamento che integra acciaio e legno secondo lo stile Cotarella, per modellare spezie, volume e tannini senza appesantire il messaggio.',
        },
        {
          kind: 'glass',
          title: 'Calice',
          body: 'Rosso profondo al centro del bicchiere; naso complesso e caldo, richiami a mora matura. In bocca è avvolgente e speziato, con tannini decisi ma aggraziati e un finale persistente.',
        },
        {
          kind: 'service',
          title: 'Servizio',
          body: 'Servire intorno ai 16–18 °C. Un rosso da “metà serata”, quando la conversazione si fa più conviviale.',
        },
        {
          kind: 'table',
          title: 'A tavola',
          body: 'Carni importanti, selvaggina in salmì, formaggi semi-stagionati. La cantina suggerisce anche piatti lenti come un salmì: qui il vino trova ritmo e profondità.',
        },
      ],
      links: [
        {
          label: 'Marciliano — scheda prodotto',
          href: 'https://www.famigliacotarella.it/it/vini/cotarella/tenuta-marciliano/marciliano/',
        },
      ],
      disclaimer:
        'Testi redatti per la degustazione da materiali pubblici delle cantine; l’annata in calice può variare.',
    },
    en: {
      name: 'Marciliano',
      producer: 'Famiglia Cotarella',
      shortLabel: 'Rosso Umbria IGP · 2019 vintage',
      journey: [
        {
          kind: 'terroir',
          title: 'The place',
          body: 'Tenuta Marciliano in Montecchio (Terni): 12 hectares around 350 m a.s.l. on sedimentary, calcareous-clay soils. A vineyard amphitheatre where Cabernet Sauvignon and Cabernet Franc combine structure and finesse.',
        },
        {
          kind: 'cellar',
          title: 'In the cellar',
          body: 'Temperature-controlled vinification and ageing that weaves stainless steel and oak in the Cotarella style—building spice, volume, and tannins without losing clarity.',
        },
        {
          kind: 'glass',
          title: 'In the glass',
          body: 'Deep ruby at the core; a warm, complex nose with ripe blackberry tones. The palate is enveloping and spicy, with assertive yet polished tannins and a long, persistent finish.',
        },
        {
          kind: 'service',
          title: 'Service',
          body: 'Serve around 16–18 °C. A mid-evening red, when the table slows down and flavours deepen.',
        },
        {
          kind: 'table',
          title: 'At the table',
          body: 'Rich meats, game stews, semi-aged cheeses. The winery also points to slow dishes like salmì—where the wine finds rhythm and depth.',
        },
      ],
      links: [
        {
          label: 'Marciliano — product page',
          href: 'https://www.famigliacotarella.it/it/vini/cotarella/tenuta-marciliano/marciliano/',
        },
      ],
      disclaimer:
        'Notes prepared for this tasting from public winery materials; the vintage poured may differ.',
    },
  },
}

export function getWines(locale: Locale): WineViewModel[] {
  return META.map((m) => ({
    ...m,
    ...COPY[m.id][locale],
  }))
}
