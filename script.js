(() => {
  const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));

  function closeAll(except) {
    dropdowns.forEach((d) => {
      if (d !== except) {
        d.dataset.open = "false";
        const btn = d.querySelector("button");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    if (!button) return;

    button.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = dropdown.dataset.open === "true";
      closeAll();
      const next = isOpen ? "false" : "true";
      dropdown.dataset.open = next;
      button.setAttribute("aria-expanded", next === "true" ? "true" : "false");
    });

    button.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdown.dataset.open = "false";
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }
    });
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const inside = target.closest("[data-dropdown]");
    if (!inside) closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    const nav = navToggle.closest(".nav");
    navToggle.addEventListener("click", () => {
      const isOpen = nav.dataset.mobileOpen === "true";
      nav.dataset.mobileOpen = isOpen ? "false" : "true";
      navToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
    document.addEventListener("click", (e) => {
      if (!(e.target instanceof Element)) return;
      if (!nav.contains(e.target)) {
        nav.dataset.mobileOpen = "false";
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

