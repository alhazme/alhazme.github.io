const phone = document.querySelector(".phone");
const previewTrack = phone.querySelector(".phone-track");
let previewVisible = false;

const previewRepeat = previewTrack.firstElementChild.cloneNode(true);
previewRepeat.classList.add("preview-repeat");
previewTrack.append(previewRepeat);
phone.classList.add("preview-enhanced");

const updatePreview = () => {
  phone.classList.toggle("preview-paused", !previewVisible || document.hidden);
};

new IntersectionObserver(([entry]) => {
  previewVisible = entry.isIntersecting;
  updatePreview();
}, { threshold: 0.2 }).observe(phone);
document.addEventListener("visibilitychange", updatePreview);
updatePreview();
