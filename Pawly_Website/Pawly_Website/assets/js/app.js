/* =========================================================
   Pawly — shared app logic (runs on every page)
   Header/footer, favorites, cart, modals, card renderers.
   State is kept in localStorage for the prototype.
   ========================================================= */

/* ---------- Small helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
function img(id, w = 900) {
  if (!id) return PLACEHOLDER_IMG;
  if (/^https?:\/\//.test(id) || id.startsWith("data:")) return id;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}
function money(n) { return "$" + Number(n).toFixed(2); }
function params() { return new URLSearchParams(location.search); }
function todayISO() {
  const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
function prettyDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
function uid(prefix) { return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }

const PLACEHOLDER_IMG = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 360"><rect width="400" height="360" fill="#dce9dd"/><text x="200" y="205" font-size="90" text-anchor="middle">🐾</text></svg>`);

// Any image that fails to load falls back to a soft paw placeholder
document.addEventListener("error", e => {
  const el = e.target;
  if (el.tagName === "IMG" && !el.dataset.fallback) { el.dataset.fallback = "1"; el.src = PLACEHOLDER_IMG; }
}, true);

/* ---------- Icons ---------- */
const ICON = {
  paw: `<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><ellipse cx="5.6" cy="10" rx="2.1" ry="2.7"/><ellipse cx="9.6" cy="5.8" rx="2.1" ry="2.8"/><ellipse cx="14.4" cy="5.8" rx="2.1" ry="2.8"/><ellipse cx="18.4" cy="10" rx="2.1" ry="2.7"/><path d="M12 11.6c-2.9 0-6.1 3.6-6.1 6.3 0 1.7 1.3 2.6 2.9 2.6 1.3 0 2-.6 3.2-.6s1.9.6 3.2.6c1.6 0 2.9-.9 2.9-2.6 0-2.7-3.2-6.3-6.1-6.3z"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.1l1.6-6.3H6.4"/></svg>`,
  heartOutline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`
};

/* ---------- Storage (safe wrappers) ---------- */
const store = {
  get(key, fallback) {
    try { const raw = localStorage.getItem("pawly_" + key); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("pawly_" + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }
};

/* ---------- User-created seller listings merge into the catalogue ---------- */
const DEFAULT_LISTING_IMG = {
  food: "1589924691995-400dc9ecc119", toys: "1535294435445-d7249524ef2e", beds: "1581888227599-779811939961",
  collars: "1586671267731-da2cf3ceeb80", gps: "1530281700549-e82e7bf110d6", feeding: "1589924691995-400dc9ecc119",
  grooming: "1611173622933-91942d394b04", daycare: "1548199973-03cce0bbc87b", vaccination: "1628009368231-7bb7cfcb0def",
  vet: "1644675443401-ea4c14bad0e6", training: "1598875184988-5e67b1a874b8"
};
function userListings() { return store.get("listings", []); }
function allProducts() {
  const extra = userListings().filter(l => l.kind === "product").map(l => ({
    id: l.id, cat: l.category, name: l.title, brand: l.business, pet: l.pet || "both", life: "All ages",
    foodType: l.category === "food" ? "Dry" : undefined, price: Number(l.price), rating: 0, reviews: 0,
    img: l.image || DEFAULT_LISTING_IMG[l.category], desc: l.description, isNew: true
  }));
  return [...extra, ...PRODUCTS];
}
function allProviders() {
  const extra = userListings().filter(l => l.kind === "service").map(l => ({
    id: l.id, type: l.category, name: l.business, city: l.city, state: l.state, rating: 0, reviews: 0,
    from: Number(l.price), img: l.image || DEFAULT_LISTING_IMG[l.category], hours: "Contact for hours", pets: "Dogs & cats",
    modes: l.mode === "both" ? ["home", "center"] : [l.mode || "center"],
    services: [[l.title, Number(l.price)]], about: l.description, isNew: true
  }));
  return [...extra, ...PROVIDERS];
}
const providerModes = p => (p.modes && p.modes.length ? p.modes : ["center"]);
const findPet = id => PETS.find(p => p.id === id);
const findProduct = id => allProducts().find(p => p.id === id);
const findProvider = id => allProviders().find(p => p.id === id);
const findShelter = id => SHELTERS.find(s => s.id === id);
const findGuide = id => GUIDES.find(g => g.id === id);

/* ---------- Favorites ---------- */
const favs = {
  all() { return store.get("favs", []); },
  has(key) { return this.all().includes(key); },
  toggle(key) {
    const list = this.all();
    const i = list.indexOf(key);
    if (i >= 0) list.splice(i, 1); else list.unshift(key);
    store.set("favs", list);
    syncFavButtons();
    updateBadges();
    document.dispatchEvent(new CustomEvent("pawly:favs"));
    return i < 0;
  }
};
function favButton(key, label) {
  const on = favs.has(key);
  return `<button class="fav-btn${on ? " on" : ""}" data-fav="${esc(key)}" aria-pressed="${on}" aria-label="${on ? "Remove" : "Save"} ${esc(label)} ${on ? "from" : "to"} favorites">${ICON.heart}</button>`;
}
function syncFavButtons() {
  $$("[data-fav]").forEach(btn => {
    const on = favs.has(btn.dataset.fav);
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", on);
    if (btn.dataset.favText) btn.innerHTML = on ? "♥ Saved" : "♡ Save to favorites";
  });
}

/* ---------- Cart ---------- */
const SUB_DISCOUNT = 0.10;
const cart = {
  items() { return store.get("cart", []).filter(i => findProduct(i.id)); },
  save(items) { store.set("cart", items); updateBadges(); document.dispatchEvent(new CustomEvent("pawly:cart")); },
  add(id, qty = 1, sub = "") {
    const items = this.items();
    const found = items.find(i => i.id === id && (i.sub || "") === (sub || ""));
    if (found) found.qty = Math.min(20, found.qty + qty); else items.push({ id, qty, sub });
    this.save(items);
  },
  setQty(index, qty) { const items = this.items(); if (!items[index]) return; items[index].qty = Math.max(1, Math.min(20, qty)); this.save(items); },
  setSub(index, sub) { const items = this.items(); if (!items[index]) return; items[index].sub = sub; this.save(items); },
  remove(index) { const items = this.items(); items.splice(index, 1); this.save(items); },
  clear() { this.save([]); },
  count() { return this.items().reduce((n, i) => n + i.qty, 0); },
  unitPrice(item) { const p = findProduct(item.id); return item.sub ? p.price * (1 - SUB_DISCOUNT) : p.price; }
};

function updateBadges() {
  const c = cart.count(), f = favs.all().length;
  $$("[data-badge='cart']").forEach(b => { b.textContent = c; b.dataset.n = c; });
  $$("[data-badge='favs']").forEach(b => { b.textContent = f; b.dataset.n = f; });
}

/* ---------- Toast ---------- */
function toast(message) {
  let el = $("#toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- Modal ---------- */
let lastFocus = null;
function openModal(html, { narrow = false, label = "Dialog" } = {}) {
  closeModal(true);
  lastFocus = document.activeElement;
  const wrap = document.createElement("div");
  wrap.className = "modal-backdrop";
  wrap.id = "modal";
  wrap.innerHTML = `<div class="modal${narrow ? " narrow" : ""}" role="dialog" aria-modal="true" aria-label="${esc(label)}">
      <button class="modal-close" data-close aria-label="Close">${ICON.close}</button>${html}</div>`;
  document.body.appendChild(wrap);
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => wrap.classList.add("show"));
  wrap.addEventListener("click", e => { if (e.target === wrap || e.target.closest("[data-close]")) closeModal(); });
  setTimeout(() => (wrap.querySelector("input, select, textarea, .btn") || wrap.querySelector(".modal-close")).focus({ preventScroll: true }), 60);
  return wrap.querySelector(".modal");
}
function closeModal(instant = false) {
  const wrap = $("#modal");
  if (!wrap) return;
  wrap.id = "";
  document.body.style.overflow = "";
  if (instant) { wrap.remove(); return; }
  wrap.classList.remove("show");
  setTimeout(() => wrap.remove(), 200);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- Rating stars ---------- */
function stars(rating, reviews) {
  if (!rating) return `<span class="stars"><span class="tag green">New on Pawly</span></span>`;
  const full = Math.round(rating);
  return `<span class="stars" aria-label="Rated ${rating} out of 5"><b>${"★".repeat(full)}${"☆".repeat(5 - full)}</b>${rating.toFixed(1)}${reviews != null ? ` (${reviews.toLocaleString()})` : ""}</span>`;
}

/* ---------- Card renderers ---------- */
function petCard(p) {
  const shelter = findShelter(p.shelter);
  return `<article class="card pet">
    ${favButton("pet:" + p.id, p.name)}
    <div class="media" data-open-pet="${p.id}" role="button" tabindex="0" aria-label="View ${esc(p.name)}'s profile">
      <img src="${img(p.img, 700)}" alt="${esc(p.name)}, ${esc(p.breed)}" loading="lazy">
    </div>
    <div class="body">
      <h3><button class="title-btn" data-open-pet="${p.id}">${esc(p.name)}</button></h3>
      <div class="tags"><span class="tag">${esc(p.size)}</span><span class="tag">${esc(p.age)}</span><span class="tag">${esc(p.gender)}</span></div>
      <div class="meta">${esc(p.breed)} · ${esc(shelter.city)}, ${esc(shelter.state)}</div>
    </div>
  </article>`;
}

function productCard(p) {
  const catName = (PRODUCT_CATEGORIES.find(c => c.id === p.cat) || {}).name || "";
  const ribbon = p.isNew ? `<span class="ribbon peach">New listing</span>`
    : p.was ? `<span class="ribbon peach">Sale</span>`
    : p.best ? `<span class="ribbon">Best seller</span>` : "";
  return `<article class="card product">
    ${ribbon}${favButton("product:" + p.id, p.name)}
    <div class="media" data-open-product="${p.id}" role="button" tabindex="0" aria-label="View ${esc(p.name)}">
      <img src="${img(p.img, 700)}" alt="${esc(p.name)}" loading="lazy">
    </div>
    <div class="body">
      <div class="meta"><b style="color:var(--green-dark)">${esc(p.brand)}</b> · ${esc(catName)}</div>
      <h3 style="font-size:16px"><button class="title-btn" data-open-product="${p.id}">${esc(p.name)}</button></h3>
      ${stars(p.rating, p.reviews)}
      ${p.cat === "food" ? `<div class="tags"><span class="tag green">Subscribe & save 10%</span></div>` : ""}
      ${p.plan ? `<div class="tags"><span class="tag gold">Plan from ${money(p.plan)}/mo</span></div>` : ""}
      <div class="foot">
        <div class="price">${money(p.price)}${p.was ? `<s>${money(p.was)}</s>` : ""}</div>
        <button class="add-btn" data-add-cart="${p.id}" aria-label="Add ${esc(p.name)} to cart">${ICON.plus} Add</button>
      </div>
    </div>
  </article>`;
}

function providerCard(p) {
  const type = SERVICE_TYPES.find(t => t.id === p.type);
  return `<article class="card provider">
    ${p.isNew ? `<span class="ribbon peach">New listing</span>` : `<span class="ribbon">${type.icon} ${esc(type.name)}</span>`}
    ${favButton("provider:" + p.id, p.name)}
    <div class="media" data-book="${p.id}" role="button" tabindex="0" aria-label="Book ${esc(p.name)}">
      <img src="${img(p.img, 800)}" alt="${esc(p.name)}" loading="lazy">
    </div>
    <div class="body">
      <h3>${esc(p.name)}</h3>
      <div class="loc">${ICON.pin} ${esc(p.city)}, ${esc(p.state)} · ${esc(p.pets)}</div>
      <div class="modes">${providerModes(p).map(m => `<span class="tag ${m === "home" ? "peach" : "green"}">${SERVICE_MODES[m].icon} ${SERVICE_MODES[m].label}</span>`).join("")}</div>
      ${stars(p.rating, p.reviews)}
      <div class="services-list">${p.services.slice(0, 3).map(s => `<span class="tag">${esc(s[0])}</span>`).join("")}${p.services.length > 3 ? `<span class="tag">+${p.services.length - 3} more</span>` : ""}</div>
      <div class="foot">
        <div class="price"><small>from</small> ${money(p.from).replace(".00", "")}</div>
        <button class="btn sm" data-book="${p.id}">Book</button>
      </div>
    </div>
  </article>`;
}

function guideCard(g) {
  return `<button class="guide-card" data-open-guide="${g.id}">
    <img class="guide-img" src="${img(g.img, 700)}" alt="" loading="lazy">
    <div class="guide-type">${esc(g.cat)}</div>
    <h4>${esc(g.title)}</h4>
    <p>${esc(g.summary)}</p>
    <span class="read-time">${g.mins} min read</span>
  </button>`;
}

function emptyState(icon, title, text, ctaHref, ctaText) {
  return `<div class="empty"><div class="big">${icon}</div><h3>${esc(title)}</h3><p>${esc(text)}</p>${ctaHref ? `<a class="btn" href="${ctaHref}">${esc(ctaText)}</a>` : ""}</div>`;
}

/* ---------- Detail modals ---------- */
const TRAIT_LABELS = ["Good with kids", "Good with dogs", "Good with cats", "House-trained", "Vaccinated", "Spayed / neutered"];

function openPet(id) {
  const p = findPet(id); if (!p) return;
  const s = findShelter(p.shelter);
  openModal(`<div class="modal-split">
    <div class="m-media"><img src="${img(p.img, 1000)}" alt="${esc(p.name)}"></div>
    <div class="modal-body">
      <div class="kicker">${p.type === "dog" ? "Adoptable dog" : "Adoptable cat"} · ${esc(s.city)}, ${esc(s.state)}</div>
      <h2>Meet ${esc(p.name)}</h2>
      <div class="facts">
        <div class="fact"><small>Breed</small><b>${esc(p.breed)}</b></div>
        <div class="fact"><small>Age</small><b>${esc(p.age)}</b></div>
        <div class="fact"><small>Gender</small><b>${esc(p.gender)}</b></div>
        <div class="fact"><small>Size</small><b>${esc(p.size)}</b></div>
      </div>
      <p style="margin:0">${esc(p.about)}</p>
      <ul class="traits">${p.traits.map((t, i) => `<li><span class="${t ? "yes" : "no"}">${t ? "✓" : "–"}</span>${TRAIT_LABELS[i]}</li>`).join("")}</ul>
      <div class="fact"><small>Shelter</small><b>${esc(s.name)}</b><div class="muted" style="font-size:13px">${esc(s.phone)} · Adoption fee ${money(p.fee).replace(".00", "")}</div></div>
      <div class="modal-actions">
        <button class="btn" data-adopt="${p.id}">Apply to adopt ${esc(p.name)}</button>
        <button class="btn ghost" data-fav="pet:${p.id}" data-fav-text="1">${favs.has("pet:" + p.id) ? "♥ Saved" : "♡ Save to favorites"}</button>
      </div>
    </div></div>`, { label: `${p.name}'s profile` });
}

function openAdoptForm(id) {
  const p = findPet(id); if (!p) return;
  const s = findShelter(p.shelter);
  const modal = openModal(`<div class="modal-body">
    <div class="kicker">Adoption application</div>
    <h2 style="font-size:28px">Apply to adopt ${esc(p.name)}</h2>
    <p class="muted" style="margin:0">Your application goes to <b>${esc(s.name)}</b>. They'll contact you to arrange a meet-and-greet.</p>
    <form id="adoptForm" class="form-grid" novalidate>
      <label class="field"><span>Full name</span><input name="name" required autocomplete="name"></label>
      <label class="field"><span>Email</span><input name="email" type="email" required autocomplete="email"></label>
      <label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel"></label>
      <label class="field"><span>Home type</span><select name="home"><option>House with a fenced yard</option><option>House without a yard</option><option>Apartment / condo</option><option>Other</option></select></label>
      <label class="field"><span>Other pets at home</span><select name="pets"><option>None</option><option>Dog(s)</option><option>Cat(s)</option><option>Dogs and cats</option><option>Other</option></select></label>
      <label class="field"><span>Children at home</span><select name="kids"><option>No</option><option>Yes, under 6</option><option>Yes, 6 and older</option></select></label>
      <label class="field full"><span>Why is ${esc(p.name)} a good fit for you?</span><textarea name="message" placeholder="Tell the shelter about your routine, experience and plans for exercise and care."></textarea></label>
      <label class="check full"><input type="checkbox" name="age18" required> I am 18 years of age or older.</label>
      <label class="check full"><input type="checkbox" name="terms" required> I agree to the <a href="terms.html#adoptions" target="_blank">Terms &amp; Conditions</a> and understand the final adoption decision is made by the shelter.</label>
      <div class="error-text full" id="adoptErr"></div>
      <div class="full modal-actions"><button class="btn" type="submit">Submit application</button><button class="btn ghost" type="button" data-close>Cancel</button></div>
    </form></div>`, { narrow: true, label: "Adoption application" });

  $("#adoptForm", modal).addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, err = $("#adoptErr", modal);
    if (!f.name.value.trim()) return (err.textContent = "Please enter your name.");
    if (!isEmail(f.email.value)) return (err.textContent = "Please enter a valid email address.");
    if (!f.age18.checked || !f.terms.checked) return (err.textContent = "Please confirm your age and accept the Terms & Conditions.");
    const apps = store.get("applications", []);
    apps.unshift({ id: uid("A"), petId: p.id, petName: p.name, shelter: s.name, applicant: f.name.value.trim(), created: new Date().toISOString(), status: "Submitted" });
    store.set("applications", apps);
    document.dispatchEvent(new CustomEvent("pawly:applications"));
    modal.innerHTML = `<button class="modal-close" data-close aria-label="Close">${ICON.close}</button>
      <div class="success-box"><div class="big">🐾</div><h2>Application sent!</h2>
      <p>${esc(s.name)} will review your application for ${esc(p.name)} and reach out within 2–3 business days.</p>
      <div class="modal-actions" style="justify-content:center"><a class="btn" href="favorites.html#applications">View my applications</a><button class="btn ghost" data-close>Keep browsing</button></div></div>`;
  });
}

function openProduct(id) {
  const p = findProduct(id); if (!p) return;
  const cat = PRODUCT_CATEGORIES.find(c => c.id === p.cat) || { name: "" };
  const isFood = p.cat === "food";
  const modal = openModal(`<div class="modal-split">
    <div class="m-media"><img src="${img(p.img, 1000)}" alt="${esc(p.name)}"></div>
    <div class="modal-body">
      <div class="kicker">${esc(p.brand)} · ${esc(cat.name)}</div>
      <h2 style="font-size:28px">${esc(p.name)}</h2>
      ${stars(p.rating, p.reviews)}
      <div class="price" style="font-size:26px">${money(p.price)}${p.was ? `<s>${money(p.was)}</s>` : ""}</div>
      <p style="margin:0">${esc(p.desc)}</p>
      ${p.features ? `<ul class="traits">${p.features.map(f => `<li><span class="yes">✓</span>${esc(f)}</li>`).join("")}</ul>` : ""}
      ${p.plan ? `<div class="demo-note">📡 Live tracking needs a ${esc(p.brand)} service plan from <b>${money(p.plan)}/month</b>, billed by the device maker.</div>` : ""}
      <div class="tags"><span class="tag">For ${p.pet === "both" ? "dogs & cats" : p.pet + "s"}</span><span class="tag">${esc(p.life)}</span>${p.foodType ? `<span class="tag">${esc(p.foodType)}</span>` : ""}</div>
      ${isFood ? `<div style="display:grid;gap:8px">
        <label class="option-card"><input type="radio" name="buy" value="" checked><div><b>One-time purchase</b><span>${money(p.price)}</span></div></label>
        <label class="option-card"><input type="radio" name="buy" value="sub"><div><b>Subscribe & save 10% — ${money(p.price * (1 - SUB_DISCOUNT))}</b>
          <span>Deliver every <select id="subEvery" style="font:inherit;border:1px solid var(--line);border-radius:8px;padding:2px 6px"><option value="2">2 weeks</option><option value="4" selected>4 weeks</option><option value="6">6 weeks</option></select> · skip or cancel anytime</span></div></label>
      </div>` : ""}
      <div class="modal-actions" style="align-items:center">
        <div class="qty"><button type="button" data-q="-1" aria-label="Decrease quantity">−</button><span id="qtyVal">1</span><button type="button" data-q="1" aria-label="Increase quantity">+</button></div>
        <button class="btn" id="addFromModal">${ICON.cart} Add to cart</button>
        <button class="btn ghost" data-fav="product:${p.id}" data-fav-text="1">${favs.has("product:" + p.id) ? "♥ Saved" : "♡ Save to favorites"}</button>
      </div>
    </div></div>`, { label: p.name });

  let qty = 1;
  $$("[data-q]", modal).forEach(b => b.addEventListener("click", () => {
    qty = Math.max(1, Math.min(20, qty + Number(b.dataset.q)));
    $("#qtyVal", modal).textContent = qty;
  }));
  $("#addFromModal", modal).addEventListener("click", () => {
    const subChosen = isFood && $("input[name=buy]:checked", modal).value === "sub";
    const sub = subChosen ? $("#subEvery", modal).value : "";
    cart.add(p.id, qty, sub);
    closeModal();
    toast(`Added ${qty} × ${p.name.length > 38 ? p.name.slice(0, 38) + "…" : p.name} to your cart`);
  });
}

function timeSlots() {
  const slots = [];
  for (let h = 8; h <= 17; h++) for (const m of ["00", "30"]) {
    if (h === 17 && m === "30") continue;
    const hr = h > 12 ? h - 12 : h;
    slots.push(`${hr}:${m} ${h >= 12 ? "PM" : "AM"}`);
  }
  return slots;
}

function openBooking(providerId, serviceIndex = 0) {
  const p = findProvider(providerId); if (!p) return;
  const type = SERVICE_TYPES.find(t => t.id === p.type);
  const modes = providerModes(p);
  const modal = openModal(`<div class="modal-body">
    <div class="kicker">${type.icon} Book ${esc(type.name.toLowerCase())}</div>
    <h2 style="font-size:28px">${esc(p.name)}</h2>
    <div class="loc muted" style="display:flex;gap:6px;align-items:center;font-size:14px">${esc(p.city)}, ${esc(p.state)} · ${esc(p.hours)} · ${stars(p.rating, p.reviews)}</div>
    <p class="muted" style="margin:0">${esc(p.about)}</p>
    <form id="bookForm" class="form-grid" novalidate>
      <label class="field full"><span>Service</span><select name="service">${p.services.map((s, i) => `<option value="${i}" ${i === serviceIndex ? "selected" : ""}>${esc(s[0])} — ${money(s[1]).replace(".00", "")}</option>`).join("")}</select></label>
      ${modes.length > 1
        ? `<label class="field full"><span>Where should the service happen?</span><select name="mode">${modes.map(m => `<option value="${m}">${SERVICE_MODES[m].icon} ${m === "home" ? "At my home — the provider comes to me" : "At " + esc(p.name) + " — I bring my pet"}</option>`).join("")}</select></label>`
        : `<input type="hidden" name="mode" value="${modes[0]}"><p class="form-note full" style="margin:0">${SERVICE_MODES[modes[0]].icon} ${modes[0] === "home" ? "This provider comes to your home. Enter the address below." : `You bring your pet to ${esc(p.name)} in ${esc(p.city)}.`}</p>`}
      <label class="field full" id="addrField"><span>Your address (the provider comes here)</span><input name="address" autocomplete="street-address" placeholder="Street, city and ZIP"></label>
      <label class="field"><span>Pet's name</span><input name="pet" required placeholder="e.g. Biscuit"></label>
      <label class="field"><span>Pet type</span><select name="petType"><option>Dog</option><option>Cat</option></select></label>
      <label class="field"><span>Date</span><input name="date" type="date" required min="${todayISO()}"></label>
      <label class="field"><span>Time</span><select name="time">${timeSlots().map(t => `<option>${t}</option>`).join("")}</select></label>
      <label class="field"><span>Your name</span><input name="owner" required autocomplete="name"></label>
      <label class="field"><span>Email</span><input name="email" type="email" required autocomplete="email"></label>
      <label class="field full"><span>Notes for the provider (optional)</span><textarea name="notes" placeholder="Allergies, behavior notes, vaccination history…"></textarea></label>
      ${p.type === "daycare" ? `<p class="form-note full" style="margin:0">Most daycares require proof of Rabies, DHPP and Bordetella vaccination for dogs, or Rabies and FVRCP for cats.</p>` : ""}
      ${p.type === "vet" ? `<p class="form-note full" style="margin:0">🚨 Online booking is for non-urgent visits. In an emergency, call the clinic or your nearest emergency animal hospital right away.</p>` : ""}
      ${p.type === "training" ? `<p class="form-note full" style="margin:0">Group classes usually require up-to-date vaccinations. Puppies can start socialization classes after their first set of shots.</p>` : ""}
      <label class="check full"><input type="checkbox" name="terms" required> I agree to the <a href="terms.html#bookings" target="_blank">booking &amp; cancellation terms</a>.</label>
      <div class="error-text full" id="bookErr"></div>
      <div class="full modal-actions"><button class="btn" type="submit">Request appointment</button><button class="btn ghost" type="button" data-close>Cancel</button></div>
    </form></div>`, { narrow: true, label: `Book ${p.name}` });

  const bf = $("#bookForm", modal);
  const syncMode = () => { $("#addrField", modal).hidden = bf.mode.value !== "home"; };
  bf.mode.addEventListener("change", syncMode); syncMode();

  bf.addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, err = $("#bookErr", modal);
    const atHome = f.mode.value === "home";
    if (atHome && f.address.value.trim().length < 8) return (err.textContent = "Please enter the full address where the provider should come.");
    if (!f.pet.value.trim()) return (err.textContent = "Please enter your pet's name.");
    if (!f.date.value || f.date.value < todayISO()) return (err.textContent = "Please choose today or a future date.");
    if (!f.owner.value.trim()) return (err.textContent = "Please enter your name.");
    if (!isEmail(f.email.value)) return (err.textContent = "Please enter a valid email address.");
    if (!f.terms.checked) return (err.textContent = "Please accept the booking terms to continue.");
    const svc = p.services[Number(f.service.value)];
    const bookings = store.get("bookings", []);
    const booking = { id: uid("B"), providerId: p.id, provider: p.name, type: p.type, service: svc[0], price: svc[1], pet: f.pet.value.trim(), petType: f.petType.value, date: f.date.value, time: f.time.value, mode: f.mode.value, address: atHome ? f.address.value.trim() : "", created: new Date().toISOString(), status: "Requested" };
    bookings.unshift(booking);
    store.set("bookings", bookings);
    document.dispatchEvent(new CustomEvent("pawly:bookings"));
    modal.innerHTML = `<button class="modal-close" data-close aria-label="Close">${ICON.close}</button>
      <div class="success-box"><div class="big">📅</div><h2>Appointment requested</h2>
      <p><b>${esc(svc[0])}</b> for ${esc(booking.pet)} with ${esc(p.name)}<br>${prettyDate(booking.date)} at ${esc(booking.time)}<br>${atHome ? `🚐 At your home: ${esc(booking.address)}` : `📍 At ${esc(p.name)}, ${esc(p.city)}`}</p>
      <p style="font-size:14px">The provider will confirm by email. You can cancel free of charge up to 24 hours before your appointment.</p>
      <div class="modal-actions" style="justify-content:center"><a class="btn" href="favorites.html#bookings">View my bookings</a><button class="btn ghost" data-close>Done</button></div></div>`;
  });
}

function openGuide(id) {
  const g = findGuide(id); if (!g) return;
  const related = GUIDES.filter(x => x.id !== g.id && x.cat === g.cat).slice(0, 2);
  openModal(`<article class="article">
    <img class="cover" src="${img(g.img, 1400)}" alt="">
    <div class="inner">
      <div class="guide-type">${esc(g.cat)} · ${g.mins} min read</div>
      <h2>${esc(g.title)}</h2>
      ${g.body}
      ${related.length ? `<h3>Keep reading</h3><div style="display:grid;gap:8px">${related.map(r => `<button class="link-btn" style="text-align:left" data-open-guide="${r.id}">→ ${esc(r.title)}</button>`).join("")}</div>` : ""}
    </div></article>`, { label: g.title });
  if (history.replaceState && document.body.dataset.page === "care") history.replaceState(null, "", "#" + g.id);
}

/* ---------- Global click delegation ---------- */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-fav],[data-add-cart],[data-open-pet],[data-open-product],[data-book],[data-adopt],[data-open-guide]");
  if (!t) return;
  if (t.dataset.fav) {
    e.preventDefault();
    const added = favs.toggle(t.dataset.fav);
    toast(added ? "Saved to your favorites ♥" : "Removed from favorites");
  } else if (t.dataset.addCart) {
    const p = findProduct(t.dataset.addCart);
    if (p.cat === "food" || p.plan) { openProduct(p.id); return; }
    cart.add(p.id, 1);
    toast(`Added to cart: ${p.name}`);
  } else if (t.dataset.openPet) openPet(t.dataset.openPet);
  else if (t.dataset.openProduct) openProduct(t.dataset.openProduct);
  else if (t.dataset.book) openBooking(t.dataset.book, Number(t.dataset.service || 0));
  else if (t.dataset.adopt) openAdoptForm(t.dataset.adopt);
  else if (t.dataset.openGuide) { e.preventDefault(); openGuide(t.dataset.openGuide); }
});
// Keyboard support for clickable image areas
document.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches(".media[role=button]")) { e.preventDefault(); e.target.click(); }
});

/* ---------- Header & footer ---------- */
function renderHeader() {
  const page = document.body.dataset.page || "";
  const li = (key, label, href, drop) => drop
    ? `<li class="has-drop${page === key ? " active" : ""}"><a class="top" href="${href}" aria-haspopup="true">${label} ${ICON.chevron}</a><div class="drop">${drop}</div></li>`
    : `<li class="${page === key ? "active" : ""}"><a class="top" href="${href}">${label}</a></li>`;
  const d = (href, ico, title, sub) => `<a href="${href}"><span class="ico">${ico}</span><span>${title}<small>${sub}</small></span></a>`;

  const header = document.createElement("header");
  header.className = "site";
  header.innerHTML = `<div class="container nav">
    <a class="logo" href="index.html"><span class="logo-mark">${ICON.paw}</span><span>Pawly</span></a>
    <nav class="main-nav" id="mainNav" aria-label="Main">
      <ul>
        ${li("adopt", "Adopt", "adopt.html",
          d("adopt.html?type=dog", "🐶", "Dogs & Puppies", "Browse adoptable dogs") +
          d("adopt.html?type=cat", "🐱", "Cats & Kittens", "Browse adoptable cats") +
          d("breeds.html", "📖", "Breed Guide", "Explore dog & cat breeds") +
          d("adopt.html#shelters", "🏡", "Shelters & Rescues", "Partner organizations"))}
        ${li("shop", "Shop", "shop.html",
          PRODUCT_CATEGORIES.map(c => d(`shop.html?cat=${c.id}`, c.icon, c.name, c.blurb.split(".")[0])).join("") +
          d("shop.html", "🛍️", "All products", "The full marketplace"))}
        ${li("services", "Services", "services.html",
          SERVICE_TYPES.map(s => d(`services.html?type=${s.id}`, s.icon, s.name, s.blurb.split(".")[0])).join(""))}
        ${li("care", "Pet Care", "care.html")}
        ${li("sell", "Sell on Pawly", "sell.html")}
      </ul>
    </nav>
    <div class="nav-actions">
      <a class="icon-btn" href="favorites.html" aria-label="Favorites">${ICON.heartOutline}<span class="badge-count" data-badge="favs" data-n="0">0</span></a>
      <a class="icon-btn" href="cart.html" aria-label="Shopping cart">${ICON.cart}<span class="badge-count" data-badge="cart" data-n="0">0</span></a>
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav">${ICON.menu}</button>
    </div>
  </div>`;
  document.body.prepend(header);

  const nav = $("#mainNav"), btn = $("#menuBtn");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.innerHTML = open ? ICON.close : ICON.menu;
  });
}

function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "site";
  footer.innerHTML = `<div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo"><span class="logo-mark">${ICON.paw}</span> Pawly</div>
        <p>One place to adopt a pet, shop for food and supplies, and book trusted vet care, grooming, daycare, training and vaccination services.</p>
        <form class="newsletter" id="newsletter" novalidate>
          <input type="email" placeholder="Your email address" aria-label="Email address">
          <button class="btn sm" type="submit">Subscribe</button>
        </form>
      </div>
      <div><h5>Adopt</h5><div class="footer-links">
        <a href="adopt.html?type=dog">Dogs & Puppies</a><a href="adopt.html?type=cat">Cats & Kittens</a><a href="breeds.html">Breed Guide</a><a href="adopt.html#shelters">Shelters & Rescues</a><a href="care.html">Pet Care Guides</a></div></div>
      <div><h5>Shop</h5><div class="footer-links">
        ${PRODUCT_CATEGORIES.map(c => `<a href="shop.html?cat=${c.id}">${c.name}</a>`).join("")}</div></div>
      <div><h5>Services</h5><div class="footer-links">
        ${SERVICE_TYPES.map(s => `<a href="services.html?type=${s.id}">${s.name}</a>`).join("")}<a href="sell.html">List your business</a></div></div>
      <div><h5>Company</h5><div class="footer-links">
        <a href="about.html">About Us</a><a href="about.html#contact">Contact Us</a><a href="terms.html">Terms & Conditions</a><a href="privacy.html">Privacy Policy</a></div></div>
    </div>
    <div class="copyright"><span>© ${new Date().getFullYear()} Pawly. Built by Yash and Uday.</span><span><a href="terms.html">Terms & Conditions</a> · <a href="privacy.html">Privacy Policy</a></span></div>
  </div>`;
  document.body.appendChild(footer);

  $("#newsletter").addEventListener("submit", e => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    if (!isEmail(input.value)) { toast("Please enter a valid email address."); input.focus(); return; }
    input.value = "";
    toast("Thanks for subscribing! 🐾");
  });
}

renderHeader();
renderFooter();
updateBadges();
