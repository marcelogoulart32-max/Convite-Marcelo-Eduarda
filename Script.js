// ====== CONFIGURAÇÕES (edite aqui) ======
const WEDDING_ISO = "2026-05-02T10:00:00-03:00"; // 02/05/2026 10:00 (Brasil)
const MAPS_URL = "https://maps.app.goo.gl/cv66B7RYLVyME1iA7";

// WhatsApp: +55 31 97244-4043
const WHATS_NUMBER = "5531972444043";
const WHATS_MESSAGE = "Olá! Confirmo minha presença no casamento de Marcelo & Eduarda.";

// Texto do local (apenas o que aparece escrito; o clique usa o link acima)
const PLACE_TEXT = "[NOME DO LOCAL] — [CIDADE/UF]";
// =======================================

const $ = (s) => document.querySelector(s);

function setLinks(){
  $("#btnMaps").href = MAPS_URL;

  const text = encodeURIComponent(WHATS_MESSAGE);
  $("#btnWhats").href = `https://wa.me/${WHATS_NUMBER}?text=${text}`;

  $("#placeText").textContent = PLACE_TEXT;
}

function pad(n){ return String(n).padStart(2, "0"); }

function startCountdown(){
  const dd = $("#dd"), hh = $("#hh"), mm = $("#mm"), ss = $("#ss");
  const target = new Date(WEDDING_ISO).getTime();

  function tick(){
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const mins = Math.floor(diff / (1000*60));
    diff -= mins * (1000*60);
    const secs = Math.floor(diff / 1000);

    dd.textContent = pad(days);
    hh.textContent = pad(hours);
    mm.textContent = pad(mins);
    ss.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
}

function switchPages(show2){
  const p1 = $("#page1");
  const p2 = $("#page2");

  if (show2){
    p1.classList.remove("page--active");
    p1.setAttribute("aria-hidden", "true");
    p2.classList.add("page--active");
    p2.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    p2.classList.remove("page--active");
    p2.setAttribute("aria-hidden", "true");
    p1.classList.add("page--active");
    p1.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

function bindUI(){
  $("#openInvite").addEventListener("click", () => switchPages(true));
  $("#backCover").addEventListener("click", () => switchPages(false));
}

setLinks();
startCountdown();
bindUI();