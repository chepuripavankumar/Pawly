/* Breed Discovery page */
(function () {
  const q = params();
  const state = { type: ["dog", "cat"].includes(q.get("type")) ? q.get("type") : "", size: "", good: "", search: "" };

  const GOOD = {
    apartment: b => b.energy <= 3,
    kids: b => b.kids >= 5,
    active: b => b.energy >= 5,
    lowshed: b => b.shedding <= 2,
    easygroom: b => b.grooming <= 2
  };
  const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const adoptable = b => PETS.filter(p => p.type === b.type && p.breed.includes(b.name));
  const adoptHref = b => `adopt.html?type=${b.type}&q=${encodeURIComponent(b.name)}`;

  function meter(label, value) {
    return `<div class="meter"><span>${label}</span><span class="dots" aria-label="${label}: ${value} out of 5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= value ? "on" : ""}"></i>`).join("")}</span></div>`;
  }

  function card(b) {
    const n = adoptable(b).length;
    return `<article class="card breed">
      <span class="ribbon">${b.type === "dog" ? "🐶 Dog" : "🐱 Cat"}</span>
      <div class="media" data-breed="${slug(b.name)}" role="button" tabindex="0" aria-label="About the ${esc(b.name)}">
        <img src="${img(b.img, 700)}" alt="${esc(b.name)}" loading="lazy">
      </div>
      <div class="body">
        <h3><button class="title-btn" data-breed="${slug(b.name)}">${esc(b.name)}</button></h3>
        <div class="tags"><span class="tag">${esc(b.size)}</span><span class="tag">${esc(b.life)}</span></div>
        ${meter("Energy", b.energy)}${meter("Grooming", b.grooming)}${meter("Kid-friendly", b.kids)}
        <div class="foot">
          ${n ? `<a class="link-btn" href="${adoptHref(b)}">${n} adoptable →</a>` : `<span class="meta">None available right now</span>`}
          <button class="btn sm ghost" data-breed="${slug(b.name)}">Details</button>
        </div>
      </div>
    </article>`;
  }

  function openBreed(b) {
    const pets = adoptable(b);
    openModal(`<div class="modal-split">
      <div class="m-media"><img src="${img(b.img, 1000)}" alt="${esc(b.name)}"></div>
      <div class="modal-body">
        <div class="kicker">${b.type === "dog" ? "Dog breed" : "Cat breed"} · ${esc(b.temperament)}</div>
        <h2>${esc(b.name)}</h2>
        <p style="margin:0">${esc(b.about)}</p>
        <div class="facts">
          <div class="fact"><small>Size</small><b>${esc(b.size)}</b></div>
          <div class="fact"><small>Weight</small><b>${esc(b.weight)}</b></div>
          <div class="fact"><small>Life expectancy</small><b>${esc(b.life)}</b></div>
          <div class="fact"><small>Shedding</small><b>${["", "Very low", "Low", "Moderate", "High", "Very high"][b.shedding]}</b></div>
        </div>
        <div style="display:grid;gap:6px">${meter("Energy", b.energy)}${meter("Grooming needs", b.grooming)}${meter("Kid-friendly", b.kids)}</div>
        <div class="callout" style="margin:0">💡 ${esc(b.tip)}</div>
        <div class="modal-actions">
          ${pets.length ? `<a class="btn" href="${adoptHref(b)}">Meet ${pets.length} adoptable ${esc(b.name)}${pets.length === 1 ? "" : "s"}</a>`
            : `<a class="btn" href="adopt.html?type=${b.type}">Browse all adoptable ${b.type}s</a>`}
          <a class="btn ghost" href="shop.html?pet=${b.type}">Shop for ${b.type}s</a>
        </div>
      </div></div>`, { label: b.name });
    history.replaceState(null, "", location.pathname.split("/").pop() + location.search + "#" + slug(b.name));
  }

  function render() {
    const s = state.search.trim().toLowerCase();
    const list = BREEDS.filter(b => (!state.type || b.type === state.type)
      && (!state.size || b.size === state.size)
      && (!state.good || GOOD[state.good](b))
      && (!s || (b.name + " " + b.temperament).toLowerCase().includes(s)));
    $$("#typeChips .chip").forEach(c => c.classList.toggle("active", c.dataset.type === state.type));
    $("#breedTitle").textContent = state.type === "dog" ? "Dog Breed Guide" : state.type === "cat" ? "Cat Breed Guide" : "Discover Your Pawly";
    $("#count").textContent = `${list.length} breed${list.length === 1 ? "" : "s"}`;
    $("#grid").innerHTML = list.length ? list.map(card).join("")
      : `<div style="grid-column:1/-1">${emptyState("🔍", "No breeds match", "Try a different size or remove a filter.", "", "")}</div>`;
    history.replaceState(null, "", "breeds.html" + (state.type ? "?type=" + state.type : "") + location.hash);
  }

  $("#typeChips").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) { state.type = c.dataset.type; render(); } });
  $("#fSize").addEventListener("change", e => { state.size = e.target.value; render(); });
  $("#fGood").addEventListener("change", e => { state.good = e.target.value; render(); });
  $("#fSearch").addEventListener("input", e => { state.search = e.target.value; render(); });
  $("#grid").addEventListener("click", e => {
    const t = e.target.closest("[data-breed]"); if (!t) return;
    const b = BREEDS.find(x => slug(x.name) === t.dataset.breed);
    if (b) openBreed(b);
  });

  render();
  const fromHash = BREEDS.find(b => slug(b.name) === location.hash.slice(1));
  if (fromHash) openBreed(fromHash);
})();
