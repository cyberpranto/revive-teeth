/* ============== CONFIG STATE ============== */
// const CONFIGS = {
//     upper: { label: "Upper Arch", price: 1497 },
//     lower: { label: "Lower Arch", price: 1497 },
//     both: { label: "Both Arches", price: 1997 },
// };
// let current = "both";
// function fmt(n) {
//     return "$" + n.toLocaleString("en-US");
// }
// function applyConfig(key) {
//     current = key;
//     const c = CONFIGS[key];
//     document.querySelectorAll(".opt").forEach((o) => {
//         const sel = o.dataset.key === key;
//         o.classList.toggle("selected", sel);
//         o.setAttribute("aria-checked", sel ? "true" : "false");
//     });
//     document.getElementById("priceNow").textContent = fmt(c.price);
//     document.getElementById("ctaPrice").textContent = fmt(c.price);
//     document.getElementById("sbL1").textContent =
//         `Revive Veneers · ${c.label}${fmt(c.price)}`;
// }
// document.querySelectorAll(".opt").forEach((o) => {
//     o.addEventListener("click", () => applyConfig(o.dataset.key));
// });
// applyConfig("both");

/* ============== PROTOCOL MOBILE COLLAPSE (Edit 4) ============== */
// Inject chevron into each collapsible protocol card and wire up tap-to-expand.

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".pcard2[data-collapsible]");
  cards.forEach((card) => {
    const inner = card.firstElementChild;
    if (!inner) return;
    const h3 = inner.querySelector("h3");
    if (!h3) return;
    const chev = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chev.setAttribute("class", "pchev");
    chev.setAttribute("viewBox", "0 0 24 24");
    chev.setAttribute("fill", "none");
    chev.setAttribute("stroke", "currentColor");
    chev.setAttribute("stroke-width", "2");
    chev.setAttribute("aria-hidden", "true");
    chev.innerHTML =
      '<path d="M6 9l6 6 6-6"stroke-linecap="round"stroke-linejoin="round"/>';
    h3.insertAdjacentElement("afterend", chev);
    card.addEventListener("click", (e) => {
      if (window.matchMedia("(min-width: 701px)").matches) return;
      card.classList.toggle("expanded");
      syncToggleAllLabel();
    });
  });
  const toggleAll = document.getElementById("protocolToggleAll");
  function setLabel(expanded) {
    if (!toggleAll) return;
    toggleAll.textContent = expanded
      ? "Collapse to summary ←"
      : "Show all 7 steps →";
    toggleAll.setAttribute("aria-expanded", expanded ? "true" : "false");
  }
  function allExpanded() {
    return (
      cards.length > 0 &&
      Array.from(cards).every((c) => c.classList.contains("expanded"))
    );
  }
  function syncToggleAllLabel() {
    setLabel(allExpanded());
  }
  if (toggleAll) {
    toggleAll.addEventListener("click", (e) => {
      e.stopPropagation();
      const expand = !allExpanded();
      cards.forEach((c) => c.classList.toggle("expanded", expand));
      setLabel(expand);
    });
  }
});
/* ============== CART BTN ============== */

document.addEventListener("DOMContentLoaded", function () {
  function bumpCart() {
    const el = document.getElementById("cartCount");
    el.textContent = (parseInt(el.textContent || "0", 10) + 1).toString();
  }
  document.getElementById("cta").addEventListener("click", bumpCart());
  document.getElementById("sbCta").addEventListener("click", () => {
    document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const cta = document.getElementById("cta");
      cta.classList.remove("pulsing");
      void cta.offsetWidth;
      cta.classList.add("pulsing");
    }, 600);
  });
  document.getElementById("sbInfo").addEventListener("click", () => {
    document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
  });
});

/* ============== NAV SCROLL ============== */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});
/* ============== GALLERY ============== */
const thumbs = document.querySelectorAll(".thumb");
const galMain = document.getElementById("galMain");
const galMainMobile = document.getElementById("galMainmobile");

thumbs.forEach((t, i) => {
  t.addEventListener("click", () => {
    thumbs.forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    galMain.classList.add("fade");
    galMainMobile.classList.add("fade");
    setTimeout(() => {
      const rid = t.dataset.rid;
      const src =
        (window.__resources && rid && window.__resources[rid]) ||
        t.querySelector("img").src;
      const alt = t.dataset.alt || "Revive Veneers";
      galMain.innerHTML = `<img id="galImg"src="${src}"alt="Revive Veneers · ${alt}"/>`;
      galMain.classList.remove("fade");
      galMainMobile.innerHTML = `<img id="galImg"src="${src}"alt="Revive Veneers · ${alt}"/>`;
      galMainMobile.classList.remove("fade");
    }, 220);
  });
});
/* ============== FAQ ============== */
document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const open = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((x) => x.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});
/* ============== STICKY BAR VISIBILITY ============== */
const sticky = document.getElementById("stickyBar");
const buybox = document.querySelector(".buybox");
const footer = document.getElementById("footer");
let buyboxBottom = 0,
  footerTop = 0;
function calcOffsets() {
  buyboxBottom = buybox.getBoundingClientRect().bottom + window.scrollY;
  footerTop = footer.getBoundingClientRect().top + window.scrollY;
}
calcOffsets();
window.addEventListener("resize", calcOffsets);
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const viewportBottom = y + window.innerHeight;
  const past = y > buyboxBottom;
  const beforeFooter = viewportBottom < footerTop + 100;
  if (past && beforeFooter) {
    sticky.classList.add("show");
    document.body.classList.add("pad-sticky");
  } else {
    sticky.classList.remove("show");
    document.body.classList.remove("pad-sticky");
  }
});
/* ============== MODAL HELPERS ============== */
function openModal(id) {
  document.getElementById(id).classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.remove("show");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-close]").forEach((b) => {
  b.addEventListener("click", (e) => {
    closeModal(e.target.closest(".modal-bg").id);
  });
});
document.querySelectorAll(".modal-bg").forEach((m) => {
  m.addEventListener("click", (e) => {
    if (e.target === m) closeModal(m.id);
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal-bg.show")
      .forEach((m) => closeModal(m.id));
  }
});
/* ============== SMILE ASSESSMENT QUIZ ============== */
const QUIZ = [
  {
    q: "How would you describe the current condition of your teeth?",
    sub: "Choose the option that best matches your current dental health.",
    opts: [
      { t: "Generally healthy, just want to improve appearance", s: "ideal" },
      { t: "Some staining, gaps, or worn edges", s: "ideal" },
      { t: "Multiple cavities or recent dental work", s: "consult" },
      { t: "Missing one or two teeth in the middle of the arch", s: "good" },
      {
        t: "Missing three or more teeth, or any teeth at the end of the arch",
        s: "not",
      },
    ],
  },
  {
    q: "Do you have any of the following?",
    sub: "Be honest. This helps Dr. Turley know whether you're a fit.",
    opts: [
      { t: "None of the below", s: "ideal" },
      { t: "Mild gum recession", s: "good" },
      { t: "Active gum disease or significant gum recession", s: "consult" },
      { t: "Currently wearing full dentures", s: "not" },
    ],
  },
  {
    q: "How would you describe your bite?",
    sub: "",
    opts: [
      { t: "Normal or slight overbite/underbite", s: "ideal" },
      { t: "Moderate overbite or underbite", s: "good" },
      { t: "Severe crossbite or alignment issues", s: "consult" },
    ],
  },
  {
    q: "Have you had major dental work in the past 3 months?",
    sub: "",
    opts: [
      { t: "No", s: "ideal" },
      { t: "Cleaning or whitening only", s: "ideal" },
      { t: "Fillings or crowns", s: "good" },
      { t: "Extractions, implants, or orthodontics", s: "consult" },
    ],
  },
  {
    q: "How many teeth are you missing in the arch you want covered?",
    sub: "",
    opts: [
      { t: "None", s: "ideal" },
      { t: "One or two, not at the end of the arch", s: "good" },
      { t: "One or two at the end of the arch", s: "consult" },
      { t: "Three or more", s: "not" },
    ],
  },
  {
    q: "Which best describes your goal?",
    sub: "",
    opts: [
      {
        t: "I want my teeth to look better in photos and in person",
        s: "ideal",
      },
      { t: "I want a temporary upgrade for a specific event", s: "ideal" },
      { t: "I want to fix dental issues that affect my health", s: "consult" },
    ],
  },
];
const RESULTS = {
  ideal: {
    tagClass: "result-ideal",
    tagLabel: "Ideal candidate",
    title: "You're an ideal candidate.",
    body: "Based on your answers, Revive Veneers should work well for you. Most ideal candidates see results within the standard 2–3 week production timeline.",
    primary: { label: "Add to Cart", action: "buy" },
    secondary: null,
  },
  good: {
    tagClass: "result-good",
    tagLabel: "Good candidate · extended timeline",
    title: "You're a good candidate. Your case may take a bit longer.",
    body: "Your situation is workable, but Dr. Turley may request additional photos or extend the production timeline to ensure the fit is right. You can continue to purchase, or send photos for review first.",
    primary: { label: "Add to Cart", action: "buy" },
    secondary: { label: "Send photos to Dr. Turley", action: "photos" },
  },
  consult: {
    tagClass: "result-consult",
    tagLabel: "Consult before ordering",
    title: "We recommend consulting a local dentist first.",
    body: "Based on your answers, you have a dental situation that should be reviewed by a licensed dentist before ordering a cosmetic appliance. Snap-on veneers do not treat dental conditions.",
    primary: { label: "Send photos to Dr. Turley", action: "photos" },
    secondary: { label: "Add to Cart anyway", action: "buy" },
  },
  not: {
    tagClass: "result-not",
    tagLabel: "Not a candidate",
    title: "Revive Veneers aren't the right solution for you.",
    body: "Snap-on veneers sit over your existing teeth, so they aren't right for full dentures or when most teeth are missing. We recommend consulting a local dentist about implants, bridges, or full restorations.",
    primary: { label: "Browse alternatives guide", action: "close" },
    secondary: null,
  },
};
const PRIORITY = { not: 4, consult: 3, good: 2, ideal: 1 };
let answers = [];
let qIndex = 0;
function renderQuestion() {
  const item = QUIZ[qIndex];
  document.getElementById("qFill").style.width =
    (qIndex / QUIZ.length) * 100 + 16 + "%";
  document.getElementById("qMeta").textContent =
    `Question ${qIndex + 1} of ${QUIZ.length}`;
  document.getElementById("qTitle").textContent = item.q;
  document.getElementById("qSub").textContent = item.sub || "";
  document.getElementById("qSub").style.display = item.sub ? "block" : "none";
  document.getElementById("qBack").style.display =
    qIndex > 0 ? "inline-block" : "none";
  const opts = document.getElementById("qOpts");
  opts.innerHTML = "";
  item.opts.forEach((o) => {
    const b = document.createElement("button");
    b.className = "q-opt";
    b.textContent = o.t;
    b.addEventListener("click", () => {
      answers[qIndex] = o.s;
      if (qIndex < QUIZ.length - 1) {
        qIndex++;
        renderQuestion();
      } else {
        renderResult();
      }
    });
    opts.appendChild(b);
  });
}
function renderResult() {
  // worst-case wins
  let worst = "ideal";
  answers.forEach((s) => {
    if (PRIORITY[s] > PRIORITY[worst]) worst = s;
  });
  const r = RESULTS[worst];
  document.getElementById("qFill").style.width = "100%";
  document.getElementById("qMeta").textContent = "Your result";
  document.getElementById("qTitle").innerHTML = r.title;
  document.getElementById("qSub").style.display = "none";
  document.getElementById("qBack").style.display = "none";
  const opts = document.getElementById("qOpts");
  opts.innerHTML = `<div class="result-tag ${r.tagClass}"><span class="cdot"></span>${r.tagLabel}</div>     <p class="result-body">${r.body}</p>     <div class="result-actions">       <button class="cta"id="resPrimary">${r.primary.label}</button>       ${r.secondary ? `<button class="btn-outline"style="justify-content:center"id="resSecondary">${r.secondary.label}</button>` : ""}       <button class="modal-back"id="resRetake"style="border:0;background:none;cursor:pointer">Retake the assessment</button>     </div>   `;
  document
    .getElementById("resPrimary")
    .addEventListener("click", () => handleAction(r.primary.action));
  if (r.secondary)
    document
      .getElementById("resSecondary")
      .addEventListener("click", () => handleAction(r.secondary.action));
  document.getElementById("resRetake").addEventListener("click", () => {
    qIndex = 0;
    answers = [];
    renderQuestion();
  });
}
function handleAction(a) {
  closeModal("quizModal");
  if (a === "buy") {
    document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const cta = document.getElementById("cta");
      cta.classList.remove("pulsing");
      void cta.offsetWidth;
      cta.classList.add("pulsing");
    }, 600);
  } else if (a === "photos") {
    window.location.href =
      "mailto:hello@reviveteeth.com?subject=Photo%20review%20for%20Revive%20Veneers&body=Hi%20Dr.%20Turley%2C%0A%0AI%27d%20like%20you%20to%20review%20my%20photos%20before%20I%20order.%20Please%20find%20attached%3A%0A%0A1.%20A%20front-facing%20smile%20photo%0A2.%20A%20close-up%20of%20my%20teeth%20%28lips%20pulled%20back%29%0A3.%20A%20side%20profile%20of%20my%20smile%0A%0AMy%20specific%20concerns%3A%20%5Bplease%20describe%5D%0A%0AThank%20you.";
  }
}
document.getElementById("qBack").addEventListener("click", (e) => {
  e.preventDefault();
  if (qIndex > 0) {
    qIndex--;
    renderQuestion();
  }
});
function startQuiz() {
  qIndex = 0;
  answers = [];
  renderQuestion();
  openModal("quizModal");
}
document.getElementById("openQuiz").addEventListener("click", startQuiz);
document.getElementById("exitTakeQuiz").addEventListener("click", () => {
  closeModal("exitModal");
  startQuiz();
});
//  /* ============== EXIT INTENT ============== */
let exitShown = false;
function maybeShowExit() {
  if (exitShown) return;
  if (sessionStorage.getItem("reviveExit") === "1") return;
  exitShown = true;
  sessionStorage.setItem("reviveExit", "1");
  openModal("exitModal");
}
setTimeout(() => {
  maybeShowExit();
}, 3000);
// document.addEventListener("mouseout", (e) => {
//   if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
//     maybeShowExit();
//   }
// });
// fallback timer (after 60s on mobile/ no mouse)
// setTimeout(() => {
//   if (!exitShown && window.scrollY > window.innerHeight) maybeShowExit();
// }, 60000);
