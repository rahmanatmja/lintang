// ───────────────────────── Lintang · fitur tambahan ─────────────────────────
// Orang terdekat · Hari baik · Transit pribadi · Bagikan sebagai gambar

// ══════════ Orang terdekat ══════════
const peopleStore = {
  get() { try { return JSON.parse(localStorage.getItem('lintang.people')) || []; } catch { return []; } },
  set(a) { try { localStorage.setItem('lintang.people', JSON.stringify(a)); } catch {} }
};
let people = peopleStore.get();
let ppEditing = null;

function allPersons() {
  const me = profile ? [{ id: 'me', rel: 'Aku', ...profile, name: profile.name || 'Aku' }] : [];
  return [...me, ...people];
}
const personById = (id) => allPersons().find((p) => p.id === id);
function personSummary(p) {
  const w = wetonOf(p.date, p.maghrib), z = zodiakOf(p.date), s = shioOf(p.date), l = lifePath(p.date);
  return { w, z, s, l };
}
function kotaOptions() { return KOTA.map((k, i) => `<option value="${i}">${k[0]} (${k[3] === 7 ? 'WIB' : k[3] === 8 ? 'WITA' : 'WIT'})</option>`).join(''); }

function renderPeople() {
  const el = $('#peopleList');
  if (!people.length) { el.innerHTML = `<div class="panel"><p class="muted">Belum ada orang tersimpan. Tambahkan di formulir sebelah.</p></div>`; return; }
  el.innerHTML = people.map((p) => {
    const { w, z, s, l } = personSummary(p);
    return `<div class="panel person">
      <div class="person-top"><div><div class="serif" style="font-size:24px;line-height:1.1">${esc(p.name)}</div><div class="hint">${esc(p.rel || '')} · ${fmtDate(p.date, { day: 'numeric', month: 'long', year: 'numeric' })}</div></div>
      <div class="person-acts"><button class="btn sm" data-pp-cmp="${p.id}">Bandingkan</button><button class="btn sm ghost" data-pp-edit="${p.id}">Ubah</button><button class="btn sm ghost" data-pp-del="${p.id}">Hapus</button></div></div>
      <div class="tagrow"><span class="tag">${w.label} · neptu ${w.neptu}</span><span class="tag">${T(z.glyph)} ${z.nama}</span><span class="tag">shio ${s.s.nama} ${s.unsur.nama}</span><span class="tag">life path ${l.n}</span></div>
      ${profile ? (() => { const tot = wetonOf(profile.date, profile.maghrib).neptu + w.neptu; const j = JODOH[tot % 8]; return `<p class="small" style="margin-top:10px">Dengan kamu: <span class="pill ${j.nada}">${j.nama}</span> shio ${shioRel(shioOf(profile.date).idx, s.idx).label.toLowerCase()}</p>`; })() : ''}
    </div>`;
  }).join('');
}
function ppReset() {
  ppEditing = null; $('#ppTitle').textContent = 'Tambah orang'; $('#ppCancel').style.display = 'none';
  ['#ppName', '#ppDate', '#ppTime'].forEach((s) => ($(s).value = '')); $('#ppMaghrib').checked = false; $('#ppKota').value = '0'; $('#ppRel').value = 'Pasangan';
}
function ppEdit(id) {
  const p = people.find((x) => x.id === id); if (!p) return;
  ppEditing = id; $('#ppTitle').textContent = 'Ubah ' + p.name; $('#ppCancel').style.display = '';
  $('#ppName').value = p.name; $('#ppRel').value = p.rel || 'Lainnya'; $('#ppDate').value = p.date; $('#ppTime').value = p.time || '';
  $('#ppKota').value = String(p.kota ?? 0); $('#ppMaghrib').checked = !!p.maghrib;
}
$('#ppKota').innerHTML = kotaOptions();
$('#ppTime').addEventListener('change', () => { const t = $('#ppTime').value; if (t) $('#ppMaghrib').checked = t >= '18:00'; });
$('#ppSave').onclick = () => {
  const name = $('#ppName').value.trim(), date = $('#ppDate').value;
  if (!name || !date) { $('#ppMsg').textContent = 'Nama dan tanggal lahir wajib diisi.'; return; }
  const data = { name, rel: $('#ppRel').value, date, time: $('#ppTime').value || '', kota: +$('#ppKota').value || 0, maghrib: $('#ppMaghrib').checked };
  if (ppEditing) people = people.map((p) => (p.id === ppEditing ? { ...p, ...data } : p));
  else people.push({ id: 'p' + Date.now().toString(36), ...data });
  peopleStore.set(people); $('#ppMsg').textContent = 'Tersimpan.'; ppReset(); renderPeople();
};
$('#ppCancel').onclick = ppReset;
$('#peopleList').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.ppEdit) ppEdit(b.dataset.ppEdit);
  if (b.dataset.ppDel) { const p = people.find((x) => x.id === b.dataset.ppDel); if (p && confirm(`Hapus ${p.name} dari daftar?`)) { people = people.filter((x) => x.id !== p.id); peopleStore.set(people); renderPeople(); } }
  if (b.dataset.ppCmp) compareWith(b.dataset.ppCmp);
});

// Kecocokan: pilih dari profil tersimpan
function fillPersonSelects() {
  const opts = `<option value="">— isi manual —</option>` + allPersons().map((p) => `<option value="${p.id}">${esc(p.name)}${p.id === 'me' ? ' (kamu)' : p.rel ? ' · ' + esc(p.rel) : ''}</option>`).join('');
  ['#jAs', '#jBs'].forEach((s) => { const v = $(s).value; $(s).innerHTML = opts; $(s).value = v; });
}
function setJodohSide(side, id) {
  const p = personById(id); if (!p) return;
  $(`#j${side}`).value = p.name; $(`#j${side}d`).value = p.date; $(`#j${side}m`).checked = !!p.maghrib; $(`#j${side}s`).value = id;
}
$('#jAs').onchange = () => setJodohSide('A', $('#jAs').value);
$('#jBs').onchange = () => setJodohSide('B', $('#jBs').value);
function compareWith(id) {
  go('jodoh');
  if (profile) setJodohSide('A', 'me');
  setJodohSide('B', id);
  renderJodoh();
}
const _prefillJodoh = renderers.jodoh;
renderers.jodoh = () => { fillPersonSelects(); _prefillJodoh(); if (profile && !$('#jAs').value && $('#jAd').value === profile.date) $('#jAs').value = 'me'; };
const _fillProfile = renderers.profil;
renderers.profil = () => { _fillProfile(); renderPeople(); };

// ══════════ Hari baik ══════════
const ACARA = {
  nikah:  { label: 'Pernikahan / lamaran', hari: { 5: 2, 4: 2, 0: 1, 3: 1 }, bulanHindari: [0, 8, 10], bulanBaik: [11, 9, 6, 2, 3], waxing: 2, purnama: 1, retro: 'Venus', butuhDua: true, teks: 'Dalam tradisi Jawa, bulan Sura, Pasa, dan Sela biasanya dihindari untuk menikah; bulan Besar, Sawal, Rejeb, Mulud, dan Bakda Mulud dianggap baik.' },
  pindah: { label: 'Pindah rumah', hari: { 4: 2, 5: 1, 1: 1, 3: 1 }, bulanHindari: [0], bulanBaik: [11, 9], waxing: 1, retro: null, teks: 'Pindah rumah baiknya jatuh pada hari Sri atau Gedhong bagi kepala keluarga, dan tidak pada hari ciong.' },
  usaha:  { label: 'Buka usaha / launching', hari: { 3: 2, 4: 2, 0: 1 }, bulanHindari: [0], bulanBaik: [2, 3, 9], waxing: 2, retro: 'Mercury', bonus: { Sri: 2, Gedhong: 1 }, teks: 'Usaha baru paling baik dimulai saat bulan sedang membesar, pada hari Sri, dan tidak saat Merkurius retrograde.' },
  kerja:  { label: 'Melamar / mulai kerja', hari: { 4: 2, 3: 1, 1: 1 }, bulanHindari: [], bulanBaik: [], waxing: 1, retro: 'Mercury', bonus: { Lungguh: 3, Sri: 1 }, teks: 'Hari Lungguh membawa kedudukan; cocok untuk wawancara, melamar kerja, dan hari pertama bekerja.' },
  pergi:  { label: 'Bepergian jauh', hari: { 3: 2, 0: 1, 4: 1 }, bulanHindari: [], bulanBaik: [], waxing: 0, retro: 'Mercury', teks: 'Untuk bepergian, hindari hari Pati dan hari ciong; Merkurius retrograde rawan jadwal berubah.' },
  akad:   { label: 'Tanda tangan kontrak / beli aset', hari: { 4: 2, 3: 1, 6: 1 }, bulanHindari: [0], bulanBaik: [], waxing: 1, retro: 'Mercury', bonus: { Gedhong: 3, Sri: 1 }, teks: 'Hari Gedhong membawa simpanan dan kemapanan; baik untuk membeli rumah, kendaraan, atau menandatangani perjanjian.' },
  tanam:  { label: 'Menanam / mulai proyek jangka panjang', hari: { 6: 1, 1: 1, 4: 1 }, bulanHindari: [], bulanBaik: [], waxing: 1, retro: null, parHindari: 'Mawulu', teks: 'Paringkelan Mawulu (hari benih) secara tradisi dihindari untuk menanam biji.' },
  hajat:  { label: 'Syukuran / selamatan', hari: { 4: 1, 5: 2, 0: 1 }, bulanHindari: [0], bulanBaik: [2, 9, 11], waxing: 1, retro: null, wetonBonus: 2, teks: 'Selamatan sering dilakukan tepat pada wetonan orang yang bersangkutan.' }
};

function scoreDay(n, acara, persons) {
  const A = ACARA[acara];
  const iso = isoFromDayNum(n);
  const info = dayInfo(iso);
  const w = info.w;
  let s = 0; const plus = [], minus = [];
  for (const p of persons) {
    const wu = wetonOf(p.date, p.maghrib);
    const pet = PETUNG5[(wu.neptu + w.neptu) % 5];
    const nm = persons.length > 1 ? p.name + ': ' : '';
    const val = { Sri: 3, Lungguh: 2, Gedhong: 2.5, Lara: -3, Pati: -5 }[pet.nama] + ((A.bonus && A.bonus[pet.nama]) || 0);
    s += val;
    (val > 0 ? plus : minus).push(`${nm}hari ${pet.nama} (${pet.arti})`);
    const sh = shioOf(p.date);
    const r = shioRel(sh.idx, info.pillar % 12);
    if (r.k === 'ciong') { s -= 4; minus.push(`${nm}hari ciong shio ${sh.s.nama}`); }
    else if (r.k === 'liuhe' || r.k === 'sanhe') { s += 1; plus.push(`${nm}shio hari harmonis`); }
    if (mod(n - wu.n, 35) === 0) { s += A.wetonBonus || 0.5; plus.push(`${nm}tepat wetonan`); }
  }
  if (A.hari[w.hi]) { s += A.hari[w.hi]; plus.push(`energi ${w.hari.nama} cocok`); }
  if (w.pancasuda.nada === 'baik') { s += 1; plus.push(`pancasuda ${w.pancasuda.nama}`); }
  if (w.pancasuda.nada === 'waspada') { s -= 1; minus.push(`pancasuda ${w.pancasuda.nama}`); }
  if (info.jawa) {
    if (A.bulanHindari.includes(info.jawa.bIdx)) { s -= 6; minus.push(`bulan ${info.jawa.bulan} (dihindari)`); }
    if (A.bulanBaik.includes(info.jawa.bIdx)) { s += 1.5; plus.push(`bulan ${info.jawa.bulan}`); }
  }
  if (A.parHindari && info.par.nama === A.parHindari) { s -= 3; minus.push(`paringkelan ${info.par.nama}`); }
  const [y, m, d] = iso.split('-').map(Number);
  const mp = moonPhase(new Date(y, m - 1, d, 12));
  if (A.waxing && mp.frac < 0.5 && mp.frac > 0.03) { s += A.waxing; plus.push('bulan sedang membesar'); }
  if (A.purnama && mp.idx === 4) { s += A.purnama; plus.push('purnama'); }
  if (A.retro) { const pos = Astro.positions(utcNoonWIB(iso)); if (pos[A.retro].retro) { s -= 3; minus.push(`${PLANET[A.retro].id} retrograde`); } }
  return { n, iso, info, s: Math.round(s * 10) / 10, plus, minus };
}

function renderHariBaik() {
  const who = $('#hbWho');
  const prev = who.value;
  const persons = allPersons();
  const opts = [];
  if (profile) opts.push(['me', 'Aku sendiri']);
  persons.filter((p) => p.id !== 'me').forEach((p) => { if (profile) opts.push(['me+' + p.id, `Aku & ${p.name}`]); opts.push([p.id, p.name]); });
  who.innerHTML = opts.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('');
  if (prev && opts.some((o) => o[0] === prev)) who.value = prev;
  if (!$('#hbAcara').options.length) $('#hbAcara').innerHTML = Object.entries(ACARA).map(([k, a]) => `<option value="${k}">${a.label}</option>`).join('');
  if (!$('#hbFrom').value) $('#hbFrom').value = isoFromDayNum(dayNumFromISO(todayISO()) + 1);
  if (!opts.length) { $('#hbOut').innerHTML = `<div class="empty-state"><div class="serif">Belum ada data lahir</div><p class="muted">Isi profilmu dulu.</p><button class="btn primary" onclick="go('profil')">Isi profil</button></div>`; return; }
}
function runHariBaik() {
  const acara = $('#hbAcara').value, A = ACARA[acara];
  const ids = ($('#hbWho').value || '').split('+').filter(Boolean);
  const persons = ids.map(personById).filter(Boolean);
  if (!persons.length) return;
  const start = dayNumFromISO($('#hbFrom').value || todayISO()), len = +$('#hbRange').value;
  const days = Array.from({ length: len }, (_, i) => scoreDay(start + i, acara, persons));
  const best = days.filter((d) => d.minus.length === 0 || d.s > 4).sort((a, b) => b.s - a.s).slice(0, 12).sort((a, b) => a.n - b.n);
  const worst = days.filter((d) => d.s <= -4).sort((a, b) => a.s - b.s).slice(0, 8).sort((a, b) => a.n - b.n);
  const top = Math.max(...days.map((d) => d.s), 1);
  const row = (d, good) => `<div class="hb-row" data-iso="${d.iso}">
      <div class="hb-date"><div class="serif">${fmtDate(d.iso, { day: 'numeric', month: 'short' })}</div><div class="hint">${fmtDate(d.iso, { year: 'numeric' })}</div></div>
      <div class="hb-main"><div><b>${d.info.w.label}</b> <span class="muted">· ${jawaStr(d.info.jawa)}</span></div>
        <div class="small ${good ? '' : 'muted'}">${(good ? d.plus : d.minus).slice(0, 4).join(' · ')}</div>
        ${good && d.minus.length ? `<div class="hint">catatan: ${d.minus.join(' · ')}</div>` : ''}</div>
      <div class="hb-score ${good ? 'gold' : 'rose'}">${good ? Math.round(clamp((d.s / top) * 100, 5, 100)) : '✕'}</div></div>`;
  $('#hbOut').innerHTML = `
    <div class="panel" style="margin-top:18px"><h3>${A.label} · ${persons.map((p) => esc(p.name)).join(' & ')}</h3><p>${A.teks}</p>
      ${A.butuhDua && persons.length < 2 ? '<p class="hint" style="margin-top:6px">Tip: pilih “Aku & …” agar weton kedua calon ikut dihitung. Tambahkan orang di halaman Profil.</p>' : ''}</div>
    <div class="grid g2" style="margin-top:16px;align-items:start">
      <div class="panel"><h3>Tanggal terbaik</h3>${best.map((d) => row(d, true)).join('') || '<p class="muted">Tidak ditemukan hari yang bersih dalam rentang ini. Coba perpanjang rentangnya.</p>'}</div>
      <div class="panel"><h3>Sebaiknya dihindari</h3>${worst.map((d) => row(d, false)).join('') || '<p class="muted">Tidak ada hari yang sangat buruk.</p>'}</div>
    </div>
    <div class="foot">Skor 100 = hari terbaik dalam rentang yang dipilih. Klik tanggal untuk melihat detail harinya. Untuk refleksi; tetap musyawarahkan dengan keluarga.</div>`;
  $$('.hb-row', $('#hbOut')).forEach((el) => (el.onclick = () => openModal(dayDetailHTML(el.dataset.iso), true)));
}
renderers.haribaik = renderHariBaik;
$('#hbGo').onclick = runHariBaik;

// ══════════ Transit pribadi ══════════
const ASPEK = [
  { deg: 0, nama: 'konjungsi', sifat: 'kuat', teks: 'Energinya menyatu langsung, jadi terasa paling kuat.' },
  { deg: 60, nama: 'sekstil', sifat: 'harmonis', teks: 'Aspek harmonis yang membuka peluang bila kamu mengambil inisiatif.' },
  { deg: 90, nama: 'kuadrat', sifat: 'tegang', teks: 'Aspek tegang: ada tekanan yang mendorongmu bertumbuh; jangan bereaksi terburu-buru.' },
  { deg: 120, nama: 'trigon', sifat: 'harmonis', teks: 'Aspek paling mengalir: hal-hal di area ini terasa lebih mudah.' },
  { deg: 180, nama: 'oposisi', sifat: 'tegang', teks: 'Aspek berhadapan: orang lain atau keadaan memantulkan sesuatu yang perlu kamu seimbangkan.' }
];
const TR_ARTI = {
  Sun: 'Matahari menyorot dan memberi energi pada', Moon: 'Bulan menggerakkan suasana hati di sekitar', Mercury: 'Merkurius membawa pikiran, kabar, dan percakapan ke',
  Venus: 'Venus membawa kasih, keindahan, dan kemudahan ke', Mars: 'Mars membawa dorongan, keberanian, dan gesekan ke', Jupiter: 'Jupiter memperluas dan memberkati',
  Saturn: 'Saturnus menguji dan mematangkan', Uranus: 'Uranus mengguncang dan membebaskan', Neptune: 'Neptunus melembutkan, menginspirasi, sekaligus mengaburkan'
};
const NATAL_AREA = { Sun: 'identitas dan arah hidupmu', Moon: 'perasaan dan rasa amanmu', Mercury: 'cara berpikir dan berkomunikasimu', Venus: 'cinta, nilai, dan keuanganmu', Mars: 'semangat dan caramu bertindak', Jupiter: 'keyakinan dan peluang tumbuhmu', Saturn: 'tanggung jawab dan struktur hidupmu', ASC: 'penampilan dan cara kamu memulai sesuatu', MC: 'karier dan citramu di mata publik' };
const TR_ORB = { Sun: 3, Moon: 5, Mercury: 3, Venus: 3, Mars: 3, Jupiter: 2.5, Saturn: 2.5, Uranus: 2, Neptune: 2 };
const TR_DUR = { Moon: 'beberapa jam', Sun: '2–3 hari', Mercury: '1–3 hari', Venus: '2–3 hari', Mars: 'sekitar seminggu', Jupiter: 'beberapa minggu', Saturn: 'beberapa minggu hingga bulan', Uranus: 'berbulan-bulan', Neptune: 'berbulan-bulan' };
const TR_BOBOT = { Moon: 1, Sun: 2, Mercury: 2, Venus: 2, Mars: 3, Jupiter: 4, Saturn: 5, Uranus: 5, Neptune: 4 };

function transitsFor(p, iso = todayISO()) {
  const nt = natalOf(p);
  const natal = Object.fromEntries(['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'].map((k) => [k, nt.pos[k].lon]));
  if (nt.ang) { natal.ASC = nt.ang.asc; natal.MC = nt.ang.mc; }
  const now = Astro.positions(utcNoonWIB(iso)), nxt = Astro.positions(utcNoonWIB(iso) + DAY);
  const out = [];
  for (const t of Astro.BODIES) for (const [n, lon] of Object.entries(natal)) {
    const sep = (x) => { const d = Math.abs(((x - lon + 540) % 360) - 180); return d; };
    const d0 = sep(now[t].lon), d1 = sep(nxt[t].lon);
    for (const a of ASPEK) {
      const orb = Math.abs(d0 - a.deg);
      if (orb <= TR_ORB[t]) {
        const tName = PLANET[t].id, nName = n === 'ASC' ? 'Ascendant' : n === 'MC' ? 'MC' : PLANET[n].id;
        out.push({ t, n, a, orb, applying: Math.abs(d1 - a.deg) < orb, retro: now[t].retro,
          judul: `${tName} ${a.nama} ${nName}-mu`,
          teks: `${TR_ARTI[t]} ${NATAL_AREA[n]}. ${a.teks}`,
          dur: TR_DUR[t], w: TR_BOBOT[t] * (1 - orb / (TR_ORB[t] + 1)) });
      }
    }
  }
  const base = nt.ang ? Math.floor(nt.ang.asc / 30) : nt.pos.Sun.sign;
  const houses = ['Jupiter', 'Saturn'].map((t) => ({ t, h: mod(now[t].sign - base, 12) }));
  return { list: out.sort((a, b) => b.w - a.w), houses, fromAsc: !!nt.ang };
}
function transitHTML(tr, limit = 99) {
  if (!tr.list.length) return '<p class="muted">Tidak ada aspek transit yang ketat hari ini. Langit pribadimu sedang tenang.</p>';
  return tr.list.slice(0, limit).map((x) => `<div class="tr-row"><div class="tr-g">${T(PLANET[x.t].glyph)}</div><div>
    <div><b>${x.judul}</b> <span class="pill ${x.a.sifat === 'tegang' ? 'waspada' : x.a.sifat === 'harmonis' ? 'baik' : 'netral'}">${x.a.sifat}</span></div>
    <p class="small" style="margin-top:4px">${x.teks}</p>
    <div class="hint">orb ${x.orb.toFixed(1)}° · ${x.applying ? 'makin menguat' : 'mulai melemah'} · berlangsung ${x.dur}${x.retro ? ' · ℞ retrograde' : ''}</div></div></div>`).join('');
}
function housesHTML(tr) {
  const sfx = tr.fromAsc ? 'dari Ascendant-mu' : 'dari tanda Matahari-mu';
  return tr.houses.map((h) => `<p class="small"><b class="gold">${PLANET[h.t].id}</b> sedang di rumah ke-${h.h + 1} ${sfx} (${RUMAH[h.h].nama.toLowerCase()}): ${h.t === 'Jupiter' ? 'area yang sedang diberkati dan berkembang tahun ini.' : 'area yang sedang diuji dan menuntut kedewasaan.'}</p>`).join('');
}

// ══════════ Bagikan sebagai gambar ══════════
const SHARE = {};
const shareBtn = (key) => `<button class="btn sm share" data-share="${key}">↗ Bagikan</button>`;
document.addEventListener('click', (e) => { const b = e.target.closest('[data-share]'); if (b && SHARE[b.dataset.share]) shareImage(SHARE[b.dataset.share]); });
const stripTags = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

function svgImg(svg, w, h) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img); img.onerror = () => res(null);
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `));
  });
}
function wrapText(ctx, text, maxW) {
  const words = text.split(' '); const lines = []; let line = '';
  for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }
  if (line) lines.push(line); return lines;
}
async function renderShareCanvas(sp) {
  const W = 1080, H = 1350, PAD = 90;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  try { await Promise.all(['400 60px "Cormorant Garamond"', 'italic 400 60px "Cormorant Garamond"', '400 30px Inter', '500 30px Inter'].map((f) => document.fonts.load(f))); } catch {}
  const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#151b33'); g.addColorStop(1, '#070910');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  const rg = c.createRadialGradient(W * 0.8, 0, 0, W * 0.8, 0, 900); rg.addColorStop(0, 'rgba(201,185,143,.12)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = rg; c.fillRect(0, 0, W, H);
  const r = rng(hashStr(sp.title));
  for (let i = 0; i < 260; i++) { c.fillStyle = `rgba(230,225,210,${0.15 + r() * 0.6})`; c.beginPath(); c.arc(r() * W, r() * H, r() < 0.05 ? 2 : 0.5 + r(), 0, 6.283); c.fill(); }
  c.strokeStyle = 'rgba(220,200,150,.45)'; c.lineWidth = 2; c.strokeRect(36, 36, W - 72, H - 72);
  c.strokeStyle = 'rgba(220,200,150,.15)'; c.lineWidth = 1; c.strokeRect(48, 48, W - 96, H - 96);
  const gold = '#dcc896', text = '#f3eee2', muted = '#c3bdb0';
  let y = 120;
  c.textAlign = 'center'; c.fillStyle = gold; c.font = '500 24px Inter'; c.letterSpacing = '8px'; c.fillText('✦  LINTANG', W / 2, y);
  y += 70; c.font = '500 24px Inter'; c.letterSpacing = '5px'; c.fillText(sp.eyebrow.toUpperCase(), W / 2, y);
  c.letterSpacing = '0px';
  y += 100; c.fillStyle = text; c.font = '400 88px "Cormorant Garamond"';
  for (const l of wrapText(c, sp.title, W - PAD * 2)) { c.fillText(l, W / 2, y); y += 92; }
  if (sp.subtitle) { y -= 30; c.fillStyle = muted; c.font = 'italic 400 38px "Cormorant Garamond"'; for (const l of wrapText(c, sp.subtitle, W - PAD * 2)) { c.fillText(l, W / 2, y); y += 46; } }
  if (sp.big) { y += 30; c.fillStyle = gold; c.font = '400 120px "Cormorant Garamond"'; c.fillText(sp.big, W / 2, y + 60); y += 120; if (sp.bigLabel) { c.fillStyle = muted; c.font = '400 26px Inter'; c.fillText(sp.bigLabel, W / 2, y); y += 20; } }
  if (sp.cards && sp.cards.length) {
    y += 40;
    const n = sp.cards.length, cw = n > 3 ? 140 : n > 1 ? 180 : (sp.sections || []).length > 1 ? 150 : 230, ch = cw * 5 / 3, gap = 26;
    const tot = n * cw + (n - 1) * gap; let x = (W - tot) / 2;
    for (const cd of sp.cards) {
      const img = await svgImg(cardFrontSVG(cd.card), cw, ch);
      if (img) { c.save(); if (cd.rev) { c.translate(x + cw / 2, y + ch / 2); c.rotate(Math.PI); c.drawImage(img, -cw / 2, -ch / 2, cw, ch); } else c.drawImage(img, x, y, cw, ch); c.restore(); }
      c.strokeStyle = 'rgba(220,200,150,.35)'; c.strokeRect(x, y, cw, ch);
      if (cd.label) { c.fillStyle = gold; c.font = '500 18px Inter'; c.letterSpacing = '3px'; c.fillText(cd.label.toUpperCase(), x + cw / 2, y + ch + 34); c.letterSpacing = '0px'; }
      x += cw + gap;
    }
    y += ch + (sp.cards.some((cd) => cd.label) ? 60 : 30);
  }
  y += 30;
  c.textAlign = 'left';
  for (const s of sp.sections || []) {
    if (y > H - 200) break;
    c.fillStyle = gold; c.font = '500 21px Inter'; c.letterSpacing = '4px'; c.fillText(s.h.toUpperCase(), PAD, y); c.letterSpacing = '0px'; y += 46;
    c.fillStyle = text; c.font = '400 34px "Cormorant Garamond"';
    const lines = wrapText(c, stripTags(s.t), W - PAD * 2);
    for (let i = 0; i < lines.length; i++) {
      if (y > H - 150) { c.fillText(lines[i].replace(/\s+\S*$/, '') + '…', PAD, y); y += 42; break; }
      c.fillText(lines[i], PAD, y); y += 42;
    }
    y += 26;
  }
  c.textAlign = 'center'; c.fillStyle = 'rgba(195,189,176,.8)'; c.font = '400 20px Inter'; c.letterSpacing = '3px';
  c.fillText((sp.foot || 'weton · shio · bintang').toUpperCase(), W / 2, H - 82); c.letterSpacing = '0px';
  return cv;
}
async function shareImage(sp) {
  openModal(`<div class="eyebrow">Bagikan</div><p class="muted">Menyiapkan gambar…</p>`, true);
  const cv = await renderShareCanvas(sp);
  const url = cv.toDataURL('image/png');
  openModal(`<div class="eyebrow">Bagikan sebagai gambar</div>
    <div class="share-wrap"><img src="${url}" class="share-img" alt="" />
    <div><h2 style="margin-top:6px">${esc(sp.title)}</h2><p class="muted">Ukuran 1080 × 1350, pas untuk Instagram & WhatsApp Story.</p>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:18px">
        <button class="btn primary" id="shSave" style="margin-top:0">Simpan gambar</button>
        <button class="btn" id="shCopy">Salin ke clipboard</button><div id="shMsg" class="hint"></div></div></div></div>`, true);
  $('#shSave').onclick = () => { const a = document.createElement('a'); a.href = url; a.download = `lintang-${(sp.file || sp.title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`; document.body.appendChild(a); a.click(); a.remove(); };
  $('#shCopy').onclick = () => cv.toBlob(async (b) => {
    try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': b })]); $('#shMsg').textContent = 'Tersalin. Tempel (Ctrl+V) di WhatsApp atau aplikasi lain.'; }
    catch { $('#shMsg').textContent = 'Gagal menyalin; gunakan Simpan gambar.'; }
  }, 'image/png');
}

// ── mulai ──
if ($('.view.active')?.id === 'view-profil') renderPeople();

updateNav();
go(profile ? 'hari' : 'profil');

// versi aplikasi di bilah judul
try { const v = new URLSearchParams(location.search).get('v'); if (v) $('.brand-mini').innerHTML += `<span style="margin-left:10px;opacity:.6;letter-spacing:.1em">v${esc(v)}</span>`; } catch {}
