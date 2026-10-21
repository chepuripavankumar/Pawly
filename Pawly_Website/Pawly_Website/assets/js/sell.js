/* Seller / Business Listings page */
(function () {
  const form = $("#listingForm");
  let kind = "product";

  STATES.forEach(s => form.state.insertAdjacentHTML("beforeend", `<option>${s}</option>`));

  function setKind(k) {
    kind = k;
    $$("#kindChips .chip").forEach(c => c.classList.toggle("active", c.dataset.kind === k));
    const opts = k === "product" ? PRODUCT_CATEGORIES : SERVICE_TYPES;
    $("#categorySel").innerHTML = opts.map(o => `<option value="${o.id}">${o.icon} ${o.name}</option>`).join("");
    $("#titleLbl").textContent = k === "product" ? "Product name" : "Service name";
    form.title.placeholder = k === "product" ? "e.g. Organic Peanut Butter Dog Biscuits" : "e.g. Full groom with blueberry facial";
    $("#priceLbl").textContent = k === "product" ? "Price (USD)" : "Starting price (USD)";
    $("#petField").hidden = k !== "product";
    $("#cityField").hidden = k !== "service";
    $("#stateField").hidden = k !== "service";
    $("#modeField").hidden = k !== "service";
  }
  $("#kindChips").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) setKind(c.dataset.kind); });

  // Plan buttons pre-select the plan
  $$("[data-plan]").forEach(a => a.addEventListener("click", () => { $("#planSel").value = a.dataset.plan; }));

  function renderMine() {
    const list = userListings();
    $("#myListings").innerHTML = list.length ? list.map(l => {
      const href = l.kind === "product" ? `shop.html?cat=${l.category}&product=${l.id}` : `services.html?type=${l.category}&book=${l.id}`;
      return `<div class="my-listing">
        <img src="${img(l.image || DEFAULT_LISTING_IMG[l.category], 200)}" alt="">
        <div class="grow"><b>${esc(l.title)}</b><span class="muted" style="font-size:13px">${esc(l.business)} · ${money(l.price)} · ${esc(l.plan)} plan</span>
          <div style="display:flex;gap:14px;margin-top:4px"><a class="link-btn" href="${href}">View live →</a><button class="remove" data-del="${l.id}">Delete</button></div></div>
      </div>`;
    }).join("") : `<p class="muted" style="margin:0">You haven't published anything yet. Listings you create appear here and in the Shop or Services pages.</p>`;
  }
  $("#myListings").addEventListener("click", e => {
    const b = e.target.closest("[data-del]"); if (!b) return;
    store.set("listings", userListings().filter(l => l.id !== b.dataset.del));
    renderMine(); toast("Listing deleted");
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const err = $("#listErr");
    const price = Number(form.price.value);
    const image = form.image.value.trim();
    if (!form.business.value.trim()) return (err.textContent = "Please enter your business name.");
    if (!isEmail(form.email.value)) return (err.textContent = "Please enter a valid business email.");
    if (!form.title.value.trim()) return (err.textContent = `Please enter a ${kind} name.`);
    if (!(price > 0)) return (err.textContent = "Please enter a price greater than $0.");
    if (kind === "service" && !form.city.value.trim()) return (err.textContent = "Please enter the city where you offer this service.");
    if (image && !/^https:\/\/\S+$/i.test(image)) return (err.textContent = "Image URL must start with https://");
    if (!form.description.value.trim()) return (err.textContent = "Please add a short description.");
    if (!form.terms.checked) return (err.textContent = "Please accept the Seller Terms to publish.");
    err.textContent = "";

    const listing = {
      id: uid("L"), kind, business: form.business.value.trim(), email: form.email.value.trim(),
      category: form.category.value, title: form.title.value.trim(), price: Math.round(price * 100) / 100,
      pet: kind === "product" ? form.pet.value : "both", city: form.city.value.trim(), state: form.state.value,
      mode: kind === "service" ? form.mode.value : undefined,
      plan: form.plan.value, image, description: form.description.value.trim(), created: new Date().toISOString()
    };
    store.set("listings", [listing, ...userListings()]);
    form.reset(); setKind(kind);
    renderMine();
    toast("Listing published! 🎉");
  });

  setKind("product");
  renderMine();
})();
