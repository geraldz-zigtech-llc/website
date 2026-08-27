#!/usr/bin/env node
/**
 * ZigTech LLC — Google Reviews static-injection script
 *
 * Fetches Place Details (rating, review count, up to 5 individual reviews)
 * from the Google Places API (New) and injects static HTML into index.html
 * between the markers below. Designed to run on a schedule via GitHub
 * Actions so reviews are baked into the static HTML at build time —
 * never fetched client-side, never exposes the API key to the browser.
 *
 * Required environment variables (set as GitHub Actions secrets):
 *   PLACES_API_KEY  - Google Cloud API key, restricted to Places API (New)
 *   GOOGLE_PLACE_ID - e.g. ChIJNZdAeDNGpa8Rcg0uetLtqdg
 *
 * Usage: node scripts/update-reviews.js
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const TARGET_FILE = process.env.REVIEWS_TARGET_FILE || 'index.html';
const START_MARKER = '<!-- REVIEWS_START -->';
const END_MARKER = '<!-- REVIEWS_END -->';

if (!API_KEY || !PLACE_ID) {
  console.error('Missing PLACES_API_KEY or GOOGLE_PLACE_ID environment variable.');
  process.exit(1);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function starString(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function formatDate(publishTime) {
  const d = new Date(publishTime);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function fetchPlaceDetails() {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsUri'
    }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Places API request failed: ${res.status} ${res.statusText}\n${body}`);
  }
  return res.json();
}

function buildReviewCardHtml(review) {
  const authorName = escapeHtml(review.authorAttribution?.displayName || 'Google User');
  const authorPhoto = review.authorAttribution?.photoUri || '';
  const rating = review.rating || 5;
  const text = escapeHtml(review.text?.text || '');
  const relativeTime = escapeHtml(review.relativePublishTimeDescription || '');
  const mapsUri = review.googleMapsUri || '#';

  return `        <article class="review-card">
          <div class="review-card-header">
            ${authorPhoto ? `<img src="${authorPhoto}" alt="" class="review-avatar" width="40" height="40" loading="lazy">` : `<div class="review-avatar review-avatar-fallback" aria-hidden="true">${authorName.charAt(0)}</div>`}
            <div>
              <p class="review-author">${authorName}</p>
              <p class="review-time">${relativeTime}</p>
            </div>
          </div>
          <p class="review-stars" aria-label="${rating} out of 5 stars">${starString(rating)}</p>
          <p class="review-text">${text}</p>
          <a href="${mapsUri}" class="review-source-link" target="_blank" rel="noopener">View on Google →</a>
        </article>`;
}

function buildSectionHtml(data) {
  const rating = data.rating ?? 0;
  const count = data.userRatingCount ?? 0;
  const reviews = (data.reviews || []).slice(0, 5);
  const mapsUri = data.googleMapsUri || '#';

  const cards = reviews.map(buildReviewCardHtml).join('\n');

  return `${START_MARKER}
  <section class="section-blush" aria-labelledby="reviews-heading">
    <div class="container">
      <span class="section-label">What Our Customers Say</span>
      <h2 id="reviews-heading" class="section-heading">${rating.toFixed(1)} <span aria-hidden="true">${starString(rating)}</span> — ${count} Reviews on Google</h2>
      <p class="section-intro"><a href="${mapsUri}" target="_blank" rel="noopener">Read all reviews on Google →</a></p>
      <div class="reviews-grid">
${cards}
      </div>
    </div>
  </section>
  ${END_MARKER}`;
}

async function main() {
  const targetPath = path.resolve(process.cwd(), TARGET_FILE);
  const original = fs.readFileSync(targetPath, 'utf8');

  const startIdx = original.indexOf(START_MARKER);
  const endIdx = original.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1) {
    console.error(`Could not find ${START_MARKER} / ${END_MARKER} markers in ${TARGET_FILE}`);
    process.exit(1);
  }

  const data = await fetchPlaceDetails();
  const newSection = buildSectionHtml(data);

  const before = original.slice(0, startIdx);
  const after = original.slice(endIdx + END_MARKER.length);
  const updated = before + newSection + after;

  if (updated === original) {
    console.log('No changes — reviews content is already up to date.');
    process.exit(0);
  }

  fs.writeFileSync(targetPath, updated, 'utf8');
  console.log(`Updated ${TARGET_FILE} with ${data.reviews?.length || 0} reviews (${data.rating}★, ${data.userRatingCount} total).`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
