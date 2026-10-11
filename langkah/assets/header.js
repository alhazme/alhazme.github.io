new ResizeObserver(([entry]) => {
  document.documentElement.style.setProperty("--header-height", `${entry.target.offsetHeight}px`);
}).observe(document.querySelector(".site-header"));
