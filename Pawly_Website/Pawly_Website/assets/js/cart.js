/* Cart & checkout page */
(function () {
  const FREE_SHIP = 49, SHIP = 5.99, TAX = 0.07;
  const PROMOS = { WELCOME10: 0.10, PAWLY15: 0.15 };
  let promo = store.get("promo", "");

  function totals() {
    const items = cart.items();
    const full = items.reduce((s, i) => s + findProduct(i.id).price * i.qty, 0);
    const subtotal = items.reduce((s, i) => s + cart.unitPrice(i) * i.qty, 0);
    const subSave = full - subtotal;
    const promoOff = PROMOS[promo] ? subtotal * PROMOS[promo] : 0;
    const afterPromo = subtotal - promoOff;
    const shipping = items.length === 0 || afterPromo >= FREE_SHIP ? 0 : SHIP;
    const tax = afterPromo * TAX;
    return { items, full, subtotal, subSave, promoOff, shipping, tax, total: afterPromo + shipping + tax, afterPromo };
  }

  function render() {
    const t = totals();
    if (!t.items.length) {
      $("#cartLayout").style.gridTemplateColumns = "1fr";
      $("#cartItems").innerHTML = emptyState("🛒", "Your cart is empty", "Find food, toys, beds and GPS belts your pet will love.", "shop.html", "Start shopping");
      $("#summary").hidden = true;
      $("#cartSub").textContent = "Your cart is waiting for something good.";
      renderRecs([]);
      return;
    }
    $("#cartLayout").style.gridTemplateColumns = "";
    $("#summary").hidden = false;
    const count = cart.count();
    $("#cartSub").textContent = `${count} item${count === 1 ? "" : "s"} in your cart.`;

    $("#cartItems").innerHTML = t.items.map((item, i) => {
      const p = findProduct(item.id);
      const unit = cart.unitPrice(item);
      return `<div class="cart-item">
        <img src="${img(p.img, 300)}" alt="${esc(p.name)}">
        <div>
          <div class="meta muted" style="font-size:13px">${esc(p.brand)}</div>
          <h4><button class="title-btn" data-open-product="${p.id}" style="border:0;background:none;padding:0;font:inherit;font-weight:800;text-align:left;cursor:pointer">${esc(p.name)}</button></h4>
          <div class="price" style="font-size:16px">${money(unit)}${item.sub ? `<s>${money(p.price)}</s>` : ""}</div>
          ${p.cat === "food" ? `<select class="sub-select" data-sub="${i}" aria-label="Delivery option">
              <option value="" ${!item.sub ? "selected" : ""}>One-time purchase</option>
              ${["2", "4", "6"].map(w => `<option value="${w}" ${item.sub === w ? "selected" : ""}>Subscribe · every ${w} weeks (save 10%)</option>`).join("")}
            </select>` : ""}
          ${p.plan ? `<div class="form-note" style="margin-top:6px">Tracking plan from ${money(p.plan)}/mo billed by ${esc(p.brand)}</div>` : ""}
        </div>
        <div class="right">
          <div class="qty"><button data-dec="${i}" aria-label="Decrease">−</button><span>${item.qty}</span><button data-inc="${i}" aria-label="Increase">+</button></div>
          <b>${money(unit * item.qty)}</b>
          <button class="remove" data-remove="${i}">Remove</button>
        </div>
      </div>`;
    }).join("");

    const toFree = Math.max(0, FREE_SHIP - t.afterPromo);
    $("#summary").innerHTML = `
      <h3>Order summary</h3>
      <div>
        <div class="form-note" style="margin-bottom:6px">${toFree > 0 ? `Add <b>${money(toFree)}</b> more for free shipping` : "🎉 You've unlocked free shipping!"}</div>
        <div class="progress"><i style="width:${Math.min(100, (t.afterPromo / FREE_SHIP) * 100)}%"></i></div>
      </div>
      <div class="sum-row"><span>Items (${cart.count()})</span><span>${money(t.full)}</span></div>
      ${t.subSave > 0 ? `<div class="sum-row"><span>Subscribe & save</span><span class="save">−${money(t.subSave)}</span></div>` : ""}
      ${t.promoOff > 0 ? `<div class="sum-row"><span>Promo ${esc(promo)}</span><span class="save">−${money(t.promoOff)}</span></div>` : ""}
      <div class="sum-row"><span>Shipping</span><span>${t.shipping ? money(t.shipping) : "Free"}</span></div>
      <div class="sum-row"><span>Estimated tax</span><span>${money(t.tax)}</span></div>
      <div class="sum-row total"><span>Total</span><span>${money(t.total)}</span></div>
      <form class="promo" id="promoForm"><input class="input" id="promoInput" placeholder="Promo code" value="${esc(promo)}" aria-label="Promo code"><button class="btn ghost sm" type="submit">Apply</button></form>
      <div class="form-note">Try <b>WELCOME10</b> for 10% off your first order.</div>
      <button class="btn block" id="checkoutBtn">Proceed to checkout</button>
      <a class="link-btn" href="shop.html" style="text-align:center">← Continue shopping</a>`;

    $("#promoForm").addEventListener("submit", e => {
      e.preventDefault();
      const code = $("#promoInput").value.trim().toUpperCase();
      if (!code) { promo = ""; store.set("promo", ""); render(); return; }
      if (!PROMOS[code]) { toast("That promo code isn't valid."); return; }
      promo = code; store.set("promo", code); render();
      toast(`Promo ${code} applied!`);
    });
    $("#checkoutBtn").addEventListener("click", openCheckout);
    renderRecs(t.items.map(i => i.id));
  }

  function renderRecs(inCart) {
    const pool = allProducts().filter(p => !inCart.includes(p.id)).sort((a, b) => b.reviews - a.reviews);
    $("#recs").innerHTML = pool.slice(0, 4).map(productCard).join("");
  }

  function openCheckout() {
    const t = totals();
    const modal = openModal(`<div class="modal-body">
      <div class="kicker">Checkout</div>
      <h2 style="font-size:28px">Shipping details</h2>
      <form id="checkoutForm" class="form-grid" novalidate>
        <label class="field"><span>Full name</span><input name="name" required autocomplete="name"></label>
        <label class="field"><span>Email</span><input name="email" type="email" required autocomplete="email"></label>
        <label class="field full"><span>Street address</span><input name="address" required autocomplete="street-address"></label>
        <label class="field"><span>City</span><input name="city" required autocomplete="address-level2"></label>
        <label class="field"><span>State</span><select name="state">${STATES.map(s => `<option>${s}</option>`).join("")}</select></label>
        <label class="field"><span>ZIP code</span><input name="zip" required inputmode="numeric" maxlength="5" autocomplete="postal-code"></label>
        <label class="field"><span>Delivery</span><select name="delivery"><option value="std">Standard (3–5 days)</option><option value="exp">Express (1–2 days) +$9.99</option></select></label>
        <div class="demo-note full">🔒 Payment is not collected in this prototype. In the full version, secure card payments are handled by a PCI-compliant payment provider.</div>
        <label class="check full"><input type="checkbox" name="terms" required> I agree to the <a href="terms.html#purchases" target="_blank">Terms &amp; Conditions</a>, including the returns and subscription terms.</label>
        <div class="error-text full" id="coErr"></div>
        <div class="full" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
          <div><div class="form-note">Order total</div><div class="price" id="coTotal">${money(t.total)}</div></div>
          <button class="btn" type="submit">Place order</button>
        </div>
      </form></div>`, { narrow: true, label: "Checkout" });

    const f = $("#checkoutForm", modal);
    f.delivery.addEventListener("change", () => {
      $("#coTotal", modal).textContent = money(t.total + (f.delivery.value === "exp" ? 9.99 : 0));
    });
    f.addEventListener("submit", e => {
      e.preventDefault();
      const err = $("#coErr", modal);
      if (!f.name.value.trim()) return (err.textContent = "Please enter your name.");
      if (!isEmail(f.email.value)) return (err.textContent = "Please enter a valid email address.");
      if (!f.address.value.trim() || !f.city.value.trim()) return (err.textContent = "Please enter your full shipping address.");
      if (!/^\d{5}$/.test(f.zip.value.trim())) return (err.textContent = "Please enter a 5-digit ZIP code.");
      if (!f.terms.checked) return (err.textContent = "Please accept the Terms & Conditions to place your order.");

      const orderNo = "PWL-" + Math.floor(100000 + Math.random() * 900000);
      const total = t.total + (f.delivery.value === "exp" ? 9.99 : 0);
      const orders = store.get("orders", []);
      orders.unshift({ id: orderNo, items: t.items, total, created: new Date().toISOString() });
      store.set("orders", orders);
      const hasSub = t.items.some(i => i.sub);
      cart.clear(); promo = ""; store.set("promo", "");
      modal.innerHTML = `<button class="modal-close" data-close aria-label="Close">${ICON.close}</button>
        <div class="success-box"><div class="big">📦</div><h2>Order placed!</h2>
        <p>Thanks, ${esc(f.name.value.trim().split(" ")[0])}! Your order <b>${orderNo}</b> for <b>${money(total)}</b> is confirmed. A receipt has been sent to ${esc(f.email.value.trim())}.</p>
        ${hasSub ? `<p style="font-size:14px">Your food subscription is active — you can skip or cancel any delivery.</p>` : ""}
        <div class="modal-actions" style="justify-content:center"><a class="btn" href="shop.html">Continue shopping</a><a class="btn ghost" href="index.html">Back to home</a></div></div>`;
      render();
    });
  }

  // Delegated cart controls
  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const items = cart.items();
    if (b.dataset.inc) cart.setQty(+b.dataset.inc, items[+b.dataset.inc].qty + 1);
    else if (b.dataset.dec) cart.setQty(+b.dataset.dec, items[+b.dataset.dec].qty - 1);
    else if (b.dataset.remove) { cart.remove(+b.dataset.remove); toast("Item removed"); }
  });
  $("#cartItems").addEventListener("change", e => {
    if (e.target.dataset.sub != null) cart.setSub(+e.target.dataset.sub, e.target.value);
  });
  document.addEventListener("pawly:cart", render);

  render();
})();
