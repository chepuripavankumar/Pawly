/* Pet Adoption page */
(function () {
  const q = params();
  const state = {
    type: q.get("type") || "",
    state: q.get("state") || "",
    shelter: q.get("shelter") || "",
    breed: q.get("breed") || "",
    gender: q.get("gender") || "",
    ages: q.get("age") ? [q.get("age")] : [],
    sizes: [],
    traits: [],
    search: q.get("q") || "",
    sort: "new"
  };

  // Populate selects
  STATES.forEach(s => $("#fState").insertAdjacentHTML("beforeend", `<option>${s}</option>`));
  SHELTERS.forEach(s => $("#fShelter").insertAdjacentHTML("beforeend", `<option value="${s.id}">${esc(s.name)}</option>`));

  function fillBreeds() {
    const breeds = [...new Set(PETS.filter(p => !state.type || p.type === state.type).map(p => p.breed))].sort();
    if (!breeds.includes(state.breed)) state.breed = "";
    $("#fBreed").innerHTML = `<option value="">Any breed</option>` + breeds.map(b => `<option ${b === state.breed ? "selected" : ""}>${esc(b)}</option>`).join("");
  }

  function syncControls() {
    $$("#typeChips .chip").forEach(c => c.classList.toggle("active", c.dataset.type === state.type));
    $("#fState").value = state.state;
    $("#fShelter").value = state.shelter;
    $("#fGender").value = state.gender;
    $$("#fAge input").forEach(i => (i.checked = state.ages.includes(i.value)));
    $$("#fSize input").forEach(i => (i.checked = state.sizes.includes(i.value)));
    $$("#fTraits input").forEach(i => (i.checked = state.traits.includes(i.value)));
    $("#fSearch").value = state.search;
    $("#fSort").value = state.sort;
    fillBreeds();
  }

  function filtered() {
    const s = state.search.trim().toLowerCase();
    let list = PETS.filter(p => {
      const shelter = findShelter(p.shelter);
      return (!state.type || p.type === state.type)
        && (!state.state || shelter.state === state.state)
        && (!state.shelter || p.shelter === state.shelter)
        && (!state.breed || p.breed === state.breed)
        && (!state.gender || p.gender === state.gender)
        && (!state.ages.length || state.ages.includes(p.age))
        && (!state.sizes.length || state.sizes.includes(p.size))
        && state.traits.every(t => p.traits[Number(t)])
        && (!s || p.name.toLowerCase().includes(s) || p.breed.toLowerCase().includes(s));
    });
    if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (state.sort === "fee") list.sort((a, b) => a.fee - b.fee);
    else list.sort((a, b) => a.added - b.added || a.type.localeCompare(b.type));
    return list;
  }

  function render() {
    const list = filtered();
    const noun = state.type === "dog" ? "dog" : state.type === "cat" ? "cat" : "pet";
    $("#count").textContent = `${list.length} ${noun}${list.length === 1 ? "" : "s"} found`;
    $("#adoptTitle").textContent = state.type === "dog" ? "Adopt a Dog or Puppy" : state.type === "cat" ? "Adopt a Cat or Kitten" : "Adopt a Pet";
    $("#grid").innerHTML = list.length ? list.map(petCard).join("")
      : `<div style="grid-column:1/-1">${emptyState("🔍", "No pets match those filters", "Try removing a filter or searching a nearby state.", "", "")}</div>`;

    // Keep the URL shareable
    const url = new URLSearchParams();
    if (state.type) url.set("type", state.type);
    if (state.state) url.set("state", state.state);
    if (state.shelter) url.set("shelter", state.shelter);
    if (state.breed) url.set("breed", state.breed);
    if (state.gender) url.set("gender", state.gender);
    if (state.ages.length === 1) url.set("age", state.ages[0]);
    history.replaceState(null, "", "adopt.html" + (url.toString() ? "?" + url : "") + location.hash);
  }

  // Events
  $("#typeChips").addEventListener("click", e => {
    const chip = e.target.closest(".chip"); if (!chip) return;
    state.type = chip.dataset.type; syncControls(); render();
  });
  $("#fState").addEventListener("change", e => { state.state = e.target.value; render(); });
  $("#fShelter").addEventListener("change", e => { state.shelter = e.target.value; render(); });
  $("#fBreed").addEventListener("change", e => { state.breed = e.target.value; render(); });
  $("#fGender").addEventListener("change", e => { state.gender = e.target.value; render(); });
  const checks = (sel, key) => $(sel).addEventListener("change", () => { state[key] = $$(sel + " input:checked").map(i => i.value); render(); });
  checks("#fAge", "ages"); checks("#fSize", "sizes"); checks("#fTraits", "traits");
  $("#fSearch").addEventListener("input", e => { state.search = e.target.value; render(); });
  $("#fSort").addEventListener("change", e => { state.sort = e.target.value; render(); });
  $("#resetFilters").addEventListener("click", () => {
    Object.assign(state, { type: "", state: "", shelter: "", breed: "", gender: "", ages: [], sizes: [], traits: [], search: "" });
    syncControls(); render();
  });
  $("#filterToggle").addEventListener("click", e => {
    const open = $("#filters").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });

  // Shelters
  $("#shelterGrid").innerHTML = SHELTERS.map(s => {
    const n = PETS.filter(p => p.shelter === s.id).length;
    return `<div class="shelter"><div class="avatar">${s.icon}</div><div style="flex:1">
      <h4>${esc(s.name)}</h4><p>${esc(s.city)}, ${esc(s.state)} · ${esc(s.phone)}</p>
      <p style="margin-top:8px"><button class="link-btn" data-shelter="${s.id}">View ${n} pet${n === 1 ? "" : "s"} →</button></p></div></div>`;
  }).join("");
  $("#shelterGrid").addEventListener("click", e => {
    const b = e.target.closest("[data-shelter]"); if (!b) return;
    Object.assign(state, { type: "", state: "", breed: "", shelter: b.dataset.shelter });
    syncControls(); render();
    window.scrollTo({ top: $(".listing").offsetTop - 90, behavior: "smooth" });
  });

  syncControls();
  render();
  if (location.hash === "#shelters") $("#shelters").scrollIntoView();
  if (q.get("pet")) openPet(q.get("pet"));
})();
