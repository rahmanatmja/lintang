// ───────────────────────── Lintang · app ─────────────────────────
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const DAY = 864e5;

// ── util ──
function dayNumFromISO(iso) { const [y, m, d] = iso.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / DAY); }
function todayISO() { const t = new Date(); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`; }
function isoFromDayNum(n) { return new Date(n * DAY).toISOString().slice(0, 10); }
function fmtDate(iso, opt = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) {
  const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('id-ID', opt);
}
const mod = (a, n) => ((a % n) + n) % n;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function roman(n) { if (n === 0) return '0'; const m = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]; let r = ''; for (const [v, s] of m) while (n >= v) { r += s; n -= v; } return r; }
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const T = (g) => g + '︎'; // paksa glyph teks, bukan emoji
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const ul = (arr) => `<ul class="list">${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;

// ── weton ──
// Acuan: 17 Agustus 1945 = Jumat Legi
function wetonOfDayNum(n) {
  const hi = mod(n + 4, 7), pi = mod(n + 3, 5);
  const hari = HARI[hi], pasaran = PASARAN[pi];
  const neptu = hari.neptu + pasaran.neptu;
  return { hari, pasaran, hi, pi, hx: HARI_X[hi], px: PASARAN_X[pi], neptu, laku: { ...LAKU[neptu], ...LAKU_X[neptu] }, pancasuda: PANCASUDA[neptu % 7], label: `${hari.nama} ${pasaran.nama}`, n };
}
function wetonOf(iso, maghrib) { return wetonOfDayNum(dayNumFromISO(iso) + (maghrib ? 1 : 0)); }
function nextWetonan(w, count = 3) {
  const today = dayNumFromISO(todayISO());
  const k = today + mod(w.n - today, 35);
  const out = []; for (let i = 0; i < count; i++) out.push(k + i * 35); return out;
}

// Wuku: 17 Des 2023 = Minggu, awal wuku Sinta (Galungan 28 Feb 2024 = Rabu Kliwon wuku Galungan)
const WUKU_EPOCH = dayNumFromISO('2023-12-17');
function wukuOf(n) { const k = mod(n - WUKU_EPOCH, 210); const idx = Math.floor(k / 7); return { idx, w: WUKU[idx], par: PARINGKELAN[k % 6], hariKe: (k % 7) + 1 }; }
function mangsaOf(iso) {
  const [, m, d] = iso.split('-').map(Number); const md = m * 100 + d;
  let best = null, bs = -1;
  MANGSA.forEach((x, i) => { const s = x.mulai[0] * 100 + x.mulai[1]; if (s <= md && s > bs) { best = i; bs = s; } });
  const i = best ?? 6; // 1 Jan – 2 Feb = Kapitu
  return { i, ...MANGSA[i], ke: i + 1 };
}
function jawaDate(iso) {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date(y, m - 1, d, 12));
    const g = (t) => parseInt(parts.find((p) => p.type === t).value, 10);
    const tahun = g('year') + 512, bIdx = g('month') - 1;
    return { tgl: g('day'), bIdx, bulan: BULAN_JAWA[bIdx], tahun, windu: WINDU[mod(tahun - 1959, 8)] };
  } catch { return null; }
}
const jawaStr = (j) => (j ? `${j.tgl} ${j.bulan} ${j.tahun} ${j.windu}` : '—');

function dayInfo(iso) {
  const n = dayNumFromISO(iso);
  const w = wetonOfDayNum(n);
  const wk = wukuOf(n);
  return { iso, n, w, wuku: wk.w, wukuIdx: wk.idx, par: wk.par, mangsa: mangsaOf(iso), jawa: jawaDate(iso), pillar: Astro.dayPillar(n) };
}

// ── shio ──
function shioOfYear(cy) { const idx = mod(cy - 4, 12), stem = mod(cy - 4, 10); return { idx, s: SHIO[idx], unsur: UNSUR_SHIO[Math.floor(stem / 2)], yin: stem % 2 === 1, tahun: cy }; }
function shioOf(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  let cy = null;
  try {
    const p = new Intl.DateTimeFormat('en-u-ca-chinese', { year: 'numeric' }).formatToParts(new Date(y, m - 1, d, 12));
    const r = p.find((x) => x.type === 'relatedYear'); if (r) cy = parseInt(r.value, 10);
  } catch {}
  if (!cy) cy = m < 2 || (m === 2 && d < 4) ? y - 1 : y;
  return shioOfYear(cy);
}
function shioRel(a, b) {
  const has = (list) => list.some((g) => g.includes(a) && g.includes(b));
  if (a === b) return { k: 'sama', label: 'Shio sama', nada: 'baik', skor: 2, teks: 'satu frekuensi, mudah saling memahami, tapi bisa sama-sama keras kepala' };
  if (mod(a - b, 12) === 6) return { k: 'ciong', label: 'Ciong (berlawanan)', nada: 'waspada', skor: -3, teks: 'saling berlawanan arah; butuh kesabaran ekstra dan kompromi' };
  if (has(LIU_HE)) return { k: 'liuhe', label: 'Liu He (sahabat rahasia)', nada: 'baik', skor: 3, teks: 'pasangan rahasia yang saling melengkapi dan melindungi' };
  if (has(SAN_HE)) return { k: 'sanhe', label: 'San He (segitiga harmoni)', nada: 'baik', skor: 3, teks: 'satu segitiga harmoni; cara berpikir dan tujuan selaras' };
  if (has(LIU_HAI)) return { k: 'hai', label: 'Liu Hai (saling merugikan)', nada: 'waspada', skor: -2, teks: 'rawan salah paham kecil yang menumpuk; jaga komunikasi' };
  return { k: 'netral', label: 'Netral', nada: 'netral', skor: 0, teks: 'tidak saling mendorong atau menghambat; tergantung usaha bersama' };
}

// ── numerologi ──
const digitSum = (n) => String(n).split('').reduce((a, c) => a + +c, 0);
function reduceNum(n, masters = [11, 22, 33]) { while (n > 9 && !masters.includes(n)) n = digitSum(n); return n; }
function lifePath(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const a = reduceNum(m), b = reduceNum(d), c = reduceNum(digitSum(y));
  return { n: reduceNum(a + b + c), a, b, c, m, d, y };
}
function personalNums(iso, ref = todayISO()) {
  const [, m, d] = iso.split('-').map(Number);
  const [ry, rm, rd] = ref.split('-').map(Number);
  const yr = reduceNum(reduceNum(m, []) + reduceNum(d, []) + reduceNum(digitSum(ry), []), [11, 22]);
  const mo = reduceNum(reduceNum(yr, []) + reduceNum(rm, []), [11, 22]);
  const dy = reduceNum(reduceNum(mo, []) + reduceNum(rd, []), [11, 22]);
  return { year: yr, month: mo, day: dy, ry };
}
function nameNum(name, vowels) {
  const s = (name || '').toUpperCase().normalize('NFD').replace(/[^A-Z]/g, '');
  let t = 0; for (const c of s) { if (vowels && !'AEIOU'.includes(c)) continue; t += ((c.charCodeAt(0) - 65) % 9) + 1; }
  return t ? reduceNum(t) : null;
}
function lpCompat(a, b) {
  const r = (x) => (x > 9 ? reduceNum(x, []) : x);
  const A = r(a), B = r(b);
  const grp = (x) => [[1, 5, 7], [2, 4, 8], [3, 6, 9]].findIndex((g) => g.includes(x));
  if (A === B) return { kata: 'Cermin', nada: 'baik', teks: 'Angka yang sama: kalian mudah saling memahami, tapi kelemahan yang sama juga bisa saling memperbesar.' };
  if (grp(A) === grp(B)) return { kata: 'Sefrekuensi', nada: 'baik', teks: 'Satu kelompok energi: ritme hidup dan cara berpikir kalian mirip, hubungan terasa natural.' };
  const pair = [grp(A), grp(B)].sort().join('');
  if (pair === '02') return { kata: 'Saling menyemangati', nada: 'baik', teks: 'Yang satu mandiri dan mencari, yang lain ekspresif dan hangat. Saling memberi warna.' };
  if (pair === '12') return { kata: 'Saling melengkapi', nada: 'netral', teks: 'Yang satu praktis dan membumi, yang lain kreatif dan penuh perasaan. Bisa saling mengisi bila saling menghargai.' };
  return { kata: 'Butuh kompromi', nada: 'waspada', teks: 'Yang satu ingin bebas, yang lain ingin struktur. Perlu kesepakatan yang jelas soal ruang dan komitmen.' };
}

// ── zodiak, bulan, planet ──
function utcNoonWIB(iso) { const [y, m, d] = iso.split('-').map(Number); return Date.UTC(y, m - 1, d, 5); }
function zodiakIdx(iso) { return Astro.positions(utcNoonWIB(iso)).Sun.sign; }
function zodiakOf(iso) { return ZODIAK[zodiakIdx(iso)]; }
function moonPhase(date = new Date()) {
  const ref = Date.UTC(2000, 0, 6, 18, 14);
  const syn = 29.530588853;
  const age = mod((date.getTime() - ref) / DAY, syn);
  const frac = age / syn;
  return { idx: Math.floor(frac * 8 + 0.5) % 8, frac, age, illum: (1 - Math.cos(2 * Math.PI * frac)) / 2 };
}
function moonSVG(frac, size = 64) {
  const r = size / 2 - 2, c = size / 2;
  const k = Math.cos(2 * Math.PI * frac);
  const waxing = frac < 0.5;
  const rx = Math.abs(k) * r;
  const sweepOuter = waxing ? 1 : 0;
  const sweepInner = k > 0 ? (waxing ? 0 : 1) : (waxing ? 1 : 0);
  const lit = `M ${c} ${c - r} A ${r} ${r} 0 0 ${sweepOuter} ${c} ${c + r} A ${rx} ${r} 0 0 ${sweepInner} ${c} ${c - r} Z`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${c}" cy="${c}" r="${r}" fill="#1a1f33" stroke="rgba(201,185,143,.25)" stroke-width=".8"/>
    <path d="${lit}" fill="#e7e0c8" opacity=".92"/></svg>`;
}
function elementRelation(a, b) {
  if (!a || !b) return null;
  if (a === b) return { kata: 'selaras', teks: 'satu unsur, mudah saling memahami' };
  const pair = [a, b].sort().join('-');
  if (pair === 'Api-Udara' || pair === 'Air-Tanah') return { kata: 'saling menguatkan', teks: 'yang satu menghidupkan yang lain' };
  return { kata: 'saling menantang', teks: 'beda ritme, tapi justru bisa saling melengkapi' };
}
const fmtDeg = (p) => `${Math.floor(p.deg)}°${String(Math.floor((p.deg % 1) * 60)).padStart(2, '0')}′`;

function natalOf(p) {
  const [y, m, d] = p.date.split('-').map(Number);
  const kota = KOTA[p.kota ?? 0] || KOTA[0];
  const known = !!p.time;
  const [hh, mi] = (p.time || '12:00').split(':').map(Number);
  const ms = Date.UTC(y, m - 1, d, hh, mi) - kota[3] * 36e5;
  const pos = Astro.positions(ms);
  const ang = known ? Astro.angles(ms, kota[1], kota[2]) : null;
  let moonUnsure = false;
  if (!known) {
    const a = Astro.positions(Date.UTC(y, m - 1, d, 0, 0) - kota[3] * 36e5).Moon.sign;
    const b = Astro.positions(Date.UTC(y, m - 1, d, 23, 59) - kota[3] * 36e5).Moon.sign;
    moonUnsure = a !== b;
  }
  return { pos, ang, known, kota, moonUnsure };
}

function wheelSVG(pos, ang, size = 340) {
  const c = size / 2, R = c - 6, R2 = R - 30, RP = R2 - 30;
  const base = ang ? ang.asc : 0;
  const pt = (lon, r) => { const t = (180 + (lon - base)) * Math.PI / 180; return [c + r * Math.cos(t), c - r * Math.sin(t)]; };
  let s = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="wheel">`;
  s += `<circle cx="${c}" cy="${c}" r="${R}" fill="rgba(255,255,255,.015)" stroke="${GOLD}" stroke-opacity=".45"/>`;
  s += `<circle cx="${c}" cy="${c}" r="${R2}" fill="none" stroke="${GOLD}" stroke-opacity=".3"/>`;
  s += `<circle cx="${c}" cy="${c}" r="${RP - 22}" fill="none" stroke="${GOLD}" stroke-opacity=".12"/>`;
  const elCol = { Api: '#c99a8f', Tanah: '#a8b28f', Udara: '#b8c3d6', Air: '#8fa3c9' };
  for (let i = 0; i < 12; i++) {
    const [x1, y1] = pt(i * 30, R2), [x2, y2] = pt(i * 30, R);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GOLD}" stroke-opacity=".3"/>`;
    const [gx, gy] = pt(i * 30 + 15, (R + R2) / 2);
    s += `<text x="${gx}" y="${gy}" text-anchor="middle" dominant-baseline="central" font-size="15" fill="${elCol[ZODIAK[i].unsur]}" font-family="Segoe UI Symbol, sans-serif">${T(ZODIAK[i].glyph)}</text>`;
  }
  if (ang) {
    for (const [lon, lbl] of [[ang.asc, 'ASC'], [ang.mc, 'MC']]) {
      const [x1, y1] = pt(lon, RP - 22), [x2, y2] = pt(lon, R2);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GOLD}" stroke-width="1.2"/>`;
      const [lx, ly] = pt(lon, RP - 34);
      s += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" font-size="8.5" letter-spacing="1" fill="${GOLD}">${lbl}</text>`;
    }
  }
  const list = Object.entries(pos).map(([k, v]) => ({ k, lon: v.lon, show: v.lon })).sort((a, b) => a.lon - b.lon);
  for (let pass = 0; pass < 4; pass++) for (let i = 1; i < list.length; i++) if (list[i].show - list[i - 1].show < 9) list[i].show = list[i - 1].show + 9;
  for (const p of list) {
    const [tx, ty] = pt(p.lon, R2), [ix, iy] = pt(p.lon, R2 - 6), [gx, gy] = pt(p.show, RP);
    s += `<line x1="${tx}" y1="${ty}" x2="${ix}" y2="${iy}" stroke="${GOLD}" stroke-opacity=".7"/>`;
    s += `<text x="${gx}" y="${gy}" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#efe6cc" font-family="Segoe UI Symbol, sans-serif">${T(PLANET[p.k].glyph)}</text>`;
  }
  return s + '</svg>';
}

// ── profil ──
const store = {
  get() { try { return JSON.parse(localStorage.getItem('lintang.profile')) || null; } catch { return null; } },
  set(p) { try { localStorage.setItem('lintang.profile', JSON.stringify(p)); } catch {} }
};
let profile = store.get();

// ── kartu tarot (SVG orisinal) ──
const GOLD = '#c9b98f';
function cardBackSVG() {
  return `<svg viewBox="0 0 150 250" preserveAspectRatio="none">
    <defs><linearGradient id="bk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151a2e"/><stop offset="1" stop-color="#0b0e1a"/></linearGradient></defs>
    <rect width="150" height="250" rx="12" fill="url(#bk)"/>
    <rect x="7" y="7" width="136" height="236" rx="7" fill="none" stroke="${GOLD}" stroke-opacity=".45" stroke-width=".8"/>
    <rect x="11" y="11" width="128" height="228" rx="5" fill="none" stroke="${GOLD}" stroke-opacity=".18" stroke-width=".6"/>
    <g transform="translate(75 125)" stroke="${GOLD}" fill="none" stroke-width=".7">
      <circle r="40" stroke-opacity=".35"/><circle r="30" stroke-opacity=".2"/><circle r="52" stroke-opacity=".12" stroke-dasharray="1 4"/>
      <path d="M0-26 L4-4 L26 0 L4 4 L0 26 L-4 4 L-26 0 L-4-4Z" fill="${GOLD}" fill-opacity=".85" stroke="none"/>
      <path d="M0-14 L2.5-2.5 L14 0 L2.5 2.5 L0 14 L-2.5 2.5 L-14 0 L-2.5-2.5Z" transform="rotate(45)" fill="${GOLD}" fill-opacity=".4" stroke="none"/>
    </g>
    <g fill="${GOLD}" fill-opacity=".5"><circle cx="75" cy="30" r="1.2"/><circle cx="75" cy="220" r="1.2"/><circle cx="28" cy="125" r="1"/><circle cx="122" cy="125" r="1"/></g>
  </svg>`;
}
function suitGlyph(suit, x, y, s = 1) {
  const g = { stroke: GOLD, sw: 1.1 / s };
  let p = '';
  if (suit === 'Wands') p = `<line x1="0" y1="-13" x2="0" y2="13"/><path d="M0-7 Q5-10 6-15 Q1-13 0-7Z" fill="${GOLD}" fill-opacity=".6"/><path d="M0-1 Q-5-4 -6-9 Q-1-7 0-1Z" fill="${GOLD}" fill-opacity=".35"/>`;
  if (suit === 'Cups') p = `<path d="M-8-10 Q-8 3 0 5 Q8 3 8-10 Z" fill="${GOLD}" fill-opacity=".15"/><line x1="0" y1="5" x2="0" y2="11"/><line x1="-5" y1="12" x2="5" y2="12"/>`;
  if (suit === 'Swords') p = `<line x1="0" y1="-14" x2="0" y2="9"/><line x1="-6" y1="6" x2="6" y2="6"/><circle cx="0" cy="12" r="1.8"/>`;
  if (suit === 'Pentacles') p = `<circle r="9" fill="${GOLD}" fill-opacity=".08"/><path d="M0-6.5 L1.9-2 L6.2-2 L2.8 1 L4 5.5 L0 3 L-4 5.5 L-2.8 1 L-6.2-2 L-1.9-2Z" fill="${GOLD}" fill-opacity=".55" stroke="none"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${g.stroke}" stroke-width="${g.sw}" stroke-linecap="round">${p}</g>`;
}
function pipLayout(n) {
  const rows = { 1: [1], 2: [1, 1], 3: [1, 1, 1], 4: [2, 2], 5: [2, 1, 2], 6: [2, 2, 2], 7: [2, 3, 2], 8: [3, 2, 3], 9: [3, 3, 3], 10: [3, 4, 3] }[n];
  const pts = []; const top = 62, bot = 176;
  rows.forEach((cnt, ri) => {
    const y = rows.length === 1 ? 120 : top + (bot - top) * (ri / (rows.length - 1));
    for (let i = 0; i < cnt; i++) pts.push([cnt === 1 ? 75 : 40 + 70 * (i / (cnt - 1)), y]);
  });
  return pts;
}
function cardFrontSVG(card) {
  const r = rng(card.id * 7919 + 13);
  let art = '';
  if (card.arcana === 'mayor') {
    const n = 6 + Math.floor(r() * 4);
    const pts = []; for (let i = 0; i < n; i++) pts.push([30 + r() * 90, 60 + r() * 120]);
    pts.sort((a, b) => a[1] - b[1]);
    art += `<circle cx="75" cy="120" r="48" fill="none" stroke="${GOLD}" stroke-opacity=".12"/>`;
    art += `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${GOLD}" stroke-opacity=".45" stroke-width=".7"/>`;
    pts.forEach((p, i) => { const s = i % 3 === 0 ? 2.4 : 1.4; art += `<circle cx="${p[0]}" cy="${p[1]}" r="${s}" fill="#efe6cc"/>` + (i % 3 === 0 ? `<circle cx="${p[0]}" cy="${p[1]}" r="${s * 3}" fill="${GOLD}" fill-opacity=".12"/>` : ''); });
  } else if (card.rank === 0) {
    art += `<circle cx="75" cy="120" r="34" fill="none" stroke="${GOLD}" stroke-opacity=".2"/>` + suitGlyph(card.suit, 75, 120, 2.6);
  } else if (card.rank <= 9) {
    pipLayout(card.rank + 1).forEach(([x, y]) => (art += suitGlyph(card.suit, x, y, 0.95)));
  } else {
    const k = card.rank - 9;
    for (let i = 0; i < k; i++) { const x = 75 + (i - (k - 1) / 2) * 13; art += `<path d="M${x} 66 l2 5 5 .5 -4 3 1.5 5 -4.5-3 -4.5 3 1.5-5 -4-3 5-.5Z" fill="${GOLD}" fill-opacity=".7"/>`; }
    art += `<path d="M48 100 Q75 82 102 100" fill="none" stroke="${GOLD}" stroke-opacity=".25"/>` + suitGlyph(card.suit, 75, 132, 2.1);
  }
  const top = card.arcana === 'mayor' ? roman(card.nomor) : card.rank === 0 ? 'A' : card.rank <= 9 ? card.rank + 1 : RANK_ID[card.rank].toUpperCase();
  const bottom = card.arcana === 'mayor' ? card.nama.replace(/^The /, '').toUpperCase() : `${RANK_ID[card.rank]} ${SUIT[card.suit].id}`.toUpperCase();
  return `<svg viewBox="0 0 150 250" preserveAspectRatio="none">
    <defs><linearGradient id="fg${card.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#171c31"/><stop offset="1" stop-color="#0c0f1c"/></linearGradient></defs>
    <rect width="150" height="250" rx="12" fill="url(#fg${card.id})"/>
    <rect x="7" y="7" width="136" height="236" rx="7" fill="none" stroke="${GOLD}" stroke-opacity=".5" stroke-width=".8"/>
    <text x="75" y="34" text-anchor="middle" fill="${GOLD}" font-family="Cormorant Garamond, Georgia, serif" font-size="15" letter-spacing="2">${top}</text>
    <line x1="55" y1="42" x2="95" y2="42" stroke="${GOLD}" stroke-opacity=".3" stroke-width=".6"/>
    ${art}
    <line x1="35" y1="204" x2="115" y2="204" stroke="${GOLD}" stroke-opacity=".3" stroke-width=".6"/>
    <text x="75" y="222" text-anchor="middle" fill="#e7e2d6" font-family="Inter, Segoe UI, sans-serif" font-size="${bottom.length > 14 ? 7 : 8}" letter-spacing="1.6">${esc(bottom)}</text>
  </svg>`;
}
function cardEl(card, rev, flipped = false) {
  const el = document.createElement('div');
  el.className = `card${rev ? ' rev' : ''}${flipped ? ' flipped' : ''}`;
  el.innerHTML = `<div class="inner"><div class="face back">${cardBackSVG()}</div><div class="face front">${cardFrontSVG(card)}</div></div>`;
  return el;
}
function cardInfo(card) {
  return card.arcana === 'mayor' ? `Arkana Mayor ${roman(card.nomor)}` : `${SUIT[card.suit].id} · ${SUIT[card.suit].ranah}`;
}

// ── bacaan harian (dipakai Hari Ini & Kalender) ──
function personalReading(info, prof) {
  const wu = wetonOf(prof.date, prof.maghrib);
  const pet = PETUNG5[(wu.neptu + info.w.neptu) % 5];
  const myShio = shioOf(prof.date);
  const dayBranch = info.pillar % 12;
  const shr = shioRel(myShio.idx, dayBranch);
  const pn = personalNums(prof.date, info.iso);
  const sunIdx = zodiakIdx(prof.date);
  const sky = Astro.positions(utcNoonWIB(info.iso));
  const house = mod(sky.Moon.sign - sunIdx, 12);
  const isWetonan = mod(info.n - wu.n, 35) === 0;
  const unsurRel = elementRelation(info.w.pasaran.unsur, wu.pasaran.unsur);
  const r = rng(hashStr(prof.date + '|' + info.iso + '|skor'));
  const base = 60 + pet.skor * 7 + shr.skor * 2 + (isWetonan ? 4 : 0);
  const f = RUMAH[house].fokus;
  const sc = (k, extra = 0) => Math.round(clamp(base + f[k] * 8 + extra + (r() - 0.5) * 18, 18, 98));
  const skor = {
    cinta: sc('cinta', info.w.hi === 5 ? 4 : 0),
    karier: sc('karier', pet.nama === 'Lungguh' ? 6 : 0),
    uang: sc('uang', pet.nama === 'Sri' || pet.nama === 'Gedhong' ? 6 : 0),
    sehat: sc('sehat', pet.nama === 'Lara' ? -8 : 0)
  };
  skor.total = Math.round((skor.cinta + skor.karier + skor.uang + skor.sehat) / 4);
  return { wu, pet, myShio, dayBranch, shr, pn, sunIdx, sky, house, isWetonan, unsurRel, skor };
}

function energyBlock(info) {
  const { w } = info;
  return `
    <div class="grid g2">
      <div class="panel"><h3>Energi hari · ${w.hari.nama}</h3>
        <div class="serif big-line">${w.hx.energi.tema}</div>
        <p>${w.hx.energi.teks}</p>
        <div class="tagrow"><span class="tag">planet ${w.hx.planet}</span><span class="tag">unsur ${w.hx.unsur.toLowerCase()}</span><span class="tag">neptu ${w.hari.neptu}</span></div></div>
      <div class="panel"><h3>Energi pasaran · ${w.pasaran.nama}</h3>
        <div class="serif big-line">${w.px.energi.tema}</div>
        <p>${w.px.energi.teks}</p>
        <div class="tagrow"><span class="tag">arah ${w.pasaran.arah.toLowerCase()}</span><span class="tag">warna ${w.pasaran.warna.toLowerCase()}</span><span class="tag">neptu ${w.pasaran.neptu}</span></div></div>
    </div>
    <div class="grid g3" style="margin-top:16px">
      <div class="panel"><h3>Wuku ${info.wuku.nama}</h3><p class="muted small">dewa: Batara ${info.wuku.dewa} · wuku ke-${info.wukuIdx + 1} dari 30</p><p>${info.wuku.energi}</p></div>
      <div class="panel"><h3>Pancasuda hari · ${w.pancasuda.nama}</h3><p class="muted small">neptu ${w.neptu} ÷ 7, sisa ${w.neptu % 7} · ${w.pancasuda.arti}</p><p>${w.pancasuda.teks}</p></div>
      <div class="panel"><h3>Paringkelan · ${info.par.nama}</h3><p class="muted small">hari ${info.par.arti}</p><p>${info.par.teks}</p></div>
    </div>`;
}

function dayDetailHTML(iso) {
  const info = dayInfo(iso);
  const { w } = info;
  let pers = '';
  if (profile) {
    const p = personalReading(info, profile);
    pers = `<div class="divider" style="margin:20px 0"></div><h3>Untukmu (${p.wu.label})</h3>
      <p><span class="pill ${p.pet.nada}">${p.pet.nama}</span> ${p.pet.teks}</p>
      ${p.isWetonan ? '<p class="gold">✦ Hari ini wetonanmu — hari kelahiran Jawamu berulang.</p>' : ''}
      <p class="muted small" style="margin-top:8px">Hari shio ${SHIO[p.dayBranch].nama}: ${p.shr.label.toLowerCase()} dengan shio ${p.myShio.s.nama}-mu · angka hari pribadi ${p.pn.day}</p>`;
  }
  return `<div class="eyebrow">${fmtDate(iso)}</div>
    <h1 style="font-size:40px">${w.hari.nama} <em>${w.pasaran.nama}</em></h1>
    <p class="muted">${jawaStr(info.jawa)} · Neptu ${w.neptu} · Wuku ${info.wuku.nama} · Mangsa ${info.mangsa.nama}</p>
    <div class="divider" style="margin:18px 0"></div>
    ${energyBlock(info)}
    <div class="grid g2" style="margin-top:16px">
      <div class="panel"><h3>Baik untuk</h3>${ul([...w.hx.energi.baik, ...w.px.energi.baik])}</div>
      <div class="panel"><h3>Sebaiknya hindari</h3>${ul([...w.hx.energi.hindari, ...w.px.energi.hindari])}</div>
    </div>
    ${pers}`;
}

// ── views ──
function needProfile(target) {
  target.innerHTML = `<div class="empty-state"><div class="serif">Langitmu belum dipetakan</div>
    <p class="muted">Isi tanggal lahir dulu, biar Lintang bisa membaca weton dan bintangmu.</p>
    <button class="btn primary" onclick="go('profil')">Isi profil</button></div>`;
}

const TONES = [
  ['menanam', 'mulai hal baru pelan-pelan, jangan buru-buru minta hasil'],
  ['merawat', 'urus yang sudah ada, rapikan yang tercecer'],
  ['bicara', 'sampaikan yang selama ini tertunda'],
  ['mendengar', 'kurangi bicara, banyak hal terbaca dari diam'],
  ['menuai', 'saatnya menagih hasil kerjamu sendiri']
];

function bar(label, v) {
  return `<div class="bar"><div class="bl"><span>${label}</span><span class="gold">${v}%</span></div><div class="bt"><div class="bf" style="width:${v}%"></div></div></div>`;
}
function skyRow(sky) {
  return `<div class="skyrow">${Astro.BODIES.map((b) => { const p = sky[b]; return `<div class="sk${p.retro ? ' retro' : ''}"><div class="sg">${T(PLANET[b].glyph)}</div><div class="sn">${PLANET[b].id}</div><div class="sz">${T(ZODIAK[p.sign].glyph)} ${ZODIAK[p.sign].nama}${p.retro ? ' <b>℞</b>' : ''}</div></div>`; }).join('')}</div>`;
}

function renderHari() {
  const v = $('#view-hari');
  if (!profile) return needProfile(v);
  const t = todayISO();
  const info = dayInfo(t);
  const wt = info.w;
  const p = personalReading(info, profile);
  const wu = p.wu;
  const z = ZODIAK[p.sunIdx];
  const mp = moonPhase();
  const fase = FASE_BULAN[mp.idx];
  const r = rng(hashStr(profile.date + '|' + t));
  const card = DECK[Math.floor(r() * 78)];
  const rev = r() < 0.3;
  const tone = TONES[mod(wu.neptu + wt.neptu, 5)];
  const tr = transitsFor(profile, t);
  const kw = (rev ? card.terbalik : card.tegak).split(' · ');
  const moonSign = ZODIAK[p.sky.Moon.sign];
  const rumah = RUMAH[p.house];
  const retro = ['Mercury', 'Venus', 'Mars'].filter((b) => p.sky[b].retro);
  const pdx = PERSONAL_DAY[p.pn.day] || PERSONAL_DAY[reduceNum(p.pn.day, [])];
  const afir = AFIRMASI[hashStr(profile.date + t + 'af') % AFIRMASI.length];
  const angka = [...new Set([p.pn.day > 9 ? reduceNum(p.pn.day, []) : p.pn.day, (wt.neptu % 9) || 9, ...p.myShio.s.angka.slice(0, 1)])];
  const warna = [wt.pasaran.warna, WARNA_ANGKA[p.pn.day]].filter(Boolean);
  const retroTeks = { Mercury: 'Merkurius sedang retrograde: periksa ulang pesan, kontrak, dan jadwal; bagus untuk mengulang dan memperbaiki, kurang bagus untuk tanda tangan besar.', Venus: 'Venus sedang retrograde: perasaan lama bisa muncul kembali; tunda keputusan cinta & belanja besar, renungkan apa yang benar-benar kamu hargai.', Mars: 'Mars sedang retrograde: energi tindakan tertahan; selesaikan yang lama sebelum memulai pertempuran baru.' };

  v.innerHTML = `
  <header class="vhead vhead-row"><div class="eyebrow">${profile.name ? 'Untuk ' + esc(profile.name) : 'Hari ini'}</div>${shareBtn('hari')}</header>
  <div class="hero">
    <div>
      <div class="hero-date">${fmtDate(t)}</div>
      <div class="hero-weton">${wt.hari.nama} <span>${wt.pasaran.nama}</span></div>
      <div class="muted">${jawaStr(info.jawa)} · Neptu ${wt.neptu} · Wuku ${info.wuku.nama}</div>
      <div class="muted">Mangsa ${info.mangsa.nama} · Matahari di ${ZODIAK[p.sky.Sun.sign].nama} · Bulan di ${moonSign.nama} · ${fase.nama}</div>
      ${p.isWetonan ? `<div class="tag" style="display:inline-block;margin-top:14px;border-color:var(--gold);color:var(--gold)">✦ Hari ini wetonanmu</div>` : ''}
      <div class="divider"></div>
      <h3>Racikan hari ini</h3>
      <p class="synth">Weton lahirmu <b>${wu.label}</b> bertemu hari <b>${wt.label}</b>: dalam petung primbon jatuh pada <b>${p.pet.nama}</b> (${p.pet.arti}), hari untuk <b>${tone[0]}</b>, ${tone[1]}.
      Energi ${wt.hari.nama} membawa nuansa <b>${wt.hx.energi.tema.toLowerCase()}</b>, dipadu pasaran ${wt.pasaran.nama} yang <b>${wt.px.energi.tema.toLowerCase()}</b>.
      Bulan sedang <b>${fase.nama.toLowerCase()}</b> di ${moonSign.nama}. Kartumu, <b>${card.nama}</b>${rev ? ' terbalik' : ''}, membawa nada <b>${kw[0]}</b>.</p>
    </div>
    <div class="panel" style="display:flex;flex-direction:column;gap:14px;justify-content:center">
      <h3 style="margin:0">Energi hari ini untukmu</h3>
      <div class="score-big"><span class="serif">${p.skor.total}</span><span class="muted">/100</span></div>
      ${bar('Cinta', p.skor.cinta)}${bar('Karier', p.skor.karier)}${bar('Keuangan', p.skor.uang)}${bar('Kesehatan', p.skor.sehat)}
      <p class="hint">Diracik dari petung weton, transit Bulan, shio hari, dan angka pribadimu.</p>
    </div>
  </div>

  <div class="divider"></div>
  <h2 class="sec">Weton hari ini: ${wt.label}</h2>
  ${energyBlock(info)}

  <div class="divider"></div>
  <h2 class="sec">Pengaruhnya untukmu</h2>
  <div class="grid g2">
    <div class="panel"><h3>Petung weton · ${wu.label} × ${wt.label}</h3>
      <div class="serif big-line"><span class="pill ${p.pet.nada}">${p.pet.nama}</span></div>
      <p>${p.pet.teks}</p>
      <p class="hint" style="margin-top:8px">(neptu lahir ${wu.neptu} + neptu hari ${wt.neptu}) ÷ 5, sisa ${(wu.neptu + wt.neptu) % 5} → urutan Sri · Lungguh · Gedhong · Lara · Pati</p></div>
    <div class="panel"><h3>Unsur pasaran</h3>
      <div class="serif big-line">${wu.pasaran.unsur} × ${wt.pasaran.unsur}</div>
      <p>Pasaran lahirmu ${wu.pasaran.nama} (${wu.pasaran.unsur.toLowerCase()}) dan pasaran hari ini ${wt.pasaran.nama} (${wt.pasaran.unsur.toLowerCase()}) <b class="gold">${p.unsurRel.kata}</b>: ${p.unsurRel.teks}.
      ${wu.pi === wt.pi ? 'Hari ini pasaranmu sendiri, energimu terasa lebih utuh.' : ''}</p></div>
    <div class="panel"><h3>Shio hari · ${SHIO[p.dayBranch].nama}</h3>
      <div class="serif big-line"><span class="pill ${p.shr.nada}">${p.shr.label}</span></div>
      <p>Hari ini bercabang ${SHIO[p.dayBranch].nama}; dengan shio ${p.myShio.s.nama}-mu: ${p.shr.teks}.${p.shr.k === 'ciong' ? ' Dalam tradisi Tionghoa ini “hari ciong”: hindari keputusan besar & perjalanan jauh bila bisa.' : ''}</p></div>
    <div class="panel"><h3>Angka hari pribadi · ${p.pn.day}</h3>
      <div class="serif big-line">${pdx[0]}</div>
      <p>${pdx[1]}</p>
      <p class="hint" style="margin-top:8px">Tahun pribadi ${p.pn.year} · bulan pribadi ${p.pn.month}</p></div>
  </div>
  <div class="grid g3" style="margin-top:16px">
    <div class="panel"><h3>Baik dilakukan</h3>${ul([...wt.hx.energi.baik, ...wt.px.energi.baik])}</div>
    <div class="panel"><h3>Sebaiknya hindari</h3>${ul([...wt.hx.energi.hindari, ...wt.px.energi.hindari, ...(p.pet.nada === 'waspada' ? ['Memulai hal besar tanpa persiapan'] : [])])}</div>
    <div class="panel"><h3>Keberuntungan</h3>
      <div class="kv"><span>Angka</span><b>${angka.join(' · ')}</b></div>
      <div class="kv"><span>Warna</span><b>${warna.join(' · ')}</b></div>
      <div class="kv"><span>Arah</span><b>${wt.pasaran.arah}</b></div>
      <div class="kv"><span>Arah lahirmu</span><b>${wu.pasaran.arah}</b></div></div>
  </div>

  <div class="divider"></div>
  <h2 class="sec">Horoskop ${z.nama} ${T(z.glyph)}</h2>
  <div class="grid g2">
    <div class="panel span2"><h3>Bulan di ${moonSign.nama} · rumah ke-${p.house + 1}: ${rumah.nama}</h3>
      <p class="serif" style="font-size:19px;color:#d9d3c4">${rumah.teks}</p>
      ${retro.map((b) => `<p class="muted" style="margin-top:10px">℞ ${retroTeks[b]}</p>`).join('')}</div>
  </div>
  <div class="grid g2" style="margin-top:16px">
    <div class="panel span2"><h3>Transit pribadi · langit hari ini terhadap peta lahirmu</h3>${transitHTML(tr, 4)}
      <div style="margin-top:12px">${housesHTML(tr)}</div>
      <p class="hint" style="margin-top:8px">Daftar lengkap ada di halaman Zodiak.</p></div>
  </div>
  <h3 style="margin-top:22px">Langit hari ini</h3>
  ${skyRow(p.sky)}

  <div class="divider"></div>
  <div class="grid g3">
    <div class="panel" style="display:flex;flex-direction:column;align-items:center;gap:12px">
      <h3 style="margin:0">Kartu hari ini</h3>
      <div id="dailyCard"></div>
      <div style="text-align:center">
        <div class="serif" style="font-size:21px">${card.nama}</div>
        <div class="hint">${card.sub} · ${rev ? 'terbalik' : 'tegak'}</div>
        <div class="tagrow" style="justify-content:center">${kw.map((k) => `<span class="tag">${k}</span>`).join('')}</div>
        <p class="small" style="margin-top:12px;text-align:left">${tafsir(card, rev).inti}</p>
        <p class="small" style="margin-top:8px;text-align:left"><span class="gold">Saran:</span> ${tafsir(card, rev).saran}</p>
      </div>
    </div>
    <div class="panel"><h3>Bulan</h3><div class="moon-row">${moonSVG(mp.frac, 58)}<div><div class="serif" style="font-size:21px">${fase.nama}</div><div class="hint">${Math.round(mp.illum * 100)}% terang · hari ke-${Math.floor(mp.age) + 1}</div></div></div>
      <p style="margin-top:14px">${fase.saran}</p>
      <div class="divider" style="margin:18px 0"></div>
      <h3>Mangsa ${info.mangsa.nama}</h3><p class="small">${info.mangsa.teks}</p></div>
    <div class="panel"><h3>Afirmasi</h3><p class="serif" style="font-size:24px;line-height:1.35">“${afir}”</p>
      <div class="divider" style="margin:18px 0"></div>
      ${info.jawa ? `<h3>Bulan ${info.jawa.bulan}</h3><p class="small">${BULAN_JAWA_TEKS[info.jawa.bIdx]}</p>` : ''}</div>
  </div>
  <div class="foot">Untuk refleksi dan hiburan. Langit memberi arah, langkah tetap milikmu.</div>`;

  SHARE.hari = { eyebrow: fmtDate(t), title: `${wt.hari.nama} ${wt.pasaran.nama}`, subtitle: `${profile.name ? 'Untuk ' + profile.name + ' · ' : ''}weton ${wu.label}`, big: String(p.skor.total), bigLabel: 'ENERGI HARI INI / 100', cards: [{ card, rev }],
    sections: [{ h: `Hari ${p.pet.nama} untukmu`, t: p.pet.teks }, { h: `Energi ${wt.label}`, t: `${wt.hx.energi.tema} · ${wt.px.energi.tema}` }, { h: `Kartu: ${card.nama}${rev ? ' (terbalik)' : ''}`, t: tafsir(card, rev).saran }, { h: 'Afirmasi', t: '“' + afir + '”' }], file: 'hari-' + t };
  const ce = cardEl(card, rev, false);
  $('#dailyCard', v).appendChild(ce);
  setTimeout(() => ce.classList.add('flipped'), 350);
  ce.onclick = () => openCard(card, rev);
}

// ── kalender ──
let cal = null;
function renderKalender() {
  const v = $('#view-kalender');
  const now = new Date();
  if (!cal) cal = { y: now.getFullYear(), m: now.getMonth() };
  const { y, m } = cal;
  const first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate();
  const iso = (d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const t = todayISO();
  const wu = profile ? wetonOf(profile.date, profile.maghrib) : null;
  const ja = jawaDate(iso(1)), jb = jawaDate(iso(days));
  const ma = mangsaOf(iso(1)), mb = mangsaOf(iso(days));
  let cells = '';
  for (let i = 0; i < first.getDay(); i++) cells += '<div class="cd blank"></div>';
  for (let d = 1; d <= days; d++) {
    const s = iso(d), n = dayNumFromISO(s), w = wetonOfDayNum(n);
    const pet = wu ? PETUNG5[(wu.neptu + w.neptu) % 5] : null;
    const mine = wu && mod(n - wu.n, 35) === 0;
    const mp = moonPhase(new Date(y, m, d, 12));
    const mpPrev = moonPhase(new Date(y, m, d - 1, 12));
    const q = [0, 2, 4, 6].find((k) => mp.idx === k && mpPrev.idx !== k);
    const jw = jawaDate(s);
    cells += `<div class="cd${s === t ? ' today' : ''}${mine ? ' mine' : ''}" data-iso="${s}">
      <div class="cd-top"><span class="cd-n">${d}</span>${q !== undefined ? `<span class="cd-moon" title="${FASE_BULAN[q].nama}">${moonSVG(mp.frac, 14)}</span>` : ''}</div>
      <div class="cd-p">${w.pasaran.nama}</div>
      <div class="cd-j">${jw ? jw.tgl + (jw.tgl === 1 ? ' ' + jw.bulan : '') : ''}</div>
      ${pet ? `<div class="cd-pet ${pet.nada}">${pet.nama}</div>` : ''}${mine ? '<div class="cd-star">✦</div>' : ''}</div>`;
  }
  v.innerHTML = `
  <header class="vhead"><div class="eyebrow">Kalender Jawa</div>
    <div class="calhead"><button class="btn" id="cPrev">‹</button>
      <h1>${first.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</h1>
      <button class="btn" id="cNext">›</button><button class="btn" id="cToday">Bulan ini</button></div>
    <p class="lead">${ja ? `${ja.bulan}${jb && jb.bulan !== ja.bulan ? ' – ' + jb.bulan : ''} ${jb ? jb.tahun : ''} ${jb ? jb.windu : ''}` : ''} · Mangsa ${ma.nama}${mb.nama !== ma.nama ? ' – ' + mb.nama : ''}</p></header>
  <div class="calgrid">${HARI.map((h) => `<div class="cw">${h.nama}</div>`).join('')}${cells}</div>
  <div class="legend">${wu ? `<span><i class="lg baik"></i>Sri · Lungguh · Gedhong (baik untukmu)</span><span><i class="lg waspada"></i>Lara · Pati (berhati-hati)</span><span class="gold">✦ wetonanmu</span>` : '<span>Isi profil untuk melihat hari baik pribadimu.</span>'}<span>Angka kecil = tanggal Jawa (±1 hari)</span></div>
  <div class="divider"></div>
  <div class="panel narrow"><h3>Cek weton tanggal lain</h3><input type="date" id="cCheck" /><button class="btn primary" id="cCheckGo">Lihat</button></div>
  <div class="foot">Klik tanggal untuk melihat energi hari, wuku, pancasuda, dan pengaruhnya untukmu.</div>`;
  $('#cPrev').onclick = () => { cal.m--; if (cal.m < 0) { cal.m = 11; cal.y--; } renderKalender(); };
  $('#cNext').onclick = () => { cal.m++; if (cal.m > 11) { cal.m = 0; cal.y++; } renderKalender(); };
  $('#cToday').onclick = () => { cal = null; renderKalender(); };
  $$('.cd[data-iso]', v).forEach((el) => (el.onclick = () => openModal(dayDetailHTML(el.dataset.iso), true)));
  $('#cCheckGo').onclick = () => { const s = $('#cCheck').value; if (s) openModal(dayDetailHTML(s), true); };
}

// ── weton ──
function renderWeton() {
  const v = $('#view-weton');
  if (!profile) return needProfile(v);
  const w = wetonOf(profile.date, profile.maghrib);
  const bi = dayInfo(isoFromDayNum(w.n));
  const next = nextWetonan(w, 4);
  const today = dayNumFromISO(todayISO());
  const days = Array.from({ length: 30 }, (_, i) => wetonOfDayNum(today + i)).map((d) => ({ d, pet: PETUNG5[(w.neptu + d.neptu) % 5] }));
  const baik = days.filter((x) => x.pet.nama === 'Sri' || x.pet.nama === 'Lungguh' || x.pet.nama === 'Gedhong').slice(0, 8);
  const awas = days.filter((x) => x.pet.nama === 'Pati').slice(0, 6);
  const fmtS = (n) => fmtDate(isoFromDayNum(n), { weekday: 'short', day: 'numeric', month: 'short' });
  const watakBlok = (judul, x, base) => `<div class="panel"><h3>${judul}</h3>
      <p>${x.watak}</p>
      <div class="grid g2 tight" style="margin-top:12px"><div><h4>Kelebihan</h4>${ul(x.kelebihan)}</div><div><h4>Tantangan</h4>${ul(x.tantangan)}</div></div>
      ${base}</div>`;
  v.innerHTML = `
  <header class="vhead"><div class="vhead-row"><div class="eyebrow">Weton kelahiran</div>${shareBtn('weton')}</div>
    <h1>${w.hari.nama} <em>${w.pasaran.nama}</em></h1>
    <p class="lead">${fmtDate(profile.date)}${profile.maghrib ? ' · setelah maghrib' : ''} · ${jawaStr(bi.jawa)}</p></header>
  <div class="grid g4">
    <div class="panel stat"><div class="k">Neptu</div><div class="v">${w.neptu}</div><div class="s">${w.hari.nama} ${w.hari.neptu} + ${w.pasaran.nama} ${w.pasaran.neptu}</div></div>
    <div class="panel stat"><div class="k">Pancasuda</div><div class="v" style="font-size:24px">${w.pancasuda.nama}</div><div class="s">${w.pancasuda.arti}</div></div>
    <div class="panel stat"><div class="k">Wuku</div><div class="v">${bi.wuku.nama}</div><div class="s">Batara ${bi.wuku.dewa}</div></div>
    <div class="panel stat"><div class="k">Wetonan berikut</div><div class="v">${next[0] === today ? 'Hari ini' : (next[0] - today) + ' hari'}</div><div class="s">${fmtDate(isoFromDayNum(next[0]), { day: 'numeric', month: 'long' })}</div></div>
    <div class="panel stat"><div class="k">Arah · Warna</div><div class="v" style="font-size:24px">${w.pasaran.arah}</div><div class="s">${w.pasaran.warna} · unsur ${w.pasaran.unsur.toLowerCase()}</div></div>
    <div class="panel stat"><div class="k">Planet hari</div><div class="v" style="font-size:24px">${w.hx.planet}</div><div class="s">${w.hx.simbol} · ${w.hx.unsur.toLowerCase()}</div></div>
    <div class="panel stat"><div class="k">Paringkelan</div><div class="v" style="font-size:24px">${bi.par.nama}</div><div class="s">hari ${bi.par.arti}</div></div>
    <div class="panel stat"><div class="k">Mangsa lahir</div><div class="v" style="font-size:22px">${bi.mangsa.nama.split(' ')[0]}</div><div class="s">mangsa ke-${bi.mangsa.ke}</div></div>
  </div>
  <div class="divider"></div>
  <div class="grid g2">
    <div class="panel span2"><h3>Laku · neptu ${w.neptu}</h3><h2>${w.laku.nama} <span class="muted serif" style="font-style:italic;font-size:18px">— ${w.laku.arti}</span></h2>
      <p class="serif" style="font-size:19px;color:#d9d3c4">${w.laku.teks}</p>
      <p style="margin-top:12px"><span class="gold">Saran:</span> ${w.laku.saran}</p></div>
    ${watakBlok(`Watak hari · ${w.hari.nama}`, w.hx, `<div class="kvs"><div><h4>Karier</h4><p>${w.hx.karier}</p></div><div><h4>Asmara</h4><p>${w.hx.asmara}</p></div></div>`)}
    ${watakBlok(`Watak pasaran · ${w.pasaran.nama}`, w.px, `<div class="kvs"><div><h4>Sifat inti</h4><p>${w.px.sifat}. Dalam tradisi, pasaran ${w.pasaran.nama} dinaungi ${w.px.dewa}, berarah ${w.pasaran.arah.toLowerCase()} dan berwarna ${w.pasaran.warna.toLowerCase()}.</p></div></div>`)}
    <div class="panel"><h3>Pancasuda · ${w.pancasuda.nama}</h3><p class="muted small">neptu ${w.neptu} ÷ 7, sisa ${w.neptu % 7} · “${w.pancasuda.arti}”</p><p>${w.pancasuda.teks}</p></div>
    <div class="panel"><h3>Wuku lahir · ${bi.wuku.nama}</h3><p class="muted small">Batara ${bi.wuku.dewa} · wuku ke-${bi.wukuIdx + 1}</p><p>${bi.wuku.watak}</p></div>
    <div class="panel span2"><h3>Ringkasan weton ${w.label}</h3>
      <p class="serif" style="font-size:19px;color:#d9d3c4">Sebagai ${w.hari.nama} (${w.hx.planet.toLowerCase()}, ${w.hx.unsur.toLowerCase()}) dengan pasaran ${w.pasaran.nama} (${w.pasaran.unsur.toLowerCase()}), kamu memadukan sisi <b class="gold">${w.hx.energi.tema.toLowerCase()}</b> dengan sifat <b class="gold">${w.px.sifat.toLowerCase()}</b>.
      Neptu ${w.neptu} memberimu laku <b class="gold">${w.laku.nama}</b>, dan pancasuda <b class="gold">${w.pancasuda.nama}</b>. Kekuatan utamamu: ${w.hx.kelebihan[0].toLowerCase()} dan ${w.px.kelebihan[0].toLowerCase()}. Yang perlu dijaga: ${w.hx.tantangan[0].toLowerCase()}.</p></div>
  </div>
  <div class="divider"></div>
  <h2 class="sec">Hari baik untukmu · 30 hari ke depan</h2>
  <p class="muted" style="margin-bottom:14px">Petung Sri · Lungguh · Gedhong · Lara · Pati dari neptu lahirmu + neptu hari.</p>
  <div class="grid g2">
    <div class="panel"><h3>Hari baik</h3>${baik.map((x) => `<div class="kv"><span>${fmtS(x.d.n)} · ${x.d.label}</span><b class="gold">${x.pet.nama}</b></div>`).join('')}</div>
    <div class="panel"><h3>Hari Pati (berhati-hati)</h3>${awas.map((x) => `<div class="kv"><span>${fmtS(x.d.n)} · ${x.d.label}</span><b class="rose">Pati</b></div>`).join('') || '<p class="muted">Tidak ada.</p>'}</div>
  </div>
  <div class="divider"></div>
  <h3>Tujuh hari ke depan</h3>
  <div class="grid" style="grid-template-columns:repeat(7,1fr);gap:10px">
    ${days.slice(0, 7).map(({ d, pet }) => { const mine = mod(d.n - w.n, 35) === 0; return `<div class="panel day7" data-iso="${isoFromDayNum(d.n)}" style="${mine ? 'border-color:var(--gold)' : ''}">
      <div class="hint">${fmtDate(isoFromDayNum(d.n), { day: 'numeric', month: 'short' })}</div>
      <div class="serif" style="font-size:18px;line-height:1.2;margin-top:4px">${d.hari.nama}</div>
      <div class="serif ${mine ? 'gold' : 'muted'}" style="font-size:16px;font-style:italic">${d.pasaran.nama}</div>
      <div class="cd-pet ${pet.nada}" style="margin-top:6px">${pet.nama}</div></div>`; }).join('')}
  </div>
  <p class="hint" style="margin-top:16px">Wetonan selanjutnya: ${next.slice(1).map((n) => fmtDate(isoFromDayNum(n), { day: 'numeric', month: 'short', year: 'numeric' })).join(' · ')}</p>
  <div class="foot">Watak, laku, pancasuda, dan wuku diringkas dari tradisi primbon & pawukon. Untuk refleksi dan hiburan.</div>`;
  SHARE.weton = { eyebrow: 'Weton kelahiran', title: w.label, subtitle: `${profile.name ? profile.name + ' · ' : ''}${fmtDate(profile.date, { day: 'numeric', month: 'long', year: 'numeric' })}`, big: String(w.neptu), bigLabel: 'NEPTU',
    sections: [{ h: `Laku · ${w.laku.nama}`, t: w.laku.teks }, { h: `Pancasuda · ${w.pancasuda.nama}`, t: w.pancasuda.teks }, { h: `Watak ${w.hari.nama} ${w.pasaran.nama}`, t: `${w.hx.kelebihan[0]}. ${w.px.kelebihan[0]}. ${w.px.sifat}.` }], file: 'weton-' + w.label };
  $$('.day7', v).forEach((el) => (el.onclick = () => openModal(dayDetailHTML(el.dataset.iso), true)));
}

// ── numerologi ──
function renderNumerologi() {
  const v = $('#view-numerologi');
  if (!profile) return needProfile(v);
  const lp = lifePath(profile.date);
  const L = LIFE_PATH[lp.n];
  const pn = personalNums(profile.date);
  const bday = reduceNum(lp.d);
  const full = profile.fullName || profile.name || '';
  const ex = nameNum(full, false), su = nameNum(full, true);
  const py = PERSONAL_YEAR[pn.year] || PERSONAL_YEAR[reduceNum(pn.year, [])];
  const pdx = PERSONAL_DAY[pn.day] || PERSONAL_DAY[reduceNum(pn.day, [])];
  v.innerHTML = `
  <header class="vhead"><div class="eyebrow">Numerologi</div>
    <h1>Life Path <em>${lp.n}</em> · ${L.nama}</h1>
    <p class="lead">${L.kunci}</p></header>
  <div class="grid g2">
    <div class="panel span2"><h3>Jalan hidupmu</h3><p class="serif" style="font-size:20px;color:#d9d3c4">${L.teks}</p>
      <p class="hint" style="margin-top:12px">Hitungan: bulan ${lp.m} → ${lp.a}, tanggal ${lp.d} → ${lp.b}, tahun ${lp.y} → ${lp.c}; ${lp.a} + ${lp.b} + ${lp.c} = ${lp.a + lp.b + lp.c} → <b class="gold">${lp.n}</b></p></div>
    <div class="panel"><h3>Kekuatan</h3><p>${L.kekuatan}</p></div>
    <div class="panel"><h3>Tantangan</h3><p>${L.tantangan}</p></div>
    <div class="panel"><h3>Karier</h3><p>${L.karier}</p></div>
    <div class="panel"><h3>Cinta</h3><p>${L.cinta}</p></div>
  </div>
  <div class="divider"></div>
  <h2 class="sec">Siklus pribadimu sekarang</h2>
  <div class="grid g3">
    <div class="panel stat"><div class="k">Tahun pribadi ${pn.ry}</div><div class="v">${pn.year}</div><p class="small" style="margin-top:8px">${py}</p></div>
    <div class="panel stat"><div class="k">Bulan pribadi</div><div class="v">${pn.month}</div><p class="small" style="margin-top:8px">${(PERSONAL_DAY[pn.month] || PERSONAL_DAY[reduceNum(pn.month, [])])[1].replace('Hari', 'Bulan')}</p></div>
    <div class="panel stat"><div class="k">Hari pribadi</div><div class="v">${pn.day}</div><p class="small" style="margin-top:8px"><b>${pdx[0]}.</b> ${pdx[1]}</p></div>
  </div>
  <div class="divider"></div>
  <h2 class="sec">Angka inti lainnya</h2>
  <div class="grid g3">
    <div class="panel stat"><div class="k">Angka kelahiran</div><div class="v">${bday}</div><p class="small" style="margin-top:8px">Bakat bawaan dari tanggal ${lp.d}: ${LIFE_PATH[bday].kunci}.</p></div>
    <div class="panel stat"><div class="k">Ekspresi (nama)</div><div class="v">${ex ?? '—'}</div><p class="small" style="margin-top:8px">${ex ? EXPRESSION_TEKS[ex] : 'Isi nama lengkap di Profil untuk menghitung.'}</p></div>
    <div class="panel stat"><div class="k">Dorongan jiwa (vokal)</div><div class="v">${su ?? '—'}</div><p class="small" style="margin-top:8px">${su ? SOUL_TEKS[su] : 'Isi nama lengkap di Profil untuk menghitung.'}</p></div>
  </div>
  ${full ? `<p class="hint" style="margin-top:12px">Dihitung dari nama “${esc(full)}” (sistem Pythagoras: A=1 … I=9, J=1 …).</p>` : ''}
  <div class="foot">Numerologi Pythagoras. Angka master 11, 22, 33 tidak direduksi. Untuk refleksi dan hiburan.</div>`;
}

// ── shio ──
function renderShio() {
  const v = $('#view-shio');
  const me = profile ? shioOf(profile.date) : null;
  const yearNow = shioOf(todayISO());
  const today = dayInfo(todayISO());
  const dayB = today.pillar % 12;
  const relName = (i) => (me ? shioRel(me.idx, i) : null);
  const cocok = me ? SHIO.map((s, i) => ({ s, i, r: relName(i) })).filter((x) => x.i !== me.idx && (x.r.k === 'sanhe' || x.r.k === 'liuhe')) : [];
  const kurang = me ? SHIO.map((s, i) => ({ s, i, r: relName(i) })).filter((x) => x.r.k === 'ciong' || x.r.k === 'hai') : [];
  const yr = me ? shioRel(me.idx, yearNow.idx) : null;
  v.innerHTML = `
  <header class="vhead"><div class="eyebrow">Shio</div>
    <h1>${me ? `Shio <em>${me.s.nama}</em> ${me.unsur.nama}` : 'Dua belas shio'}</h1>
    ${me ? `<p class="lead">Tahun ${me.tahun} · ${me.yin ? 'Yin' : 'Yang'} · ${me.s.hanzi} · dihitung dari tahun baru Imlek</p>` : ''}</header>
  ${me ? `
  <div class="grid g2">
    <div class="panel span2"><h3>Watak ${me.s.nama}</h3><p class="serif" style="font-size:20px;color:#d9d3c4">${me.s.watak}</p><p style="margin-top:10px">${me.unsur.teks}</p></div>
    <div class="panel"><h3>Kekuatan</h3><p>${me.s.kekuatan}</p></div>
    <div class="panel"><h3>Kelemahan</h3><p>${me.s.kelemahan}</p></div>
    <div class="panel"><h3>Karier</h3><p>${me.s.karier}</p></div>
    <div class="panel"><h3>Cinta</h3><p>${me.s.cinta}</p></div>
    <div class="panel"><h3>Keberuntungan</h3><div class="kv"><span>Angka</span><b>${me.s.angka.join(' · ')}</b></div><div class="kv"><span>Warna</span><b>${me.s.warna.join(' · ')}</b></div></div>
    <div class="panel"><h3>Jodoh shio</h3><div class="kv"><span>Cocok</span><b class="gold">${cocok.map((x) => x.s.nama).join(', ')}</b></div><div class="kv"><span>Kurang cocok</span><b class="rose">${kurang.map((x) => x.s.nama).join(', ')}</b></div></div>
  </div>
  <div class="divider"></div>
  <div class="grid g2">
    <div class="panel"><h3>Tahun ${yearNow.s.nama} ${yearNow.unsur.nama} (${yearNow.tahun})</h3><div class="serif big-line"><span class="pill ${yr.nada}">${yr.label}</span></div>
      <p>Shio ${me.s.nama}-mu dengan shio tahun ini: ${yr.teks}.${yr.k === 'ciong' ? ' Tahun ciong: perbanyak kehati-hatian, jaga kesehatan, dan hindari spekulasi besar.' : yr.k === 'sama' ? ' Tahun shio sendiri (Ben Ming Nian): secara tradisi perlu lebih rendah hati dan berhati-hati.' : ''}</p></div>
    <div class="panel"><h3>Hari ini · cabang ${SHIO[dayB].nama}</h3><div class="serif big-line"><span class="pill ${shioRel(me.idx, dayB).nada}">${shioRel(me.idx, dayB).label}</span></div>
      <p>${shioRel(me.idx, dayB).teks}.</p><p class="hint" style="margin-top:8px">Siklus hari 60 (ganzhi) · indeks ${today.pillar + 1}</p></div>
  </div>
  <div class="divider"></div>` : ''}
  <div class="zgrid">
    ${SHIO.map((s, i) => `<div class="zc ${me && me.idx === i ? 'me' : ''}" data-i="${i}"><div class="g">${s.hanzi}</div><div class="n">${s.nama}</div>
      <div class="d">${me ? relName(i).label : s.kekuatan.split(',')[0]}</div></div>`).join('')}
  </div>
  <div class="foot">Shio mengikuti tahun baru Imlek, bukan 1 Januari. Untuk refleksi dan hiburan.</div>`;
  $$('.zc', v).forEach((el) => (el.onclick = () => {
    const i = +el.dataset.i, s = SHIO[i], r = relName(i);
    openModal(`<div class="eyebrow">Shio</div><h1 style="font-size:40px"><span class="gold">${s.hanzi}</span> ${s.nama}</h1>
      <div class="divider" style="margin:18px 0"></div><p class="serif" style="font-size:19px">${s.watak}</p>
      <h3 style="margin-top:16px">Kekuatan</h3><p>${s.kekuatan}</p><h3 style="margin-top:12px">Kelemahan</h3><p>${s.kelemahan}</p>
      ${r && me.idx !== i ? `<div class="divider" style="margin:18px 0"></div><h3>Dengan ${me.s.nama}-mu</h3><p><span class="pill ${r.nada}">${r.label}</span> ${r.teks}.</p>` : ''}`);
  }));
}

// ── zodiak & peta lahir ──
function renderZodiak() {
  const v = $('#view-zodiak');
  const me = profile ? zodiakOf(profile.date) : null;
  let natal = '';
  if (profile) {
    const nt = natalOf(profile);
    const P = nt.pos;
    const sunS = ZODIAK[P.Sun.sign], moonS = ZODIAK[P.Moon.sign];
    const ascS = nt.ang ? ZODIAK[Math.floor(nt.ang.asc / 30)] : null;
    const ascSign = nt.ang ? Math.floor(nt.ang.asc / 30) : null;
    natal = `
    <div class="grid g3">
      <div class="panel stat"><div class="k">Matahari · inti diri</div><div class="v"><span class="gold">${T(sunS.glyph)}</span> ${sunS.nama}</div><div class="s">${fmtDeg(P.Sun)} · ${sunS.kunci.toLowerCase()}</div></div>
      <div class="panel stat"><div class="k">Bulan · perasaan</div><div class="v"><span class="gold">${T(moonS.glyph)}</span> ${moonS.nama}</div><div class="s">${nt.moonUnsure ? 'Bulan berpindah tanda hari itu; isi jam lahir agar pasti' : fmtDeg(P.Moon)}</div></div>
      <div class="panel stat"><div class="k">Ascendant · kesan pertama</div><div class="v">${ascS ? `<span class="gold">${T(ascS.glyph)}</span> ${ascS.nama}` : '—'}</div><div class="s">${ascS ? `${Math.floor(nt.ang.asc % 30)}° · ${nt.kota[0]}` : 'Isi jam & kota lahir di Profil'}</div></div>
    </div>
    <div class="grid g2" style="margin-top:16px;align-items:start">
      <div class="panel" style="display:flex;justify-content:center">${wheelSVG(P, nt.ang)}</div>
      <div class="panel"><h3>Posisi planet saat lahir</h3>
        ${Astro.BODIES.map((b) => { const p = P[b], zz = ZODIAK[p.sign]; return `<div class="kv"><span>${T(PLANET[b].glyph)} ${PLANET[b].id}</span><b>${T(zz.glyph)} ${zz.nama} ${fmtDeg(p)}${p.retro ? ' ℞' : ''}${ascSign !== null ? ` <span class="muted">· rumah ${mod(p.sign - ascSign, 12) + 1}</span>` : ''}</b></div>`; }).join('')}
        ${!nt.known ? '<p class="hint" style="margin-top:10px">Tanpa jam lahir, posisi dihitung pukul 12.00 waktu setempat.</p>' : ''}</div>
    </div>
    <div class="grid g2" style="margin-top:16px">
      <div class="panel"><h3>Bulan di ${moonS.nama}</h3><p>${BULAN_TEKS[P.Moon.sign]}</p></div>
      <div class="panel"><h3>Ascendant${ascS ? ' ' + ascS.nama : ''}</h3><p>${ascS ? ASC_TEKS[ascSign] : 'Ascendant berganti kira-kira tiap 2 jam, jadi butuh jam lahir dan kota lahir.'}</p></div>
      ${['Mercury', 'Venus', 'Mars'].map((b) => `<div class="panel"><h3>${PLANET[b].id} di ${ZODIAK[P[b].sign].nama}${P[b].retro ? ' ℞' : ''}</h3><p>${cap(PLANET[b].inti)} kamu bergaya <b class="gold">${SIGN_GAYA[P[b].sign]}</b>.${P[b].retro ? ' Retrograde saat lahir: energinya lebih ke dalam dan reflektif.' : ''}</p></div>`).join('')}
      <div class="panel"><h3>Jupiter & Saturnus</h3><p>Pertumbuhanmu datang lewat cara yang <b class="gold">${SIGN_GAYA[P.Jupiter.sign]}</b> (Jupiter di ${ZODIAK[P.Jupiter.sign].nama}); pelajaran hidupmu menuntut sikap <b class="gold">${SIGN_GAYA[P.Saturn.sign]}</b> (Saturnus di ${ZODIAK[P.Saturn.sign].nama}).</p></div>
    </div>
    <div class="divider"></div>`;
  }
  v.innerHTML = `
  <header class="vhead"><div class="eyebrow">Zodiak & peta lahir</div>
    <h1>${me ? `Kamu lahir di bawah <em>${me.nama}</em>` : 'Dua belas rasi'}</h1>
    ${me ? `<p class="lead">${me.kunci}. Unsur ${me.unsur.toLowerCase()}, sifat ${me.sifat.toLowerCase()}, dinaungi ${me.planet}.</p>` : ''}</header>
  ${natal}
  ${profile ? (() => { const tr = transitsFor(profile); return `<h2 class="sec">Transit pribadi hari ini</h2><div class="panel">${transitHTML(tr)}<div class="divider" style="margin:16px 0"></div>${housesHTML(tr)}</div><div class="divider"></div>`; })() : ''}
  <div class="zgrid">
    ${ZODIAK.map((z, i) => {
      const end = ZODIAK[(i + 1) % 12].mulai;
      const endD = new Date(2001, end[0] - 1, end[1] - 1);
      return `<div class="zc el-${z.unsur} ${me === z ? 'me' : ''}" data-i="${i}">
        <div class="g">${T(z.glyph)}</div><div class="n">${z.nama}</div>
        <div class="d">${z.mulai[1]} ${new Date(2001, z.mulai[0] - 1, 1).toLocaleDateString('id-ID', { month: 'short' })} – ${endD.getDate()} ${endD.toLocaleDateString('id-ID', { month: 'short' })}</div>
        <div class="d" style="margin-top:8px"><span class="dot"></span>${z.unsur}</div></div>`;
    }).join('')}
  </div>
  <div class="foot">Posisi planet dihitung dengan elemen orbit (presisi ± beberapa menit busur). Rumah memakai sistem whole sign.</div>`;
  $$('.zc', v).forEach((el) => (el.onclick = () => {
    const i = +el.dataset.i, z = ZODIAK[i];
    const rel = me ? elementRelation(z.unsur, me.unsur) : null;
    const sky = Astro.positions(utcNoonWIB(todayISO()));
    const rm = RUMAH[mod(sky.Moon.sign - i, 12)];
    openModal(`<div class="eyebrow">${z.unsur} · ${z.sifat} · ${z.planet}</div>
      <h1 style="font-size:40px"><span class="gold">${T(z.glyph)}</span> ${z.nama}</h1>
      <div class="divider" style="margin:18px 0"></div>
      <h3>Cahaya</h3><p class="serif" style="font-size:19px">${z.kunci}</p>
      <h3 style="margin-top:16px">Bayangan</h3><p class="serif" style="font-size:19px">${z.bayang}</p>
      <h3 style="margin-top:16px">Horoskop hari ini · ${rm.nama}</h3><p>${rm.teks}</p>
      ${rel && me !== z ? `<div class="divider" style="margin:18px 0"></div><h3>Dengan ${me.nama}-mu</h3><p><span class="gold">${cap(rel.kata)}</span>: ${rel.teks}.</p>` : ''}`);
  }));
}

// ── tarot ──
const SPREADS = { 1: ['Pesan'], 3: ['Lalu', 'Kini', 'Nanti'], 5: ['Situasi', 'Tantangan', 'Akar', 'Saran', 'Kemungkinan'] };
let tState = { n: 1, picks: [], pool: [] };

function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function autoPick() {
  if (tState.auto || tState.picks.length >= tState.n) return;
  tState.auto = true;
  const run = tState.run = (tState.run || 0) + 1;
  const step = () => {
    if (run !== tState.run || tState.picks.length >= tState.n) { tState.auto = false; return; }
    const els = $$('#tFan .fc');
    const free = els.map((el, i) => [el, i]).filter(([el]) => !el.classList.contains('taken'));
    const [el, i] = free[Math.floor(Math.random() * free.length)];
    el.style.transform += ' translateY(-22px)';
    setTimeout(() => { if (run === tState.run) { pickCard(i, el); setTimeout(step, 420); } }, 260);
  };
  step();
}

function resetTarot() {
  tState.run = (tState.run || 0) + 1; tState.auto = false;
  tState.picks = [];
  tState.pool = shuffle(DECK).slice(0, 21);
  const fan = $('#tFan'); fan.innerHTML = '';
  const N = tState.pool.length;
  tState.pool.forEach((c, i) => {
    const a = -30 + (60 * i) / (N - 1);
    const el = document.createElement('div');
    el.className = 'fc';
    el.style.transform = `translateX(-50%) rotate(${a}deg)`;
    el.style.transitionDelay = `${i * 12}ms`;
    el.innerHTML = cardBackSVG();
    el.onmouseenter = () => (el.style.transform = `translateX(-50%) rotate(${a}deg) translateY(-14px)`);
    el.onmouseleave = () => (el.style.transform = `translateX(-50%) rotate(${a}deg)`);
    el.onclick = () => pickCard(i, el);
    fan.appendChild(el);
  });
  const slots = $('#tSlots');
  slots.innerHTML = SPREADS[tState.n].map((p) => `<div class="slot"><div class="lbl">${p}</div><div class="empty"></div></div>`).join('');
  $('#tReading').innerHTML = `<p class="hint" style="text-align:center">Tarik napas, pikirkan pertanyaanmu, lalu pilih ${tState.n} kartu dari kipas.</p>`;
}

function pickCard(i, el) {
  if (tState.picks.length >= tState.n) return;
  const card = tState.pool[i];
  const rev = Math.random() < 0.3;
  tState.picks.push({ card, rev });
  el.classList.add('taken');
  const slot = $$('#tSlots .slot')[tState.picks.length - 1];
  const ce = cardEl(card, rev);
  slot.querySelector('.empty').replaceWith(ce);
  slot.insertAdjacentHTML('beforeend', `<div class="cname">${card.nama}</div><div class="corient">${rev ? 'terbalik' : 'tegak'}</div>`);
  setTimeout(() => ce.classList.add('flipped'), 60);
  ce.onclick = () => openCard(card, rev);
  if (tState.picks.length === tState.n) setTimeout(renderReading, 700);
}

// ── tafsir tarot ──
function tafsir(card, rev) {
  if (card.arcana === 'mayor') {
    const m = MAYOR_X[card.nomor];
    return { inti: rev ? m[1] : m[0], saran: m[2], topik: { cinta: m[3], karier: m[4], uang: m[5], sehat: rev ? 'Tubuh dan pikiran sedang minta diperhatikan; jangan abaikan sinyal lelah.' : 'Energi kartu besar ini juga memengaruhi kondisi tubuh; jaga ritme dan istirahat.' } };
  }
  const r = RANK_X[card.rank], s = SUIT_X[card.suit];
  const kw = (rev ? card.terbalik : card.tegak).split(' · ');
  return {
    inti: `${card.sub} membawa tema <b>${r[0]}</b> di ranah ${s.ranah}. ${rev ? r[2] : r[1]} Dalam kartu ini, itu tampil sebagai ${kw.join(', ')}.`,
    saran: rev ? `Periksa apa yang tertahan dalam urusan ${s.ranah}, lalu beri ruang untuk memulihkannya.` : `Arahkan energimu dengan sadar ke urusan ${s.ranah}; momen ini mendukungmu.`,
    topik: { cinta: s.cinta, karier: s.karier, uang: s.uang, sehat: s.sehat }
  };
}
function cardLean(card, rev) {
  let v = rev ? -1 : 1;
  if (card.arcana === 'mayor') {
    if ([1, 3, 6, 7, 8, 10, 17, 19, 21].includes(card.nomor)) v = rev ? -0.5 : 2;
    if ([12, 13, 15, 16, 18].includes(card.nomor)) v = rev ? 0 : -1.5;
  } else {
    if (card.rank === 4) v -= 1;
    if (card.suit === 'Swords' && [2, 8, 9].includes(card.rank)) v = rev ? 0 : -1.5;
    if ([0, 5, 8, 9].includes(card.rank) && card.suit !== 'Swords' && !rev) v += 0.5;
  }
  return v;
}
function topikOf(q) { return TOPIK.find((t) => t.re.test(q)) || null; }

function answerHTML(q, picks, pos) {
  const topik = topikOf(q);
  const isYN = /^(apakah|apa\s+(aku|saya|dia|kami|kita)|bisakah|akankah|haruskah|mungkinkah|bakal|jadi\s+gak|jadi\s+nggak)/i.test(q) || /\b(gak|nggak|tidak|ga)\s*\?$/i.test(q);
  const isWhen = /^kapan/i.test(q);
  const coreIdx = picks.length === 1 ? 0 : picks.length === 3 ? 1 : 0;
  const outIdx = picks.length - 1;
  const advIdx = picks.length === 5 ? 3 : outIdx;
  const core = picks[coreIdx], out = picks[outIdx], adv = picks[advIdx];
  const kw = (p) => (p.rev ? p.card.terbalik : p.card.tegak).split(' · ');
  let parts = [];
  parts.push(q ? `Untuk pertanyaanmu${topik ? ` tentang <b>${topik.label}</b>` : ''}, beginilah kartu membacanya.` : 'Tanpa pertanyaan khusus, kartu memberi gambaran umum tentang keadaanmu.');
  if (isYN) {
    const s = picks.reduce((a, p, i) => a + cardLean(p.card, p.rev) * (i === outIdx ? 1.5 : 1), 0) / picks.length;
    const v = s >= 1.2 ? ['Ya', 'baik', 'Energinya mendukung kuat.'] : s >= 0.4 ? ['Cenderung ya', 'baik', 'Peluangnya terbuka, asal kamu tetap berusaha.'] : s > -0.4 ? ['Belum pasti', 'netral', 'Hasilnya sangat bergantung pada pilihan dan usahamu.'] : ['Cenderung belum', 'waspada', 'Bukan berarti tidak mungkin, tapi waktunya atau caranya perlu diubah.'];
    parts.push(`Kecenderungan jawaban: <span class="pill ${v[1]}">${v[0]}</span> ${v[2]}`);
  }
  if (isWhen) {
    const tm = { Wands: 'cepat, dalam hitungan hari sampai beberapa minggu', Swords: 'dalam beberapa minggu, setelah keputusan dibuat', Cups: 'dalam beberapa bulan, mengikuti kesiapan hati', Pentacles: 'perlahan, bisa beberapa bulan hingga setahun' };
    const pk = out.card.suit ? tm[out.card.suit] : 'saat sebuah babak penting dalam hidupmu sudah siap';
    parts.push(`Soal waktu, ${out.card.nama} memberi isyarat: ${pk}. Anggap ini perkiraan, bukan tanggal pasti.`);
  }
  parts.push(`Intinya ada pada <b>${core.card.nama}</b>${core.rev ? ' terbalik' : ''}: ${kw(core)[0]} dan ${kw(core)[1] || kw(core)[0]}.`);
  if (picks.length > 1) parts.push(`Arah ke depan ditunjukkan <b>${out.card.nama}</b>${out.rev ? ' terbalik' : ''}, yang membawa nada ${kw(out).slice(0, 2).join(' dan ')}.`);
  if (topik) parts.push(tafsir(core.card, core.rev).topik[topik.k]);
  parts.push(`<span class="gold">Saran:</span> ${tafsir(adv.card, adv.rev).saran}`);
  return parts.join(' ');
}

function renderReading() {
  const pos = SPREADS[tState.n];
  const q = $('#tQuestion').value.trim();
  const topik = topikOf(q);
  SHARE.tarot = { eyebrow: 'Bacaan tarot · ' + fmtDate(todayISO(), { day: 'numeric', month: 'long', year: 'numeric' }), title: q ? '“' + q + '”' : 'Pesan kartu untukku', cards: tState.picks.map((p, i) => ({ card: p.card, rev: p.rev, label: tState.n > 1 ? pos[i] : '' })),
    sections: [{ h: 'Jawaban kartu', t: answerHTML(q, tState.picks, pos) }], file: 'tarot' };
  const mayor = tState.picks.filter((p) => p.card.arcana === 'mayor').length;
  const counts = {}; tState.picks.forEach((p) => p.card.unsur && (counts[p.card.unsur] = (counts[p.card.unsur] || 0) + 1));
  const dom = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const revs = tState.picks.filter((p) => p.rev).length;
  const elText = { Api: 'semangat dan tindakan', Air: 'perasaan dan hubungan', Udara: 'pikiran dan keputusan', Tanah: 'materi, kerja, dan hal-hal nyata' };
  let sum = [];
  if (tState.n > 1) {
    if (mayor >= Math.ceil(tState.n / 2)) sum.push('Banyak Arkana Mayor yang muncul: ini soal babak hidup yang lebih besar, bukan sekadar urusan harian.');
    if (dom && dom[1] >= 2) sum.push(`Unsur <b class="gold">${dom[0].toLowerCase()}</b> paling kuat, jadi intinya ada di ${elText[dom[0]]}.`);
    if (revs >= Math.ceil(tState.n / 2)) sum.push('Banyak kartu terbalik: ada energi yang tertahan atau sedang diproses ke dalam.');
  }
  $('#tReading').innerHTML = `
    ${q ? `<p class="serif" style="font-size:20px;font-style:italic;text-align:center;color:var(--muted);margin-bottom:18px">“${esc(q)}”</p>` : ''}
    <div class="panel answer"><div class="vhead-row"><h3>Jawaban kartu</h3>${shareBtn('tarot')}</div><p class="synth" style="font-size:19px">${answerHTML(q, tState.picks, pos)}</p></div>
    ${tState.picks.map((p, i) => { const t = tafsir(p.card, p.rev); return `<div class="item"><div class="pos">${pos[i]}<div class="pos-d">${POS_X[pos[i]] || ''}</div></div><div>
      <div class="nm">${p.card.nama} <span class="muted" style="font-size:15px">· ${p.card.sub}${p.rev ? ' · terbalik' : ''}</span></div>
      <div class="kw">${p.rev ? p.card.terbalik : p.card.tegak}</div>
      <p class="tf">${t.inti}</p>
      ${topik ? `<p class="tf"><span class="gold">Untuk ${topik.label}:</span> ${t.topik[topik.k]}</p>` : ''}
      <p class="tf"><span class="gold">Saran kartu:</span> ${t.saran}</p></div></div>`; }).join('')}
    ${sum.length ? `<div class="panel" style="margin-top:20px"><h3>Benang merah</h3><p class="synth" style="font-size:18px">${sum.join(' ')}</p></div>` : ''}`;
}

function openCard(card, rev) {
  openModal(`<div style="display:grid;grid-template-columns:150px 1fr;gap:26px;align-items:center">
    <div id="mCard"></div>
    <div><div class="eyebrow">${cardInfo(card)}</div>
      <h1 style="font-size:34px">${card.nama}</h1><div class="muted serif" style="font-style:italic;font-size:18px">${card.sub}</div>
      <div class="divider" style="margin:16px 0"></div>
      <h3>Tegak</h3><p style="margin-bottom:12px;${rev ? 'color:var(--muted)' : ''}">${card.tegak}</p>
      <h3>Terbalik</h3><p style="${rev ? '' : 'color:var(--muted)'}">${card.terbalik}</p></div></div>
    <div class="divider" style="margin:18px 0"></div>
    <h3>Tafsir ${rev ? 'terbalik' : 'tegak'}</h3><p>${tafsir(card, rev).inti}</p>
    <h3 style="margin-top:14px">Saran</h3><p>${tafsir(card, rev).saran}</p>
    <div class="grid g2 tight" style="margin-top:14px">${['cinta', 'karier', 'uang', 'sehat'].map((k) => `<div><h4>${{ cinta: 'Cinta', karier: 'Karier', uang: 'Keuangan', sehat: 'Kesehatan' }[k]}</h4><p class="small">${tafsir(card, rev).topik[k]}</p></div>`).join('')}</div>`, true);
  $('#mCard').appendChild(cardEl(card, rev, true));
}

// ── jodoh ──
function renderJodoh() {
  const a = $('#jAd').value, b = $('#jBd').value;
  if (!a || !b) { $('#jOut').innerHTML = `<p class="hint" style="text-align:center">Isi kedua tanggal lahir dulu.</p>`; return; }
  const na = $('#jA').value.trim() || 'Pertama', nb = $('#jB').value.trim() || 'Kedua';
  const wa = wetonOf(a, $('#jAm').checked), wb = wetonOf(b, $('#jBm').checked);
  const za = zodiakOf(a), zb = zodiakOf(b);
  const sa = shioOf(a), sb = shioOf(b);
  const la = lifePath(a), lb = lifePath(b);
  const total = wa.neptu + wb.neptu;
  const res = JODOH[total % 8];
  const rel = elementRelation(za.unsur, zb.unsur);
  const sr = shioRel(sa.idx, sb.idx);
  const lr = lpCompat(la.n, lb.n);
  const pd = PANCASUDA[total % 7];
  const pts = { baik: 25, netral: 15, waspada: 6 };
  const skor = Math.round(clamp(pts[res.nada] + (sr.skor + 3) * 4 + pts[lr.nada] + (rel.kata === 'selaras' ? 25 : rel.kata === 'saling menguatkan' ? 22 : 12), 10, 99));
  SHARE.jodoh = { eyebrow: 'Kecocokan', title: `${na} & ${nb}`, subtitle: `${wa.label} × ${wb.label}`, big: res.nama, bigLabel: `SKOR GABUNGAN ${skor}/100`,
    sections: [{ h: 'Petung jodoh', t: res.teks }, { h: `Shio ${sa.s.nama} & ${sb.s.nama}`, t: sr.label + ': ' + sr.teks }, { h: `Zodiak ${za.nama} & ${zb.nama}`, t: rel.kata + ', ' + rel.teks }, { h: `Life path ${la.n} & ${lb.n}`, t: lr.kata + '. ' + lr.teks }], file: 'jodoh' };
  $('#jOut').innerHTML = `
    <div style="text-align:right;margin-bottom:10px">${shareBtn('jodoh')}</div>
    <div class="panel verdict"><div class="eyebrow">Neptu ${wa.neptu} + ${wb.neptu} = ${total} · sisa ${total % 8}</div>
      <div class="big ${res.nada}">${res.nama}</div>
      <p class="serif" style="font-size:20px;max-width:560px;margin:14px auto 0;color:#d9d3c4">${res.teks}</p>
      <p class="muted" style="margin-top:14px">Skor gabungan: <b class="gold">${skor}/100</b></p></div>
    <div class="grid g2" style="margin-top:16px">
      ${[[na, wa, za, sa, la], [nb, wb, zb, sb, lb]].map(([n, w, z, s, l]) => `<div class="panel"><h3>${esc(n)}</h3>
        <div class="serif" style="font-size:26px">${w.hari.nama} <span class="gold" style="font-style:italic">${w.pasaran.nama}</span></div>
        <div class="muted">Neptu ${w.neptu} · ${w.laku.nama}</div>
        <div class="muted" style="margin-top:6px"><span class="gold">${T(z.glyph)}</span> ${z.nama} · shio ${s.s.nama} ${s.unsur.nama} · life path ${l.n}</div></div>`).join('')}
      <div class="panel"><h3>Pancasuda berdua · ${pd.nama}</h3><p>${pd.teks}</p></div>
      <div class="panel"><h3>Langit berdua</h3><p>${za.nama} dan ${zb.nama}: <span class="gold">${rel.kata}</span>, ${rel.teks}.</p></div>
      <div class="panel"><h3>Shio · ${sa.s.nama} & ${sb.s.nama}</h3><p><span class="pill ${sr.nada}">${sr.label}</span> ${cap(sr.teks)}.</p></div>
      <div class="panel"><h3>Numerologi · ${la.n} & ${lb.n}</h3><p><span class="pill ${lr.nada}">${lr.kata}</span> ${lr.teks}</p></div>
    </div>
    <div class="foot">Petung jodoh primbon: jumlah neptu dibagi 8. Satu dari banyak cara menghitung. Yang menentukan tetap kalian berdua.</div>`;
}

// ── modal & nav ──
function openModal(html, wide = false) {
  $('#modalCard').className = 'modal-card' + (wide ? ' wide' : '');
  $('#modalCard').innerHTML = `<span class="x">✕</span>` + html;
  $('#modal').classList.add('open'); $('#modalCard .x').onclick = closeModal; $('#modalCard').scrollTop = 0;
}
function closeModal() { $('#modal').classList.remove('open'); }
$('#modal').onclick = (e) => { if (e.target.id === 'modal') closeModal(); };
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());

const renderers = { hari: renderHari, kalender: renderKalender, weton: renderWeton, numerologi: renderNumerologi, shio: renderShio, zodiak: renderZodiak, tarot: () => { if (!tState.pool.length) resetTarot(); }, jodoh: prefillJodoh, profil: fillProfile };
function go(view) {
  $$('.nav button').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  $$('.view').forEach((s) => s.classList.toggle('active', s.id === 'view-' + view));
  try { renderers[view] && renderers[view](); } catch (e) { console.error(e); }
  $('#main').scrollTop = 0;
}
window.go = go;
$$('.nav button').forEach((b) => (b.onclick = () => go(b.dataset.view)));

$$('#tSpread button').forEach((b) => (b.onclick = () => { $$('#tSpread button').forEach((x) => x.classList.toggle('on', x === b)); tState.n = +b.dataset.n; resetTarot(); }));
$('#tShuffle').onclick = resetTarot;
$('#tAuto').onclick = () => { if (tState.picks.length >= tState.n) resetTarot(); autoPick(); };
$('#jGo').onclick = renderJodoh;

// profil
$('#pKota').innerHTML = KOTA.map((k, i) => `<option value="${i}">${k[0]} (${k[3] === 7 ? 'WIB' : k[3] === 8 ? 'WITA' : 'WIT'})</option>`).join('');
$('#pTime').addEventListener('change', () => { const t = $('#pTime').value; if (t) $('#pMaghrib').checked = t >= '18:00'; });
function prefillJodoh() { if (profile && !$('#jAd').value) { $('#jA').value = profile.name || ''; $('#jAd').value = profile.date; $('#jAm').checked = !!profile.maghrib; } }
function fillProfile() {
  if (!profile) return;
  $('#pName').value = profile.name || ''; $('#pFull').value = profile.fullName || '';
  $('#pDate').value = profile.date; $('#pTime').value = profile.time || '';
  $('#pKota').value = String(profile.kota ?? 0); $('#pMaghrib').checked = !!profile.maghrib;
}
function updateNav() { $('#navName').textContent = profile?.name || 'Profil'; }
$('#pSave').onclick = () => {
  const date = $('#pDate').value;
  if (!date) { $('#pMsg').textContent = 'Tanggal lahir wajib diisi.'; return; }
  profile = { name: $('#pName').value.trim(), fullName: $('#pFull').value.trim(), date, time: $('#pTime').value || '', kota: +$('#pKota').value || 0, maghrib: $('#pMaghrib').checked };
  store.set(profile); updateNav();
  $('#pMsg').textContent = 'Tersimpan.';
  setTimeout(() => go('hari'), 400);
};

// ── langit ──
(function sky() {
  const cv = $('#sky'), ctx = cv.getContext('2d');
  let W, H, stars = [], shoot = null;
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const r = rng(42); const n = Math.round((W * H) / 5200);
    stars = Array.from({ length: n }, () => ({ x: r() * W, y: r() * H, s: r() < 0.06 ? 1.3 + r() : 0.35 + r() * 0.7, p: r() * Math.PI * 2, sp: 0.4 + r() * 1.2, warm: r() < 0.25 }));
  }
  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    const tt = t / 1000;
    for (const s of stars) {
      const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(tt * s.sp + s.p));
      ctx.fillStyle = s.warm ? `rgba(232,220,190,${a})` : `rgba(205,214,235,${a})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, 6.283); ctx.fill();
      if (s.s > 1.3) { ctx.fillStyle = `rgba(201,185,143,${a * 0.08})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.s * 5, 0, 6.283); ctx.fill(); }
    }
    if (!shoot && Math.random() < 0.0012) shoot = { x: Math.random() * W * 0.7 + W * 0.2, y: Math.random() * H * 0.3, l: 0 };
    if (shoot) {
      shoot.l += 1;
      const len = 90, k = shoot.l / 50, x = shoot.x - shoot.l * 6, y = shoot.y + shoot.l * 2.4;
      const g = ctx.createLinearGradient(x, y, x + len, y - len * 0.4);
      g.addColorStop(0, `rgba(240,230,205,${0.5 * (1 - k)})`); g.addColorStop(1, 'rgba(240,230,205,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y - len * 0.4); ctx.stroke();
      if (shoot.l > 50) shoot = null;
    }
    requestAnimationFrame(frame);
  }
  addEventListener('resize', resize); resize(); requestAnimationFrame(frame);
})();

// (start dipanggil dari features.js)
