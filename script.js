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

  function getOverlay() { return document.getElementById("mobileOverlay"); }
  function getInner()   { return document.getElementById("mnoInner"); }

  function openOverlay() {
    const ov = getOverlay();
    if (!ov) return;
    ov.classList.add("is-open");
    ov.setAttribute("aria-hidden", "false");
    document.body.classList.add("overlay-open");
    navToggle?.setAttribute("aria-expanded", "true");
  }

  function closeOverlay() {
    const ov = getOverlay();
    if (!ov) return;
    ov.classList.remove("is-open");
    getInner()?.classList.remove("at-sub");
    ov.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }

  navToggle?.addEventListener("click", openOverlay);

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    const t = e.target;
    if (t.id === "mnoClose" || t.closest("#mnoClose"))   { closeOverlay(); return; }
    if (t.id === "mnoClose2" || t.closest("#mnoClose2")) { closeOverlay(); return; }
    if (t.id === "mnoGoPastResults" || t.closest("#mnoGoPastResults")) {
      getInner()?.classList.add("at-sub"); return;
    }
    if (t.id === "mnoBack" || t.closest("#mnoBack")) {
      getInner()?.classList.remove("at-sub"); return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });
})();

