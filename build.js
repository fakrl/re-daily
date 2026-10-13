// Static builder for re-daily.my.id (zero dependencies). node build.js -> dist/
const fs = require("fs");
const path = require("path");
const SITE = "https://re-daily.my.id";
const OUT = process.env.OUT_DIR || path.join(__dirname, "dist");
const MAPS = "https://maps.app.goo.gl/Hs2Rg4FYkYVLbK9UA";
const ADDR = "Jl. Suryakencana No.71, Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten 15417";
const IMG_DIR = path.join(__dirname, "static", "img");
const imgs = fs.existsSync(IMG_DIR) ? fs.readdirSync(IMG_DIR).filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f)).sort() : [];
const pick = (re) => imgs.find((f) => re.test(f));
const LOGO = pick(/^logo\./i), HERO = pick(/^hero\./i), BANNER = pick(/^banner\./i);
const BG2 = pick(/^galeri-1\./i), BG3 = pick(/^galeri-2\./i);
const bgStyle = (f, pos) => (f ? ` style="background-image:url(/img/${f});background-position:${pos || "center"}"` : "");
const GALLERY = imgs.filter((f) => /^galeri-/i.test(f));
const GALT = { "galeri-1": "Tampak depan Re:Daily Coffee di Jl. Suryakencana, Pamulang", "galeri-2": "Mesin penggiling kopi di Re:Daily Coffee" };
const galAlt = (g, i) => GALT[g.replace(/\.[^.]+$/, "")] || `Re:Daily Coffee Pamulang, foto ${i + 1}`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Sumber: foto menu di Google Maps (Agustus 2026). Harga dalam ribuan rupiah.
const MENU = [
  { id: "signature", name: "Signature", note: "Racikan khas Re:Daily", items: [
    ["Re:Daily", 22, "Perpaduan kopi espresso, susu creamy, dan manisnya sirup yang lembut. Creamy, smooth, dan bikin nagih."],
    ["Re:Start", 22, "Espresso dan susu berpadu dengan manis legit gula aren. Creamy, harum, dan comforting."],
    ["Re:Smooth", 22, "Kopi susu klasik dengan rasa lembut dan seimbang, pas untuk teman santai kapan saja."],
    ["GreenShoot", 20, "Matcha creamy dengan sentuhan espresso, menghadirkan perpaduan earthy, milky, dan bold dalam satu gelas."],
  ] },
  { id: "coffee", name: "Coffee Series", note: "Kopi susu dengan varian rasa", items: [
    ["Caffe Latte", 19, "Espresso dengan susu creamy, menghasilkan rasa lembut, smooth yang balanced."],
    ["Hazelnut Latte", 20, "Espresso, susu creamy dan hazelnut dengan aroma nutty yang manis dan lembut."],
    ["Butterscotch", 20, "Espresso dengan susu butterscotch dengan rasa manis, buttery, dan rich."],
    ["Caramel Latte", 20, "Espresso dengan susu dan caramel yang dipadukan dengan rasa manis, buttery dan smooth."],
    ["Vanilla Latte", 20, "Espresso dengan susu dan vanilla yang dipadukan dengan rasa manis, buttery dan harum."],
  ] },
  { id: "black", name: "Black Series", note: "Untuk yang suka kopi pekat", items: [
    ["Americano", 18, "Espresso yang dipadukan dengan air untuk menghasilkan kopi hitam ringan, clean, dan menyegarkan."],
    ["Long Black", 18, "Kopi hitam dengan karakter espresso yang lebih kuat dan bold."],
    ["Espresso", 14, "Kopi pekat dengan rasa khas yang kuat, intens, dan bikin segar."],
    ["On The Rock", 18, "Espresso dingin di atas es, menghasilkan sensasi bold, strong, dan menyegarkan."],
  ] },
  { id: "creamy", name: "Creamy Series", note: "Non-kopi dan creamy", items: [
    ["Matcha Love", 20, "Perpaduan matcha yang earthy dan creamy dengan manis segar strawberry. Kombinasi unik dan bikin jatuh cinta."],
    ["Matcha", 16, "Matcha dengan susu khas yang earthy, smooth, dan aromatik."],
    ["Coktail", 16, "Minuman cokelat creamy dan manis dan rich yang cocok untuk semua suasana."],
    ["Strawberry", 16, "Perpaduan susu creamy dengan strawberry yang manis, fruity, dan menyegarkan."],
  ] },
  { id: "snack", name: "Snack", note: "Pendamping nugas", items: [
    ["French Fries", 15, "Kentang gurih."],
    ["Indomie", 15, "Indomie rebus / goreng."],
  ] },
];

const REVIEWS = [
  ["nyore disini nyaman banget, tempat nya adem playlist nya juga boleh req jadi buat pelayanan ramah banget rekomen kalo nyari tempat tenang buat ngopi atau sekedar singgah.", "Angga Faisal"],
  ["Tempt nya seru santai, bisa bawa makanan dari luar jugaa", "Gulto Mevran"],
  ["kopi nya enak", "Erlina Gultom"],
];
const css = `
:root{--bg:#f6efe4;--surface:#fffaf1;--ink:#2a1c14;--sec:#6b5748;--mut:#9a8878;--line:rgba(42,28,20,.14);--accent:#b4652e;--green:#6f8a4f;--pill:rgba(255,250,241,.78);--shadow:0 10px 34px rgba(60,36,18,.12);--tbtn:rgba(42,28,20,.07)}
:root[data-theme=dark]{--bg:#17100c;--surface:#21170f;--ink:#f3e8d8;--sec:#b9a690;--mut:#7d6b59;--line:rgba(243,232,216,.14);--accent:#e08a4b;--green:#9bb77a;--pill:rgba(33,23,15,.78);--shadow:0 10px 34px rgba(0,0,0,.5);--tbtn:rgba(243,232,216,.08)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:90px;overflow-x:hidden}
body{background:var(--bg);color:var(--ink);font:17px/1.7 'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding-top:92px;transition:background .5s,color .5s;overflow-x:hidden}
a{color:inherit}h1,h2,h3,.serif{font-family:'Fraunces',Georgia,serif;font-weight:700;letter-spacing:-.01em}
.msym{font-family:'Material Symbols Rounded';font-weight:normal;font-style:normal;line-height:1;display:inline-block;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;vertical-align:-.2em;user-select:none}
.nav{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:1000;display:flex;align-items:center;gap:1.8rem;padding:.5rem .7rem .5rem 1.4rem;border-radius:999px;background:var(--pill);border:1px solid var(--line);box-shadow:var(--shadow);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);max-width:calc(100% - 2rem)}
.logo{font-family:'Fraunces',serif;font-weight:800;font-size:1.25rem;text-decoration:none;letter-spacing:-.02em}.logo b{color:var(--accent)}.logo{display:flex;align-items:center}.logo img{height:34px;width:auto;display:block}
.links{display:flex;gap:.2rem;list-style:none}.links a{text-decoration:none;font-size:.86rem;font-weight:500;padding:.42rem .9rem;border-radius:999px;color:var(--sec);transition:.2s;display:block}.links a:hover,.links a.on{background:var(--tbtn);color:var(--ink)}
.ham{display:none;flex-direction:column;gap:5px;background:none;border:0;cursor:pointer;padding:5px}.ham span{width:22px;height:2px;background:var(--ink);transition:.3s}.ham.on span:nth-child(1){transform:rotate(45deg) translate(7px,7px)}.ham.on span:nth-child(2){opacity:0}.ham.on span:nth-child(3){transform:rotate(-45deg) translate(6px,-5px)}
.tt{position:fixed;right:24px;bottom:24px;width:48px;height:48px;border-radius:50%;border:1px solid var(--line);background:var(--pill);color:var(--ink);box-shadow:var(--shadow);cursor:pointer;z-index:1001;font-size:20px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(20px);transition:.3s}.tt:hover{transform:rotate(20deg) scale(1.08)}
.wrap{max-width:1080px;margin:0 auto;padding:0 5%}
.hero{padding:54px 0 36px;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:40px;align-items:center}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);border:1px solid var(--line);border-radius:999px;padding:5px 14px;background:var(--surface)}
.hero h1{font-size:clamp(3rem,10vw,6.4rem);line-height:.95;margin:20px 0 18px;font-weight:800}.hero h1 i{color:var(--accent);font-style:normal}
.hero p.lead{font-size:1.1rem;color:var(--sec);max-width:30em}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:999px;font-weight:600;font-size:.92rem;text-decoration:none;border:1.5px solid var(--ink);transition:.25s}.btn.p{background:var(--ink);color:var(--bg)}.btn:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}.chip{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;font-weight:600;color:var(--sec);padding:5px 13px;border:1px dashed var(--line);border-radius:999px}
.cup{position:relative;aspect-ratio:1/1.05;border:1.5px solid var(--ink);border-radius:46% 54% 50% 50%/55% 45% 55% 45%;background:var(--surface);display:flex;align-items:center;justify-content:center;box-shadow:12px 12px 0 var(--accent)}
.cup.photo{overflow:visible;padding:0}.cup.photo img{width:100%;height:100%;object-fit:cover;object-position:50% 82%;border-radius:inherit;display:block}.cup svg{width:62%;height:auto;color:var(--ink)}.cup .tag{position:absolute;right:-8px;top:16%;background:var(--green);color:#fff;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 14px;border-radius:999px;transform:rotate(8deg)}
.marq{overflow:hidden;border-block:1px solid var(--line);margin:30px 0;padding:12px 0;white-space:nowrap}.marq div{display:inline-block;animation:mq 28s linear infinite;font-family:'Fraunces',serif;font-size:1.2rem;color:var(--sec)}.marq span{margin:0 22px}.marq b{color:var(--accent)}
@keyframes mq{to{transform:translateX(-50%)}}@media(prefers-reduced-motion:reduce){.marq div{animation:none}}
section{padding:46px 0}.sh{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:26px;flex-wrap:wrap}.sh h2{font-size:clamp(1.8rem,5vw,2.6rem);line-height:1.1}.sh p{color:var(--sec);max-width:30em;font-size:.95rem}
.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.card{background:var(--surface);border:1.5px solid var(--ink);border-radius:22px;padding:22px;position:relative;transition:transform .3s cubic-bezier(.2,0,0,1),box-shadow .3s}.card:hover{transform:translate(-3px,-3px);box-shadow:6px 6px 0 var(--accent)}
.card .price{position:absolute;top:18px;right:18px;font-weight:700;font-size:.85rem;background:var(--ink);color:var(--bg);padding:3px 11px;border-radius:999px}.card h3{font-size:1.4rem;margin:30px 0 6px}.card p{font-size:.9rem;color:var(--sec);line-height:1.6}
.menu{background:var(--surface);border:1.5px solid var(--ink);border-radius:26px;padding:clamp(22px,4vw,40px);margin-bottom:22px}.menu header{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px;padding-bottom:14px;border-bottom:2px dashed var(--line)}.menu header h2{font-size:1.8rem}.menu header span{color:var(--mut);font-size:.85rem}
.row{padding:14px 0;border-bottom:1px dotted var(--line)}.row:last-child{border:0}.row .t{display:flex;align-items:baseline;gap:10px}.row .t b{font-family:'Fraunces',serif;font-size:1.12rem;white-space:nowrap}.row .t i{flex:1;border-bottom:2px dotted var(--mut);transform:translateY(-4px);opacity:.6}.row .t em{font-style:normal;font-weight:700;color:var(--accent);white-space:nowrap}.row p{font-size:.88rem;color:var(--sec);margin-top:2px;max-width:46em}
.info{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}.box{background:var(--surface);border:1.5px solid var(--ink);border-radius:22px;padding:24px}.box h3{font-size:1.2rem;margin-bottom:8px}.box p,.box li{font-size:.93rem;color:var(--sec)}.box ul{list-style:none}.box li{padding:3px 0}
.map{border:1.5px solid var(--ink);border-radius:24px;overflow:hidden;aspect-ratio:16/9;background:var(--surface)}.map iframe{width:100%;height:100%;border:0;display:block}
.rate{display:flex;align-items:center;gap:10px}.rate b{font-family:'Fraunces',serif;font-size:2.2rem;line-height:1}.stars{color:var(--accent);letter-spacing:2px;font-size:1.1rem}.rate small{color:var(--mut);font-size:.8rem}.rv{margin:0;display:flex;flex-direction:column;justify-content:space-between;gap:14px}.rv blockquote{font-size:1rem;color:var(--ink);line-height:1.6}.rv figcaption{font-size:.82rem;font-weight:700;color:var(--accent)}.gal{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}.gal img{width:100%;aspect-ratio:4/3;object-fit:cover;border:1.5px solid var(--ink);border-radius:20px;display:block}.band{position:relative;border:1.5px solid var(--ink);border-radius:28px;overflow:hidden;min-height:260px;display:flex;align-items:flex-end;background-size:cover;background-position:center}.band::before{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(23,16,12,.82),rgba(23,16,12,.15))}.band div{position:relative;padding:28px;color:#f6efe4}.band h2{font-size:clamp(1.6rem,4vw,2.4rem)}.bgsec{position:relative;background-size:cover;background-position:center;isolation:isolate;--ov:linear-gradient(rgba(246,239,228,.68),rgba(246,239,228,.8))}:root[data-theme=dark] .bgsec{--ov:linear-gradient(rgba(23,16,12,.7),rgba(23,16,12,.82))}.bgsec::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--ov)}.bgsec.dark{--ov:linear-gradient(rgba(23,16,12,.8),rgba(23,16,12,.9))!important;margin:30px 0}.bgsec.dark .sh h2,.bgsec.dark .rate b{color:#f6efe4}.bgsec.dark .rate small{color:#d9c9b4}.bgsec.dark .box{border-color:#f6efe4}
.rvs{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.4fr);gap:36px;align-items:start}.rvsum{position:sticky;top:100px}.rvsum h2{font-size:clamp(1.8rem,5vw,2.6rem);line-height:1.1;color:#f6efe4;margin-bottom:22px}.rvsum .rate{margin-bottom:22px;gap:14px}.rvsum .rate b{font-size:3.6rem;color:#f6efe4}.rvsum .rate small{display:block;color:#d9c9b4;font-size:.82rem;margin-top:2px}.btn.lt{border-color:#f6efe4;color:#f6efe4}.btn.lt:hover{background:#f6efe4;color:#17100c}
.rvlist{display:flex;flex-direction:column;gap:14px}.rvc{margin:0;display:flex;gap:16px;align-items:flex-start;background:var(--surface);border:1.5px solid #f6efe4;border-radius:22px;padding:20px 22px;transition:transform .3s cubic-bezier(.2,0,0,1),box-shadow .3s}.rvc:hover{transform:translateX(4px);box-shadow:-6px 6px 0 var(--accent)}
.av{flex:none;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:800;font-size:1.2rem;color:#fff;background:var(--accent)}.av1{background:var(--green)}.av2{background:#7a5a3c}
.rvc blockquote{color:var(--ink);font-size:.98rem;line-height:1.6;margin:0 0 10px}.rvc blockquote::before{content:"“";font-family:'Fraunces',serif;color:var(--accent);margin-right:2px}.rvc blockquote::after{content:"”";font-family:'Fraunces',serif;color:var(--accent)}
.rvc figcaption{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}.rvc figcaption b{font-size:.86rem}.rvc figcaption small{font-size:.74rem;color:var(--mut)}
@media(max-width:820px){.rvs{grid-template-columns:1fr;gap:24px}.rvsum{position:static}}
.cats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:22px}.cat{display:flex;flex-direction:column;gap:2px;padding:14px 18px;border:1.5px solid var(--ink);border-radius:18px;background:var(--surface);text-decoration:none;transition:transform .3s cubic-bezier(.2,0,0,1),box-shadow .3s}.cat:hover{transform:translate(-3px,-3px);box-shadow:5px 5px 0 var(--accent)}.cat b{font-family:'Fraunces',serif;font-size:1.05rem}.cat span{font-size:.8rem;color:var(--mut)}.note{font-size:.84rem;color:var(--mut);margin-top:14px;border-left:3px solid var(--accent);padding-left:12px}
.foot{margin-top:40px;border-top:1px solid var(--line);padding:34px 5% 60px;text-align:center;color:var(--mut);font-size:.85rem}.foot a{color:var(--sec)}
.vp{display:none;align-items:center;gap:5px;margin-top:10px;padding:4px 12px;border-radius:999px;font-size:.75rem;font-weight:600;background:var(--tbtn);color:var(--sec)}
@media(max-width:1000px){.grid,.cats{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:480px){.grid,.cats{grid-template-columns:1fr}}
@media(max-width:820px){.hero{grid-template-columns:1fr}.cup{max-width:340px;margin:0 auto 12px}}
@media(max-width:768px){.ham{display:flex}body{padding-top:84px}.nav{top:14px;left:.75rem;transform:none;width:calc(100% - 1.5rem);max-width:none;justify-content:space-between;padding:.55rem .8rem .55rem 1.3rem}
.links{position:fixed;top:74px;left:.75rem;right:.75rem;flex-direction:column;padding:1rem;gap:.3rem;border-radius:18px;background:var(--bg);border:1px solid var(--line);box-shadow:var(--shadow);opacity:0;pointer-events:none;transform:translateY(-8px);transition:.3s}.links.on{opacity:1;pointer-events:auto;transform:none}.links a{text-align:center}}
`;

const CUP = `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M50 84h92v46a34 34 0 0 1-34 34H84a34 34 0 0 1-34-34V84Z"/><path d="M142 98h8a20 20 0 0 1 0 40h-10"/><path d="M80 62c-8-10 8-14 0-26M104 62c-8-10 8-14 0-26M128 62c-8-10 8-14 0-26"/><path d="M40 178h120"/></svg>`;

function shell({ title, description, path: p, body, active, ld, noindex }) {
  const url = SITE + p;
  const nav = [["/", "Beranda", "home"], ["/menu/", "Menu", "menu"], ["/lokasi/", "Lokasi", "lokasi"]]
    .map(([h, l, k]) => `<li><a${active === k ? ' class="on"' : ""} href="${h}">${l}</a></li>`).join("");
  return `<!doctype html>
<html lang="id" data-theme="light"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : ""}
<link rel="canonical" href="${url}">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
<link rel="icon" type="image/png" sizes="72x72" href="/favicon.png">
<link rel="apple-touch-icon" href="/favicon.png">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="Re:Daily"><meta property="og:locale" content="id_ID">
${HERO ? `<meta property="og:image" content="${SITE}/img/${HERO}">` : ""}
<meta name="twitter:card" content="${HERO ? "summary_large_image" : "summary"}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap">
<script>try{document.documentElement.dataset.theme=localStorage.getItem("rd_theme")||"light"}catch(e){}</script>
<style>${css}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head><body>
<nav class="nav" aria-label="Utama"><a class="logo" href="/" aria-label="Re:Daily Coffee">${LOGO ? `<img src="/img/${LOGO}" alt="Re:Daily Coffee" height="34">` : "Re<b>:</b>Daily"}</a><button class="ham" id="ham" aria-label="Menu" type="button"><span></span><span></span><span></span></button><ul class="links" id="links">${nav}</ul></nav>
<button class="tt" id="tt" aria-label="Ganti tema" type="button"><span class="msym">dark_mode</span></button>
<main>${body}</main>
<footer class="foot"><div>&copy; ${new Date().getFullYear()} Re:Daily Coffee &middot; Dibuat oleh <a href="https://fakrul.dev">fakrul.dev</a></div><span class="vp" id="vp"><span class="msym" style="font-size:1em">group</span> Dikunjungi <strong id="vc">-</strong> orang</span></footer>
<script>
(function(){var d=document.documentElement,b=document.getElementById("tt");function ic(){b.innerHTML='<span class="msym">'+(d.dataset.theme==="dark"?"light_mode":"dark_mode")+"</span>"}ic();
b.onclick=function(){var t=d.dataset.theme==="dark"?"light":"dark";d.dataset.theme=t;try{localStorage.setItem("rd_theme",t)}catch(e){}ic()};
var h=document.getElementById("ham"),l=document.getElementById("links");h.onclick=function(){h.classList.toggle("on");l.classList.toggle("on")};
var k=(location.pathname.replace(/^\\/|\\/$/g,"").replace(/[^a-z0-9-]+/gi,"_"))||"home",U="https://fakrul-feeeb-default-rtdb.asia-southeast1.firebasedatabase.app/stats/redaily/"+k+"/count.json",p=document.getElementById("vp"),c=document.getElementById("vc");
try{var seen=localStorage.getItem("rv_"+k)==="1";fetch(U).then(function(r){return r.json()}).then(function(cur){cur=typeof cur==="number"?cur:0;if(seen){c.textContent=cur.toLocaleString("id-ID");p.style.display="inline-flex";return}var nx=cur+1;return fetch(U,{method:"PUT",body:JSON.stringify(nx)}).then(function(r){if(!r.ok)throw 0;localStorage.setItem("rv_"+k,"1");c.textContent=nx.toLocaleString("id-ID");p.style.display="inline-flex"})}).catch(function(){})}catch(e){}
})();
</script>
</body></html>`;
}

const subject = { "@type": "CafeOrCoffeeShop", name: "Re:Daily Coffee", address: { "@type": "PostalAddress", streetAddress: "Jl. Suryakencana No.71, Pamulang Barat", addressLocality: "Pamulang, Tangerang Selatan", addressRegion: "Banten", postalCode: "15417", addressCountry: "ID" }, geo: { "@type": "GeoCoordinates", latitude: -6.3453705, longitude: 106.735666 }, servesCuisine: "Coffee", priceRange: "Rp14.000-22.000", hasMap: MAPS };
const page = (name, url, desc) => ({ "@context": "https://schema.org", "@type": "WebPage", name, url: SITE + url, description: desc, inLanguage: "id", mainEntity: { ...subject, url: SITE + "/" }, isPartOf: { "@type": "WebSite", name: "Re:Daily", url: SITE + "/" } });
const card = ([n, pr, d]) => `<article class="card"><span class="price">${pr}k</span><h3>${esc(n)}</h3><p>${esc(d)}</p></article>`;
const LOCAL = process.env.LOCAL_PREVIEW === "1";
// Link internal dibuat relatif supaya situs jalan di domain root maupun sub-path (mis. fakrl.github.io/nama-repo/).
// LOCAL_PREVIEW=1 menambah index.html untuk dibuka langsung dari file. 404.html dibiarkan absolut.
const rel = (f, c) => {
  if (!f.endsWith(".html") || f === "404.html") return c;
  const pre = "../".repeat(f.split("/").length - 1) || "./";
  return c
    .replace(/(href|src)="\/(?!\/)([^"#]*)(#[^"]*)?"/g, (m, a, p, h) => `${a}="${pre}${LOCAL && (p === "" || p.endsWith("/")) ? p + "index.html" : p}${h || ""}"`)
    .replace(/url\(\/(?!\/)/g, `url(${pre}`);
};
const w = (f, c) => { fs.mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true }); fs.writeFileSync(path.join(OUT, f), rel(f, c)); };

fs.rmSync(OUT, { recursive: true, force: true });

// Beranda
const homeDesc = "Re:Daily Coffee, kedai kopi di Pamulang, Tangerang Selatan. Menu kopi dan non-kopi mulai Rp14 ribu, tempat tenang buat nyore atau nugas.";
w("index.html", shell({
  title: "Re:Daily Coffee Pamulang | Kopi tenang di Tangerang Selatan", description: homeDesc, path: "/", active: "home",
  ld: page("Re:Daily Coffee Pamulang", "/", homeDesc),
  body: `<div class="bgsec"${bgStyle(HERO, "50% 80%")}><div class="wrap">
<div class="hero"><div>
<span class="eyebrow"><span class="msym" style="font-size:1.1em">local_cafe</span> Kedai kopi &middot; Pamulang</span>
<h1>Re<i>:</i>Daily<br>Coffee</h1>
<p class="lead">Kopi yang enak buat nyore, tempat yang tenang buat nugas. Letaknya nggak jauh dari pinggir jalan, tapi tetap adem buat ngobrol atau fokus.</p>
<div class="cta"><a class="btn p" href="/menu/"><span class="msym">menu_book</span> Lihat menu</a><a class="btn" href="/lokasi/"><span class="msym">near_me</span> Cara ke sini</a></div>
<div class="chips"><span class="chip"><span class="msym">chair</span> Makan di tempat</span><span class="chip"><span class="msym">directions_car</span> Drive-through</span><span class="chip"><span class="msym">delivery_dining</span> Pesan antar</span></div>
</div><div class="cup" role="img" aria-label="Ilustrasi cangkir kopi">${CUP}</div></div>
</div></div>
<div class="wrap">
<div class="marq" aria-hidden="true"><div>${"<span>Re<b>:</b>Daily</span><span>Signature</span><span>Coffee Series</span><span>Black Series</span><span>Creamy Series</span><span>Snack</span>".repeat(4)}</div></div>
<section><div class="sh"><div><h2>Andalan di sini</h2></div></div>
<div class="grid">${MENU[0].items.map(card).join("")}</div>
<div class="cats">${MENU.slice(1).map((c) => { const pr = c.items.map((i) => i[1]); return `<a class="cat" href="/menu/#${c.id}"><b>${esc(c.name)}</b><span>${Math.min(...pr)}-${Math.max(...pr)}k &middot; ${c.items.length} menu</span></a>`; }).join("")}</div>
<p style="margin-top:22px"><a class="btn" href="/menu/">Menu lengkap &rarr;</a></p></section>
</div><div class="bgsec dark"${bgStyle(BG3, "center 55%")}><div class="wrap"><section class="rvs"><div class="rvsum"><h2>Kata pengunjung</h2><div class="rate" aria-label="Rating 4,8 dari 5"><b>4,8</b><div><span class="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><small>8 ulasan di Google Maps</small></div></div><a class="btn lt" href="${MAPS}" rel="noopener">Lihat semua ulasan</a></div>
<div class="rvlist">${REVIEWS.map(([q, n], i) => `<figure class="rvc"><span class="av av${i % 3}" aria-hidden="true">${esc(n.charAt(0))}</span><div><blockquote>${esc(q)}</blockquote><figcaption><b>${esc(n)}</b><small>Google Maps</small></figcaption></div></figure>`).join("")}</div></section>
<section><div class="sh"><div><h2>Mampir ke Re:Daily</h2></div></div>
<div class="info"><div class="box"><h3>Alamat</h3><p>${esc(ADDR)}</p><p style="margin-top:12px"><a class="btn" href="${MAPS}" rel="noopener">Buka di Google Maps</a></p></div><div class="box"><h3>Jam buka</h3><p>10.00 - 00.00</p><p style="margin-top:8px"><a href="/lokasi/" style="font-weight:600">Detail lokasi &rarr;</a></p></div></div>
<div class="map" style="margin-top:18px;border-color:#f6efe4"><iframe title="Peta Re:Daily Coffee" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=-6.3453705,106.735666&hl=id&z=17&output=embed"></iframe></div></section></div></div>`,
}));

// Menu
const menuDesc = "Daftar menu Re:Daily Coffee Pamulang: signature, coffee series, black series, creamy series, dan snack. Harga mulai Rp14 ribu.";
w("menu/index.html", shell({
  title: "Menu & Harga Re:Daily Coffee Pamulang", description: menuDesc, path: "/menu/", active: "menu",
  ld: page("Menu Re:Daily Coffee", "/menu/", menuDesc),
  body: `<div class="wrap"><section><div class="sh"><div><h1 style="font-size:clamp(2.2rem,6vw,3.4rem);line-height:1.05">Menu</h1></div><p>Harga dalam ribu rupiah.</p></div>
${MENU.map((c) => `<div class="menu" id="${c.id}"><header><h2>${esc(c.name)}</h2><span>${esc(c.note)}</span></header>${c.items.map(([n, pr, d]) => `<div class="row"><div class="t"><b>${esc(n)}</b><i></i><em>${pr}k</em></div><p>${esc(d)}</p></div>`).join("")}</div>`).join("")}
</section></div>`,
}));

// Lokasi
const lokDesc = "Lokasi Re:Daily Coffee di Jl. Suryakencana No.71, Pamulang Barat, Tangerang Selatan. Alamat, jam buka, dan cara ke sana.";
w("lokasi/index.html", shell({
  title: "Lokasi & Jam Buka Re:Daily Coffee Pamulang", description: lokDesc, path: "/lokasi/", active: "lokasi",
  ld: page("Lokasi Re:Daily Coffee", "/lokasi/", lokDesc),
  body: `<div class="wrap"><section><div class="sh"><div><h1 style="font-size:clamp(2.2rem,6vw,3.4rem);line-height:1.05">Lokasi</h1></div></div>
<div class="map"><iframe title="Peta Re:Daily Coffee" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=-6.3453705,106.735666&hl=id&z=17&output=embed"></iframe></div>
<div class="info" style="margin-top:22px"><div class="box"><h3>Alamat</h3><p>${esc(ADDR)}</p><p style="margin-top:8px">Plus Code: MP3P+V7</p><p style="margin-top:12px"><a class="btn p" href="${MAPS}" rel="noopener"><span class="msym">near_me</span> Petunjuk arah</a></p></div>
<div class="box"><h3>Jam buka</h3><p>10.00 - 00.00</p></div>
<div class="box"><h3>Layanan</h3><ul><li>Makan di tempat</li><li>Drive-through</li><li>Pesan antar</li></ul></div></div>
</section></div>`,
}));

w("404.html", shell({ title: "404 | Re:Daily", description: "Halaman tidak ditemukan", path: "/404.html", active: "", noindex: true, ld: { "@context": "https://schema.org", "@type": "WebPage", name: "404" }, body: `<div class="wrap"><section><h1 style="font-size:3rem">404</h1><p style="margin:10px 0 20px;color:var(--sec)">Halaman nggak ketemu.</p><a class="btn p" href="/">Ke beranda</a></section></div>` }));

const today = new Date().toISOString().slice(0, 10);
w("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/menu/", "/lokasi/"].map((u) => `<url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
fs.cpSync(path.join(__dirname, "static"), OUT, { recursive: true });
console.log("built re-daily -> dist/");
