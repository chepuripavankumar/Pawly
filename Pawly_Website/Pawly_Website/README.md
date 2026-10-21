# Pawly: Final Project

**Project:** Pawly, a web-based pet adoption and pet services platform (MS final project)

Pawly is a 12-page website that brings pet adoption, a breed guide, a pet shop, pet services booking, pet-care guides, favorites, and cart and checkout together in one place. It is built with plain **HTML, CSS and JavaScript**. There is nothing to compile and no server is needed.

This guide explains how to run the project and what each file contains.

---

## 1. What to install

| Tool | Needed? | Why |
|---|---|---|
| Google Chrome or Microsoft Edge | **Required** (already on most laptops) | Runs the website |
| Internet connection | **Required** | Pet photos and fonts load online |
| Visual Studio Code | Recommended | Opening and showing the code. Download: code.visualstudio.com |
| "Live Server" extension for VS Code | Optional | Runs the site at `http://127.0.0.1:5500` and refreshes it every time you save a file |

You do **not** need Node.js, npm, a database or a server.

## 2. How to run it

**Option A: double-click (fastest)**
1. Right-click the zip and choose **Extract All**. Don't open the files from inside the zip.
2. Open the extracted `Pawly_Website` folder.
3. Double-click **`index.html`**. The site opens in your browser, and every page and button works.

**Option B: VS Code + Live Server (best for showing the code in class)**
1. Open VS Code, go to **File > Open Folder**, and choose the `Pawly_Website` folder.
2. Install Live Server: press **Ctrl+Shift+X**, search "Live Server" (by Ritwick Dey), and click **Install**.
3. Right-click `index.html` in the left panel and choose **Open with Live Server**.

**Starting the demo fresh:** favorites, cart, bookings and orders are saved in the browser. To start empty, open the site in an Incognito / InPrivate window, or press **F12 > Application > Local Storage** and clear it.

## 3. Folder structure

```
Pawly_Website/
├── README.md              this guide
├── index.html             the home page (start here)
├── adopt.html  breeds.html  shop.html  services.html  care.html
├── favorites.html  cart.html  sell.html  about.html  terms.html  privacy.html
└── assets/
    ├── css/style.css      all the styling
    └── js/                all the JavaScript (data + one script per page)
```

## 4. What each page does

| File | Page | What it does |
|---|---|---|
| `index.html` | Home | Quick adoption search, newest dogs and cats, best sellers, services, breeds, guides |
| `adopt.html` | Pet Adoption | Filter dogs and cats by state, shelter, breed, gender, age, size and "good with". Opens a pet profile pop-up with an adoption application form, and lists shelters and rescues |
| `breeds.html` | Breed Guide | 14 dog and 6 cat breeds with size, lifespan, energy, grooming needs and temperament, each linked to adoptable pets of that breed |
| `shop.html` | Pet Marketplace | Food, bowls and feeders, toys, beds, collars and leashes, and GPS dog belts, with filters, sorting, product details and add to cart |
| `services.html` | Services | Vaccination, vet care, grooming, dog and cat daycare, and training. Includes the **"How Pawly services work"** section, a "comes to your home / at the provider" filter, and the booking form |
| `care.html` | Pet Care | Guides on adoption, training, nutrition, travel and general care |
| `favorites.html` | My Pawly | Saved pets, products and providers, plus bookings (which can be cancelled), adoption applications and orders |
| `cart.html` | Cart & Checkout | Quantities, Subscribe & Save, promo code `WELCOME10`, a free-shipping bar and the checkout form |
| `sell.html` | Sell on Pawly | Seller plans and a form for businesses to list products or services, which then show up live in Shop / Services |
| `about.html` | About & Contact | Mission, contact form and FAQ |
| `terms.html` | Terms & Conditions | 22 sections covering adoption, purchases, bookings, at-home visits, sellers, payments and liability |
| `privacy.html` | Privacy Policy | What data is collected and how it is used |

## 5. What each code file does (`assets/`)

| File | What it does |
|---|---|
| `css/style.css` | All the design: colors, fonts, layout, cards, forms, pop-ups, and the phone/tablet layout |
| `js/data.js` | All the sample data: pets, shelters, breeds, products, service providers, vaccine schedule and guides. **To add a pet, product or provider, copy an existing entry, change the values, save, and refresh the browser** |
| `js/app.js` | Shared code used on every page: header and mobile menu, footer, cart, favorites, pop-ups, the booking form, and saving data in the browser |
| `js/home.js` | Home page sections and the quick adoption search |
| `js/adopt.js` | Adoption filters, pet profiles and the adoption application |
| `js/breeds.js` | Breed Guide filters and breed details |
| `js/shop.js` | Shop filters, sorting and product details |
| `js/services.js` | Service type tabs, the home/provider filter, the provider list and booking |
| `js/cart.js` | Cart, promo code, totals and checkout |
| `js/sell.js` | Seller plans and the listing form |

## 6. How the Services module works

- In this project, Pawly is designed as an online platform that owns **no salon, clinic or van**. Users book and pay on the website, and a listed **partner provider** carries out the service. The platform keeps a **6 to 10% commission** on each booking.
- Each partner works in one or both of these ways:
  - **Comes to the customer's home:** mobile grooming van, house-call vet, in-home pet sitter, in-home trainer.
  - **Customer goes to the partner:** grooming salon, vet clinic, daycare center, boarding, training center.
- **Dog daycare:** either a pet sitter goes to the customer's house (drop-in visit, full day or overnight house-sitting), or the pet goes to a daycare / boarding center.
- Every provider card shows which way it works, customers can filter by it, and at-home bookings ask for the home address.

## 7. Suggested demo order for the presentation (about 6 minutes)

Home > Adopt (filter, open a pet, apply) > Breed Guide > Shop (filter, add to cart) > Services (show "How Pawly services work", book an at-home groomer) > Cart (promo `WELCOME10`, checkout) > My Pawly (see the booking and order) > Sell on Pawly > Terms. Finish by showing the phone layout: press F12, then click the phone icon.

## 8. Good to know

- This is the complete front-end of the project. Data is saved in the browser. There is no login or real database, and no real payments or bookings are made. All pets, providers and prices are sample data created for the project.
- Future enhancements: user login, a backend database (Django/Flask + PostgreSQL), real payments and shelter dashboards.
- Troubleshooting: if there are no photos, you're offline, so connect and refresh. If the page is blank, you opened it from inside the zip, so extract it first.
