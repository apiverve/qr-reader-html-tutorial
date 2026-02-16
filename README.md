# QR Code Reader | APIVerve API Tutorial

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)](js/app.js)
[![HTML5](https://img.shields.io/badge/HTML-5-orange)](index.html)
[![APIVerve | QR Code Reader](https://img.shields.io/badge/APIVerve-QR_Code_Reader-purple)](https://apiverve.com/marketplace/qrcodereader?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial)

A simple, browser-based QR code scanner built with vanilla HTML, CSS, and JavaScript. Upload any image containing a QR code and instantly decode its contents.

![Screenshot](https://raw.githubusercontent.com/apiverve/qr-reader-html-tutorial/main/screenshot.jpg)

---

### Get Your Free API Key

This tutorial requires an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial)** - no credit card required.

---

## Features

- Decode QR codes from any image file
- Drag and drop or click to upload
- Supports JPG, PNG, and GIF formats
- Image preview before scanning
- One-click copy to clipboard
- Clean, responsive UI
- Zero dependencies - pure HTML, CSS, and JavaScript
- No build step required

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/apiverve/qr-reader-html-tutorial.git
   cd qr-reader-html-tutorial
   ```

2. **Add your API key**

   Open `js/app.js` and replace the placeholder with your API key:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

3. **Open in browser**

   Double-click `index.html` or run a local server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

4. **Scan a QR code**

   Upload an image containing a QR code and click "Scan QR Code".

## Project Structure

```
qr-reader-html-tutorial/
├── css/
│   └── styles.css      # Styling and layout
├── js/
│   └── app.js          # API integration and application logic
├── index.html          # Main HTML file
├── screenshot.jpg      # Preview image
├── LICENSE             # MIT license
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## How It Works

1. **User uploads an image** - Drag & drop or click to select
2. **Image preview** - Shows the selected image before scanning
3. **API request** - Sends image as multipart/form-data to APIVerve
4. **Response handling** - Extracts decoded text from QR code
5. **Display result** - Shows decoded content with copy button

### The API Call

```javascript
const formData = new FormData();
formData.append('image', selectedFile);

const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'x-api-key': API_KEY
  },
  body: formData
});
```

## API Reference

**Endpoint:** `POST https://api.apiverve.com/v1/qrcodereader`

**Headers:**

| Header | Value |
|--------|-------|
| `x-api-key` | Your API key |

**Request Body:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | file | Yes | Image file (JPG, PNG, GIF, max 5MB) |

**Example Response:**

```json
{
  "status": "ok",
  "error": null,
  "data": {
    "text": "https://example.com",
    "location": {
      "topLeft": { "x": 10, "y": 10 },
      "topRight": { "x": 215, "y": 10 },
      "bottomLeft": { "x": 10, "y": 215 },
      "bottomRight": { "x": 215, "y": 215 }
    }
  }
}
```

## Use Cases

QR code reading is useful for:

- **Inventory Management** - Scan product codes
- **Event Check-in** - Verify ticket QR codes
- **Document Processing** - Extract data from scanned documents
- **Mobile Payments** - Verify payment QR codes
- **URL Extraction** - Get links from printed materials
- **Contact Import** - Read vCard QR codes
- **Authentication** - Process 2FA setup codes

## Customization Ideas

- Add webcam/camera capture for real-time scanning
- Support multiple QR codes in one image
- Add barcode support (use Barcode Reader API)
- Store scan history in localStorage
- Add URL auto-detection with clickable links
- Export scan results to CSV

## Related APIs

Explore more APIs at [APIVerve](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial):

- [QR Code Generator](https://apiverve.com/marketplace/qrcodegenerator?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial) - Generate QR codes
- [Barcode Generator](https://apiverve.com/marketplace/barcodegenerator?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial) - Generate barcodes
- [Image to Text (OCR)](https://apiverve.com/marketplace/imagetotext?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial) - Extract text from images

## Free Plan Note

This tutorial works with the free APIVerve plan. Some APIs may have:
- **Locked fields**: Premium response fields return `null` on free plans
- **Ignored parameters**: Some optional parameters require a paid plan

The API response includes a `premium` object when limitations apply. [Upgrade anytime](https://dashboard.apiverve.com/plans) to unlock all features.

## License

MIT - see [LICENSE](LICENSE)

## Links

- [Get API Key](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial) - Sign up free
- [APIVerve Marketplace](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial) - Browse 300+ APIs
- [QR Code Reader API](https://apiverve.com/marketplace/qrcodereader?utm_source=github&utm_medium=tutorial&utm_campaign=qr-reader-html-tutorial) - API details
