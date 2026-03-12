# staging-sask — CMS Component Library

A lightweight component library for CMS sites where you only control the header/footer include.
All bundles are defined in `builds.json` and auto-built by GitHub Actions on every push to `main`.

---

## File Structure

```
/
├── components/
│   ├── popup/
│   │   ├── popup.css
│   │   └── popup.js
│   ├── navigation/
│   │   ├── navigation.css
│   │   └── navigation.js
│   ├── banner/
│   │   ├── banner.css
│   │   └── banner.js
│   ├── slider/
│   │   ├── slider.css
│   │   └── slider.js
│   └── accordion/
│       ├── accordion.css
│       └── accordion.js
├── dist/               ← main bundle (all components)
├── dist-header/        ← header bundle (navigation + banner)
├── dist-page/          ← page bundle (popup + accordion + slider)
├── builds.json         ← ⭐ edit this to control bundles
├── build.js            ← build script (no dependencies)
├── package.json
├── .github/workflows/build.yml
├── demo.html
└── README.md
```

---

## How to control bundles — `builds.json`

This is the only file you need to edit to add/change bundles:

```json
{
  "bundles": [
    {
      "name": "main",
      "distFolder": "dist",
      "components": ["popup", "navigation", "banner", "slider", "accordion"]
    },
    {
      "name": "header-bundle",
      "distFolder": "dist-header",
      "components": ["navigation", "banner"]
    },
    {
      "name": "page-bundle",
      "distFolder": "dist-page",
      "components": ["popup", "accordion", "slider"]
    }
  ]
}
```

- **`name`** — label for the bundle (used in build logs)
- **`distFolder`** — output folder name (e.g. `dist`, `dist-header`)
- **`components`** — array of component folder names to include

---

## CDN URLs (jsDelivr)

Replace `<distFolder>` with your target bundle folder.

```html
<!-- Main bundle -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/dist/components.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/dist/components.min.js"></script>

<!-- Header bundle only -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/dist-header/components.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/dist-header/components.min.js"></script>

<!-- Page bundle only -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/dist-page/components.min.css">
<script defer src="https://cdn.jsdelivr.net/gh/Harvard-Media/staging-sask@main/dist-page/components.min.js"></script>
```

---

## Adding a new component

1. Create `/components/my-component/my-component.css`
2. Create `/components/my-component/my-component.js`
3. Add `"my-component"` to the relevant bundle(s) in `builds.json`
4. Push to `main` — GitHub Actions rebuilds all bundles automatically ✅

## Adding a new bundle

Add a new entry to the `bundles` array in `builds.json`:

```json
{
  "name": "my-bundle",
  "distFolder": "dist-mybundle",
  "components": ["popup", "slider"]
}
```

Push to `main` — done.

---

## Local development

```bash
node build.js
# open demo.html in browser
```

No npm install needed — zero dependencies.
