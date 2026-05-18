(function () {
  var header = document.getElementById("top-header");
  var toggleButton = document.querySelector(".toggle-menu");
  var navMenu = document.getElementById("nav-menu");
  var revealItems = document.querySelectorAll("[data-reveal]");

  function updateHeaderState() {
    if (!header) {
      return;
    }

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  function closeMenu() {
    if (!navMenu || !toggleButton) {
      return;
    }
    navMenu.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
  }

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!toggleButton.contains(event.target) && !navMenu.contains(event.target)) {
        closeMenu();
      }
    });
  }

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index * 40, 280) + "ms";
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();
})();
