console.log("Aero website loaded successfully.");

/* =========================
   STARS BACKGROUND ANIMATION
   ========================= */
const starCount = 300;
const body = document.body;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.left = Math.random() * window.innerWidth + "px";

  const size = Math.random() * 2 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.opacity = Math.random() * 0.8 + 0.2;

  star.style.position = "fixed";
  star.style.background = "white";
  star.style.borderRadius = "50%";
  star.style.pointerEvents = "none";

  const speed = Math.random() * 20 + 10; // 10s–30s
  star.style.animation = `starMove ${speed}s linear infinite`;

  body.appendChild(star);
}

/* =========================
   PRODUCT BOOKING MODAL
   ========================= */
function openModal(name, price, capacity) {
  document.getElementById("shipName").innerText = name;
  document.getElementById("shipInfo").innerText =
    `Price: $${price.toLocaleString()} | Capacity: ${capacity}`;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* =========================
   GALLERY FILTER FUNCTION
   ========================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    // Active button highlight
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

/* =========================
   GALLERY IMAGE MODAL
   ========================= */
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.querySelector(".close-modal");

if (modal && modalImg && modalText) {
  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      modalText.innerText = img.alt;
    });
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
