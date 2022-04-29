import { cards } from "./cards-array.js";
import { getRefs } from "./getRefs.js";
const { filters, gallery } = getRefs();

renderAllCards(cards);

filters.addEventListener("click", (e) => {
  e.preventDefault();

  if (!(e.currentTarget !== e.target)) return;

  const activeElement = document.querySelector(".is-active");
  const currentElement = e.target;
  const currentElementValue = currentElement.dataset.value;

  if (activeElement) {
    activeElement.classList.remove("is-active");
  }

  currentElement.classList.add("is-active");

  if (currentElementValue === "all") {
    renderAllCards(cards);
  } else {
    clearGalleryMarkup();
    renderCard(cards, currentElementValue);
  }
});

function renderAllCards(cardsArray) {
  const markup = makeGalleryMarkup(cardsArray);

  gallery.innerHTML = markup;
}

function renderCard(cardsArray, typeCard) {
  const filter = cardsArray.filter(({ type }) => {
    if (type === typeCard) {
      return type;
    }
  });
  const markup = makeGalleryMarkup(filter);

  gallery.insertAdjacentHTML("beforeend", markup);
}

function makeGalleryMarkup(cardsArray) {
  return cardsArray
    .map(
      ({ src, srcset1200, srcset768, srcset480, alt, cardText, descrText }) => {
        return `<li class="portfolio-item">
            <a href="" class="portfolio-card">
                <div class="card-overlay">
                    <picture>
                        <source
                        srcset="${srcset1200}"
                        media="(min-width:1200px)"/>
                        <source
                        srcset="${srcset768}"
                        media="(min-width:768px)"
                        />
                        <source
                        srcset="${srcset480}"
                        media="(min-width:480px)"
                        />
                        <img
                        class="responsive-list__img"
                        src="${src}"
                        alt="${alt}"
                        />
                    </picture>
                    <p class="card-overlay-text">
                        Технокряк это современная площадка распространения коронавируса. Компании используют эту
                        платформу для цифрового шпионажа и атак на защищённые сервера конкурентов.
                    </p>
                </div>
                <div class="card-description card-description--padding-bottom">
                <h2 class="portfolio-title">${cardText}</h2>
                <p class="portfolio-description">${descrText}</p>
                </div>
            </a>
        </li>
    `;
      }
    )
    .join("");
}

function clearGalleryMarkup() {
  gallery.innerHTML = "";
}
