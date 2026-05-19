(function () {
  var header = document.getElementById("top-header");
  var toggleButton = document.querySelector(".toggle-menu");
  var navMenu = document.getElementById("nav-menu");
  var navLinks = navMenu ? navMenu.querySelectorAll('a[href^="#"]') : [];
  var revealItems = document.querySelectorAll("[data-reveal]");
  var toTopButton = document.querySelector(".to-top");

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

  function updateToTopState() {
    if (!toTopButton) {
      return;
    }

    if (window.scrollY > 560) {
      toTopButton.classList.add("is-visible");
    } else {
      toTopButton.classList.remove("is-visible");
    }
  }

  function closeMenu() {
    if (!navMenu || !toggleButton) {
      return;
    }

    navMenu.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
  }

  function setActiveNavLink(sectionId) {
    if (!sectionId || !navLinks.length) {
      return;
    }

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + sectionId;
      link.classList.toggle("active", isActive);
    });
  }

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
        var hash = link.getAttribute("href");
        if (hash && hash.startsWith("#")) {
          setActiveNavLink(hash.slice(1));
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !toggleButton.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 767) {
        closeMenu();
      }
    });
  }

  var sectionNodes = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sectionNodes.length > 0) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveNavLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.1,
      },
    );

    sectionNodes.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index * 40, 280) + "ms";
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var landing = document.querySelector("[data-landing]");
  if (landing) {
    var heroEyebrow = landing.querySelector(".eyebrow");
    var heroTitle = landing.querySelector("h1");
    var heroDescription = landing.querySelector(".hero-description");
    var prevSlideButton = landing.querySelector(".prev-slide");
    var nextSlideButton = landing.querySelector(".next-slide");
    var slideBullets = landing.querySelectorAll(".bullets button[data-slide]");

    var heroSlides = [
      {
        image: "images/landing.jpg",
        eyebrow: "Creative Digital Agency",
        title: "Hello World! We Are Kasper. We Make Art That Performs.",
        description:
          "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
      },
      {
        image: "images/stats.jpg",
        eyebrow: "Built For Growth",
        title: "Sharper Brand Stories, Better Conversion Journeys.",
        description:
          "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus at sem efficitur.",
      },
      {
        image: "images/quote.jpg",
        eyebrow: "Execution Excellence",
        title: "From Vision To Launch: We Craft Digital Products Fast.",
        description:
          "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat.",
      },
    ];

    var currentSlideIndex = 0;
    var autoSlideTimer = null;

    function renderSlide(index) {
      var slide = heroSlides[index];
      if (!slide || !heroEyebrow || !heroTitle || !heroDescription) {
        return;
      }

      landing.style.backgroundImage = 'url("' + slide.image + '")';
      heroEyebrow.textContent = slide.eyebrow;
      heroTitle.textContent = slide.title;
      heroDescription.textContent = slide.description;

      slideBullets.forEach(function (bullet, bulletIndex) {
        bullet.classList.toggle("active", bulletIndex === index);
      });
    }

    function goToSlide(index) {
      var totalSlides = heroSlides.length;
      currentSlideIndex = (index + totalSlides) % totalSlides;
      renderSlide(currentSlideIndex);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        window.clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = window.setInterval(function () {
        goToSlide(currentSlideIndex + 1);
      }, 6500);
    }

    if (prevSlideButton) {
      prevSlideButton.addEventListener("click", function () {
        goToSlide(currentSlideIndex - 1);
        startAutoSlide();
      });
    }

    if (nextSlideButton) {
      nextSlideButton.addEventListener("click", function () {
        goToSlide(currentSlideIndex + 1);
        startAutoSlide();
      });
    }

    slideBullets.forEach(function (bullet) {
      bullet.addEventListener("click", function () {
        var slideIndex = Number(bullet.getAttribute("data-slide"));
        if (!Number.isNaN(slideIndex)) {
          goToSlide(slideIndex);
          startAutoSlide();
        }
      });
    });

    landing.addEventListener("mouseenter", stopAutoSlide);
    landing.addEventListener("mouseleave", startAutoSlide);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });

    renderSlide(currentSlideIndex);
    startAutoSlide();
  }

  var promoVideo = document.querySelector(".promo-video");
  if (promoVideo) {
    var videoSection = promoVideo.closest(".video");

    function setVideoFallbackState() {
      if (!videoSection) {
        return;
      }

      videoSection.classList.add("is-fallback");
      promoVideo.pause();
      var source = promoVideo.querySelector("source");
      if (source) {
        source.removeAttribute("src");
      }
      promoVideo.load();
    }

    promoVideo.addEventListener("error", setVideoFallbackState, {
      once: true,
    });
    var videoSource = promoVideo.querySelector("source");
    if (videoSource) {
      videoSource.addEventListener("error", setVideoFallbackState, {
        once: true,
      });
    }
  }

  var filterButtons = document.querySelectorAll(
    ".portfolio .shuffle button[data-filter]",
  );
  var portfolioItems = document.querySelectorAll(
    ".portfolio .imgs-container .box[data-category]",
  );

  function applyPortfolioFilter(filterValue) {
    portfolioItems.forEach(function (item) {
      var category = item.getAttribute("data-category");
      var matchesFilter = filterValue === "all" || category === filterValue;
      item.classList.toggle("is-hidden", !matchesFilter);
    });
  }

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var selectedFilter = button.getAttribute("data-filter") || "all";
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        button.classList.add("active");
        applyPortfolioFilter(selectedFilter);
      });
    });
  }

  var testimonialsBlock = document.querySelector(".testimonials");
  if (testimonialsBlock) {
    var testimonialSlides =
      testimonialsBlock.querySelectorAll(".testimonial-slide");
    var testimonialBullets = testimonialsBlock.querySelectorAll(
      ".bullets button[data-testimonial-to]",
    );
    var testimonialInterval = Number(
      testimonialsBlock.getAttribute("data-slider-interval"),
    );
    var currentTestimonialIndex = 0;
    var testimonialTimer = null;

    if (!Number.isFinite(testimonialInterval) || testimonialInterval < 1500) {
      testimonialInterval = 5500;
    }

    function renderTestimonial(index) {
      testimonialSlides.forEach(function (slide, slideIndex) {
        var isActive = slideIndex === index;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      testimonialBullets.forEach(function (bullet, bulletIndex) {
        bullet.classList.toggle("active", bulletIndex === index);
      });
    }

    function goToTestimonial(index) {
      var totalSlides = testimonialSlides.length;
      if (totalSlides === 0) {
        return;
      }

      currentTestimonialIndex = (index + totalSlides) % totalSlides;
      renderTestimonial(currentTestimonialIndex);
    }

    function stopTestimonialAutoPlay() {
      if (testimonialTimer) {
        window.clearInterval(testimonialTimer);
        testimonialTimer = null;
      }
    }

    function startTestimonialAutoPlay() {
      stopTestimonialAutoPlay();
      if (testimonialSlides.length < 2) {
        return;
      }

      testimonialTimer = window.setInterval(function () {
        goToTestimonial(currentTestimonialIndex + 1);
      }, testimonialInterval);
    }

    testimonialBullets.forEach(function (bullet) {
      bullet.addEventListener("click", function () {
        var targetIndex = Number(bullet.getAttribute("data-testimonial-to"));
        if (!Number.isNaN(targetIndex)) {
          goToTestimonial(targetIndex);
          startTestimonialAutoPlay();
        }
      });
    });

    testimonialsBlock.addEventListener("mouseenter", stopTestimonialAutoPlay);
    testimonialsBlock.addEventListener("mouseleave", startTestimonialAutoPlay);
    testimonialsBlock.addEventListener("focusin", stopTestimonialAutoPlay);
    testimonialsBlock.addEventListener("focusout", startTestimonialAutoPlay);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopTestimonialAutoPlay();
      } else {
        startTestimonialAutoPlay();
      }
    });

    goToTestimonial(0);
    startTestimonialAutoPlay();
  }

  function animateCounter(numberElement, targetNumber) {
    var animationDuration = 1400;
    var startTimestamp = null;

    function step(timestamp) {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }

      var progress = Math.min(
        (timestamp - startTimestamp) / animationDuration,
        1,
      );
      var currentValue = Math.floor(progress * targetNumber);
      numberElement.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        numberElement.textContent = targetNumber.toLocaleString();
      }
    }

    window.requestAnimationFrame(step);
  }

  var statsSection = document.querySelector(".stats");
  var statNumbers = document.querySelectorAll(".stats .number[data-target]");

  if (statsSection && statNumbers.length > 0) {
    if ("IntersectionObserver" in window) {
      var hasAnimatedStats = false;
      var statsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasAnimatedStats) {
              hasAnimatedStats = true;
              statNumbers.forEach(function (numberElement) {
                var target = Number(numberElement.getAttribute("data-target"));
                if (!Number.isNaN(target)) {
                  animateCounter(numberElement, target);
                }
              });
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 },
      );

      statsObserver.observe(statsSection);
    } else {
      statNumbers.forEach(function (numberElement) {
        var target = Number(numberElement.getAttribute("data-target"));
        if (!Number.isNaN(target)) {
          numberElement.textContent = target.toLocaleString();
        }
      });
    }
  }

  var skillsPanel = document.querySelector(".skills");
  var skillBars = document.querySelectorAll(".skills .prog span[data-target]");

  function animateSkillBars() {
    skillBars.forEach(function (bar) {
      var targetWidth = bar.getAttribute("data-target") || "0";
      bar.style.width = targetWidth;
    });
  }

  if (skillsPanel && skillBars.length > 0) {
    if ("IntersectionObserver" in window) {
      var hasAnimatedSkills = false;
      var skillsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasAnimatedSkills) {
              hasAnimatedSkills = true;
              animateSkillBars();
              skillsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );

      skillsObserver.observe(skillsPanel);
    } else {
      animateSkillBars();
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setFormFeedback(feedbackElement, message, isSuccess) {
    if (!feedbackElement) {
      return;
    }

    feedbackElement.textContent = message;
    feedbackElement.classList.remove("is-success", "is-error");
    if (message) {
      feedbackElement.classList.add(isSuccess ? "is-success" : "is-error");
    }
  }

  var subscribeForm = document.getElementById("subscribe-form");
  var subscribeEmail = document.getElementById("subscribe-email");
  var subscribeFeedback = document.getElementById("subscribe-feedback");

  if (subscribeForm && subscribeEmail) {
    subscribeEmail.addEventListener("input", function () {
      subscribeEmail.classList.remove("is-error");
      setFormFeedback(subscribeFeedback, "", false);
    });

    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var emailValue = subscribeEmail.value.trim();

      if (!isValidEmail(emailValue)) {
        subscribeEmail.classList.add("is-error");
        setFormFeedback(
          subscribeFeedback,
          "Please enter a valid email address.",
          false,
        );
        return;
      }

      subscribeEmail.classList.remove("is-error");
      subscribeForm.reset();
      setFormFeedback(
        subscribeFeedback,
        "Thanks for subscribing. We will reach out soon.",
        true,
      );
    });
  }

  var contactForm = document.getElementById("contact-form");
  var contactName = document.getElementById("contact-name");
  var contactEmail = document.getElementById("contact-email");
  var contactMessage = document.getElementById("contact-message");
  var contactFeedback = document.getElementById("contact-feedback");

  if (contactForm && contactName && contactEmail && contactMessage) {
    [contactName, contactEmail, contactMessage].forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("is-error");
        setFormFeedback(contactFeedback, "", false);
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var nameValue = contactName.value.trim();
      var emailValue = contactEmail.value.trim();
      var messageValue = contactMessage.value.trim();
      var hasError = false;

      if (!nameValue) {
        contactName.classList.add("is-error");
        hasError = true;
      }

      if (!isValidEmail(emailValue)) {
        contactEmail.classList.add("is-error");
        hasError = true;
      }

      if (!messageValue) {
        contactMessage.classList.add("is-error");
        hasError = true;
      }

      if (hasError) {
        setFormFeedback(
          contactFeedback,
          "Please complete all fields with valid information.",
          false,
        );
        return;
      }

      contactForm.reset();
      setFormFeedback(
        contactFeedback,
        "Message sent successfully. We will get back to you soon.",
        true,
      );
    });
  }

  if (toTopButton) {
    toTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var yearElement = document.querySelector(".year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  window.addEventListener(
    "scroll",
    function () {
      updateHeaderState();
      updateToTopState();
    },
    { passive: true },
  );

  updateHeaderState();
  updateToTopState();
})();
