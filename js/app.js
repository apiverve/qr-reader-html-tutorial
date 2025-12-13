/**
 * QR Code Reader - Tutorial Example
 *
 * A simple QR code scanner using the APIVerve QR Code Reader API.
 * https://apiverve.com/marketplace/qrcodereader
 */

// ============================================
// CONFIGURATION - Add your API key here
// Get a free key at: https://dashboard.apiverve.com
// ============================================
const API_KEY = 'your-api-key-here';
const API_URL = 'https://api.apiverve.com/v1/qrcodereader';

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
  // Validate file type
  if (!file.type.startsWith('image/')) {
    showError('Please select an image file');
    return;
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    showError('File size must be less than 5MB');
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

  // Check API key
  if (API_KEY === 'your-api-key-here') {
    showError('Add your API key to js/app.js first');
    return;
  }

  scanBtn.disabled = true;
  scanBtn.textContent = 'Scanning...';
  hideError();
  result.classList.remove('show');

  try {
    // Create form data with the image
    const formData = new FormData();
    formData.append('image', selectedFile);

    // Call the API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY
      },
      body: formData
    });

    const data = await response.json();

    if (data.status === 'ok' && data.data) {
      // Show result
      resultText.textContent = data.data.text || 'No text found';
      result.classList.add('show');
    } else {
      showError(data.error || 'No QR code found in image');
    }
  } catch (err) {
    showError('Failed to scan QR code. Check your API key.');
    console.error('API Error:', err);
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
