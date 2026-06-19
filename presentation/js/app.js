
// ═══════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════
const TOAST_DURATION_MS = 3200;

const MOCK_USERS = {
  'dueno@demo.com': { pass: '123', role: 'dueno' },
  'vet@demo.com':   { pass: '123', role: 'vet'   },
  'admin@demo.com': { pass: '123', role: 'admin'  },
};

const ROLE_CONFIG = {
  dueno: {
    label: 'Dueño', icon: '🐶',
    tabs: [
      { id: 'v-dueno-dash',      label: '🏠 Inicio',          icon:'🏠' },
      { id: 'v-dueno-mascotas',  label: '🐾 Mis Mascotas',    icon:'🐾' },
      { id: 'v-dueno-citas',     label: '📅 Citas',           icon:'📅' },
      { id: 'v-dueno-historial', label: '📋 Historial',       icon:'📋' },
    ],
  },
  vet: {
    label: 'Veterinario', icon: '🩺',
    tabs: [
      { id: 'v-vet-dash',      label: '🏠 Inicio',             icon:'🏠' },
      { id: 'v-vet-agenda',    label: '📆 Mi Agenda',          icon:'📆' },
      { id: 'v-vet-pacientes', label: '🐾 Pacientes',          icon:'🐾' },
      { id: 'v-vet-historial', label: '📋 Registrar Consulta', icon:'📋' },
    ],
  },
  admin: {
    label: 'Administrador', icon: '🛡️',
    tabs: [
      { id: 'v-admin-dash',     label: '🏠 Inicio',       icon:'🏠' },
      { id: 'v-admin-usuarios', label: '👥 Usuarios',     icon:'👥' },
      { id: 'v-admin-vets',     label: '🩺 Veterinarios', icon:'🩺' },
    ],
  },
};

const ROLE_SUBTITLES = {
  dueno: 'Gestión de Mascotas',
  vet:   'Panel Veterinario',
  admin: 'Panel de Administración',
};

const SPECIES_EMOJI = {
  '🐕 Perro':'🐕','🐈 Gato':'🐈','🐇 Conejo':'🐇','🐦 Ave':'🐦','Otro':'🐾',
};

const RECORD_TYPE_META = {
  Diagnóstico:{ icon:'🔬', cssClass:'diag' },
  Vacuna:     { icon:'💉', cssClass:'vac'  },
  Tratamiento:{ icon:'💊', cssClass:''     },
  Control:    { icon:'🩺', cssClass:''     },
};

const ROLE_ICONS = { dueño:'👤', veterinario:'🩺', admin:'🛡️' };

// ═══════════════════════════════════════════════════
// ESTADO
// ═══════════════════════════════════════════════════
const _state = {
  currentRole: null,
  selectedRole: null,
  selectedSlotEl: null,
  toastTimer: null,
  // Lista global de mascotas: nombre, especie, etc.
  pets: [
    { name: 'Max',   species: '🐕 Perro', breed: 'Labrador', age: '3 años', weight: '12' },
    { name: 'Michi', species: '🐈 Gato',  breed: 'Persa',    age: '1 año',  weight: '4'  },
  ],
  // Historial por paciente
  historiales: {
    'Max - Labrador': [
      { icon:'💉', cssClass:'vac',  tipo:'Vacuna',      desc:'Vacuna Antirrábica',   dateLabel:'10 Ene 2025', med:'Próxima: 10 Ene 2026' },
      { icon:'🔬', cssClass:'diag', tipo:'Diagnóstico', desc:'Otitis leve',           dateLabel:'5 Mar 2025',  med:'Gotas otológicas x 7 días' },
    ],
    'Michi - Persa': [
      { icon:'💉', cssClass:'vac',  tipo:'Vacuna', desc:'Triple Felina', dateLabel:'15 Feb 2025', med:'' },
    ],
    'Rocky - Poodle': [],
  },
};

const getRole         = () => _state.currentRole;
const getSelectedRole = () => _state.selectedRole;
const getSelectedSlot = () => _state.selectedSlotEl;
const getToastTimer   = () => _state.toastTimer;

function setRole(r)          { _state.currentRole    = r; }
function setSelectedRole(r)  { _state.selectedRole   = r; }
function setSelectedSlot(el) { _state.selectedSlotEl = el; }
function setToastTimer(t)    { _state.toastTimer      = t; }
function resetSession()      { _state.currentRole = _state.selectedRole = _state.selectedSlotEl = null; }

// ═══════════════════════════════════════════════════
// UI — TOAST / MODALES
// ═══════════════════════════════════════════════════
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast ${type}`;
  t.classList.add('show');
  clearTimeout(getToastTimer());
  setToastTimer(setTimeout(() => t.classList.remove('show'), TOAST_DURATION_MS));
}

function openModal(id)  { document.getElementById(`mo-${id}`).classList.add('open'); }
function closeModal(id) { document.getElementById(`mo-${id}`).classList.remove('open'); }

function initModalBackdropClose() {
  document.querySelectorAll('.mo').forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
  });
}

// ═══════════════════════════════════════════════════
// UI — SIDEBAR MÓVIL
// ═══════════════════════════════════════════════════
function isMobile() { return window.innerWidth <= 768; }

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (isMobile()) {
    sidebar.classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('show');
  } else {
    sidebar.classList.toggle('collapsed');
  }
}
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (isMobile()) {
    sidebar.classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
  }
}

// ═══════════════════════════════════════════════════
// UI — LOGIN / HEADER
// ═══════════════════════════════════════════════════
function highlightRoleButton(role) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('sel'));
  document.getElementById(`rb-${role}`).classList.add('sel');
}

function toggleLoginScreen(visible) {
  document.getElementById('screen-login').style.display = visible ? 'flex' : 'none';
  const shell = document.getElementById('app-shell');
  if (visible) shell.classList.remove('active');
  else         shell.classList.add('active');
}

function renderHeader(cfg, subtitle) {
  document.getElementById('hdrSub').textContent = subtitle;
  const tag = document.getElementById('roleTag');
  tag.textContent = cfg.icon + ' ' + cfg.label;
  tag.classList.add('show');
  document.getElementById('logoutBtn').classList.add('show');
}

function resetHeader() {
  document.getElementById('hdrSub').textContent = 'Sistema de Gestión de Adopciones';
  document.getElementById('roleTag').classList.remove('show');
  document.getElementById('logoutBtn').classList.remove('show');
}

function showFooterBar(cfg) {
  document.getElementById('fav').textContent    = cfg.icon;
  document.getElementById('froleName').textContent = cfg.label;
}

// ═══════════════════════════════════════════════════
// UI — NAVEGACIÓN
// ═══════════════════════════════════════════════════
function renderNavTabs(tabs, onTabClick) {
  const nav = document.getElementById('navTabs');
  nav.innerHTML = '';
  tabs.forEach((tab, i) => {
    const el = document.createElement('div');
    el.className = `nav-tab${i === 0 ? ' active' : ''}`;
    el.innerHTML = `<span class="tico">${tab.icon}</span><span>${tab.label.replace(/^\S+\s/,'')}</span>`;
    el.addEventListener('click', () => { onTabClick(tab.id); closeSidebar(); });
    nav.appendChild(el);
  });
}

function setActiveTab(viewId, tabs) {
  document.querySelectorAll('.nav-tab').forEach((el, i) => {
    el.classList.toggle('active', tabs[i] && tabs[i].id === viewId);
  });
}

function showView(viewId) {
  // One-page: scroll to the section
  const el = document.getElementById(viewId);
  if (el) {
    const mc = document.getElementById('mainContent');
    const offset = el.offsetTop - 10;
    mc.scrollTo({ top: offset, behavior: 'smooth' });
  }
}

function hideAllViews() {
  // In one-page mode, hide role pages when logging out
  document.querySelectorAll('.role-page').forEach(p => p.classList.remove('active'));
}

function showRolePage(role) {
  document.querySelectorAll('.role-page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + role);
  if (page) page.classList.add('active');
}

// Highlight nav tab based on scroll position
function updateActiveNavOnScroll() {
  const role = getRole();
  if (!role) return;
  const tabs = ROLE_CONFIG[role].tabs;
  const mc = document.getElementById('mainContent');
  const scrollTop = mc.scrollTop + 100;
  let activeId = tabs[0].id;
  tabs.forEach(tab => {
    const el = document.getElementById(tab.id);
    if (el && el.offsetTop <= scrollTop) activeId = tab.id;
  });
  setActiveTab(activeId, tabs);
}

function gotoTab(viewId) {
  const role = getRole();
  if (!role) return;
  showView(viewId);
  setActiveTab(viewId, ROLE_CONFIG[role].tabs);
}

// ═══════════════════════════════════════════════════
// UI — FORMULARIOS
// ═══════════════════════════════════════════════════
function clearFields(ids) {
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

function initDateInputs() {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type=date]').forEach(el => {
    if (!el.value) el.value = today;
    el.min = today;
  });
}

function resetLoginForm() {
  document.getElementById('l-email').value = '';
  document.getElementById('l-pass').value  = '';
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('sel'));
}

// ═══════════════════════════════════════════════════
// MASCOTAS — helpers compartidos
// ═══════════════════════════════════════════════════

/** Reconstruye el <select> de mascotas con la lista actual del estado. */
function syncPetSelects() {
  // Selects de dueño (citas)
  const duenoCita = document.getElementById('c-masc');
  if (duenoCita) {
    duenoCita.innerHTML = '<option value="">Seleccionar</option>'
      + _state.pets.map(p => `<option>${p.name} - ${p.breed || p.species.replace(/^\S+\s/,'')}</option>`).join('');
  }
  // Select de paciente del veterinario
  const vetPac = document.getElementById('vt-paciente');
  if (vetPac) {
    const cur = vetPac.value;
    vetPac.innerHTML = '<option value="">Seleccionar paciente</option>'
      + Object.keys(_state.historiales).map(k => `<option${k===cur?' selected':''}>${k}</option>`).join('');
  }
  // Actualizar stat de mascotas en dashboard
  const statEl = document.getElementById('stat-mascotas');
  if (statEl) statEl.textContent = _state.pets.length;
}

/** Devuelve la clave del historial para el nombre de mascota+raza dado. */
function normalizePetKey(nameAndBreed) {
  if (!nameAndBreed) return null;
  if (_state.historiales[nameAndBreed] !== undefined) return nameAndBreed;
  // buscar coincidencia parcial
  const key = Object.keys(_state.historiales).find(k => k.startsWith(nameAndBreed.split(' - ')[0]));
  return key || null;
}

// ═══════════════════════════════════════════════════
// SERVICIOS
// ═══════════════════════════════════════════════════
function selRole(role) { setSelectedRole(role); highlightRoleButton(role); }

function doLogin() {
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value;
  if (!email || !pass) { showToast('Ingresa correo y contraseña', 'err'); return; }

  let resolvedRole = getSelectedRole();
  if (!resolvedRole) {
    const user = MOCK_USERS[email];
    if (user && user.pass === pass) { resolvedRole = user.role; }
    else { showToast('Selecciona un rol para continuar', 'err'); return; }
  }
  enterDashboard(resolvedRole);
}

function enterDashboard(role) {
  setRole(role);
  const cfg = ROLE_CONFIG[role];
  toggleLoginScreen(false);
  renderHeader(cfg, ROLE_SUBTITLES[role]);
  renderNavTabs(cfg.tabs, gotoTab);
  showFooterBar(cfg);
  showRolePage(role);
  initDateInputs();
  syncPetSelects();
  // Scroll to top of role page
  setTimeout(() => {
    const mc = document.getElementById('mainContent');
    mc.scrollTop = 0;
    // Attach scroll listener
    mc.onscroll = updateActiveNavOnScroll;
  }, 50);
  showToast('Bienvenido/a a Adoptasoft 🐾', 'ok');
}

function doLogout() {
  resetSession();
  hideAllViews();
  document.getElementById('mainContent').onscroll = null;
  toggleLoginScreen(true);
  resetHeader();
  resetLoginForm();
  document.getElementById('navTabs').innerHTML = '';
  showToast('Sesión cerrada correctamente', 'inf');
}

function sendRecover() {
  const email = document.getElementById('rec-email').value.trim();
  if (!email) { showToast('Ingresa tu correo', 'err'); return; }
  closeModal('recover');
  showToast('📧 Enlace enviado a ' + email, 'ok');
}

// ── Mascotas ──────────────────────────────────────
function addPet() {
  const name    = document.getElementById('p-nom').value.trim();
  const species = document.getElementById('p-esp').value;
  const breed   = document.getElementById('p-raza').value.trim();
  const age     = document.getElementById('p-edad').value.trim();
  const weight  = document.getElementById('p-peso').value;
  const sex     = document.getElementById('p-sexo').value;

  if (!name || !species) { showToast('Nombre y especie son requeridos', 'err'); return; }

  // Guardar en estado global
  const breedLabel = breed || species.replace(/^\S+\s/,'');
  const key = `${name} - ${breedLabel}`;
  _state.pets.push({ name, species, breed, age, weight });
  if (!_state.historiales[key]) _state.historiales[key] = [];

  // Renderizar en lista de dueño
  const emoji   = SPECIES_EMOJI[species] || '🐾';
  const details = [breed, age, weight ? weight + ' kg' : '', sex].filter(Boolean).join(' · ');
  const item = document.createElement('div');
  item.className = 'iitem';
  _petStatus[key] = 'activo';
  item.dataset.petkey = key;
  item.innerHTML = `<div class="iico">${emoji}</div>
    <div class="iinfo"><strong>${name}</strong><span>${details}</span></div>
    <div class="status-sel">
      <button class="ss-btn active-st" onclick="setPetStatus(this,'${key}','activo')">Activo</button>
      <button class="ss-btn" onclick="setPetStatus(this,'${key}','pendiente')">Pendiente</button>
      <button class="ss-btn" onclick="setPetStatus(this,'${key}','rechazado')">Rechazado</button>
    </div>`;
  document.getElementById('petList').prepend(item);

  // Añadir al panel de pacientes del veterinario con selector sincronizado
  const vetList = document.getElementById('vetPacienteList');
  if (vetList) {
    const pi = document.createElement('div');
    pi.className = 'iitem';
    pi.dataset.petkey = key;
    pi.innerHTML = `<div class="iico">${emoji}</div>
      <div class="iinfo"><strong>${name} — ${breedLabel}</strong><span>Recién registrado</span></div>
      <div class="status-sel">
        <button class="ss-btn active-st" onclick="setPetStatus(this,'${key}','activo')">Activo</button>
        <button class="ss-btn" onclick="setPetStatus(this,'${key}','pendiente')">Pendiente</button>
        <button class="ss-btn" onclick="setPetStatus(this,'${key}','rechazado')">Rechazado</button>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-left:8px" onclick="selectPacienteYConsulta('${key}')">Ver historial</button>`;
    vetList.prepend(pi);
  }

  clearFields(['p-nom', 'p-raza', 'p-edad', 'p-peso', 'p-esp', 'p-sexo']);
  syncPetSelects();
  showToast(`${name} registrado/a exitosamente 🐾`, 'ok');
}

// ── Status selector — sincronizado entre perfiles ──
// Estado global de mascotas: { 'Max - Labrador': 'activo', ... }
const _petStatus = {};

function applyStatusToButtons(group, status) {
  group.querySelectorAll('.ss-btn').forEach(b => {
    b.classList.remove('active-st','pending-st','rejected-st');
  });
  const map = { activo:'active-st', pendiente:'pending-st', rechazado:'rejected-st' };
  const target = group.querySelector(`[onclick*="'${status}'"]`);
  if (target) target.classList.add(map[status]);
}

/** Cambia estado y lo propaga a todos los elementos con data-petkey */
function setPetStatus(btn, petKey, status) {
  _petStatus[petKey] = status;
  const map = { activo:'active-st', pendiente:'pending-st', rechazado:'rejected-st' };

  // Actualizar todos los selectores con ese petkey
  document.querySelectorAll(`[data-petkey="${petKey}"] .status-sel`).forEach(group => {
    group.querySelectorAll('.ss-btn').forEach(b => {
      b.classList.remove('active-st','pending-st','rejected-st');
    });
    const target = group.querySelector(`[onclick*="'${status}'"]`);
    if (target) target.classList.add(map[status]);
  });

  const labels = { activo:'Activo ✓', pendiente:'Pendiente ⏳', rechazado:'Rechazado ✗' };
  showToast(`Estado de ${petKey.split(' - ')[0]}: ${labels[status]}`, 'ok');
}

/** Compatibilidad con citas (solo local, sin sync global) */
function setCitaStatus(btn, status) {
  const group = btn.closest('.status-sel');
  group.querySelectorAll('.ss-btn').forEach(b => {
    b.classList.remove('active-st','pending-st','rejected-st');
  });
  const map = { activo:'active-st', pendiente:'pending-st', rechazado:'rejected-st' };
  btn.classList.add(map[status]);
}

// ── Exportar PDF ──────────────────────────────
function buildHistorialHTML(titulo, items) {
  const rows = items.map(r =>
    `<tr><td>${r.icon} ${r.tipo}</td><td>${r.desc}</td><td>${r.dateLabel}</td><td>${r.med||''}</td></tr>`
  ).join('');
  return `
    <html><head><meta charset="UTF-8">
    <style>
      body{font-family:Arial,sans-serif;padding:32px;color:#2d1a00}
      h1{color:#c45c00;font-size:22px;margin-bottom:4px}
      p.sub{color:#7a4a10;font-size:13px;margin-bottom:20px}
      table{width:100%;border-collapse:collapse;font-size:13px}
      th{background:#fff3e6;color:#c45c00;padding:8px 10px;text-align:left;border-bottom:2px solid #e07020}
      td{padding:8px 10px;border-bottom:1px solid #e0e0e0}
      tr:nth-child(even) td{background:#fffaf4}
      .footer{margin-top:24px;font-size:11px;color:#a07040}
    </style></head><body>
    <h1>🐾 Historial Clínico — ${titulo}</h1>
    <p class="sub">Generado el ${new Date().toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'})} · Adoptasoft</p>
    <table>
      <tr><th>Tipo</th><th>Descripción</th><th>Fecha</th><th>Medicamento/Nota</th></tr>
      ${rows || '<tr><td colspan="4" style="color:#a07040;">Sin registros clínicos.</td></tr>'}
    </table>
    <p class="footer">Adoptasoft — Sistema de Gestión Veterinaria · adoptasoft.app</p>
    </body></html>`;
}

function exportarPDF(htmlContent, filename) {
  const win = window.open('', '_blank');
  if (!win) { showToast('Permite ventanas emergentes para exportar', 'err'); return; }
  win.document.write(htmlContent);
  win.document.close();
  setTimeout(() => { win.print(); }, 400);
}

function exportarWord(htmlContent, filename) {
  const blob = new Blob([
    '\ufeff' + htmlContent
  ], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename + '.doc';
  a.click(); URL.revokeObjectURL(url);
}

function exportarHistorialPDF() {
  const titulo = 'Max — Labrador';
  const items = _state.historiales['Max - Labrador'] || [];
  exportarPDF(buildHistorialHTML(titulo, items), 'historial-max');
  showToast('Abriendo vista de impresión PDF...', 'inf');
}

function exportarHistorialWord() {
  const titulo = 'Max — Labrador';
  const items = _state.historiales['Max - Labrador'] || [];
  exportarWord(buildHistorialHTML(titulo, items), 'historial-max');
  showToast('Descargando historial en Word (.doc)...', 'ok');
}

function exportarHistorialVetPDF() {
  const key = document.getElementById('vt-paciente')?.value;
  if (!key) { showToast('Selecciona un paciente primero', 'err'); return; }
  const items = _state.historiales[key] || [];
  exportarPDF(buildHistorialHTML(key, items), 'historial-vet');
  showToast('Abriendo vista de impresión PDF...', 'inf');
}

function exportarHistorialVetWord() {
  const key = document.getElementById('vt-paciente')?.value;
  if (!key) { showToast('Selecciona un paciente primero', 'err'); return; }
  const items = _state.historiales[key] || [];
  exportarWord(buildHistorialHTML(key, items), 'historial-vet');
  showToast('Descargando historial en Word (.doc)...', 'ok');
}

// ── Citas ─────────────────────────────────────────
function selSlot(el) {
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  setSelectedSlot(el);
  const dateInput = document.getElementById('c-fecha');
  if (!dateInput.value) dateInput.value = new Date().toISOString().split('T')[0];
}

function addCita() {
  const petName = document.getElementById('c-masc').value;
  const vet     = document.getElementById('c-vet').value;
  const type    = document.getElementById('c-tipo').value;
  const date    = document.getElementById('c-fecha').value;
  if (!petName || !date) { showToast('Mascota y fecha son requeridos', 'err'); return; }

  const slotEl    = getSelectedSlot();
  const time      = slotEl ? slotEl.textContent : '—';
  const dateLabel = date ? new Date(date + 'T12:00:00').toLocaleDateString('es-CO',
    { day:'numeric', month:'short', year:'numeric' }) : '';

  const item = document.createElement('div');
  item.className = 'iitem';
  item.innerHTML = `<div class="iico">📅</div>
    <div class="iinfo"><strong>${petName} — ${type || 'Consulta'}</strong>
    <span>${vet || 'Veterinario'} · ${dateLabel} · ${time}</span></div>
    <span class="ibadge yellow">Pendiente</span>`;
  document.getElementById('citaList').prepend(item);

  // Reflejar la cita en la agenda del veterinario, en el horario asignado
  addCitaToVetAgenda({ time, petName, vet, type, dateLabel });

  if (slotEl) {
    slotEl.classList.add('taken');
    slotEl.classList.remove('selected');
    slotEl.onclick = null;
    setSelectedSlot(null);
  }
  clearCita();
  showToast('Cita agendada exitosamente 📅', 'ok');
}

/** Convierte "HH:MM" a minutos para poder ordenar cronológicamente. Citas sin hora ("—") van al final. */
function timeToMinutes(timeStr) {
  if (!timeStr || timeStr === '—' || !timeStr.includes(':')) return 99999;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** Inserta una cita nueva en la agenda del veterinario, en la posición cronológica que le corresponde. */
function addCitaToVetAgenda({ time, petName, vet, type, dateLabel }) {
  const list = document.getElementById('vetAgendaList');
  if (!list) return;

  const [nombre, raza] = petName.split(' - ');
  const icon  = type === 'Urgencia' ? '🚨' : '🕐';
  const badge = type === 'Urgencia' ? 'red' : 'yellow';
  const label = type === 'Urgencia' ? 'Urgencia' : 'Pendiente';

  const item = document.createElement('div');
  item.className = 'iitem';
  item.dataset.time = time;
  item.innerHTML = `<div class="iico">${icon}</div>
    <div class="iinfo"><strong>${time} — ${nombre || petName}</strong>
    <span>${type || 'Consulta'}${raza ? ' · ' + raza : ''}${vet ? ' · ' + vet : ''}</span></div>
    <div class="status-sel">
      <button class="ss-btn" onclick="setCitaStatus(this,'activo')">Activo</button>
      <button class="ss-btn pending-st" onclick="setCitaStatus(this,'pendiente')">Pendiente</button>
      <button class="ss-btn" onclick="setCitaStatus(this,'rechazado')">Rechazado</button>
    </div>`;

  const newMinutes = timeToMinutes(time);
  const next = Array.from(list.children).find(el => timeToMinutes(el.dataset.time) > newMinutes);
  if (next) list.insertBefore(item, next);
  else list.appendChild(item);
}

function clearCita() { clearFields(['c-masc','c-vet','c-tipo','c-motivo']); }

// ── Historial veterinario ─────────────────────────

/** Cuando el vet cambia el select de paciente, actualiza el historial mostrado. */
function onVetPacienteChange() {
  const key = document.getElementById('vt-paciente').value;
  renderVetHistorial(key);
}

/** Navega a la vista de historial y preselecciona el paciente. */
function selectPacienteYConsulta(key) {
  gotoTab('v-vet-historial');
  const sel = document.getElementById('vt-paciente');
  if (sel) { sel.value = key; renderVetHistorial(key); }
}

/** Renderiza el historial del paciente seleccionado. */
function renderVetHistorial(key) {
  const titleEl  = document.getElementById('hlist-title');
  const hlist    = document.getElementById('hlist');
  const emptyEl  = document.getElementById('vet-empty');
  const resolved = normalizePetKey(key);

  if (!resolved) {
    titleEl.textContent = 'Selecciona un paciente';
    hlist.style.display = 'none';
    emptyEl.style.display = 'block';
    return;
  }

  titleEl.textContent = resolved;
  const records = _state.historiales[resolved] || [];

  hlist.innerHTML = '';
  if (records.length === 0) {
    hlist.innerHTML = '<div class="empty-state"><div class="ei">📋</div><p>Sin registros clínicos aún</p></div>';
  } else {
    records.slice().reverse().forEach(r => {
      const d = document.createElement('div');
      d.className = `hitem ${r.cssClass}`;
      d.innerHTML = `<div class="ht">${r.icon} ${r.tipo}: ${r.desc}</div>
        <div class="hd">${r.dateLabel}${r.med ? ' · ' + r.med : ''}</div>`;
      hlist.appendChild(d);
    });
  }
  hlist.style.display = 'block';
  emptyEl.style.display = 'none';
}

function addHistorial() {
  const key  = document.getElementById('vt-paciente').value;
  const type = document.getElementById('vt-tipo').value;
  const desc = document.getElementById('vt-desc').value.trim();
  const med  = document.getElementById('vt-med').value.trim();
  const date = document.getElementById('vt-fecha').value;

  if (!key)  { showToast('Selecciona un paciente', 'err'); return; }
  if (!desc) { showToast('Ingresa la descripción del registro', 'err'); return; }

  const meta      = RECORD_TYPE_META[type] || { icon:'📋', cssClass:'' };
  const dateLabel = date ? new Date(date + 'T12:00:00').toLocaleDateString('es-CO',
    { day:'numeric', month:'short', year:'numeric' }) : '';

  const resolved = normalizePetKey(key);
  if (!resolved) { showToast('Paciente no encontrado', 'err'); return; }

  if (!_state.historiales[resolved]) _state.historiales[resolved] = [];
  _state.historiales[resolved].push({ icon:meta.icon, cssClass:meta.cssClass, tipo:type, desc, dateLabel, med });

  renderVetHistorial(resolved);
  clearFields(['vt-desc', 'vt-med']);
  showToast('Registro guardado en historial', 'ok');
}

// ── Usuarios (Admin) ──────────────────────────────
function addUser() {
  const name  = document.getElementById('au-nom').value.trim();
  const email = document.getElementById('au-email').value.trim();
  const role  = document.getElementById('au-rol').value;
  if (!name || !email || !role) { showToast('Completa todos los campos requeridos', 'err'); return; }

  const item = document.createElement('div');
  item.className = 'iitem';
  item.innerHTML = `<div class="iico">${ROLE_ICONS[role] || '👤'}</div>
    <div class="iinfo"><strong>${name}</strong><span>${email}</span></div>
    <span class="ibadge blue">${role}</span>`;
  document.getElementById('userList').prepend(item);

  clearFields(['au-nom','au-email','au-tel','au-doc','au-rol']);
  showToast(`Usuario ${name} creado exitosamente`, 'ok');
}

// ═══════════════════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initModalBackdropClose();
  const today = new Date().toISOString().split('T')[0];
  const cf = document.getElementById('c-fecha');
  if (cf) cf.min = today;
  const vf = document.getElementById('vet-fecha-agenda');
  if (vf) { vf.value = today; }
  console.info('Adoptasoft inicializado correctamente.');
});
