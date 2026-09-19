import { guard, callApi, respond, fail } from '../lib/apiverve.js';

// Vercel caps a function's request body at 4.5 MB, so uploads stop at 4 MB.
const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/gif'];

/** POST /api/scan (multipart, field "image"): the text or URL encoded in a QR code image. */
export async function POST(request) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const form = await request.formData().catch(() => null);
  const image = form?.get('image');
  if (!image || typeof image === 'string') return fail('Choose an image with a QR code');
  if (!TYPES.includes(image.type)) return fail('Use a JPG, PNG or GIF image');
  if (image.size > MAX_BYTES) return fail('Images must be 4 MB or smaller');

  const upload = new FormData();
  upload.append('image', image, image.name || 'image');
  return respond(() => callApi('qrcodereader', { form: upload }));
}
