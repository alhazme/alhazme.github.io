const previewImage = document.querySelector(".showcase-phone img");
const previewButtons = document.querySelectorAll("[data-screen]");
let requestedScreen = 0;

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const request = ++requestedScreen;
    const nextImage = new Image();
    nextImage.src = new URL(`${button.dataset.screen}.webp`, previewImage.src).href;
    nextImage.onload = () => {
      if (request !== requestedScreen) return;
      previewImage.src = nextImage.src;
      previewImage.alt = button.dataset.alt;
      document.querySelector(".preview-caption").textContent = button.dataset.alt;
      previewButtons.forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
      });
    };
  });
});

const activityGallery = document.querySelector(".activity-gallery");
const activityTrack = activityGallery.querySelector(".activity-track");
const galleryMotion = document.querySelector(".gallery-motion");
const repeatedActivities = activityTrack.querySelector("ul").cloneNode(true);
repeatedActivities.setAttribute("aria-hidden", "true");
repeatedActivities.querySelectorAll("img").forEach((image) => {
  image.loading = "eager";
});
activityTrack.append(repeatedActivities);
activityGallery.classList.add("is-animated", "is-offscreen");
activityGallery.classList.toggle("is-hidden", document.hidden);
galleryMotion.hidden = false;

new IntersectionObserver(([entry]) => {
  activityGallery.classList.toggle("is-offscreen", !entry.isIntersecting);
}).observe(activityGallery);

document.addEventListener("visibilitychange", () => {
  activityGallery.classList.toggle("is-hidden", document.hidden);
});

galleryMotion.addEventListener("click", () => {
  const paused = activityGallery.classList.toggle("is-paused");
  galleryMotion.textContent = paused ? galleryMotion.dataset.resume : galleryMotion.dataset.pause;
});
