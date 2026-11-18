// One-off verifier: extracts text from public/resume.pdf and probes for content.
import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = readFileSync(join(root, 'public', 'resume.pdf')).toString('latin1');

// Reassemble FlateDecode streams
let all = '';
const re = /stream\r?\n([\s\S]*?)endstream/g;
let m;
while ((m = re.exec(raw))) {
  try {
    all += inflateSync(Buffer.from(m[1], 'latin1')).toString('latin1');
  } catch {
    /* not compressed */
  }
}

// Text lives in TJ arrays: [(<hex>) kerning (<hex>) ...] TJ
const runs = [];
for (const mm of all.matchAll(/\[([\s\S]*?)\]\s*TJ/g)) {
  let s = '';
  for (const hm of mm[1].matchAll(/<([0-9A-Fa-f]+)>/g)) {
    const h = hm[1];
    for (let i = 0; i < h.length; i += 2) {
      s += String.fromCharCode(parseInt(h.slice(i, i + 2), 16));
    }
  }
  if (s) runs.push(s);
}
const joined = runs.join(''); // pdfkit splits words into kerned fragments — no separator

const probes = [
  'Jay Ashok Rathod',
  'Software Engineer',
  'jayr20297@gmail.com',
  'github.com/jayy999412',
  'linkedin.com/in/jay-rathod',
  'PROFESSIONAL SUMMARY',
  'Academic EventPlanner Management System',
  'TaskPilot',
  'PDF Rag Chatbot',
  'Jai Hind College',
  'ATEION PVT LTD',
  'AICPE',
  'TECHNICAL SKILLS',
  'Frontend Development',
  'Developer Tools',
  'Bachelor of Science',
];
// These must NOT appear — they are old placeholder texts
const absent = ['PLACEHOLDER', 'Your Project Name', 'yourusername'];

console.log(`text runs: ${runs.length}`);
let failures = 0;
for (const p of probes) {
  const ok = joined.includes(p);
  if (!ok) failures++;
  console.log(ok ? '  OK  ' : '  MISS', p);
}
for (const p of absent) {
  const ok = !joined.includes(p);
  if (!ok) failures++;
  console.log(ok ? '  OK  ' : '  MISS', `absent: ${p}`);
}
const pages = (raw.match(/\/Type \/Page[^s]/g) || []).length;
console.log(`pages: ${pages}`);
if (pages !== 1) failures++;
console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} FAILED`);
