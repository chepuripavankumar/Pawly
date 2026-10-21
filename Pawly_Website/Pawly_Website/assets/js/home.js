/* Home page */
(function () {
  // Adoption search → adopt.html with the chosen filters
  const stateSel = $("#state");
  STATES.forEach(s => stateSel.insertAdjacentHTML("beforeend", `<option>${s}</option>`));

  $$("#heroSearch .tab").forEach(tab => tab.addEventListener("click", () => {
    $$("#heroSearch .tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
  }));

  $("#heroSearch").addEventListener("submit", e => {
    e.preventDefault();
    const q = new URLSearchParams({ type: $("#heroSearch .tab.active").dataset.pet });
    if (stateSel.value) q.set("state", stateSel.value);
    if ($("#age").value) q.set("age", $("#age").value);
    if ($("#gender").value) q.set("gender", $("#gender").value);
    location.href = "adopt.html?" + q.toString();
  });

  // Live counts
  $("#statPets").textContent = PETS.length;
  $("#statProducts").textContent = allProducts().length;
  $("#statProviders").textContent = allProviders().length;

  // Feature tiles — one for every part of the platform
  const tiles = [
    ["adopt.html?type=dog", "1587300003388-59208cc962cb", "Adopt a Dog"],
    ["adopt.html?type=cat", "1574158622682-e40e69881006", "Adopt a Cat"],
    ["breeds.html", "1596492784531-6e6eb5ea9993", "Breed Guide"],
    ["shop.html?cat=food", "1589924691995-400dc9ecc119", "Dog & Cat Food"],
    ["shop.html?cat=toys", "1535294435445-d7249524ef2e", "Toys & Accessories"],
    ["shop.html?cat=gps", "1530281700549-e82e7bf110d6", "GPS Dog Belts"],
    ["services.html?type=vaccination", "1628009368231-7bb7cfcb0def", "Vaccination"],
    ["services.html?type=vet", "1644675443401-ea4c14bad0e6", "Vet Care"],
    ["services.html?type=grooming", "1611173622933-91942d394b04", "Grooming"],
    ["services.html?type=daycare", "1548199973-03cce0bbc87b", "Daycare"],
    ["services.html?type=training", "1598875184988-5e67b1a874b8", "Training"],
    ["care.html", "1601758124510-52d02ddb7cbd", "Pet Care"]
  ];
  $("#catGrid").innerHTML = tiles.map(([href, id, label]) =>
    `<a class="cat-tile" href="${href}"><div class="ring"><img src="${img(id, 300)}" alt="" loading="lazy"></div>${label}</a>`).join("");

  // Newest pets
  const dogs = PETS.filter(p => p.type === "dog");
  const cats = PETS.filter(p => p.type === "cat");
  $("#homeDogs").innerHTML = dogs.slice(0, 4).map(petCard).join("");
  $("#homeCats").innerHTML = cats.slice(0, 4).map(petCard).join("");
  $("#dogMore").textContent = `View ${dogs.length - 4} more dogs & puppies available →`;
  $("#catMore").textContent = `View ${cats.length - 4} more cats & kittens available →`;

  // Best sellers
  $("#homeProducts").innerHTML = ["p9", "p18", "p24", "p7"].map(findProduct).map(productCard).join("");

  // Guides
  $("#homeGuides").innerHTML = ["prepare-home-rescue-dog", "first-five-commands", "road-trip-with-dog", "bringing-home-a-cat"]
    .map(findGuide).map(guideCard).join("");
})();
