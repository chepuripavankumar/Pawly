/* Services page — Vaccination, Grooming, Daycare */
(function () {
  const q = params();
  const validType = t => SERVICE_TYPES.some(s => s.id === t);
  const state = { type: validType(q.get("type")) ? q.get("type") : "", mode: SERVICE_MODES[q.get("mode")] ? q.get("mode") : "", st: "", pets: "", search: "", sort: "rating" };

  const BANNERS = {
    vaccination: `<div class="info-banner"><div class="ico">💉</div><div><h3>Keep vaccines on schedule</h3>
      <p>Rabies vaccination is required by law in most US states. Puppies and kittens need a series of boosters until about 16 weeks.</p></div>
      <a class="btn sm" href="#schedule">See the schedule</a></div>`,
    grooming: `<div class="info-banner"><div class="ico">✂️</div><div><h3>First groom?</h3>
      <p>Puppies can have a gentle intro groom from about 12–16 weeks, once their first vaccines are done. Nervous pets often do better with a mobile groomer who comes to your home.</p></div>
      <button class="btn sm" data-open-guide="grooming-at-home">Grooming guide</button></div>`,
    vet: `<div class="info-banner peach"><div class="ico">🩺</div><div><h3>Non-urgent visits only</h3>
      <p>Book wellness exams, sick visits and dental care here. If your pet has an emergency, call the clinic or your nearest 24/7 animal hospital right away.</p></div>
      <button class="btn sm" data-open-guide="vaccination-schedule-explained">Preventive care guide</button></div>`,
    training: `<div class="info-banner"><div class="ico">🎓</div><div><h3>Reward-based trainers only</h3>
      <p>Every trainer on Pawly uses positive reinforcement — no shock, prong or choke collars. Start with the basics at home using our free guide.</p></div>
      <button class="btn sm" data-open-guide="first-five-commands">First 5 commands</button></div>`,
    daycare: `<div class="info-banner peach"><div class="ico">🏠</div><div><h3>Two ways to do daycare</h3>
      <p><b>🚐 In-home pet sitter:</b> a background-checked sitter comes to your house for drop-in visits, full days or overnight stays. Best for cats, senior pets and anxious dogs.<br>
      <b>📍 Daycare &amp; boarding:</b> drop your pet at a partner center for supervised play, or overnight boarding while you travel. Best for social, high-energy dogs. Proof of vaccination is required.</p></div>
      <a class="btn sm" href="#how-we-work">How it works</a></div>`
  };

  // Controls
  $("#typeChips").innerHTML = `<button class="chip" data-type="">✨ All services</button>` +
    SERVICE_TYPES.map(t => `<button class="chip" data-type="${t.id}">${t.icon} ${t.name}</button>`).join("");
  STATES.forEach(s => $("#fState").insertAdjacentHTML("beforeend", `<option>${s}</option>`));
  $(".results-bar").insertAdjacentHTML("beforebegin", `<div id="svcBanner"></div>`);

  function syncControls() {
    const t = SERVICE_TYPES.find(x => x.id === state.type);
    $$("#typeChips .chip").forEach(c => c.classList.toggle("active", c.dataset.type === state.type));
    $("#svcTitle").textContent = t ? t.name : "Pet Services";
    $("#svcSub").textContent = t ? t.blurb + " Compare providers and request an appointment in under a minute."
      : "Compare trusted local providers, see prices up front and request an appointment in under a minute.";
    $("#crumbType").textContent = t ? " / " + t.name : "";
    document.title = (t ? t.name : "Pet Services") + " | Pawly";
    $("#svcBanner").innerHTML = BANNERS[state.type] || "";
    $("#schedule").hidden = !(state.type === "" || state.type === "vaccination");
  }

  function render() {
    const s = state.search.trim().toLowerCase();
    let list = allProviders().filter(p =>
      (!state.type || p.type === state.type)
      && (!state.mode || providerModes(p).includes(state.mode))
      && (!state.st || p.state === state.st)
      && (!state.pets || (state.pets === "dog" ? /dog/i.test(p.pets) : /cat/i.test(p.pets)))
      && (!s || (p.name + " " + p.city + " " + p.services.map(x => x[0]).join(" ")).toLowerCase().includes(s)));
    if (state.sort === "price") list.sort((a, b) => a.from - b.from);
    else if (state.sort === "reviews") list.sort((a, b) => b.reviews - a.reviews);
    else list.sort((a, b) => b.rating - a.rating);

    $("#count").textContent = `${list.length} provider${list.length === 1 ? "" : "s"}`;
    $("#grid").innerHTML = list.length ? list.map(providerCard).join("")
      : `<div style="grid-column:1/-1">${emptyState("📍", "No providers found", "Try another state or service — new businesses join Pawly every week.", "sell.html", "List your business")}</div>`;
    const qs = [state.type && "type=" + state.type, state.mode && "mode=" + state.mode].filter(Boolean).join("&");
    history.replaceState(null, "", "services.html" + (qs ? "?" + qs : "") + location.hash);
  }

  // Vaccine schedule table
  function renderSchedule(pet) {
    $$("#schedChips .chip").forEach(c => c.classList.toggle("active", c.dataset.sched === pet));
    $("#schedBody").innerHTML = VACCINE_SCHEDULE[pet].map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td class="muted">${esc(r[2]) || "—"}</td></tr>`).join("");
  }
  $("#schedChips").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) renderSchedule(c.dataset.sched); });

  // Events
  $("#typeChips").addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    state.type = c.dataset.type; syncControls(); render();
  });
  $("#fState").addEventListener("change", e => { state.st = e.target.value; render(); });
  $("#fPets").addEventListener("change", e => { state.pets = e.target.value; render(); });
  $("#fMode").addEventListener("change", e => { state.mode = e.target.value; render(); });
  $$("[data-mode-filter]").forEach(b => b.addEventListener("click", () => {
    state.mode = $("#fMode").value = b.dataset.modeFilter; render();
    $(".results-bar").scrollIntoView({ behavior: "smooth" });
  }));
  $("#fSearch").addEventListener("input", e => { state.search = e.target.value; render(); });
  $("#fSort").addEventListener("change", e => { state.sort = e.target.value; render(); });

  $("#fMode").value = state.mode;
  syncControls();
  renderSchedule("dog");
  render();
  if (location.hash === "#schedule") $("#schedule").scrollIntoView();
  if (location.hash === "#how-we-work") $("#how-we-work").scrollIntoView();
  if (q.get("book")) openBooking(q.get("book"));
})();
