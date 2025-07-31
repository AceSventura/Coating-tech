# Coating Tech - Sito Web Aziendale

Questo repository contiene il codice sorgente per il sito web vetrina di Coating Tech, un'azienda specializzata in rivestimenti e vernici per anodi e catodi.

## Caratteristiche

- Design responsive e moderno
- Supporto multilingua (Italiano, Inglese, Spagnolo)
- Sezioni informative sui servizi e le tecnologie
- Modulo di contatto
- Integrazione con Google Maps per visualizzare la posizione dell'azienda
- Funzionalità per richiedere preventivi

## Struttura del Progetto

```
/
├── css/
│   └── style.css          # Foglio di stile principale
├── img/
│   ├── hero-bg.svg        # Immagine di sfondo per la sezione hero
│   └── tech-image.svg     # Immagine illustrativa per la sezione tecnologie
├── js/
│   └── main.js            # Script JavaScript principale
├── locales/
│   ├── it.json            # Traduzioni in italiano
│   ├── en.json            # Traduzioni in inglese
│   └── es.json            # Traduzioni in spagnolo
├── index.html             # Pagina principale
├── quote-success.html     # Pagina di conferma per il modulo preventivo
└── README.md              # Documentazione del progetto
```

## Installazione

1. Clona questo repository:
   ```bash
   git clone https://github.com/tuousername/coating-tech.git
   cd coating-tech
   ```

2. Apri il file `index.html` nel tuo browser per visualizzare il sito localmente.

## Personalizzazione

### Mappa Google Maps

Il sito utilizza un iframe incorporato di Google Maps per visualizzare la posizione dell'azienda. Non è necessaria alcuna configurazione aggiuntiva per la mappa.

### Traduzioni

Per modificare o aggiungere traduzioni, modifica i file JSON nella cartella `locales/`.

### Stili

Per personalizzare l'aspetto del sito, modifica il file `css/style.css`.

## Funzionalità Multilingua

Il sito supporta tre lingue: italiano (predefinito), inglese e spagnolo. La lingua viene salvata nelle preferenze locali dell'utente tramite localStorage.

## Modulo di Contatto e Preventivo

I moduli di contatto e preventivo sono configurati per funzionare senza backend. In un ambiente di produzione, sarà necessario implementare la logica di backend per elaborare i dati dei moduli e inviare email.

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file LICENSE per maggiori dettagli.

## Contatti

Per domande o supporto, contattare info@coatingtech.it.