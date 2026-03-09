// =====================
// CONFIGURAÇÕES
// =====================

// Data/hora do casamento (02/05/2026 às 10:00 no Brasil -03:00)
const WEDDING_ISO = "2026-05-02T10:00:00-03:00";

// Link do Google Maps (o botão "Localização" vai abrir isso)
const MAPS_URL = "https://maps.app.goo.gl/cv66B7RYLVyME1iA7";

// WhatsApp: +55 31 97244-4043 (formato wa.me = só números)
const WHATS_NUMBER = "5531972444043";
const WHATS_MESSAGE = "Olá! Confirmo minha presença no casamento de Marcelo & Eduarda.";

// Textos que aparecem escritos no convite (página 2)
const PLACE_TEXT = "Igreja de São Sebastião — Araçaí/MG";
const ADDRESS_TEXT = "Igreja de São Sebastião, Araçaí — MG";

// =====================
// FUNÇÕES AUXILIARES
// =====================

function $(selector) {
  return document.querySelector(selector);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

// =====================
// 1) setLinks()  ✅ (explico abaixo)
// =====================
function setLinks() {
  // Botão de localização
  const btnMaps = $("#btnMaps");
  if (btnMaps) btnMaps.href = MAPS_URL;

  // Botão de WhatsApp (com mensagem pronta)
  const btnWhats = $("#btnWhats");
  if (btnWhats) {
    const text = encodeURIComponent(WHATS_MESSAGE);
    btnWhats.href = `https://wa.me/${WHATS_NUMBER}?text=${text}`;
  }

  // Textos de local/endereço (se existirem no HTML)
  const placeEl = $("#placeText");
  if (placeEl) placeEl.textContent = PLACE_TEXT;

  const addressEl = $("#addressText");
  if (addressEl) addressEl.textContent = ADDRESS_TEXT;
}

// =====================
// 2) Contagem regressiva
// =====================
function startCountdown() {
  const dd = $("#dd"),
    hh = $("#hh"),
    mm = $("#mm"),
    ss = $("#ss");

  // Se não existir o bloco no HTML, não faz nada
  if (!dd || !hh || !mm || !ss) return;

  const target = new Date(WEDDING_ISO).getTime();

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    const secs = Math.floor(diff / 1000);

    dd.textContent = pad(days);
    hh.textContent = pad(hours);
    mm.textContent = pad(mins);
    ss.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
}

// =====================
// 3) Troca de páginas (lacre abre / voltar fecha)
// =====================
function switchPages(showSecondPage) {
  const p1 = $("#page1");
  const p2 = $("#page2");
  if (!p1 || !p2) return;

  if (showSecondPage) {
    p1.classList.remove("page--active");
    p1.setAttribute("aria-hidden", "true");
    p2.classList.add("page--active");
    p2.setAttribute("aria-hidden", "false");
    window.scrollTo(0, 0);
  } else {
    p2.classList.remove("page--active");
    p2.setAttribute("aria-hidden", "true");
    p1.classList.add("page--active");
    p1.setAttribute("aria-hidden", "false");
    window.scrollTo(0, 0);
  }
}

function bindUI() {
  const openBtn = $("#openInvite");
  if (openBtn) openBtn.addEventListener("click", () => switchPages(true));

  const backBtn = $("#backCover");
  if (backBtn) backBtn.addEventListener("click", () => switchPages(false));
}

// =====================
// INICIALIZAÇÃO
// =====================
setLinks();
startCountdown();
bindUI();
