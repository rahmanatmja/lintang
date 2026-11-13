// ───────────────────────── Lintang · perhitungan langit ─────────────────────────
// Posisi planet: metode elemen orbit Paul Schlyter (presisi ± beberapa menit busur,
// cukup untuk menentukan tanda zodiak). Semua sudut dalam derajat.

const Astro = (() => {
  const RAD = Math.PI / 180;
  const norm = (x) => ((x % 360) + 360) % 360;
  const sind = (x) => Math.sin(x * RAD), cosd = (x) => Math.cos(x * RAD);
  const atan2d = (y, x) => Math.atan2(y, x) / RAD;

  // d = hari sejak 2000 Jan 0.0 UT
  function dOf(dateUTCms) { return dateUTCms / 864e5 + 2440587.5 - 2451543.5; }

  function elements(name, d) {
    switch (name) {
      case 'Sun':     return { N: 0, i: 0, w: 282.9404 + 4.70935e-5 * d, a: 1, e: 0.016709 - 1.151e-9 * d, M: 356.047 + 0.9856002585 * d };
      case 'Moon':    return { N: 125.1228 - 0.0529538083 * d, i: 5.1454, w: 318.0634 + 0.1643573223 * d, a: 60.2666, e: 0.0549, M: 115.3654 + 13.0649929509 * d };
      case 'Mercury': return { N: 48.3313 + 3.24587e-5 * d, i: 7.0047 + 5e-8 * d, w: 29.1241 + 1.01444e-5 * d, a: 0.387098, e: 0.205635 + 5.59e-10 * d, M: 168.6562 + 4.0923344368 * d };
      case 'Venus':   return { N: 76.6799 + 2.4659e-5 * d, i: 3.3946 + 2.75e-8 * d, w: 54.891 + 1.38374e-5 * d, a: 0.72333, e: 0.006773 - 1.302e-9 * d, M: 48.0052 + 1.6021302244 * d };
      case 'Mars':    return { N: 49.5574 + 2.11081e-5 * d, i: 1.8497 - 1.78e-8 * d, w: 286.5016 + 2.92961e-5 * d, a: 1.523688, e: 0.093405 + 2.516e-9 * d, M: 18.6021 + 0.5240207766 * d };
      case 'Jupiter': return { N: 100.4542 + 2.76854e-5 * d, i: 1.303 - 1.557e-7 * d, w: 273.8777 + 1.64505e-5 * d, a: 5.20256, e: 0.048498 + 4.469e-9 * d, M: 19.895 + 0.0830853001 * d };
      case 'Saturn':  return { N: 113.6634 + 2.3898e-5 * d, i: 2.4886 - 1.081e-7 * d, w: 339.3939 + 2.97661e-5 * d, a: 9.55475, e: 0.055546 - 9.499e-9 * d, M: 316.967 + 0.0334442282 * d };
      case 'Uranus':  return { N: 74.0005 + 1.3978e-5 * d, i: 0.7733 + 1.9e-8 * d, w: 96.6612 + 3.0565e-5 * d, a: 19.18171 - 1.55e-8 * d, e: 0.047318 + 7.45e-9 * d, M: 142.5905 + 0.011725806 * d };
      case 'Neptune': return { N: 131.7806 + 3.0173e-5 * d, i: 1.77 - 2.55e-7 * d, w: 272.8461 - 6.027e-6 * d, a: 30.05826 + 3.313e-8 * d, e: 0.008606 + 2.15e-9 * d, M: 260.2471 + 0.005995147 * d };
    }
  }

  function kepler(M, e) {
    M = norm(M);
    let E = M + (e / RAD) * sind(M) * (1 + e * cosd(M));
    for (let k = 0; k < 8; k++) {
      const dE = (E - (e / RAD) * sind(E) - M) / (1 - e * cosd(E));
      E -= dE; if (Math.abs(dE) < 1e-6) break;
    }
    return E;
  }

  function orbit(el) {
    const E = kepler(el.M, el.e);
    const xv = el.a * (cosd(E) - el.e);
    const yv = el.a * Math.sqrt(1 - el.e * el.e) * sind(E);
    const v = atan2d(yv, xv), r = Math.hypot(xv, yv);
    const N = el.N, i = el.i, vw = v + el.w;
    const x = r * (cosd(N) * cosd(vw) - sind(N) * sind(vw) * cosd(i));
    const y = r * (sind(N) * cosd(vw) + cosd(N) * sind(vw) * cosd(i));
    const z = r * sind(vw) * sind(i);
    return { x, y, z, r, lon: norm(atan2d(y, x)), lat: atan2d(z, Math.hypot(x, y)), v };
  }

  function sun(d) {
    const el = elements('Sun', d);
    const E = kepler(el.M, el.e);
    const xv = cosd(E) - el.e, yv = Math.sqrt(1 - el.e * el.e) * sind(E);
    const v = atan2d(yv, xv), r = Math.hypot(xv, yv);
    const lon = norm(v + el.w);
    return { lon, r, x: r * cosd(lon), y: r * sind(lon), M: norm(el.M), L: norm(el.M + el.w) };
  }

  function moon(d) {
    const el = elements('Moon', d);
    const o = orbit(el);
    const s = sun(d);
    const Mm = norm(el.M), Ms = s.M;
    const Lm = norm(el.N + el.w + el.M), Ls = s.L;
    const D = Lm - Ls, F = Lm - el.N;
    const dl =
      -1.274 * sind(Mm - 2 * D) + 0.658 * sind(2 * D) - 0.186 * sind(Ms) - 0.059 * sind(2 * Mm - 2 * D)
      - 0.057 * sind(Mm - 2 * D + Ms) + 0.053 * sind(Mm + 2 * D) + 0.046 * sind(2 * D - Ms) + 0.041 * sind(Mm - Ms)
      - 0.035 * sind(D) - 0.031 * sind(Mm + Ms) - 0.015 * sind(2 * F - 2 * D) + 0.011 * sind(Mm - 4 * D);
    return { lon: norm(o.lon + dl) };
  }

  function planet(name, d) {
    const el = elements(name, d);
    const o = orbit(el);
    let lon = o.lon;
    const Mj = norm(elements('Jupiter', d).M), Ms = norm(elements('Saturn', d).M), Mu = norm(elements('Uranus', d).M);
    if (name === 'Jupiter') lon += -0.332 * sind(2 * Mj - 5 * Ms - 67.6) - 0.056 * sind(2 * Mj - 2 * Ms + 21) + 0.042 * sind(3 * Mj - 5 * Ms + 21) - 0.036 * sind(Mj - 2 * Ms) + 0.022 * cosd(Mj - Ms) + 0.023 * sind(2 * Mj - 3 * Ms + 52) - 0.016 * sind(Mj - 5 * Ms - 69);
    if (name === 'Saturn') lon += 0.812 * sind(2 * Mj - 5 * Ms - 67.6) - 0.229 * cosd(2 * Mj - 4 * Ms - 2) + 0.119 * sind(Mj - 2 * Ms - 3) + 0.046 * sind(2 * Mj - 6 * Ms - 69) + 0.014 * sind(Mj - 3 * Ms + 32);
    if (name === 'Uranus') lon += 0.04 * sind(Ms - 2 * Mu + 6) + 0.035 * sind(Ms - 3 * Mu + 33) - 0.015 * sind(Mj - Mu + 20);
    const xh = o.r * cosd(o.lat) * cosd(lon), yh = o.r * cosd(o.lat) * sind(lon);
    const s = sun(d);
    return { lon: norm(atan2d(yh + s.y, xh + s.x)) };
  }

  const BODIES = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  function lonOf(name, d) { return name === 'Sun' ? sun(d).lon : name === 'Moon' ? moon(d).lon : planet(name, d).lon; }

  function positions(dateUTCms) {
    const d = dOf(dateUTCms);
    const out = {};
    for (const b of BODIES) {
      const l = lonOf(b, d);
      let retro = false;
      if (b !== 'Sun' && b !== 'Moon') {
        const l2 = lonOf(b, d + 0.5);
        retro = ((l2 - l + 540) % 360) - 180 < 0;
      }
      out[b] = { lon: l, sign: Math.floor(l / 30), deg: l % 30, retro };
    }
    return out;
  }

  function angles(dateUTCms, lat, lonE) {
    const d = dOf(dateUTCms);
    const jd = dateUTCms / 864e5 + 2440587.5;
    const gmst = norm(280.46061837 + 360.98564736629 * (jd - 2451545));
    const ramc = norm(gmst + lonE);
    const eps = 23.4393 - 3.563e-7 * d;
    const asc = norm(atan2d(cosd(ramc), -(sind(ramc) * cosd(eps) + Math.tan(lat * RAD) * sind(eps))));
    const mc = norm(atan2d(sind(ramc), cosd(ramc) * cosd(eps)));
    return { asc, mc };
  }

  // hari ke-n dari epoch 1970 → indeks sexagenary (0 = Jia-Zi)
  function dayPillar(dayNum) { const jdn = dayNum + 2440588; return ((jdn - 11) % 60 + 60) % 60; }

  return { positions, angles, dayPillar, norm, BODIES };
})();
if (typeof module !== 'undefined') module.exports = Astro;
