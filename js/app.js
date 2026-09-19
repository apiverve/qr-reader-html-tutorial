/**
 * QR Code Reader, an APIVerve template.
 *
 * Upload a photo or screenshot of a QR code and read what it says. The page calls
 * /api/scan (api/scan.js), which holds your API key and calls the QR Code Reader API:
 * https://apiverve.com/marketplace/qrcodereader
 */

// Vercel caps a function's request body at 4.5 MB; api/scan.js enforces the same limit.
const MAX_MB = 4;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const previewImage = document.getElementById('previewImage');
const clearBtn = document.getElementById('clearBtn');
const scanBtn = document.getElementById('scanBtn');
const error = document.getElementById('error');
const result = document.getElementById('result');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');

let selectedFile = null;

// Upload area click handler
uploadArea.addEventListener('click', () => fileInput.click());

// File selection handler
fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
});

// Drag and drop handlers
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) {
    handleFile(e.dataTransfer.files[0]);
  }
});

// Handle selected file
function handleFile(file) {
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    showError('Use a JPG, PNG or GIF image');
    return;
  }

  if (file.size > MAX_MB * 1024 * 1024) {
    showError(`Images must be ${MAX_MB} MB or smaller`);
    return;
  }

  selectedFile = file;

  // Show preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    preview.classList.add('show');
    uploadArea.style.display = 'none';
    scanBtn.disabled = false;
  };
  reader.readAsDataURL(file);

  // Clear previous results
  hideError();
  result.classList.remove('show');
}

// Clear selection
clearBtn.addEventListener('click', () => {
  selectedFile = null;
  fileInput.value = '';
  preview.classList.remove('show');
  uploadArea.style.display = 'block';
  scanBtn.disabled = true;
  result.classList.remove('show');
  hideError();
});

// Scan QR code
scanBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  scanBtn.disabled = true;
  scanBtn.textContent = 'Scanning...';
  hideError();
  result.classList.remove('show');

  try {
    // Create form data with the image
    const formData = new FormData();
    formData.append('image', selectedFile);

    // Your server route adds the key and calls APIVerve
    const response = await fetch('/api/scan', { method: 'POST', body: formData });
    const data = await response.json();

    if (response.ok) {
      resultText.textContent = data.text || 'No text found';
      result.classList.add('show');
    } else {
      showError(data.error || 'No QR code found in image');
    }
  } catch (err) {
    showError('Couldn’t reach the server. Try again.');
  } finally {
    scanBtn.disabled = false;
    scanBtn.textContent = 'Scan QR Code';
  }
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultText.textContent).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  });
});

// Error helpers
function showError(message) {
  error.textContent = message;
  error.classList.add('show');
}

function hideError() {
  error.classList.remove('show');
}
