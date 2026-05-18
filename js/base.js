/**
 * Adiciona top bar e footer dinamicamente em todas as páginas
 */

function iniciarNav() {
  var topBarHTML = [
    '<div class="topbar">',
    '  <div class="logo">',
    '    <a href="/index">',
    '      <span class="material-symbols-outlined">sports</span>',
    "      <span>Esporte.Blog</span>",
    "    </a>",
    "  </div>",
    '  <button class="hamburger" id="hamburger" aria-label="Abrir menu">',
    "    <span></span><span></span><span></span>",
    "  </button>",
    '  <nav class="paths-container" id="nav-menu">',
    '    <span class="home"><a href="/index">Home</a></span>',
    '    <span class="paths">',
    '      <a href="/categorias/futebol">Futebol</a>',
    '      <a href="/categorias/basquete">Basquete</a>',
    '      <a href="/categorias/volei">Vôlei</a>',
    '      <a href="/pages/noticias">Notícias</a>',
    '      <a href="/pages/contatos">Contatos</a>',
    "    </span>",
    "  </nav>",
    "</div>",
  ].join("");

  var header = document.createElement("header");
  header.className = "main-header";
  header.innerHTML = topBarHTML;
  document.body.prepend(header);

  var footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = "<span>Todos os direitos reservados &copy; CC1N, 2023</span>";
  document.body.append(footer);

  var hamburger = document.getElementById("hamburger");
  var navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("open");
      hamburger.classList.toggle("open");
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function () {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        hamburger.classList.remove("open");
      }
    });
  }

  var currentPath = window.location.pathname;
  document.querySelectorAll(".paths a, .home a").forEach(function (link) {
    try {
      var linkPath = new URL(link.href).pathname;
      if (currentPath === linkPath || (currentPath === "/" && linkPath === "/index.html")) {
        link.classList.add("active");
      }
    } catch (e) {}
  });
}

// Guard para garantir execução mesmo com defer + cache quente
if (document.readyState === "loading") {
  window.addEventListener("load", iniciarNav);
} else {
  iniciarNav();
}

// Page exit transition — intercepts internal link clicks and fades out before navigating
(function () {
  var leaving = false;

  // Restore state if browser restores page from bfcache (back/forward)
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      document.body.classList.remove("page-exit");
      leaving = false;
    }
  });

  document.addEventListener("click", function (e) {
    if (leaving) return;

    var link = e.target.closest("a[href]");
    if (!link) return;

    var href = link.getAttribute("href");

    // Skip: external links, anchors, new tab, modifier keys
    if (
      !href ||
      link.target === "_blank" ||
      href.charAt(0) === "#" ||
      href.indexOf("http") === 0 ||
      href.indexOf("mailto:") === 0 ||
      href.indexOf("tel:") === 0 ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey
    )
      return;

    e.preventDefault();
    leaving = true;
    document.body.classList.add("page-exit");

    setTimeout(function () {
      window.location.href = link.href;
    }, 100);
  });
})();
