const loadingStarted = performance.now();
const pageContent = document.querySelectorAll(".skip, .site-header, main, .closing, .site-footer");
pageContent.forEach((element) => { element.inert = true; });

const finishLoading = () => {
  document.documentElement.classList.remove("is-loading");
  pageContent.forEach((element) => { element.inert = false; });
};

// A failed or stalled image must never keep the page behind the splash.
const loadingTimeout = setTimeout(finishLoading, 3500);
const mascotImages = [...document.querySelectorAll(".loader-buddies img")];
Promise.all(mascotImages.map((img) => img.decode().catch(() => {}))).then(() => {
  const minimum = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 650;
  setTimeout(() => {
    clearTimeout(loadingTimeout);
    finishLoading();
  }, Math.max(0, minimum - (performance.now() - loadingStarted)));
});
