// One-off generator for a minimal placeholder resume.pdf
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const lines = [
  { t: 'Jay Ashok Rathod - Software Engineer', s: 20, bold: true },
  { t: '', s: 10 },
  { t: 'PLACEHOLDER RESUME', s: 14, bold: true },
  { t: '', s: 10 },
  { t: 'Replace this file with your real resume at public/resume.pdf', s: 11 },
  { t: 'Update your details in src/data/portfolio.js (siteConfig.resumeUrl).', s: 11 },
];

function escapePdf(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

let content = 'BT\n';
let y = 760;
for (const line of lines) {
  if (line.t === '') { y -= 12; continue; }
  const font = line.bold ? '/F2' : '/F1';
  content += `${font} ${line.s} Tf\n1 0 0 1 60 ${y} Tm\n(${escapePdf(line.t)}) Tj\n`;
  y -= line.s + 12;
}
content += 'ET\n';

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${content.length} >>\nstream\n${content}endstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
for (let i = 0; i < objects.length; i++) {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}
const xrefPos = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

writeFileSync(join(root, 'public', 'resume.pdf'), pdf, 'latin1');
console.log('placeholder resume.pdf written');
