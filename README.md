# Leaflet Custom Headers

Leaflet Custom Headers is an extension to `L.TileLayer` that allows you to add **custom headers** to HTTP requests when loading tiles.

## 🚀 Installation.

To install the package, run:

```sh
npm install leaflet-custom-headers
```

## 📖 Usage

Example of use with Leaflet:

```ts
import L from “leaflet”;
import TileLayerHeaders from “leaflet-custom-headers”;

const map = L.map(“map”).setView([51.505, -0.09], 13);

const layerWithHeaders = new TileLayerHeaders(“https://example.com/tiles/{z}/{x}/{y}.png”, {
  customHeaders: {
    “Authorization": ”Bearer YOUR_ACCESS_TOKEN”
  }
});

layerWithHeaders.addTo(map);
```

## ⚙ Available options.

- `customHeaders` *(optional)*: Object containing the custom headers to be sent in HTTP requests.

## 📜 License

Distributed under **MIT** license.

---

🌍 **Contribute!** If you have suggestions or want to improve the plugin, feel free to open an **Issue** or a **Pull Request** in the GitHub repository!