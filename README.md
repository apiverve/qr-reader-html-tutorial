# QR Code Reader | APIVerve Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML](https://img.shields.io/badge/HTML-no_build-E34F26)](index.html)
[![APIVerve | QR Code Reader](https://img.shields.io/badge/APIVerve-QR_Code_Reader-purple)](https://apiverve.com/marketplace/qrcodereader?utm_source=github&utm_medium=template&utm_campaign=qr-reader-html-tutorial)

Upload a photo or screenshot of a QR code and read what it says, without a phone.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fapiverve%2Fqr-reader-html-tutorial&project-name=qr-code-reader&repository-name=qr-code-reader&env=APIVERVE_API_KEY&envDescription=Your%20APIVerve%20API%20key.%20Free%20to%20create%2C%20no%20card%20needed.&envLink=https%3A%2F%2Fdashboard.apiverve.com%2Fsignup%3Fapi%3Dqrcodereader%26utm_source%3Dvercel%26utm_medium%3Dtemplate%26utm_campaign%3Dqr-reader-html-tutorial)

![QR Code Reader decoding a QR code that links to apiverve.com](https://raw.githubusercontent.com/apiverve/qr-reader-html-tutorial/main/screenshot.png)

---

### Get your free API key

This template needs an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com/signup?api=qrcodereader&utm_source=github&utm_medium=template&utm_campaign=qr-reader-html-tutorial)**, no credit card required.

---

## Deploy in one click

Click **Deploy with Vercel** above. Vercel copies this repo to your GitHub account, asks for your `APIVERVE_API_KEY`, and gives you a live URL about a minute later.

## Run it locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/apiverve/qr-reader-html-tutorial.git
   cd qr-reader-html-tutorial
   ```

2. **Add your API key**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and set `APIVERVE_API_KEY`.

3. **Start it**
   ```bash
   npm run dev
   ```

4. **Open** `http://localhost:3000`

`npm run dev` serves the page and runs the `api/` functions together, the same way Vercel does, so you don't need the Vercel CLI.

## How it works

1. The page (`index.html`) calls `POST /api/scan` (multipart, field `image`).
2. `api/scan.js` checks the input, then calls QR Code Reader. Your API key stays on the server and never reaches the browser.
3. The page shows the result.

The function checks the upload is a JPG, PNG or GIF of 4 MB or less before sending it on. Vercel limits a function's request body to 4.5 MB.

```
├── api/scan.js          # Vercel function: checks input, calls APIVerve with your key
├── lib/apiverve.js      # Shared by api/: key check, rate limit, the APIVerve call
├── lib/dev-api.js       # Runs api/ locally (Vercel ignores it)
├── dev.mjs              # `npm run dev`: serves the page and api/ on localhost
├── index.html           # The page
├── js/app.js            # The page's JavaScript
├── css/styles.css
├── .env.example         # Copy to .env and add your key
└── package.json
```

### The API call

```javascript
const form = new FormData();
form.append('image', file);

const res = await fetch('https://api.apiverve.com/v1/qrcodereader', {
  method: 'POST',
  headers: { 'x-api-key': process.env.APIVERVE_API_KEY },
  body: form
});
const { data } = await res.json();
// data.text → what the code says
```

## Before you share your URL

Once deployed, anyone who finds your URL can use it on your API key. Each visitor can make 10 requests a minute, which is fine for a demo. The limit is kept in memory, so it isn't shared between serverless instances. For production:

- Put the page behind your own sign-in, or
- Move the limit to a shared store such as [Upstash Redis](https://upstash.com/), or
- Call the route only from your own backend.

## Ideas to extend it

- Open a decoded link only after checking it with [Phishing Domain Checker](https://apiverve.com/marketplace/phishingcheck?utm_source=github&utm_medium=template&utm_campaign=qr-reader-html-tutorial)
- Read codes from product photos in bulk
- Make codes with the [QR Code Generator](https://github.com/apiverve/qr-generator-html-tutorial) template

## API reference

- [QR Code Reader](https://apiverve.com/marketplace/qrcodereader?utm_source=github&utm_medium=template&utm_campaign=qr-reader-html-tutorial): `POST https://api.apiverve.com/v1/qrcodereader`
- [Full documentation](https://docs.apiverve.com?utm_source=github&utm_medium=template&utm_campaign=qr-reader-html-tutorial)

## Tech stack

- Plain HTML, CSS and JavaScript: no framework and no build step
- **Vercel Functions** in `api/` for the server side (Node.js 20+)
- Deploys to Vercel as-is: the page is served as static files, and each file in `api/` becomes a function

## License

MIT. See [LICENSE](LICENSE).
