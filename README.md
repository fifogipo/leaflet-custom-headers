# Leaflet Custom Headers

Leaflet Custom Headers è un'estensione di `L.TileLayer` che permette di aggiungere **header personalizzati** alle richieste HTTP quando si caricano le tile.

## 🚀 Installazione

Per installare il pacchetto, eseguire:

```sh
npm install leaflet-custom-headers
```

## 📖 Utilizzo

Esempio di utilizzo con Leaflet:

```ts
import L from "leaflet";
import TileLayerHeaders from "leaflet-custom-headers";

const map = L.map("map").setView([51.505, -0.09], 13);

const layerWithHeaders = new TileLayerHeaders("https://example.com/tiles/{z}/{x}/{y}.png", {
  customHeaders: {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
});

layerWithHeaders.addTo(map);
```

## ⚙ Opzioni disponibili

- `customHeaders` *(opzionale)*: Oggetto contenente gli header personalizzati da inviare nelle richieste HTTP.

## 📜 Licenza

Distribuito sotto licenza **MIT**.

---

🌍 **Contribuisci!** Se hai suggerimenti o vuoi migliorare il plugin, sentiti libero di aprire una **Issue** o una **Pull Request** nel repository GitHub!

