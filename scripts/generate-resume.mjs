/**
 * Generates public/resume.pdf directly from src/data/portfolio.js
 *
 * Usage:  npm run resume
 *
 * Edit your content in src/data/portfolio.js, then re-run this script.
 * Tuned to fit a single A4 page.
 */
import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  siteConfig,
  socialLinks,
  about,
  skills,
  projects,
  experience,
} from '../src/data/portfolio.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public', 'resume.pdf');
const DEBUG = process.argv.includes('--debug');

// ── Design tokens (match the website) ──────────────────────────
const C = {
  ink: '#0F172A',
  body: '#334155',
  muted: '#64748B',
  accent: '#0284C7', // brand cyan, darkened for print contrast
  accent2: '#4F46E5', // brand indigo
  rule: '#E2E8F0',
  chipBg: '#F1F5F9',
};

const M = { top: 46, bottom: 40, left: 50, right: 50 };
const W = 595.28;
const H = 841.89;
const CONTENT_W = W - M.left - M.right;
const BOTTOM = H - M.bottom;

const doc = new PDFDocument({
  size: 'A4',
  margins: M,
  info: {
    Title: `${siteConfig.name} — Resume`,
    Author: siteConfig.name,
    Subject: `${siteConfig.title} Resume`,
  },
});
doc.pipe(createWriteStream(OUT));

let pageCount = 1;
doc.on('pageAdded', () => (pageCount += 1));

const y = { v: M.top };
const wouldOverflow = (h) => y.v + h > BOTTOM;

/** Draws a text block and advances the cursor. */
function line(text, opts = {}) {
  const {
    size = 9,
    font = 'Helvetica',
    color = C.body,
    width = CONTENT_W,
    indent = 0,
    gap = 0,
    lineGap = 2,
  } = opts;
  doc.font(font).fontSize(size).fillColor(color);
  const h = doc.heightOfString(text, { width: width - indent, lineGap });
  doc.text(text, M.left + indent, y.v, { width: width - indent, lineGap });
  y.v += h + gap;
  return h;
}

/** Section heading with a colored tick. */
function section(title) {
  y.v += 11;
  if (wouldOverflow(34)) return;
  doc.rect(M.left, y.v + 1, 11, 2.5).fill(C.accent);
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(C.ink)
    .text(title.toUpperCase(), M.left + 16, y.v - 4, {
      width: CONTENT_W - 16,
      characterSpacing: 1.3,
    });
  y.v += 13;
  doc.moveTo(M.left, y.v).lineTo(W - M.right, y.v)
    .lineWidth(0.75).strokeColor(C.rule).stroke();
  y.v += 7;
}

function mark(label) {
  if (DEBUG) console.log(`  after ${label}: y=${y.v.toFixed(1)} pages=${pageCount}`);
}

// ══ HEADER ══════════════════════════════════════════════════════
doc.font('Helvetica-Bold').fontSize(24).fillColor(C.ink)
  .text(siteConfig.name, M.left, y.v, { width: CONTENT_W });
y.v += 27;

doc.font('Helvetica').fontSize(10.5).fillColor(C.accent)
  .text(siteConfig.title, M.left, y.v, { width: CONTENT_W });
y.v += 16;

const contactParts = [siteConfig.email];
const gh = socialLinks.find((s) => s.id === 'github');
const li = socialLinks.find((s) => s.id === 'linkedin');
if (gh) contactParts.push(gh.url.replace(/^https?:\/\//, ''));
if (li) contactParts.push(li.url.replace(/^https?:\/\//, ''));

doc.font('Helvetica').fontSize(8).fillColor(C.muted)
  .text(contactParts.join('   ·   '), M.left, y.v, { width: CONTENT_W });
y.v += 14;
doc.moveTo(M.left, y.v).lineTo(W - M.right, y.v)
  .lineWidth(1.5).strokeColor(C.accent).stroke();
y.v += 3;
mark('header');

// ══ SUMMARY ═════════════════════════════════════════════════════
section('Professional Summary');
line(about.paragraphs.join(' '), { size: 8.8, lineGap: 2.5 });
mark('summary');

// ══ SKILLS ══════════════════════════════════════════════════════
section('Technical Skills');
for (const cat of skills.categories) {
  if (wouldOverflow(30)) break;
  const rowY = y.v;
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.ink)
    .text(cat.title, M.left, rowY + 3, { width: 104 });

  let x = M.left + 108;
  const h = 14;
  doc.font('Helvetica').fontSize(7.5);
  for (const item of cat.items) {
    const w = doc.widthOfString(item) + 11;
    if (x + w > W - M.right) break;
    doc.roundedRect(x, rowY, w, h, 3).fill(C.chipBg);
    doc.fillColor(C.body).text(item, x + 5.5, rowY + 3, {
      width: w - 11,
      align: 'center',
      lineBreak: false,
    });
    x += w + 4;
  }
  y.v = rowY + h + 6;
}
mark('skills');

// ══ PROJECTS ════════════════════════════════════════════════════
section('Featured Projects');
for (const p of projects.items) {
  if (p.title === 'Your Project Name') continue;
  if (wouldOverflow(48)) break;

  doc.font('Helvetica-Bold').fontSize(9).fillColor(C.ink);
  const titleH = doc.heightOfString(p.title, { width: CONTENT_W - 46 });
  if (p.github) {
    doc.font('Helvetica').fontSize(7.5).fillColor(C.accent2)
      .text('GitHub ↗', W - M.right - 44, y.v + 1, { width: 44, align: 'right', lineBreak: false });
  }
  doc.font('Helvetica-Bold').fontSize(9).fillColor(C.ink)
    .text(p.title, M.left, y.v, { width: CONTENT_W - 46 });
  y.v += titleH + 2;

  line(p.description, { size: 8.3, lineGap: 2 });
  y.v += 2;
  doc.font('Helvetica-Oblique').fontSize(7.5).fillColor(C.muted)
    .text(p.techStack.join('  ·  '), M.left, y.v, { width: CONTENT_W });
  y.v += 11;
}
mark('projects');

// ══ JOURNEY ═════════════════════════════════════════════════════
section('Journey');
for (const e of experience.items) {
  if (/^(Degree|Internship Role|Certification Name)/.test(e.title)) continue;
  if (wouldOverflow(44)) break;

  doc.font('Helvetica-Bold').fontSize(9).fillColor(C.ink);
  const titleH = doc.heightOfString(e.title, { width: CONTENT_W - 110 });
  doc.font('Helvetica').fontSize(7.5).fillColor(C.muted)
    .text(e.period, M.left, y.v + 1, { width: CONTENT_W, align: 'right', lineBreak: false });
  doc.font('Helvetica-Bold').fontSize(9).fillColor(C.ink)
    .text(e.title, M.left, y.v, { width: CONTENT_W - 110 });
  y.v += titleH + 1;

  doc.font('Helvetica-Bold').fontSize(8).fillColor(C.accent)
    .text(e.organization, M.left, y.v, { width: CONTENT_W, lineBreak: false });
  y.v += 11;

  line(e.description, { size: 8.2, lineGap: 2 });
  y.v += 5;
}
mark('journey');

// ══ FOOTER ══════════════════════════════════════════════════════
// Must stay inside the bottom margin (801.89) or pdfkit adds a blank page.
const footY = Math.min(Math.max(y.v + 14, 778), 788);
doc.moveTo(M.left, footY - 7).lineTo(W - M.right, footY - 7)
  .lineWidth(0.75).strokeColor(C.rule).stroke();
doc.font('Helvetica').fontSize(7).fillColor(C.muted)
  .text(
    `Designed & Developed by ${siteConfig.name}`,
    M.left,
    footY,
    { width: CONTENT_W, align: 'center', lineBreak: false }
  );

doc.end();

// Report after the stream flushes
setTimeout(() => {
  console.log(`✔ resume written to public/resume.pdf  (pages: ${pageCount}, content bottom: ${y.v.toFixed(1)}/${BOTTOM})`);
  if (pageCount > 1) console.log('⚠ OVERFLOW: content exceeds one page — shorten descriptions in portfolio.js or trim sections here.');
}, 300);
