/* =========================================================
   Pawly — sample data
   All pets, shelters, products, businesses and prices below are
   demo content for the prototype. In the full system this file is
   replaced by API calls to the backend database.
   ========================================================= */

const STATES = ["Indiana", "Ohio", "Illinois", "Texas", "California", "Missouri", "Kansas"];

const SHELTERS = [
  { id: "s1", name: "Circle City Animal Rescue", city: "Indianapolis", state: "Indiana", phone: "(317) 555-0142", email: "adopt@circlecityrescue.example", icon: "🏡" },
  { id: "s2", name: "Buckeye Paws Shelter", city: "Columbus", state: "Ohio", phone: "(614) 555-0187", email: "hello@buckeyepaws.example", icon: "🌳" },
  { id: "s3", name: "Lakeshore Pet Haven", city: "Chicago", state: "Illinois", phone: "(312) 555-0110", email: "team@lakeshorehaven.example", icon: "🌊" },
  { id: "s4", name: "Hill Country Humane Friends", city: "Austin", state: "Texas", phone: "(512) 555-0163", email: "adopt@hillcountryfriends.example", icon: "🌵" },
  { id: "s5", name: "Pacific Tails Rescue", city: "San Diego", state: "California", phone: "(619) 555-0129", email: "info@pacifictails.example", icon: "🌴" },
  { id: "s6", name: "Heartland Second Chance", city: "Kansas City", state: "Missouri", phone: "(816) 555-0175", email: "care@heartland2ndchance.example", icon: "💚" },
  { id: "s7", name: "Prairie Hearts Rescue", city: "Overland Park", state: "Kansas", phone: "(913) 555-0158", email: "adopt@prairiehearts.example", icon: "🌾" }
];

/* traits: [kids, dogs, cats, houseTrained, vaccinated, spayedNeutered] */
const PETS = [
  // ---------- Dogs ----------
  { id: "d1", type: "dog", name: "Lil'One", breed: "French Bulldog", age: "Senior", gender: "Male", size: "Small", shelter: "s1", img: "1583511655857-d19b40a7a54e", fee: 95, traits: [1,1,0,1,1,1], added: 1,
    about: "A gentle old gentleman who loves short walks, soft blankets and snoring through movie night. Lil'One is calm, polite and happiest right next to his person." },
  { id: "d2", type: "dog", name: "Spikey", breed: "Bichon Frise mix", age: "Senior", gender: "Male", size: "Medium", shelter: "s2", img: "1534361960057-19889db9621e", fee: 95, traits: [1,1,1,1,1,1], added: 2,
    about: "Don't let the grey muzzle fool you — Spikey still does zoomies in the yard. He gets along with everyone, including cats, and knows sit, stay and paw." },
  { id: "d3", type: "dog", name: "Dolly", breed: "Golden Retriever", age: "Young", gender: "Female", size: "Medium", shelter: "s4", img: "1615751072497-5f5169febe17", fee: 250, traits: [1,1,1,0,1,1], added: 3,
    about: "Sweet, sunny and always carrying something in her mouth. Dolly is still learning house manners and would love an active family with a yard." },
  { id: "d4", type: "dog", name: "Bingo", breed: "Labrador Retriever", age: "Young", gender: "Male", size: "Large", shelter: "s3", img: "1518717758536-85ae29035b6d", fee: 225, traits: [1,1,0,1,1,1], added: 4,
    about: "Bingo is a goofy, food-motivated Lab who picks up new commands fast. He'd be a great running or hiking buddy." },
  { id: "d5", type: "dog", name: "Maple", breed: "Golden Retriever", age: "Adult", gender: "Female", size: "Large", shelter: "s6", img: "1633722715463-d30f4f325e24", fee: 200, traits: [1,1,1,1,1,1], added: 5,
    about: "Maple is the definition of a family dog: patient with kids, relaxed indoors and always up for a game of fetch." },
  { id: "d6", type: "dog", name: "Biscuit", breed: "Beagle", age: "Young", gender: "Male", size: "Medium", shelter: "s1", img: "1543466835-00a7907e9de1", fee: 175, traits: [1,1,0,0,1,1], added: 6,
    about: "Biscuit follows his nose everywhere. He's friendly, vocal and needs a fenced yard plus someone who enjoys long sniffy walks." },
  { id: "d7", type: "dog", name: "Otis", breed: "Pug", age: "Adult", gender: "Male", size: "Small", shelter: "s5", img: "1517849845537-4d257902454a", fee: 175, traits: [1,1,1,1,1,1], added: 7,
    about: "Otis is a professional couch tester. He loves people, tolerates baths and would suit an apartment or a calmer household." },
  { id: "d8", type: "dog", name: "Pepper", breed: "Jack Russell Terrier", age: "Young", gender: "Female", size: "Small", shelter: "s2", img: "1561037404-61cd46aa615b", fee: 175, traits: [0,1,0,1,1,1], added: 8,
    about: "Pepper is small but mighty — clever, energetic and great at puzzle toys. Best with older kids and an owner who likes training games." },
  { id: "d9", type: "dog", name: "Waffles", breed: "Pembroke Welsh Corgi", age: "Baby", gender: "Male", size: "Small", shelter: "s7", img: "1537151625747-768eb6cf92b2", fee: 300, traits: [1,1,1,0,1,0], added: 9,
    about: "Big ears, big heart. Waffles is a curious 12-week-old puppy who's working on potty training and loves every person he meets." },
  { id: "d10", type: "dog", name: "Sunny", breed: "Golden Retriever mix", age: "Baby", gender: "Female", size: "Medium", shelter: "s6", img: "1507146426996-ef05306b995a", fee: 300, traits: [1,1,1,0,1,0], added: 10,
    about: "Sunny is a playful puppy with a soft mouth and a softer heart. She'll need puppy classes and lots of chew toys." },
  { id: "d11", type: "dog", name: "Koda", breed: "Siberian Husky", age: "Adult", gender: "Male", size: "Large", shelter: "s3", img: "1605568427561-40dd23c2acea", fee: 225, traits: [1,1,0,1,1,1], added: 11,
    about: "Koda is chatty, athletic and a talented escape artist. He needs an experienced owner, a secure fence and daily exercise." },
  { id: "d12", type: "dog", name: "Luna", breed: "Samoyed", age: "Young", gender: "Female", size: "Large", shelter: "s5", img: "1596492784531-6e6eb5ea9993", fee: 275, traits: [1,1,1,1,1,1], added: 12,
    about: "Luna is a smiling cloud of fluff who loves cooler weather, brushing sessions and being the centre of attention." },
  { id: "d13", type: "dog", name: "Rosie", breed: "Cavalier King Charles Spaniel", age: "Adult", gender: "Female", size: "Small", shelter: "s1", img: "1560807707-8cc77767d783", fee: 200, traits: [1,1,1,1,1,1], added: 13,
    about: "Rosie is an affectionate lap dog who adapts easily to new places. Great for first-time owners and seniors." },
  { id: "d14", type: "dog", name: "Bruno", breed: "German Shepherd", age: "Adult", gender: "Male", size: "Large", shelter: "s4", img: "1589941013453-ec89f33b5e95", fee: 200, traits: [0,1,0,1,1,1], added: 14,
    about: "Loyal and smart, Bruno already knows his basics and wants a job to do. Best in an adult home with experience handling big dogs." },
  { id: "d15", type: "dog", name: "Daisy", breed: "Australian Shepherd", age: "Baby", gender: "Female", size: "Medium", shelter: "s7", img: "1601979031925-424e53b6caaa", fee: 300, traits: [1,1,1,0,1,0], added: 15,
    about: "Daisy is a bright, busy puppy who learns fast. She'll thrive with an active family that enjoys training and outdoor time." },
  { id: "d16", type: "dog", name: "Teddy", breed: "Shih Tzu", age: "Senior", gender: "Male", size: "Small", shelter: "s2", img: "1629740067905-bd3f515aa739", fee: 75, traits: [1,1,1,1,1,1], added: 16,
    about: "Teddy is a dignified senior who enjoys naps, gentle brushing and being carried around like royalty." },
  { id: "d17", type: "dog", name: "Rocky", breed: "Pit Bull Terrier mix", age: "Adult", gender: "Male", size: "Large", shelter: "s6", img: "1477884213360-7e9d7dcc1e48", fee: 150, traits: [1,0,0,1,1,1], added: 17,
    about: "Rocky is a big softie who leans into every hug. He'd do best as the only dog in the home." },
  { id: "d18", type: "dog", name: "Ziggy", breed: "Miniature Schnauzer", age: "Young", gender: "Male", size: "Small", shelter: "s3", img: "1625316708582-7c38734be31d", fee: 200, traits: [1,1,1,1,1,1], added: 18,
    about: "Ziggy is cheerful, low-shedding and full of personality. He's a great fit for apartments and allergy-conscious families." },

  // ---------- Cats ----------
  { id: "c1", type: "cat", name: "Buddy", breed: "Domestic Shorthair", age: "Young", gender: "Male", size: "Medium", shelter: "s3", img: "1514888286974-6c03e2ca1dba", fee: 90, traits: [1,1,1,1,1,1], added: 1,
    about: "Buddy is a tuxedo charmer who greets you at the door and loves chin scratches. Easy-going with dogs and other cats." },
  { id: "c2", type: "cat", name: "Nebula", breed: "Domestic Shorthair", age: "Adult", gender: "Female", size: "Medium", shelter: "s1", img: "1519052537078-e6302a4968d4", fee: 75, traits: [1,0,1,1,1,1], added: 2,
    about: "Nebula is a sunbeam specialist. She's quiet, independent and happiest in a calm home with a sunny window." },
  { id: "c3", type: "cat", name: "Groot", breed: "Domestic Longhair", age: "Young", gender: "Male", size: "Medium", shelter: "s5", img: "1526336024174-e58f5cdd8e13", fee: 90, traits: [1,1,1,1,1,1], added: 3,
    about: "Groot is curious about everything — especially bugs and boxes. He's playful, social and great with respectful kids." },
  { id: "c4", type: "cat", name: "Bitsy", breed: "Domestic Shorthair", age: "Young", gender: "Female", size: "Small", shelter: "s2", img: "1495360010541-f48722b34f7d", fee: 90, traits: [1,0,1,1,1,1], added: 4,
    about: "Bitsy is petite, gentle and a little shy at first. Once she trusts you she'll follow you from room to room." },
  { id: "c5", type: "cat", name: "Mochi", breed: "Domestic Shorthair", age: "Baby", gender: "Female", size: "Small", shelter: "s7", img: "1529778873920-4da4926a72c2", fee: 120, traits: [1,1,1,1,1,0], added: 5,
    about: "Mochi is a 10-week-old kitten with endless energy. She's litter trained and would love a sibling to wrestle with." },
  { id: "c6", type: "cat", name: "Sir Whiskers", breed: "British Shorthair", age: "Adult", gender: "Male", size: "Large", shelter: "s4", img: "1533738363-b7f9aef128ce", fee: 110, traits: [1,1,1,1,1,1], added: 6,
    about: "A cool cat in every sense. Sir Whiskers is laid-back, round-faced and absolutely convinced he's a model." },
  { id: "c7", type: "cat", name: "Snow", breed: "Turkish Angora mix", age: "Adult", gender: "Female", size: "Medium", shelter: "s6", img: "1561948955-570b270e7c36", fee: 80, traits: [0,0,1,1,1,1], added: 7,
    about: "Snow is expressive and talkative. She prefers a quiet adult home where she can be the only pet or live with another calm cat." },
  { id: "c8", type: "cat", name: "Coco", breed: "Siamese", age: "Senior", gender: "Female", size: "Medium", shelter: "s1", img: "1568152950566-c1bf43f4ab28", fee: 50, traits: [1,0,1,1,1,1], added: 8,
    about: "Coco is an elegant senior who still chats up a storm. She'd love a retired person or quiet couple to keep her company." },
  { id: "c9", type: "cat", name: "Ginger", breed: "Domestic Shorthair", age: "Young", gender: "Male", size: "Medium", shelter: "s3", img: "1573865526739-10659fec78a5", fee: 90, traits: [1,1,1,1,1,1], added: 9,
    about: "Ginger is a confident orange tabby who loves wand toys and will happily supervise your cooking." },
  { id: "c10", type: "cat", name: "Jasper", breed: "Domestic Shorthair", age: "Adult", gender: "Male", size: "Medium", shelter: "s5", img: "1574158622682-e40e69881006", fee: 75, traits: [1,1,1,1,1,1], added: 10,
    about: "Jasper has striking green eyes and a mellow temperament. He's great with kids and has lived with a dog before." },
  { id: "c11", type: "cat", name: "Pip", breed: "Domestic Shorthair", age: "Baby", gender: "Male", size: "Small", shelter: "s2", img: "1592194996308-7b43878e84a6", fee: 120, traits: [1,1,1,1,1,0], added: 11,
    about: "Pip is an acrobatic kitten who climbs everything. A tall cat tree is a must!" },
  { id: "c12", type: "cat", name: "Marmalade", breed: "Domestic Shorthair", age: "Adult", gender: "Male", size: "Medium", shelter: "s7", img: "1596854407944-bf87f6fdd49e", fee: 75, traits: [1,1,1,1,1,1], added: 12,
    about: "Marmalade is a friendly, food-loving orange cat who purrs as soon as you sit down. Perfect first cat." },
  { id: "c13", type: "cat", name: "Willow", breed: "Maine Coon mix", age: "Young", gender: "Female", size: "Large", shelter: "s4", img: "1586289883499-f11d28aaf52f", fee: 110, traits: [1,1,1,1,1,1], added: 13,
    about: "Willow is a fluffy gentle giant with blue-grey eyes. She enjoys being brushed and gets along with everyone." },
  { id: "c14", type: "cat", name: "Olive", breed: "Domestic Shorthair", age: "Baby", gender: "Female", size: "Small", shelter: "s6", img: "1615789591457-74a63395c990", fee: 120, traits: [1,1,1,1,1,0], added: 14,
    about: "Olive is a tiny kitten with a big purr. She's been raised in a foster home with kids and a cat-friendly dog." },
  { id: "c15", type: "cat", name: "Hazel", breed: "Domestic Shorthair", age: "Senior", gender: "Female", size: "Medium", shelter: "s1", img: "1511044568932-338cba0ad803", fee: 50, traits: [1,0,1,1,1,1], added: 15,
    about: "Hazel loves rolling around on warm floors and gentle belly rubs. Senior cats come with lifetime foster support from our team." }
];

const PRODUCT_CATEGORIES = [
  { id: "food", name: "Dog & Cat Food", icon: "🍖", blurb: "Dry, wet and treats by brand, life stage and pet." },
  { id: "feeding", name: "Bowls & Feeders", icon: "🥣", blurb: "Food accessories: bowls, slow feeders and water fountains." },
  { id: "toys", name: "Toys & Accessories", icon: "🧸", blurb: "Chew toys, plush, cat teasers and apparel." },
  { id: "beds", name: "Beds", icon: "🛏️", blurb: "Orthopedic, bolster and cozy nest beds." },
  { id: "collars", name: "Collars & Leashes", icon: "🦮", blurb: "Everyday, reflective and party collars." },
  { id: "gps", name: "GPS Dog Belts", icon: "📍", blurb: "Live-tracking belts, harnesses and tags." }
];

/* pet: dog | cat | both · life: Puppy/Kitten | Adult | Senior | All ages · foodType only for food */
const PRODUCTS = [
  // Food
  { id: "p1", cat: "food", name: "Adult Chicken & Brown Rice Dry Dog Food, 15 lb", brand: "Barkwell", pet: "dog", life: "Adult", foodType: "Dry", price: 42.99, was: 47.99, rating: 4.7, reviews: 1284, img: "1537204696486-967f1b7198c8", best: true,
    desc: "Real chicken is the first ingredient, with brown rice for steady energy and omega fatty acids for a healthy coat. Made without artificial colors or flavors." },
  { id: "p2", cat: "food", name: "Puppy Growth Formula Dry Food, 12 lb", brand: "Barkwell", pet: "dog", life: "Puppy/Kitten", foodType: "Dry", price: 38.99, rating: 4.8, reviews: 902, img: "1596797882870-8c33deeac224",
    desc: "Small, crunchy kibble with DHA for brain development and calcium for growing bones. Recommended from 8 weeks to 12 months." },
  { id: "p3", cat: "food", name: "Grain-Free Salmon & Sweet Potato Dog Food, 24 lb", brand: "Pawly Naturals", pet: "dog", life: "Adult", foodType: "Dry", price: 64.99, rating: 4.6, reviews: 655, img: "1592754862816-1a21a4ea2281",
    desc: "A limited-ingredient recipe for dogs with sensitive stomachs. Wild-caught salmon, sweet potato and pumpkin." },
  { id: "p4", cat: "food", name: "Senior Vitality Lamb Recipe, 12 lb", brand: "Barkwell", pet: "dog", life: "Senior", foodType: "Dry", price: 39.99, rating: 4.5, reviews: 318, img: "1605460375648-278bcbd579a6",
    desc: "Lower calories and added glucosamine to support aging joints, with antioxidants for immune health." },
  { id: "p5", cat: "food", name: "Classic Loaf Wet Dog Food Variety Pack, 12 × 13 oz", brand: "Barkwell", pet: "dog", life: "All ages", foodType: "Wet", price: 29.99, rating: 4.6, reviews: 540, img: "1597843786411-a7fa8ad44a95",
    desc: "Beef, chicken and turkey loaf recipes. Serve as a complete meal or as a tasty topper on dry food." },
  { id: "p6", cat: "food", name: "Kitten Chicken Recipe Dry Food, 7 lb", brand: "Whisker & Co", pet: "cat", life: "Puppy/Kitten", foodType: "Dry", price: 24.99, rating: 4.8, reviews: 730, img: "1615789591457-74a63395c990",
    desc: "High-protein kitten formula with DHA and taurine. Tiny kibble sized for kitten mouths." },
  { id: "p7", cat: "food", name: "Indoor Adult Salmon Dry Cat Food, 10 lb", brand: "Whisker & Co", pet: "cat", life: "Adult", foodType: "Dry", price: 32.99, was: 36.99, rating: 4.7, reviews: 1102, img: "1543852786-1cf6624b9987", best: true,
    desc: "Fiber blend for hairball control and a calorie level suited to indoor cats. Salmon is the first ingredient." },
  { id: "p8", cat: "food", name: "Senior Pâté Wet Cat Food, 24 × 3 oz", brand: "Whisker & Co", pet: "cat", life: "Senior", foodType: "Wet", price: 27.99, rating: 4.4, reviews: 211, img: "1618826411640-d6df44dd3f7a",
    desc: "Soft pâté that's easy to eat, with extra moisture to support kidney health in cats 11+." },
  { id: "p9", cat: "food", name: "Chicken Training Treats, 16 oz", brand: "Pawly Naturals", pet: "dog", life: "All ages", foodType: "Treats", price: 9.99, rating: 4.9, reviews: 2210, img: "1568640347023-a616a30bc3bd", best: true,
    desc: "Soft, bite-sized treats under 3 calories each — perfect for training sessions. Made in the USA." },
  { id: "p10", cat: "food", name: "Crunchy Tuna Cat Treats, 6 oz", brand: "Whisker & Co", pet: "cat", life: "All ages", foodType: "Treats", price: 5.99, rating: 4.6, reviews: 870, img: "1596272875729-ed2ff7d6d9c5",
    desc: "Crunchy outside, creamy inside. Cats go wild for the tuna flavor." },

  // Bowls & Feeders (food accessories)
  { id: "p29", cat: "feeding", name: "Non-Slip Stainless Steel Bowl Set (2 bowls)", brand: "Pawly", pet: "both", life: "All ages", price: 19.99, rating: 4.7, reviews: 689, img: "1589924691995-400dc9ecc119",
    desc: "Rust-resistant stainless steel bowls in a silicone base that won't slide or tip. Dishwasher safe. Sizes S–L." },
  { id: "p30", cat: "feeding", name: "Slow-Feeder Puzzle Bowl", brand: "Fetchly", pet: "dog", life: "All ages", price: 15.99, rating: 4.5, reviews: 412, img: "1611003229186-80e40cd54966",
    desc: "Maze ridges slow down fast eaters to reduce bloating and make mealtime a brain game. BPA-free." },
  { id: "p31", cat: "feeding", name: "Quiet Flow Cat Water Fountain, 2 L", brand: "Whisker & Co", pet: "cat", life: "All ages", price: 34.99, was: 39.99, rating: 4.6, reviews: 530, img: "1569591159212-b02ea8a9f239",
    desc: "Flowing, filtered water encourages cats to drink more. Whisper-quiet pump and replaceable carbon filters." },

  // Toys & Accessories
  { id: "p11", cat: "toys", name: "Tough Rubber Chew Bone", brand: "Fetchly", pet: "dog", life: "All ages", price: 12.99, rating: 4.7, reviews: 640, img: "1535294435445-d7249524ef2e",
    desc: "Durable natural rubber for power chewers. Dishwasher safe and floats in water." },
  { id: "p12", cat: "toys", name: "Plush Squeaky Kitty Toy", brand: "Fetchly", pet: "dog", life: "All ages", price: 14.99, rating: 4.5, reviews: 388, img: "1591946614720-90a587da4a36",
    desc: "Soft plush with a double-stitched seam and a squeaker that survives enthusiastic play." },
  { id: "p13", cat: "toys", name: "Rope Tug Toy, 3-Pack", brand: "Fetchly", pet: "dog", life: "All ages", price: 16.99, rating: 4.6, reviews: 512, img: "1588943211346-0908a1fb0b01",
    desc: "Cotton rope toys for tug-of-war and fetch that help clean teeth while they play." },
  { id: "p14", cat: "toys", name: "Kitten Play Pack (wand, balls & mice)", brand: "Whisker & Co", pet: "cat", life: "Puppy/Kitten", price: 19.99, rating: 4.8, reviews: 297, img: "1570018144715-43110363d70a",
    desc: "Twelve pieces of kitten-safe fun: a feather wand, crinkle balls, and catnip-free mice." },
  { id: "p15", cat: "toys", name: "Interactive Feather Wand Teaser", brand: "Whisker & Co", pet: "cat", life: "All ages", price: 8.99, rating: 4.7, reviews: 1045, img: "1415369629372-26f2fe60c467",
    desc: "A telescoping wand with replaceable feather attachments to bring out your cat's inner hunter." },
  { id: "p16", cat: "toys", name: "Cozy Knit Dog Sweater", brand: "Pawly", pet: "dog", life: "All ages", price: 24.99, rating: 4.6, reviews: 233, img: "1608096299210-db7e38487075",
    desc: "Soft acrylic knit that keeps small dogs warm on chilly walks. Sizes XS–L." },
  { id: "p17", cat: "toys", name: "Streetwear Dog Hoodie", brand: "Pawly", pet: "dog", life: "All ages", price: 29.99, rating: 4.5, reviews: 164, img: "1583337130417-3346a1be7dee",
    desc: "A cotton-blend hoodie with a leash opening. Machine washable, sizes XS–XL." },

  // Beds
  { id: "p18", cat: "beds", name: "Orthopedic Bolster Dog Bed", brand: "Snoozy", pet: "dog", life: "All ages", price: 69.99, was: 84.99, rating: 4.8, reviews: 976, img: "1581888227599-779811939961", best: true,
    desc: "Memory foam base with raised bolsters for head support. Removable, machine-washable cover." },
  { id: "p19", cat: "beds", name: "Woven Rattan Pet Bed with Cushion", brand: "Snoozy", pet: "both", life: "All ages", price: 54.99, rating: 4.6, reviews: 205, img: "1600369671236-e74521d4b6ad",
    desc: "A handwoven basket bed that looks great in any room. Fits small dogs and cats." },
  { id: "p20", cat: "beds", name: "Cloud Cat Nest Blanket", brand: "Snoozy", pet: "cat", life: "All ages", price: 34.99, rating: 4.7, reviews: 318, img: "1541781774459-bb2af2f05b55",
    desc: "An ultra-soft fleece blanket nest cats can burrow into. Washable and dryer safe." },

  // Collars & Leashes
  { id: "p21", cat: "collars", name: "Reflective Nylon Collar", brand: "NorthPaw", pet: "dog", life: "All ages", price: 14.99, rating: 4.6, reviews: 440, img: "1586671267731-da2cf3ceeb80",
    desc: "Reflective stitching for night walks and a quick-release buckle. Sizes S–XL." },
  { id: "p22", cat: "collars", name: "Bow-Tie Party Collar", brand: "NorthPaw", pet: "dog", life: "All ages", price: 17.99, rating: 4.4, reviews: 128, img: "1587764379873-97837921fd44",
    desc: "A dapper detachable bow tie for photos, weddings and birthdays." },
  { id: "p23", cat: "collars", name: "Rainbow Puppy Collar & Leash Set", brand: "NorthPaw", pet: "dog", life: "Puppy/Kitten", price: 22.99, rating: 4.7, reviews: 256, img: "1600804340584-c7db2eacf0bf",
    desc: "Lightweight, adjustable collar with a matching 5 ft leash, sized for growing puppies." },

  // GPS Dog Belts
  { id: "p24", cat: "gps", name: "GPS Smart Belt — Live Tracking", brand: "TrailTag", pet: "dog", life: "All ages", price: 89.99, rating: 4.7, reviews: 812, img: "1530281700549-e82e7bf110d6", best: true, plan: 4.99,
    desc: "Real-time location on your phone, escape alerts when your dog leaves a safe zone, and daily activity tracking.",
    features: ["Live GPS location, updates every 3 sec", "Safe-zone escape alerts", "7-day battery", "IP67 waterproof"] },
  { id: "p25", cat: "gps", name: "Mini GPS Collar for Small Breeds", brand: "TrailTag", pet: "dog", life: "All ages", price: 69.99, rating: 4.5, reviews: 344, img: "1597633425046-08f5110420b5", plan: 4.99,
    desc: "At just 28 g, the Mini is built for dogs from 8 lb. Same live tracking as the Smart Belt in a lighter body.",
    features: ["Weighs 28 g", "Live GPS + Wi-Fi location", "5-day battery", "IP67 waterproof"] },
  { id: "p26", cat: "gps", name: "LTE Tracker Harness Belt", brand: "PawGuard", pet: "dog", life: "All ages", price: 119.99, rating: 4.8, reviews: 267, img: "1558929996-da64ba858215", plan: 6.99,
    desc: "A padded no-pull harness with a built-in LTE tracker, LED safety light and location history.",
    features: ["Nationwide LTE coverage", "LED night-safety light", "30-day location history", "10-day battery"] },
  { id: "p27", cat: "gps", name: "Safe-Zone Belt + Activity Monitor", brand: "TrailTag", pet: "dog", life: "All ages", price: 99.99, rating: 4.6, reviews: 190, img: "1544568100-847a948585b9", plan: 4.99,
    desc: "Combines GPS tracking with sleep, calorie and activity insights so you can spot health changes early.",
    features: ["GPS + activity + sleep", "Multiple safe zones", "Share with family", "7-day battery"] },
  { id: "p28", cat: "gps", name: "Clip-On GPS Tag", brand: "PawGuard", pet: "both", life: "All ages", price: 49.99, rating: 4.3, reviews: 402, img: "1535008652995-e95986556e32", plan: 3.99,
    desc: "Clips onto any collar. A budget-friendly way to add location tracking and a lost-mode alert.",
    features: ["Fits any collar", "Lost-mode alerts", "4-day battery", "Water resistant"] }
];

const SERVICE_TYPES = [
  { id: "vaccination", name: "Vaccination", icon: "💉", blurb: "Core and lifestyle vaccines from licensed vets and clinics." },
  { id: "vet", name: "Veterinary Care", icon: "🩺", blurb: "Wellness exams, sick visits, dental care and emergencies." },
  { id: "grooming", name: "Grooming", icon: "✂️", blurb: "Baths, haircuts, nail trims and de-shedding." },
  { id: "daycare", name: "Dog & Cat Daycare", icon: "🏠", blurb: "In-home pet sitters, supervised daycare and overnight boarding." },
  { id: "training", name: "Training", icon: "🎓", blurb: "Puppy classes, obedience and behavior help from reward-based trainers." }
];

/* How a service is delivered. Pawly does not run its own locations:
   every booking is carried out by a partner business, which either
   comes to the customer's home or welcomes the pet at its own place. */
const SERVICE_MODES = {
  home: { icon: "🚐", label: "Comes to your home" },
  center: { icon: "📍", label: "At the provider's location" }
};

const PROVIDERS = [
  // Grooming
  { id: "g1", type: "grooming", modes: ["center"], name: "Suds & Scissors Pet Spa", city: "Indianapolis", state: "Indiana", rating: 4.9, reviews: 312, from: 45, img: "1611173622933-91942d394b04",
    hours: "Tue–Sun · 8am–6pm", pets: "Dogs & cats",
    services: [["Full groom (bath + haircut)", 65], ["Bath & brush", 45], ["Nail trim", 15], ["De-shedding treatment", 35], ["Teeth brushing", 12]],
    about: "Fear-free certified groomers, no cage dryers and a quiet room for nervous pets." },
  { id: "g2", type: "grooming", modes: ["center"], name: "The Brushed Pup", city: "Chicago", state: "Illinois", rating: 4.8, reviews: 198, from: 40, img: "1516734212186-a967f81ad0d7",
    hours: "Mon–Sat · 9am–7pm", pets: "Dogs",
    services: [["Full groom (bath + haircut)", 70], ["Bath & brush", 40], ["Puppy intro groom", 35], ["Nail trim & grind", 18]],
    about: "Breed-specific cuts and gentle puppy introductions in a bright Lincoln Park studio." },
  { id: "g3", type: "grooming", modes: ["home"], name: "Pampered Paws Mobile Grooming", city: "Austin", state: "Texas", rating: 4.7, reviews: 156, from: 65, img: "1510771463146-e89e6e86560e",
    hours: "Mon–Fri · 8am–5pm", pets: "Dogs & cats",
    services: [["Mobile full groom", 95], ["Mobile bath & tidy", 65], ["Nail trim (add-on)", 15]],
    about: "A fully equipped grooming van that comes to your driveway — one pet, one groomer, zero stress." },
  { id: "g4", type: "grooming", modes: ["center"], name: "Feline Fine Cat Grooming", city: "San Diego", state: "California", rating: 4.9, reviews: 88, from: 55, img: "1491485880348-85d48a9e5312",
    hours: "Wed–Sun · 10am–6pm", pets: "Cats only",
    services: [["Lion cut", 85], ["Bath & de-matting", 65], ["Sanitary trim", 40], ["Nail trim", 15]],
    about: "A cat-only salon with no barking dogs — just calm, experienced feline stylists." },

  // Daycare
  { id: "dc1", type: "daycare", modes: ["center"], name: "Happy Tails Daycare & Play", city: "Columbus", state: "Ohio", rating: 4.8, reviews: 421, from: 32, img: "1548199973-03cce0bbc87b",
    hours: "Mon–Fri · 6:30am–7pm", pets: "Dogs",
    services: [["Full day daycare", 32], ["Half day (up to 5 hrs)", 22], ["Overnight boarding", 55], ["Puppy socialization class", 28]],
    about: "Indoor and outdoor play yards grouped by size and energy level, with live webcams for parents." },
  { id: "dc2", type: "daycare", modes: ["center"], name: "Wag Central Dog Daycare", city: "Kansas City", state: "Missouri", rating: 4.7, reviews: 263, from: 35, img: "1560743641-3914f2c45636",
    hours: "Mon–Sat · 7am–7pm", pets: "Dogs",
    services: [["Full day daycare", 35], ["Half day", 24], ["Overnight boarding", 58], ["Daycare 10-pack", 310]],
    about: "Two acres of fenced turf, a splash pad in summer and a trainer on the floor every day." },
  { id: "dc3", type: "daycare", modes: ["center"], name: "Whiskers & Wags Pet Hotel", city: "San Diego", state: "California", rating: 4.6, reviews: 178, from: 38, img: "1450778869180-41d0601e046e",
    hours: "Open daily · 7am–8pm", pets: "Dogs & cats",
    services: [["Dog daycare", 38], ["Cat condo (per night)", 34], ["Dog suite (per night)", 62], ["Medication administration", 5]],
    about: "Separate dog and cat wings, climate-controlled suites and daily photo updates." },
  { id: "dc4", type: "daycare", modes: ["center"], name: "Prairie Pup & Kitty Camp", city: "Overland Park", state: "Kansas", rating: 4.7, reviews: 132, from: 30, img: "1623387641168-d9803ddd3f35",
    hours: "Mon–Fri · 7am–6:30pm", pets: "Dogs & cats",
    services: [["Full day daycare", 30], ["Half day", 20], ["Cat boarding (per night)", 30], ["Dog boarding (per night)", 50]],
    about: "A small, family-run camp with low pet-to-staff ratios and a quiet cat room." },
  { id: "dc5", type: "daycare", modes: ["home"], name: "Cozy Couch In-Home Pet Sitters", city: "Kansas City", state: "Missouri", rating: 4.9, reviews: 97, from: 25, img: "1534361960057-19889db9621e",
    hours: "Open daily · 6am–10pm", pets: "Dogs & cats",
    services: [["Drop-in visit (30 min)", 25], ["Full-day in-home care", 65], ["Overnight house-sitting", 90], ["Dog walk (45 min)", 28]],
    about: "Background-checked sitters who care for your pet in your own home — no kennel, no car ride, photo updates every visit." },
  { id: "dc6", type: "daycare", modes: ["home", "center"], name: "Lakeside Sitters & Pet Lodge", city: "Chicago", state: "Illinois", rating: 4.7, reviews: 164, from: 28, img: "1526336024174-e58f5cdd8e13",
    hours: "Mon–Sun · 7am–8pm", pets: "Dogs & cats",
    services: [["In-home cat sitting visit", 28], ["Full-day in-home dog care", 70], ["Daycare at our lodge", 36], ["Overnight boarding at our lodge", 60]],
    about: "Choose a sitter at your place or a day at our lodge — the same trusted team either way." },

  // Vaccination / vet
  { id: "v1", type: "vaccination", modes: ["center"], name: "Heartland Family Vet Clinic", city: "Overland Park", state: "Kansas", rating: 4.9, reviews: 540, from: 25, img: "1628009368231-7bb7cfcb0def",
    hours: "Mon–Sat · 8am–6pm", pets: "Dogs & cats",
    services: [["Rabies vaccine", 25], ["DHPP (dog core combo)", 35], ["FVRCP (cat core combo)", 32], ["Bordetella (kennel cough)", 30], ["Wellness exam", 55]],
    about: "Full-service veterinary clinic with same-week vaccine appointments and reminder texts." },
  { id: "v2", type: "vaccination", modes: ["center"], name: "Circle City Low-Cost Vaccine Clinic", city: "Indianapolis", state: "Indiana", rating: 4.8, reviews: 377, from: 20, img: "1612531386530-97286d97c2d2",
    hours: "Sat–Sun · 9am–3pm", pets: "Dogs & cats",
    services: [["Rabies vaccine", 20], ["DHPP", 28], ["FVRCP", 26], ["FeLV (feline leukemia)", 30], ["Microchip", 35]],
    about: "Weekend walk-in and booked vaccine clinics that keep preventive care affordable." },
  { id: "v3", type: "vaccination", modes: ["center"], name: "Lakeview Animal Hospital", city: "Chicago", state: "Illinois", rating: 4.7, reviews: 289, from: 30, img: "1604848698030-c434ba08ece1",
    hours: "Open daily · 7am–9pm", pets: "Dogs & cats",
    services: [["Puppy vaccine package (3 visits)", 150], ["Kitten vaccine package (3 visits)", 135], ["Rabies vaccine", 30], ["Leptospirosis", 32], ["Canine influenza", 40]],
    about: "Extended hours, fear-free handling and puppy/kitten vaccine packages." },
  { id: "v4", type: "vaccination", modes: ["home"], name: "Paws & Claws Mobile Vet", city: "Austin", state: "Texas", rating: 4.8, reviews: 144, from: 45, img: "1557495235-340eb888a9fb",
    hours: "Mon–Fri · 9am–5pm", pets: "Dogs & cats",
    services: [["House-call exam", 85], ["Rabies vaccine (house call)", 45], ["DHPP (house call)", 55], ["FVRCP (house call)", 52]],
    about: "Vaccines and checkups at home — ideal for anxious pets and multi-pet households." },

  // Veterinary care
  { id: "vt1", type: "vet", modes: ["center"], name: "Riverside Animal Hospital", city: "Columbus", state: "Ohio", rating: 4.8, reviews: 612, from: 60, img: "1644675443401-ea4c14bad0e6",
    hours: "Mon–Sat · 7:30am–7pm", pets: "Dogs & cats",
    services: [["Wellness exam", 60], ["Sick visit", 75], ["Dental cleaning (under anesthesia)", 280], ["Spay / neuter (from)", 220], ["Senior blood panel", 120], ["Microchip", 45]],
    about: "A full-service hospital with an in-house lab, digital X-ray and surgery suite." },
  { id: "vt2", type: "vet", modes: ["center"], name: "Bluebonnet Veterinary Clinic", city: "Austin", state: "Texas", rating: 4.9, reviews: 348, from: 55, img: "1630438994394-3deff7a591bf",
    hours: "Mon–Fri · 8am–6pm · Sat 9am–1pm", pets: "Dogs & cats",
    services: [["Wellness exam", 55], ["Sick visit", 70], ["Allergy & skin consult", 85], ["Dental cleaning", 250], ["Nutrition & weight plan", 65]],
    about: "Fear-free certified vets who take time to explain every option and cost before treatment." },
  { id: "vt3", type: "vet", modes: ["center"], name: "Pacific Coast Pet Emergency", city: "San Diego", state: "California", rating: 4.7, reviews: 405, from: 150, img: "1599443015574-be5fe8a05783",
    hours: "Open 24/7", pets: "Dogs & cats",
    services: [["Emergency exam", 150], ["Urgent care visit", 110], ["Overnight monitoring (per night)", 450], ["Post-surgery recheck", 80]],
    about: "Round-the-clock emergency and critical care. For life-threatening emergencies, call ahead and come straight in." },

  // Training
  { id: "tr1", type: "training", modes: ["center"], name: "Good Dog Academy", city: "Indianapolis", state: "Indiana", rating: 4.9, reviews: 267, from: 85, img: "1598875184988-5e67b1a874b8",
    hours: "Tue–Sun · 9am–8pm", pets: "Dogs",
    services: [["Private lesson (1 hr)", 85], ["Group obedience (6 weeks)", 180], ["Canine Good Citizen prep (4 weeks)", 150], ["Board & train (2 weeks)", 1400]],
    about: "Certified professional trainers using positive reinforcement only — no shock, prong or choke collars." },
  { id: "tr2", type: "training", modes: ["home", "center"], name: "Sit Happens Training Co.", city: "Chicago", state: "Illinois", rating: 4.8, reviews: 189, from: 60, img: "1551730459-92db2a308d6a",
    hours: "Mon–Sat · 10am–7pm", pets: "Dogs",
    services: [["Loose-leash walking workshop", 60], ["Private lesson (1 hr)", 90], ["Reactive dog program (5 sessions)", 450], ["In-home behavior consult", 120]],
    about: "Specialists in leash reactivity, fear and separation anxiety, with in-home and online sessions." },
  { id: "tr3", type: "training", modes: ["center"], name: "Little Paws Puppy Kindergarten", city: "Kansas City", state: "Missouri", rating: 4.9, reviews: 142, from: 25, img: "1591160690555-5debfba289f0",
    hours: "Mon–Fri · 4pm–8pm · Sat 9am–2pm", pets: "Dogs",
    services: [["Puppy socialization hour", 25], ["Puppy kindergarten (4 weeks)", 140], ["Potty-training consult", 70]],
    about: "Small, playful classes for puppies 8–20 weeks covering socialization, bite inhibition and first commands." }
];

const VACCINE_SCHEDULE = {
  dog: [
    ["6–8 weeks", "DHPP (distemper, adenovirus/hepatitis, parainfluenza, parvovirus)", "Optional: Bordetella if the puppy will meet other dogs"],
    ["10–12 weeks", "DHPP booster", "Lifestyle vaccines as advised: Leptospirosis, Lyme, Canine influenza, Bordetella"],
    ["14–16 weeks", "DHPP booster · Rabies (timing set by state law, usually 12–16 weeks)", "Second doses of any lifestyle vaccines started earlier"],
    ["12–16 months", "DHPP and Rabies boosters", "Annual Leptospirosis / Bordetella if still at risk"],
    ["Adult dogs", "DHPP every 3 years · Rabies every 1–3 years (vaccine type and local law)", "Annual wellness exam; lifestyle vaccines yearly as needed"]
  ],
  cat: [
    ["6–8 weeks", "FVRCP (rhinotracheitis, calicivirus, panleukopenia)", "FeLV test if status is unknown"],
    ["10–12 weeks", "FVRCP booster · FeLV (feline leukemia) first dose — recommended for all kittens", ""],
    ["14–16 weeks", "FVRCP booster · FeLV booster · Rabies", ""],
    ["12–16 months", "FVRCP, Rabies and FeLV boosters", ""],
    ["Adult cats", "FVRCP every 3 years · Rabies every 1–3 years", "FeLV yearly for outdoor or at-risk cats"]
  ]
};

/* Breed discovery — general breed traits. Ratings are 1 (low) to 5 (high).
   Individual pets vary; shelters know each pet's real personality best. */
const BREEDS = [
  // ---------- Dogs ----------
  { type: "dog", name: "Labrador Retriever", size: "Large", weight: "55–80 lb", life: "11–13 years", energy: 5, grooming: 2, kids: 5, shedding: 4, img: "1518717758536-85ae29035b6d",
    temperament: "Friendly · Active · Outgoing",
    about: "America's classic family dog — eager to please, easy to train and happiest with a job, a ball or a swim.",
    tip: "Labs love food. Measure meals and use treats from the daily allowance to prevent weight gain." },
  { type: "dog", name: "Golden Retriever", size: "Large", weight: "55–75 lb", life: "10–12 years", energy: 4, grooming: 3, kids: 5, shedding: 5, img: "1633722715463-d30f4f325e24",
    temperament: "Intelligent · Friendly · Devoted",
    about: "Gentle, patient and famously good with children. Goldens need daily exercise and plenty of time with their people.",
    tip: "Brush 2–3 times a week, and daily during shedding season." },
  { type: "dog", name: "French Bulldog", size: "Small", weight: "Under 28 lb", life: "10–12 years", energy: 2, grooming: 1, kids: 4, shedding: 2, img: "1583511655857-d19b40a7a54e",
    temperament: "Adaptable · Playful · Smart",
    about: "A compact, easy-going companion that suits apartment life and doesn't need long walks.",
    tip: "A flat-faced breed — avoid hard exercise in hot weather and watch for breathing trouble." },
  { type: "dog", name: "Beagle", size: "Medium", weight: "20–30 lb", life: "10–15 years", energy: 4, grooming: 2, kids: 5, shedding: 3, img: "1543466835-00a7907e9de1",
    temperament: "Merry · Curious · Friendly",
    about: "A scent hound with a big nose and a big voice. Beagles love company and long, sniffy walks.",
    tip: "Keep on a leash or in a fenced yard — their nose will lead them away." },
  { type: "dog", name: "Pug", size: "Small", weight: "14–18 lb", life: "13–15 years", energy: 2, grooming: 2, kids: 4, shedding: 4, img: "1517849845537-4d257902454a",
    temperament: "Charming · Mischievous · Loving",
    about: "A comedian in a small package who wants to be wherever you are, preferably on your lap.",
    tip: "Clean facial wrinkles regularly and keep them cool in summer." },
  { type: "dog", name: "Pembroke Welsh Corgi", size: "Small", weight: "Up to 30 lb", life: "12–13 years", energy: 4, grooming: 3, kids: 4, shedding: 4, img: "1537151625747-768eb6cf92b2",
    temperament: "Affectionate · Smart · Alert",
    about: "A herding dog in a small body — bright, a little bossy and full of energy.",
    tip: "Their long backs and short legs do best with ramps instead of lots of jumping." },
  { type: "dog", name: "Siberian Husky", size: "Medium", weight: "35–60 lb", life: "12–14 years", energy: 5, grooming: 3, kids: 4, shedding: 5, img: "1605568427561-40dd23c2acea",
    temperament: "Outgoing · Mischievous · Loyal",
    about: "Built to run. Huskies need lots of exercise, a secure fence and an owner who enjoys adventure.",
    tip: "Expect a big coat 'blow' twice a year — an undercoat rake is a must." },
  { type: "dog", name: "German Shepherd", size: "Large", weight: "50–90 lb", life: "7–10 years", energy: 5, grooming: 3, kids: 4, shedding: 5, img: "1589941013453-ec89f33b5e95",
    temperament: "Confident · Courageous · Smart",
    about: "Loyal and highly trainable, German Shepherds thrive with structure, training and a job to do.",
    tip: "Start socialization and obedience training early." },
  { type: "dog", name: "Australian Shepherd", size: "Medium", weight: "40–65 lb", life: "12–15 years", energy: 5, grooming: 3, kids: 4, shedding: 3, img: "1601979031925-424e53b6caaa",
    temperament: "Smart · Work-oriented · Exuberant",
    about: "A tireless herding breed that loves agility, fetch and learning new tricks.",
    tip: "Mental exercise matters as much as physical — try puzzle toys and training games." },
  { type: "dog", name: "Cavalier King Charles Spaniel", size: "Small", weight: "13–18 lb", life: "12–15 years", energy: 3, grooming: 3, kids: 5, shedding: 3, img: "1560807707-8cc77767d783",
    temperament: "Affectionate · Gentle · Graceful",
    about: "A sweet, adaptable lap dog that's great for first-time owners, families and seniors.",
    tip: "Ask your vet about regular heart checks, which are recommended for this breed." },
  { type: "dog", name: "Shih Tzu", size: "Small", weight: "9–16 lb", life: "10–18 years", energy: 2, grooming: 5, kids: 4, shedding: 1, img: "1629740067905-bd3f515aa739",
    temperament: "Affectionate · Playful · Outgoing",
    about: "A low-shedding companion bred to be a lap dog. Happy in apartments and small homes.",
    tip: "A short 'puppy cut' every 6–8 weeks keeps the coat easy to care for." },
  { type: "dog", name: "Miniature Schnauzer", size: "Small", weight: "11–20 lb", life: "12–15 years", energy: 4, grooming: 4, kids: 4, shedding: 2, img: "1625316708582-7c38734be31d",
    temperament: "Friendly · Smart · Obedient",
    about: "A cheerful, low-shedding terrier that makes an alert watchdog and a fun family pet.",
    tip: "Their wiry coat needs clipping or hand-stripping every 6–8 weeks." },
  { type: "dog", name: "Samoyed", size: "Large", weight: "35–65 lb", life: "12–14 years", energy: 4, grooming: 4, kids: 5, shedding: 5, img: "1596492784531-6e6eb5ea9993",
    temperament: "Adaptable · Friendly · Gentle",
    about: "Famous for the 'Sammy smile', Samoyeds are social, playful and love cold weather.",
    tip: "Brush several times a week to prevent mats in the thick double coat." },
  { type: "dog", name: "Jack Russell Terrier", size: "Small", weight: "13–17 lb", life: "13–16 years", energy: 5, grooming: 2, kids: 3, shedding: 3, img: "1561037404-61cd46aa615b",
    temperament: "Energetic · Fearless · Clever",
    about: "A small dog with endless energy and a big personality. Best with active owners.",
    tip: "Keep them busy — a bored Jack Russell will invent its own (noisy) games." },

  // ---------- Cats ----------
  { type: "cat", name: "Domestic Shorthair", size: "Medium", weight: "8–15 lb", life: "12–18 years", energy: 3, grooming: 1, kids: 4, shedding: 2, img: "1514888286974-6c03e2ca1dba",
    temperament: "Adaptable · Varied · Easy-going",
    about: "The most common cat in shelters. Every one is unique — tabby, tuxedo and orange are coat patterns, not breeds.",
    tip: "Weekly brushing and play sessions keep them healthy and happy." },
  { type: "cat", name: "Domestic Longhair", size: "Medium", weight: "8–15 lb", life: "12–18 years", energy: 3, grooming: 4, kids: 4, shedding: 4, img: "1526336024174-e58f5cdd8e13",
    temperament: "Gentle · Varied · Affectionate",
    about: "A mixed-breed cat with a flowing coat and a personality all its own.",
    tip: "Brush a few times a week to prevent mats and hairballs." },
  { type: "cat", name: "Siamese", size: "Medium", weight: "6–14 lb", life: "15–20 years", energy: 5, grooming: 1, kids: 4, shedding: 2, img: "1568152950566-c1bf43f4ab28",
    temperament: "Vocal · Social · Intelligent",
    about: "Chatty, people-focused cats that love to follow you around and 'talk' about their day.",
    tip: "They dislike being alone — consider a companion pet or plenty of interactive toys." },
  { type: "cat", name: "British Shorthair", size: "Large", weight: "7–17 lb", life: "12–20 years", energy: 2, grooming: 2, kids: 4, shedding: 3, img: "1533738363-b7f9aef128ce",
    temperament: "Calm · Easy-going · Loyal",
    about: "A round-faced, laid-back cat that is affectionate without being demanding.",
    tip: "Prone to weight gain — measure meals and encourage daily play." },
  { type: "cat", name: "Maine Coon", size: "Large", weight: "10–25 lb", life: "12–15 years", energy: 3, grooming: 3, kids: 5, shedding: 3, img: "1586289883499-f11d28aaf52f",
    temperament: "Gentle giant · Playful · Sociable",
    about: "One of the largest domestic cat breeds, with a dog-like, friendly personality.",
    tip: "Choose a large litter box and a sturdy cat tree for their size." },
  { type: "cat", name: "Turkish Angora", size: "Medium", weight: "5–10 lb", life: "12–18 years", energy: 4, grooming: 2, kids: 4, shedding: 2, img: "1561948955-570b270e7c36",
    temperament: "Playful · Affectionate · Clever",
    about: "An elegant, silky-coated cat that loves climbing, games and being involved in everything.",
    tip: "Their single coat mats less than most longhairs — brushing once or twice a week is enough." }
];

const GUIDE_CATEGORIES = ["Adoption", "Training", "Nutrition", "Travel", "General Care"];

const GUIDES = [
  { id: "prepare-home-rescue-dog", cat: "Adoption", title: "How to Prepare Your Home for a New Rescue Dog", img: "1601758124510-52d02ddb7cbd", mins: 6,
    summary: "A room-by-room checklist and a calm plan for the first week together.",
    body: `
<p>The first days in a new home can be overwhelming for a rescue dog. A little preparation before pick-up day makes the transition calmer for everyone.</p>
<h3>Before your dog comes home</h3>
<ul>
<li><b>Pick a quiet base camp.</b> A crate or gated corner with a bed, water and a chew toy gives your dog a safe place to decompress.</li>
<li><b>Dog-proof at nose height.</b> Move shoes, cables, medications, trash cans and houseplants that may be toxic (lilies, sago palm, pothos) out of reach.</li>
<li><b>Buy the basics:</b> food the shelter has been feeding, bowls, a well-fitted collar with ID tag, leash, poop bags and an enzymatic cleaner for accidents.</li>
<li><b>Agree on house rules</b> with everyone at home — is the couch allowed? Who walks in the morning?</li>
</ul>
<h3>The first week</h3>
<p>Many rescues follow the <b>3-3-3 rule</b>: roughly 3 days to decompress, 3 weeks to learn your routine, and 3 months to feel truly at home. Keep the first few days boring: short walks, predictable meal times and no big gatherings.</p>
<div class="callout">Book a vet visit within the first two weeks, even if the shelter has already vaccinated your dog. It sets a health baseline and starts your relationship with a local clinic.</div>
<h3>Signs your dog is settling in</h3>
<ul><li>Eating normally and sleeping through the night</li><li>Loose, wiggly body language and a relaxed tail</li><li>Seeking you out for attention or play</li></ul>` },

  { id: "first-five-commands", cat: "Training", title: "Positive Reinforcement Training: The First 5 Commands", img: "1551730459-92db2a308d6a", mins: 7,
    summary: "Teach sit, down, stay, come and leave it with short, reward-based sessions.",
    body: `
<p>Positive reinforcement means rewarding the behavior you want so your dog chooses to repeat it. It builds trust and works for puppies and adult dogs alike.</p>
<h3>Set up for success</h3>
<ul><li>Train for 5 minutes, 2–3 times a day.</li><li>Use tiny, soft treats — something your dog really loves.</li><li>Mark the exact moment of success with a word like "Yes!" and reward within a second.</li></ul>
<h3>The five commands</h3>
<ol>
<li><b>Sit</b> — hold a treat above your dog's nose and move it slowly back over the head. As the bottom touches the floor, say "Yes!" and reward.</li>
<li><b>Down</b> — from a sit, lower a treat to the floor between the paws and slide it forward.</li>
<li><b>Stay</b> — ask for a sit, show a flat palm, wait one second, reward. Build to longer durations and distance slowly.</li>
<li><b>Come</b> — say your dog's name and "Come!" in a happy voice while backing away. Throw a party when they reach you. Never call your dog to something unpleasant.</li>
<li><b>Leave it</b> — close a treat in your fist. When your dog stops sniffing and looks away, reward from your <i>other</i> hand.</li>
</ol>
<div class="callout">If your dog gets distracted or frustrated, make the task easier and end on a win. Group classes with a certified trainer are great for practice around distractions.</div>` },

  { id: "dog-food-life-stage", cat: "Nutrition", title: "Choosing the Right Food for Your Dog's Life Stage", img: "1589924691995-400dc9ecc119", mins: 5,
    summary: "Puppy, adult or senior? What changes, and how to read the label.",
    body: `
<p>A dog's nutritional needs change as they grow. Choosing a food made for the right life stage is one of the easiest ways to support long-term health.</p>
<h3>Puppies (up to 12–24 months)</h3>
<p>Puppies need more calories, protein, calcium and DHA than adults. Large-breed puppies should eat a <b>large-breed puppy formula</b> that controls calcium to protect developing joints.</p>
<h3>Adults</h3>
<p>Choose a complete and balanced food that fits your dog's size and activity. Watch body condition: you should be able to feel the ribs easily without seeing them.</p>
<h3>Seniors (usually 7+ years)</h3>
<p>Many seniors need fewer calories but high-quality protein to maintain muscle. Foods with omega-3 fatty acids and glucosamine can support joints.</p>
<h3>Reading the label</h3>
<ul><li>Look for an <b>AAFCO nutritional adequacy statement</b> ("complete and balanced for…").</li><li>The first ingredients are listed by weight before cooking.</li><li>Feeding guides are a starting point — adjust based on your dog's weight and activity.</li></ul>
<div class="callout">Switching foods? Mix the new food into the old over 7–10 days to avoid an upset stomach.</div>` },

  { id: "road-trip-with-dog", cat: "Travel", title: "10 Tips for a Stress-Free Road Trip With Your Dog", img: "1504208434309-cb69f4fe52b0", mins: 5,
    summary: "Safety restraints, packing lists and pet-friendly stops.",
    body: `
<p>Road trips can be a highlight for dogs who love adventure. A bit of planning keeps everyone safe and comfortable.</p>
<ol>
<li><b>Buckle up.</b> Use a crash-tested harness, crate or car seat — never let your dog ride loose or in the front seat.</li>
<li><b>Practice short drives</b> first so the car means fun destinations, not just the vet.</li>
<li><b>Pack a travel kit:</b> food, bowls, water, leash, waste bags, medications, a towel and a favorite toy.</li>
<li><b>Bring records.</b> Keep vaccination and rabies certificates handy, especially when crossing state lines.</li>
<li><b>Update ID.</b> Check the microchip registration and consider a GPS tracker in unfamiliar places.</li>
<li><b>Stop every 2–3 hours</b> for water, a potty break and a stretch.</li>
<li><b>Never leave your dog in a parked car.</b> Temperatures inside can become dangerous within minutes, even on mild days.</li>
<li><b>Feed a light meal</b> a few hours before leaving to reduce car sickness.</li>
<li><b>Book pet-friendly stays</b> in advance and check their size or breed rules.</li>
<li><b>Keep routines familiar</b> — the same food, bedding and walk times help your dog relax.</li>
</ol>` },

  { id: "vaccination-schedule-explained", cat: "General Care", title: "Your Puppy & Kitten Vaccination Schedule Explained", img: "1599443015574-be5fe8a05783", mins: 6,
    summary: "Core vs. lifestyle vaccines and when each one is due.",
    body: `
<p>Vaccines protect pets from serious, sometimes fatal diseases. Puppies and kittens receive a <b>series</b> of shots because antibodies from their mother can block a single early dose.</p>
<h3>Core vaccines</h3>
<ul><li><b>Dogs:</b> Rabies and DHPP (distemper, adenovirus/hepatitis, parainfluenza, parvovirus).</li><li><b>Cats:</b> Rabies and FVRCP (rhinotracheitis, calicivirus, panleukopenia). FeLV is recommended for all kittens and for adult cats who go outside.</li></ul>
<h3>Lifestyle (non-core) vaccines</h3>
<p>Your vet may recommend Bordetella (kennel cough) for dogs who visit daycare or groomers, plus Leptospirosis, Lyme or canine influenza depending on where you live.</p>
<h3>Typical timeline</h3>
<p>Series start at 6–8 weeks, with boosters every 3–4 weeks until about 16 weeks. Boosters follow one year later, then every 1–3 years depending on the vaccine.</p>
<div class="callout">Rabies vaccination is required by law in most US states. Your vet will tailor the schedule to your pet's age, health and lifestyle — see the full chart on our <a href="services.html?type=vaccination#schedule">Vaccination page</a>.</div>` },

  { id: "bringing-home-a-cat", cat: "Adoption", title: "Bringing Home a Cat: The First 72 Hours", img: "1596272875729-ed2ff7d6d9c5", mins: 5,
    summary: "Why a single 'safe room' makes all the difference for a new cat.",
    body: `
<p>Cats are territorial, so a new home can feel scary. Starting small helps your cat build confidence at their own pace.</p>
<h3>Set up a safe room</h3>
<ul><li>Choose a quiet room with a litter box, food and water (placed apart from each other), a scratcher and a hiding spot like a covered bed or a box.</li><li>Keep the door closed for the first few days.</li></ul>
<h3>Let your cat come to you</h3>
<p>Sit on the floor, read or talk softly, and let your cat approach. Slow blinks are a friendly signal in cat language.</p>
<h3>Introducing other pets</h3>
<p>Swap bedding so pets learn each other's scent first, then allow short, supervised visits through a baby gate before any face-to-face meetings.</p>
<div class="callout">Hiding for a day or two is normal. Call your vet if your new cat hasn't eaten within 24–48 hours.</div>` },

  { id: "grooming-at-home", cat: "General Care", title: "Grooming at Home: Brushing, Bathing and Nail Trims", img: "1611173622933-91942d394b04", mins: 6,
    summary: "How often to groom, which tools to use, and when to call a pro.",
    body: `
<p>Regular grooming keeps skin healthy, reduces shedding and gives you a chance to spot lumps, ticks or sore spots early.</p>
<h3>Brushing</h3>
<ul><li><b>Short coats:</b> a rubber curry brush once a week.</li><li><b>Double coats</b> (huskies, shepherds): an undercoat rake 2–3 times a week, daily during shedding season.</li><li><b>Long or curly coats:</b> a slicker brush and comb every day or two to prevent mats.</li></ul>
<h3>Bathing</h3>
<p>Most dogs only need a bath every 4–8 weeks. Use a pet shampoo — human products can irritate their skin. Most cats groom themselves and rarely need a bath.</p>
<h3>Nails</h3>
<p>If you hear clicking on the floor, it's time for a trim. Cut small slivers and avoid the quick (the pink part inside light-colored nails). Reward generously!</p>
<div class="callout">Matted coats, anxious pets and breeds that need haircuts are best left to a professional groomer. <a href="services.html?type=grooming">Find a groomer near you</a>.</div>` },

  { id: "cat-wet-vs-dry", cat: "Nutrition", title: "Is Your Cat Eating Right? Wet vs. Dry Food", img: "1543852786-1cf6624b9987", mins: 4,
    summary: "The pros and cons of each — and why many owners feed both.",
    body: `
<p>Cats are obligate carnivores: they need animal protein and nutrients like taurine to thrive. Both wet and dry foods can be complete and balanced.</p>
<h3>Wet food</h3>
<ul><li>About 75–80% water, which supports hydration and urinary health.</li><li>Often more palatable for picky or senior cats.</li><li>Must be refrigerated after opening.</li></ul>
<h3>Dry food</h3>
<ul><li>Convenient and cost-effective, and easy to use in puzzle feeders.</li><li>Calorie-dense, so measure portions to prevent weight gain.</li></ul>
<h3>Combination feeding</h3>
<p>Many owners feed wet food once or twice a day and a measured amount of dry food for grazing. Always keep fresh water available — a fountain can encourage drinking.</p>` },

  { id: "how-much-exercise", cat: "Training", title: "How Much Exercise Does Your Dog Really Need?", img: "1576201836106-db1758fd1c97", mins: 4,
    summary: "Exercise by breed and age, plus brain games for rainy days.",
    body: `
<p>Most dogs need between 30 minutes and 2 hours of activity a day. The right amount depends on breed, age and health.</p>
<ul>
<li><b>High energy</b> (Border Collies, Huskies, Labs): 1–2 hours including running, fetch or hiking.</li>
<li><b>Moderate</b> (Beagles, Corgis, Goldens): 45–90 minutes of walks and play.</li>
<li><b>Lower energy</b> (Pugs, Shih Tzus, senior dogs): 30–45 minutes, split into short walks.</li>
<li><b>Puppies:</b> short play sessions with lots of naps — avoid long runs until their growth plates close.</li>
</ul>
<h3>Don't forget the brain</h3>
<p>Ten minutes of sniffing, puzzle feeders or training can tire a dog as much as a long walk. On busy days, a daycare session is a great way to burn energy safely.</p>` }
];
