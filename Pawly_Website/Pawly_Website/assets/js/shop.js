/* Pet Marketplace page */
(function () {
  const q = params();
  const validCat = id => PRODUCT_CATEGORIES.some(c => c.id === id);
  const state = {
    cat: validCat(q.get("cat")) ? q.get("cat") : "",
    pet: ["dog", "cat"].includes(q.get("pet")) ? q.get("pet") : "",
    foodTypes: [], lifes: [], brands: [], maxPrice: 150, sale: false, search: q.get("q") || "", sort: "featured"
  };

  const BANNERS = {
    food: `<div class="info-banner"><div class="ico">🔁</div><div><h3>Subscribe & save 10% on food</h3>
      <p>Choose delivery every 2, 4 or 6 weeks. Skip, change or cancel anytime — no fees.</p></div>
      <button class="btn sm" data-open-product="p1">Try it</button></div>`,
    gps: `<div class="info-banner peach"><div class="ico">📍</div><div><h3>How GPS dog belts work</h3>
      <p>The belt or tag uses GPS and cellular data to send your dog's live location to your phone. Most trackers need a small monthly plan from the device maker — shown on each product.</p></div>
      <a class="btn sm" href="care.html#road-trip-with-dog">Travel tips</a></div>`
  };

  // Category chips
  $("#catChips").innerHTML = `<button class="chip" data-cat="">🛍️ All products</button>` +
    PRODUCT_CATEGORIES.map(c => `<button class="chip" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join("");

  function inScope() {
    return allProducts().filter(p => (!state.cat || p.cat === state.cat) && (!state.pet || p.pet === state.pet || p.pet === "both"));
  }

  function renderBrands() {
    const brands = [...new Set(inScope().map(p => p.brand))].sort();
    state.brands = state.brands.filter(b => brands.includes(b));
    $("#fBrand").innerHTML = brands.map(b => {
      const n = inScope().filter(p => p.brand === b).length;
      return `<label class="check"><input type="checkbox" value="${esc(b)}" ${state.brands.includes(b) ? "checked" : ""}> ${esc(b)} <span class="muted">(${n})</span></label>`;
    }).join("");
  }

  function syncControls() {
    const cat = PRODUCT_CATEGORIES.find(c => c.id === state.cat);
    $$("#catChips .chip").forEach(c => c.classList.toggle("active", c.dataset.cat === state.cat));
    $$("#petChips .chip").forEach(c => c.classList.toggle("active", c.dataset.pet === state.pet));
    $("#foodTypeGroup").hidden = !(state.cat === "" || state.cat === "food");
    $("#shopTitle").textContent = cat ? cat.name : "Pet Marketplace";
    $("#shopSub").textContent = cat ? cat.blurb + " Free shipping on orders over $49." : "Food, toys, beds, collars and GPS dog belts from trusted brands and independent sellers. Free shipping on orders over $49.";
    $("#crumbCat").textContent = cat ? " / " + cat.name : "";
    document.title = (cat ? cat.name : "Pet Marketplace") + " | Pawly";
    $("#catBanner").innerHTML = BANNERS[state.cat] || "";
    $("#fSearch").value = state.search;
    $("#fPrice").value = state.maxPrice;
    $("#priceLabel").textContent = "$" + state.maxPrice;
    $("#fSale").checked = state.sale;
    $("#fSort").value = state.sort;
    $$("#fFoodType input").forEach(i => (i.checked = state.foodTypes.includes(i.value)));
    $$("#fLife input").forEach(i => (i.checked = state.lifes.includes(i.value)));
    renderBrands();
  }

  function render() {
    const s = state.search.trim().toLowerCase();
    let list = inScope().filter(p =>
      (!state.foodTypes.length || (p.foodType && state.foodTypes.includes(p.foodType)))
      && (!state.lifes.length || state.lifes.includes(p.life))
      && (!state.brands.length || state.brands.includes(p.brand))
      && p.price <= state.maxPrice
      && (!state.sale || p.was)
      && (!s || (p.name + " " + p.brand + " " + (p.desc || "")).toLowerCase().includes(s)));

    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    else if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    else if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);

    $("#count").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    $("#grid").innerHTML = list.length ? list.map(productCard).join("")
      : `<div style="grid-column:1/-1">${emptyState("🛍️", "No products match", "Try another category or clear some filters.", "", "")}</div>`;

    const url = new URLSearchParams();
    if (state.cat) url.set("cat", state.cat);
    if (state.pet) url.set("pet", state.pet);
    history.replaceState(null, "", "shop.html" + (url.toString() ? "?" + url : ""));
  }

  // Events
  $("#catChips").addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    state.cat = c.dataset.cat; state.foodTypes = [];
    syncControls(); render();
  });
  $("#petChips").addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    state.pet = c.dataset.pet; syncControls(); render();
  });
  $("#fFoodType").addEventListener("change", () => { state.foodTypes = $$("#fFoodType input:checked").map(i => i.value); render(); });
  $("#fLife").addEventListener("change", () => { state.lifes = $$("#fLife input:checked").map(i => i.value); render(); });
  $("#fBrand").addEventListener("change", () => { state.brands = $$("#fBrand input:checked").map(i => i.value); render(); });
  $("#fPrice").addEventListener("input", e => { state.maxPrice = Number(e.target.value); $("#priceLabel").textContent = "$" + state.maxPrice; render(); });
  $("#fSale").addEventListener("change", e => { state.sale = e.target.checked; render(); });
  $("#fSearch").addEventListener("input", e => { state.search = e.target.value; render(); });
  $("#fSort").addEventListener("change", e => { state.sort = e.target.value; render(); });
  $("#resetFilters").addEventListener("click", () => {
    Object.assign(state, { pet: "", foodTypes: [], lifes: [], brands: [], maxPrice: 150, sale: false, search: "" });
    syncControls(); render();
  });
  $("#filterToggle").addEventListener("click", e => {
    const open = $("#filters").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });

  syncControls();
  render();
  if (q.get("product")) openProduct(q.get("product"));
})();
