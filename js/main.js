/**
 * Vsnexos Tech — Premium landing interactions
 * GSAP + ScrollTrigger | AOS | Three.js hero particles
 */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth <= 480;

  /* ---------- Page loader ---------- */
  const loader = document.getElementById("page-loader");
  function hideLoader() {
    if (!loader) return;
    loader.classList.add("is-done");
    document.body.style.overflow = "";
  }

  document.body.style.overflow = "hidden";
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(hideLoader, prefersReducedMotion ? 0 : 150);
  });
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 1500);

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Scroll progress ---------- */
  const scrollProgress = document.getElementById("scroll-progress");
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    scrollProgress.style.width = `${Math.min(100, Math.max(0, scrolled * 100))}%`;
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------- Sticky header ---------- */
  const header = document.getElementById("site-header");
  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Modern Mobile Navigation - Dropdown Style ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  
  if (navToggle && mobileNav) {
    // Add animation classes
    function openDrawer() {
      mobileNav.removeAttribute("hidden");
      navToggle.setAttribute("aria-expanded", "true");
      
      // Trigger animations
      setTimeout(() => {
        mobileNav.classList.add("is-open");
      }, 10);
    }

    function closeDrawer() {
      mobileNav.classList.remove("is-open");
      setTimeout(() => {
        mobileNav.setAttribute("hidden", "");
        navToggle.setAttribute("aria-expanded", "false");
      }, 300); // Match animation duration
    }

    navToggle.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden");
      if (open) openDrawer();
      else closeDrawer();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileNav.hasAttribute("hidden") && 
          !mobileNav.contains(e.target) && 
          !navToggle.contains(e.target)) {
        closeDrawer();
      }
    });

    // Handle menu item clicks with smooth scrolling
    mobileNav.querySelectorAll(".mobile-nav__item:not([target='_blank'])").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        
        // Update active state
        mobileNav.querySelectorAll(".mobile-nav__item").forEach(item => {
          item.classList.remove("is-active");
        });
        link.classList.add("is-active");
        
        // Close the menu first
        closeDrawer();
        
        // Smooth scroll to section after menu closes with pixel-perfect alignment
        setTimeout(() => {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            // Get header height dynamically
            const headerHeight = window.innerWidth <= 480 ? 63 : 83;
            
            // Calculate exact position
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            
            // Scroll with perfect alignment
            window.scrollTo({
              top: offsetPosition,
              behavior: prefersReducedMotion ? "auto" : "smooth"
            });
          }
        }, 350);
      });
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileNav.hasAttribute("hidden")) {
        closeDrawer();
      }
    });

    // Set initial active state based on current page
    const currentPage = window.location.hash || "#hero";
    const activeItem = mobileNav.querySelector(`.mobile-nav__item[href="${currentPage}"]`);
    if (activeItem) {
      activeItem.classList.add("is-active");
    }
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById("back-to-top");
  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.hidden = false;
    } else {
      backToTop.hidden = true;
    }
  }
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------- AOS ---------- */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: prefersReducedMotion
    });
  }

  /* ---------- GSAP hero + timeline ---------- */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const heroContent = document.querySelector(".hero__content");
    const heroVisual = document.querySelector(".hero__visual");

    if (!prefersReducedMotion && heroContent && heroVisual) {
      gsap.from(heroContent.children, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(heroVisual, {
        opacity: 0,
        x: 40,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.35
      });
    }

    const workSteps = document.querySelectorAll(".work-step");
    if (!prefersReducedMotion && workSteps.length) {
      gsap.from(workSteps, {
        scrollTrigger: {
          trigger: "#how-we-work-timeline",
          start: "top 82%"
        },
        opacity: 0,
        y: 26,
        stagger: 0.08,
        duration: 0.65,
        ease: "power2.out"
      });

      const timelineLine = document.getElementById("how-we-work-line");
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0, opacity: 0.35 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#how-we-work-timeline",
              start: "top 80%"
            }
          }
        );
      }
    }

    /* Parallax hero shapes - DISABLED to prevent jittering layout shifts per user request */
    const shapes = document.querySelector(".floating-shapes");
    if (!prefersReducedMotion && shapes && !isMobile) {
      // Disabled parallax y-shift to keep hero statically pinned without jumping
    }
  }

  /* ---------- Service cards: spotlight glow ---------- */
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });

  /* ---------- How We Work cards: spotlight glow ---------- */
  document.querySelectorAll(".work-step").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });

  /* ---------- Three.js particle background ---------- */
  function initParticles(canvas) {
    if (typeof THREE === "undefined" || !canvas || prefersReducedMotion || isMobile) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.z = 120;

    const count = 900;
    const positions = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 240;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.9,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize() {
      const w = canvas.clientWidth || canvas.parentElement.clientWidth;
      const h = canvas.clientHeight || canvas.parentElement.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    let rafId = 0;
    let t = 0;
    let running = false;
    let inViewport = true;

    function animate() {
      if (!running || !inViewport) return;
      rafId = requestAnimationFrame(animate);
      t += 0.00035;
      points.rotation.y = t * 8;
      points.rotation.x = Math.sin(t * 4) * 0.08;
      renderer.render(scene, camera);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    const io = new IntersectionObserver((entries) => {
      inViewport = entries[0].isIntersecting;
      if (inViewport && running) {
        animate();
      } else {
        cancelAnimationFrame(rafId);
      }
    }, { threshold: 0 });
    io.observe(canvas);

    running = !document.hidden;
    if (running) animate();

    document.addEventListener(
      "visibilitychange",
      () => {
        running = !document.hidden;
        if (running && inViewport) {
          animate();
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { passive: true }
    );
  }

  const particleCanvases = document.querySelectorAll(".particle-canvas, #hero-canvas");
  particleCanvases.forEach(canvas => initParticles(canvas));


  /* ---------- Circular Workflow Controller ---------- */
  const workflowNodes = document.querySelectorAll(".workflow-node");
  const detailTitle = document.getElementById("workflow-detail-title");
  const detailDesc = document.getElementById("workflow-detail-desc");
  const mobileTitle = document.getElementById("workflow-mobile-title");
  const mobileDesc = document.getElementById("workflow-mobile-desc");
  const workflowContainer = document.getElementById("workflow-circle");
  const workflowCircle = document.querySelector(".workflow-circle");
  
  if (workflowNodes.length > 0 && workflowCircle && workflowContainer) {
    function updateDetails(node) {
      if (node.classList.contains("active")) return;
      
      const title = node.getAttribute("data-title");
      const desc = node.getAttribute("data-desc");
      
      workflowNodes.forEach(n => n.classList.remove("active"));
      node.classList.add("active");

      // Update Desktop text
      if (detailTitle) detailTitle.textContent = title;
      if (detailDesc) detailDesc.textContent = desc;
      
      // Update Mobile text
      if (mobileTitle) mobileTitle.textContent = title;
      if (mobileDesc) mobileDesc.textContent = desc;

      const mobileCard = document.getElementById("workflow-mobile-details");
      if (mobileCard) {
        mobileCard.hidden = false;
        mobileCard.style.animation = "none";
        mobileCard.offsetHeight; /* trigger reflow */
        mobileCard.style.animation = "fadeUp 0.35s ease forwards";
      }
    }

    workflowNodes.forEach(node => {
      node.addEventListener("mouseenter", () => updateDetails(node));
      node.addEventListener("click", () => updateDetails(node));
      node.addEventListener("touchstart", () => updateDetails(node), { passive: true });
    });

    // Interaction / Drag Logic
    let isDragging = false;
    let startAngle = 0;
    let currentHtmlRotation = 0; 
    let centerX, centerY;
    let interactionTimeout;

    function getAngle(x, y) {
      return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    }

    workflowCircle.addEventListener("pointerdown", (e) => {
      if (!e.isPrimary) return;
      isDragging = true;
      workflowContainer.classList.add("is-paused");
      clearTimeout(interactionTimeout);
      
      const rect = workflowCircle.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
      
      startAngle = getAngle(e.clientX, e.clientY);
      workflowCircle.setPointerCapture(e.pointerId);
    });

    workflowCircle.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const angle = getAngle(e.clientX, e.clientY);
      let angleDiff = angle - startAngle;
      
      // Handle the wrapping across the -180/180 boundary
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      
      currentHtmlRotation += angleDiff;
      startAngle = angle;
      
      // Updates purely the CSS variable hooked directly into keyframes
      workflowContainer.style.setProperty("--manual-rot", `${currentHtmlRotation}deg`);
    });

    function stopDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      workflowCircle.releasePointerCapture(e.pointerId);
      
      interactionTimeout = setTimeout(() => {
        workflowContainer.classList.remove("is-paused");
      }, 2500);
    }

    workflowCircle.addEventListener("pointerup", stopDrag);
    workflowCircle.addEventListener("pointercancel", stopDrag);
    
    // Auto Initialization
    updateDetails(workflowNodes[0]);
  }

  /* ---------- Contact form (Formspree + mailto fallback) ---------- */
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = /** @type {HTMLInputElement} */ (form.querySelector("#name"));
    const email = /** @type {HTMLInputElement} */ (form.querySelector("#email"));
    const phone = /** @type {HTMLInputElement} */ (form.querySelector("#phone"));
    const serviceType = /** @type {HTMLSelectElement} */ (form.querySelector("#service_type"));
    const message = /** @type {HTMLTextAreaElement} */ (form.querySelector("#message"));

    if (
      !name?.value.trim() ||
      !email?.value.trim() ||
      !phone?.value.trim() ||
      !serviceType?.value.trim() ||
      !message?.value.trim()
    ) {
      if (formStatus) {
        formStatus.textContent = "Please complete all required fields.";
        formStatus.className = "contact-form__fineprint is-error";
      }
      return;
    }

    const subject = encodeURIComponent(`Inquiry from ${name.value}`);
    const body = encodeURIComponent(
      `Name: ${name.value}\nEmail: ${email.value}\nMobile: ${phone.value}\nService: ${serviceType.value}\n\nMessage:\n${message.value}`
    );
    const mailto = `mailto:vsnexostech@gmail.com?subject=${subject}&body=${body}`;

    const endpoint = String(
      (window.FORMSPREE_ENDPOINT ||
        window.endformpoint ||
        window.END_FORM_ENDPOINT ||
        "")
    ).trim();

    // If endpoint is not configured, keep mailto fallback so the form still works.
    if (!endpoint) {
      window.location.href = mailto;
      if (formStatus) {
        formStatus.textContent =
          "Your email client should open. If not, email vsnexostech@gmail.com directly.";
        formStatus.className = "contact-form__fineprint is-success";
      }
      return;
    }

    const formData = new FormData(form);
    if (formStatus) {
      formStatus.textContent = "Submitting your inquiry...";
      formStatus.className = "contact-form__fineprint";
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Formspree request failed: ${res.status}`);
        }
        // Formspree sometimes returns JSON, sometimes empty; both are fine.
        try {
          await res.json();
        } catch {
          // ignore parse errors
        }
      })
      .then(() => {
        form.reset();
        if (formStatus) {
          formStatus.textContent =
            "Thank you. Your project inquiry has been submitted successfully.";
          formStatus.className = "contact-form__fineprint is-success";
        }
      })
      .catch(() => {
        // If submission fails, show error and provide mailto as a reliable fallback.
        if (formStatus) {
          formStatus.textContent =
            "Submission failed. Please try again, or email us directly at vsnexostech@gmail.com.";
          formStatus.className = "contact-form__fineprint is-error";
        }
        // Do not automatically navigate to mailto; user can decide.
      });
  });


  /* ---------- Showcase Slider ---------- */
  const sliderTracks = document.querySelectorAll('.showcase-slider__track');
  sliderTracks.forEach(track => {
    const parent = track.closest('.showcase-slider');
    const slides = track.querySelectorAll('.showcase-slider__slide');
    const prevBtn = parent.querySelector('.showcase-slider__btn--prev');
    const nextBtn = parent.querySelector('.showcase-slider__btn--next');
    const dots = parent.querySelectorAll('.showcase-slider__dot');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    if(prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });
    
    // Auto slide every 5.5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, 5500);
  });

})();
