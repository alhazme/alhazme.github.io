const cardMarquee = document.querySelector(".card-marquee");
const cardStrip = cardMarquee.querySelector(".strip");
let cardsVisible = false;

[...cardStrip.children].forEach((card) => {
  const copy = card.cloneNode(true);
  copy.classList.add("tile-repeat");
  copy.setAttribute("aria-hidden", "true");
  cardStrip.append(copy);
});
cardMarquee.classList.add("marquee-enhanced");

const updateCards = () => {
  cardMarquee.classList.toggle("marquee-paused", !cardsVisible || document.hidden);
};

new IntersectionObserver(([entry]) => {
  cardsVisible = entry.isIntersecting;
  updateCards();
}, { threshold: 0.1 }).observe(cardMarquee);
document.addEventListener("visibilitychange", updateCards);
updateCards();
