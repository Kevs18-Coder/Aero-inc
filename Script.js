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
  const modalEl = document.getElementById("modal");
  if (!modalEl) return;

  document.getElementById("shipName").innerText = name;
  document.getElementById("shipInfo").innerText =
    `Price: $${price.toLocaleString()} | Capacity: ${capacity}`;
  modalEl.style.display = "flex";
}

function closeModal() {
  const modalEl = document.getElementById("modal");
  if (!modalEl) return;

  modalEl.style.display = "none";
}

/* =========================
   GALLERY FILTER FUNCTION
   ========================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Highlight active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = ""; // reset to default CSS grid
      } else {
        item.style.display = "none";
      }
    });
  });
});

/* =========================
   GALLERY IMAGE MODAL
   ========================= */
const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.querySelector(".close-modal");

if (imageModal && modalImg && modalText) {
  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      imageModal.style.display = "flex";
      modalImg.src = img.src;
      modalText.innerText = img.alt;
    });
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    imageModal.style.display = "none";
  });
}

window.addEventListener("click", e => {
  if (e.target === imageModal) {
    imageModal.style.display = "none";
  }
});

/* =========================
   PRODUCT MODAL BACK ARROW
   ========================= */
const backArrow = document.getElementById("backArrow");
if (backArrow) {
  backArrow.addEventListener("click", () => {
    closeModal();
  });
}

/* =========================
   BOOK NOW FUNCTION
   ========================= */
const bookBtn = document.querySelector(".modal .btn");
if (bookBtn) {
  bookBtn.addEventListener("click", () => {
    const shipName = document.getElementById("shipName").innerText;
    const date = document.getElementById("bookingDate").value;
    const passengers = document.getElementById("bookingPassengers").value;
    const fullName = document.getElementById("bookingFullName").value;
    const payment = document.getElementById("bookingPayment").value;


    if (!date || !passengers || !fullName) {
      alert("Please fill all fields!");
      return;
    }

    fetch('book.php', {   // <-- siguraduhin path sa book.php tama
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `shipName=${encodeURIComponent(shipName)}&date=${encodeURIComponent(date)}&passengers=${encodeURIComponent(passengers)}&fullName=${encodeURIComponent(fullName)}&payment=${encodeURIComponent(payment)}`
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if(data.status === 'success') {
        closeModal();
      }
    })
    .catch(err => alert("Error saving booking."));
  });
}
