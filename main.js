const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 940,
    minHeight: 640,
    backgroundColor: '#080a12',
    title: 'Lintang',
    titleBarStyle: 'hidden',
    titleBarOverlay: { color: '#080a12', symbolColor: '#b9ab86', height: 38 },
    icon: path.join(__dirname, 'build', 'icon.png'),
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  // tampilkan saat siap; cadangan bila 'ready-to-show' tidak terpicu
  let shown = false;
  const reveal = () => { if (!shown && win && !win.isDestroyed()) { shown = true; win.show(); } };
  win.once('ready-to-show', reveal);
  win.webContents.once('did-finish-load', () => setTimeout(reveal, 150));
  setTimeout(reveal, 3000);
  win.setMenuBarVisibility(false);
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.loadFile(path.join(__dirname, 'src', 'index.html'), { query: { v: app.getVersion() } });
}

// ── update otomatis (GitHub Releases) ──
function setupUpdater() {
  if (!app.isPackaged) return;
  let autoUpdater;
  try { ({ autoUpdater } = require('electron-updater')); } catch { return; }
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('update-downloaded', async (info) => {
    const r = await dialog.showMessageBox(win, {
      type: 'info',
      buttons: ['Mulai ulang sekarang', 'Nanti saja'],
      defaultId: 0,
      cancelId: 1,
      title: 'Pembaruan Lintang',
      message: `Lintang versi ${info.version} sudah siap.`,
      detail: 'Mulai ulang untuk memasang pembaruan. Kalau memilih nanti, pembaruan terpasang otomatis saat Lintang ditutup.'
    });
    if (r.response === 0) autoUpdater.quitAndInstall();
  });
  autoUpdater.on('error', () => {}); // offline / belum ada rilis: abaikan
  const check = () => autoUpdater.checkForUpdates().catch(() => {});
  setTimeout(check, 5000);
  setInterval(check, 6 * 60 * 60 * 1000);
}

if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(() => { createWindow(); setupUpdater(); });
  app.on('window-all-closed', () => app.quit());
}
