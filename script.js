// PRO interactions: hero slider, gallery lightbox, form -> WhatsApp, reveal animations, footer year
(function () {
  // Hero slider (fade + scale)
  const slides = document.querySelectorAll(".slider .slide");
  let si = 0;
  if (slides.length) {
    slides[si].classList.add("active");
    setInterval(() => {
      slides[si].classList.remove("active");
      si = (si + 1) % slides.length;
      slides[si].classList.add("active");
    }, 3600);
  }

  // Lightbox for gallery
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbClose = document.getElementById("lb-close");
  document.querySelectorAll(".gimg").forEach((img) => {
    img.addEventListener("click", (e) => {
      lbImg.src = e.currentTarget.src;
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
    });
  });
  lbClose.addEventListener("click", () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
  });
  lb.addEventListener("click", (e) => {
    if (e.target === lb) {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
    }
  });

  // Contact form -> WhatsApp
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get("name") || "";
      const phone = fd.get("phone") || "";
      const service = fd.get("service") || "";
      const message = fd.get("message") || "";
      const text = encodeURIComponent(
        `Hello E.S Mobile Works Shop, I am ${name}. Phone: ${phone}. Service: ${service}. ${message}`
      );
      // open WhatsApp
      window.open(`https://wa.me/918999801622?text=${text}`, "_blank");

      // If you enabled Formspree by adding action attribute to form, the browser will post there normally.
    });
  }

  // Intersection reveal (simple)
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.style.opacity = 1;
          ent.target.style.transform = "translateY(0)";
          obs.unobserve(ent.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".card, .service, .gimg").forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(10px)";
    io.observe(el);
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
