# Guida Rapida Configurazione EmailJS

Questa guida ti spiega come configurare EmailJS per permettere l'invio delle email dal sito in modo semplice e sicuro.

---

## 1. Creare un account EmailJS

- Vai su [https://www.emailjs.com](https://www.emailjs.com)  
- Registrati gratuitamente con la tua email e una password  
- Verifica la tua email se richiesto  

---

## 2. Creare un Service Email

- Accedi al tuo account EmailJS  
- Dal dashboard clicca su **Add new service**  
- Scegli il provider email (es. Gmail, Outlook, SMTP personalizzato)  
- Completa la configurazione  
- Prendi nota del **Service ID** (es. `service_xxx`)  

---

## 3. Creare un Template Email

- Dal dashboard vai su **Email Templates**  
- Crea un nuovo template con i seguenti campi:  

  - `{{from_name}}`: nome e cognome dell'utente che richiede il preventivo  
  - `{{reply_to}}`: email dell'utente  
  - `{{message}}`: messaggio dell'utente  
  - `{{time}}`: data e ora in cui viene inviato il preventivo  
  - `{{phone}}`: numero di cellulare dell'utente  

- Salva il template  
- Prendi nota del **Template ID** (es. `template_xxx`)  

---

## 4. Ottenere la Public Key

- Nel dashboard vai su **Account Settings** > **API Keys**  
- Copia la tua **Public Key**  

---

## 5. Configurare il file `main.js`

Nel file `main.js` del sito, inserisci la Public Key e modifica il codice per inviare l'email utilizzando il Service ID e il Template ID ottenuti.

```js
emailjs.init({
  publicKey: 'LA_TUA_CHIAVE_PUBBLICA'
});
```

```js
emailjs.send("ID_SERVICE", "ID_TEMPLATE", messaggio)
  .then(function () {
    alert("Email inviata con successo!");
    form.reset();
  }, function (error) {
    alert("Errore nell'invio: " + error.text);
  });
```

---

## 6. Limitare l’uso della Public Key al dominio del sito

Per evitare usi non autorizzati:

- Vai su **Account Settings** > **Security** > **Domain Whitelist**  
- Inserisci il dominio del tuo sito (es. `tuodominio.it`)  
- Salva le modifiche  

In questo modo la chiave funzionerà solo se usata dal tuo dominio.

---

## 7. Pubblicazione

- Carica i file sul tuo hosting (es. Aruba, Netlify, ecc.)  
- Verifica il funzionamento del form inviando una mail di prova  

---
