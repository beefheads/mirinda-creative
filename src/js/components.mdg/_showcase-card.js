// import {preloadImages} from '../b_helpers/action-helpers.js';

window.addEventListener('DOMContentLoaded', (event) => {
	const cards = [...document.querySelectorAll('.showcase-card')];

	if (cards.length < 1) return;

	// preloadImages()

	const CARDS_CLASSES = {
		ajaxInited: 'showcase-card--ajax-inited',
	}

	const DROP_CLASSES = {
		enter: 'slide-drop--enter',
		active: 'slide-drop--active',
	}

	cards.forEach((card) => {
		initCard(card);
	});

	function handleCardClick(e) {
		e.preventDefault();
		const currentCard = e.target.closest('.showcase-card');
		growDrop(currentCard);
	}

	function hideProductList() {
		if (!document.querySelector('main > .section.showcase')) return;
		document.querySelector('main > .section.showcase').classList.add('is-hidden');
	}

	function growDrop(currentCard) {
		const drop = document.querySelector('.slide-drop:last-child');
		const theme = currentCard.dataset.theme

		drop.classList.add(DROP_CLASSES.enter);
		drop.dataset.theme = theme;

		const footer = document.querySelector('.footer');
		footer.classList.add('is-transparent')

		setTimeout(() => {
			drop.classList.add(DROP_CLASSES.active);

			hideProductList();
			document.body.classList.remove('page-home');
			footer.classList.remove('is-transparent')
		}, 1400);

		setTimeout(() => {
			const zIndex = 5 + [...document.querySelectorAll('.slide-drop')].length;

			if (currentCard.classList.contains('showcase-card--cocktail')) {
				const cocktail = window.products[theme].cocktail;
				spawnCocktail(cocktail, zIndex);
			} else {
				spawnProduct(theme, zIndex);
			}

			spawnDrop(zIndex + 1);
			document.body.dataset.theme = theme;
		}, 1000)


	}

	function spawnDrop(zIndex) {
		const drop = `
			<div class="slide-drop" style="z-index: ${zIndex};">
				<div class="slide-drop__inner">
					<div class="slide-drop__content"></div>
					<div class="slide-drop__paper"></div>
					<div class="slide-drop__glow"></div>
					<div class="slide-drop__blink"></div>
				</div>
			</div>
		`;
		const dropContainer = document.querySelector('.slide-drop-container');

		dropContainer.innerHTML += drop;

	}

	function initCard(card) {
		if (card.classList.contains(CARDS_CLASSES.ajaxInited)) return;

		const button = card.querySelector('.showcase-card__button')
		button.addEventListener('click', handleCardClick);
		const drop = document.querySelector('.slide-drop-container .slide-drop:last-child');
		card.addEventListener('mouseover', () => {
			drop.dataset.theme = card.dataset.theme;
		});
		card.addEventListener('mouseleave', () => {
			// drop.removeAttribute('data-theme');
		})

		card.classList.add(CARDS_CLASSES.ajaxInited);
	}

	function getProductSection(productName) {
		if (typeof window.products[productName] == 'undefined') {
			console.warn(`No such product "${productName}"`);
			return false;
		}
		const {title, desc, related, cocktail, degrees} = window.products[productName];

		let productSection = `
			<section class="section product">
			  <div class="container product__container">
			    <div class="product__hero">
			      <p class="product__hero-name">
			        <span class="product__hero-name-text">${title}</span>
			      </p>
			      <div class="product__media">
			        <picture class="product__media-pic">
			          <source srcset="./img/${productName}/product.webp" type="image/webp">
			          <img src="./img/${productName}/product.png" alt="MAD DOG VODKA ${title}" class="product__media-img">
			        </picture>
			        <div class="product__media-decor-1" style="background-image: url('./img/${productName}/${productName}.png');"></div>
		`;

					    if (typeof hide_ice == 'undefined') {
					    	productSection += `<div class="product__media-decor-2" style="background-image: url('./img/${productName}/ice-1.png');"></div>`
					    }

					    if (typeof hide_ice == 'undefined') {
					    	productSection += `<div class="product__media-decor-3" style="background-image: url('./img/${productName}/ice-2.png');"></div>`;
					    }

    productSection +=
    `
			      </div>
			    </div>
			    <div class="product__details">
			      <div class="product__details-tabs">
			        <button class="button-paper product__details-tabs-button product__details-tabs-button--active" type="button">
			          <span class="button__text">ПРОДУКТЫ</span>
			          <span class="button__bg"></span>
			        </button>
			        <a href="${cocktail}.html" class="button-paper product__details-tabs-button">
			          <span class="button__text">КОКТЕЙЛИ</span>
			          <span class="button__bg"></span>
			        </a>
			      </div>
			      <h1 class="product__title">
			        <span class="section-text--bold">MAD DOG VODKA</span><br>
			        <span class="product__title-model">${title}</span>
			      </h1>
			      <p class="product__desc">${desc}</p>
			      <ul class="product__stats-list">
			        <li class="product__stat">
			          <span class="product__stat-title">Объем:</span>
			          <span class="product__stat-value">0,5 л</span>
			        </li>
			        <li class="product__stat">
			          <span class="product__stat-title">Крепость:</span>
			          <span class="product__stat-value">${degrees} %</span>
			        </li>
			      </ul>

			      <section class="showcase product__related">
			          <div class="runway showcase__runway">
			            <div class="runway__shaft">
			              <div class="runway__lift">
		`;

											if (typeof related == 'object') {
												related.forEach(relatedName => {
													productSection += getProductCard(relatedName);
												});
											}

		productSection += `
			              </div>
			            </div>
			          </div>
			      </section>
			      <div class="product__details-decor" style="background-image: url('./img/${productName}/ice-last.png');">
			      </div>
			    </div>
			  </div>
			</section>
		`;

		return productSection;
	}

	function spawnProduct(productName, zIndex = 5) {
		const productSection = getProductSection(productName);
		if (!productSection) return;

		let transitionTiming = 0;
		const oldProduct = document.querySelector('.js_product') || document.querySelector('.product') || document.querySelector('.cocktail');
		if (oldProduct) {
			oldProduct.querySelectorAll('.showcase-card').forEach(card => {
				card.removeEventListener('click', handleCardClick);
			})

			const lastCocktail = oldProduct.querySelector('.cocktail--visible') || oldProduct;
			if (lastCocktail) {
				transitionTiming = 1200;
				lastCocktail.classList.remove('cocktail--visible');
				setTimeout(() => {
					oldProduct.remove();
				}, transitionTiming);
			} else {
				oldProduct.remove();
			}
		}

		const ajaxProduct = document.createElement('div');
		ajaxProduct.classList.add('js_product', 'js_product--inited');
		ajaxProduct.innerHTML = productSection;
		ajaxProduct.style.zIndex = zIndex;
		document.querySelector('main').append(ajaxProduct);

		setTimeout(() => {
			ajaxProduct.querySelector('.product').classList.add('product--visible');
		}, transitionTiming + 100);

		const miniCards = ajaxProduct.querySelectorAll('.showcase-card');
		miniCards.forEach(card => {
			initCard(card);
		})

		initProductTabs(ajaxProduct)
	}

	function calcZIndex() {
		const zIndex = 5 + [...document.querySelectorAll('.slide-drop')].length;
		return zIndex;
	}

	function initProductTabs(ajaxProduct) {
		const zIndex = calcZIndex();
		const tabs = ajaxProduct.querySelectorAll('.product__details-tabs-button');
		tabs.forEach(tab => {
			if (tab.classList.contains('product__details-tabs-button--active')) return;
			tab.addEventListener('click', (e) => {
				e.preventDefault();
				const cocktail = window.products[document.body.dataset.theme].cocktail;
				spawnCocktail(cocktail, zIndex);
			})
		})
	}
	window.initProductTabs = initProductTabs;

	function getProductCard(productName) {
		const {className, title} = window.products[productName];

		let productCard = `
			<article class="showcase-card showcase-card--${productName} ${className}" data-theme="${productName}">
			  <div class="showcase-card__body">
			    <h3 class="showcase-card__model">
			      <div class="showcase-card__model-name">${title}</div>
			    </h3>
			    <div class="showcase-card__media">
			      <picture class="showcase-card__media-pic">
			        <source srcset="./img/${productName}/carousel-hero.webp" type="image/webp">
			        <img src="./img/${productName}/carousel-hero.jpg" alt="MAD DOG VODKA ${title}" class="showcase-card__media-img">
			      </picture>
			    </div>
			      <div class="showcase-card__info">
			        <div class="showcase-card__buttons">
			          <a href="${productName}.html" class="showcase-card__button button-paper">
			            <span class="button__text">УЗНАТЬ БОЛЬШЕ</span>
			            <span class="button__bg"></span>
			          </a>
			        </div>
			      </div>
			  </div>
			</article>
		`;

		return productCard;
	}

	function getCocktailCard(cocktailName) {
		const {className, title, theme, img} = window.cocktails[cocktailName];

		let cocktailCard = `
			<article class="showcase-card showcase-card--cocktail ${className}" data-theme="${theme}">
			  <div class="showcase-card__body">
			    <h3 class="showcase-card__model">
			      <div class="showcase-card__model-name">${title}</div>
			    </h3>
			    <div class="showcase-card__media">
			      <picture class="showcase-card__media-pic">
			        <source srcset="./img/cocktails/${img}.webp" type="image/webp">
			        <img src="./img/cocktails/${img}.jpg" alt="MAD DOG VODKA ${title}" class="showcase-card__media-img">
			      </picture>
			    </div>
			      <div class="showcase-card__info">
			        <div class="showcase-card__buttons">
			          <a href="${img}.html" class="showcase-card__button button-paper">
			            <span class="button__text">УЗНАТЬ БОЛЬШЕ</span>
			            <span class="button__bg"></span>
			          </a>
			        </div>
			      </div>
			  </div>
			</article>`;
					
		return cocktailCard;
	}

	function getCocktailSection(cocktailName) {
		if (typeof window.cocktails[cocktailName] == 'undefined') {
			console.warn(`No such cocktail "${cocktailName}"`);
			return false;
		}
		const {title, img, theme, hide_ice, related, steps, ingridients, volume} = window.cocktails[cocktailName];
		let cocktail = `
			<section class="section cocktail cocktail--${theme}">
			  <div class="container cocktail__container">
			    <div class="cocktail__hero">
			      <p class="cocktail__hero-name">
			        <span class="cocktail__hero-name-text">${title}</span>
			      </p>
			      <div class="cocktail__media">
			        <picture class="cocktail__media-pic">
			          <source srcset="./img/cocktails/${img}.webp" type="image/webp">
			          <img src="./img/cocktails/${img}.jpg" alt="MAD DOG VODKA ${title}" class="cocktail__media-img">
			        </picture>
			        <div class="cocktail__media-decor-1" style="background-image: url('./img/${theme}/${theme}.png');"></div>
			        `
			        if (typeof hide_ice == 'undefined') {
				        cocktail += `<div class="cocktail__media-decor-2" style="background-image: url('./img/${theme}/ice-1.png');"></div>`
			        }
			        if (typeof hide_ice == 'undefined') {
				        cocktail += `<div class="cocktail__media-decor-3" style="background-image: url('./img/${theme}/ice-2.png');"></div>`
			        }
		cocktail += `
			      </div>
			    </div>
			    <div class="cocktail__details">
			      <div class="cocktail__details-tabs">
			        <a href="${theme}.html" class="button-paper cocktail__details-tabs-button">
			          <span class="button__text">ПРОДУКТЫ</span>
			          <span class="button__bg"></span>
			        </a>
			        <button class="button-paper cocktail__details-tabs-button  cocktail__details-tabs-button--active" type="button">
			          <span class="button__text">КОКТЕЙЛИ</span>
			          <span class="button__bg"></span>
			        </button>
			      </div>
			      <h1 class="cocktail__title">
			        <span class="section-text--bold">КОКТЕЙЛЬ</span><br>
			        <span class="cocktail__title-model">${title}</span>
			      </h1>
			      <div class="cocktail__desc">
			        <div class="cocktail__ingridients">
			          <h3 class="cocktail__ingridients-title">
			            Необходимые ингредиенты:
			          </h3>
			          <ul class="cocktail__ingridients-list">
			          `
			            for (var i = 0; i < ingridients.length; i++) {
			            	cocktail += `
				              <li class="cocktail__ingridients-item">
				                <span class="section-text--bold">
					                ${volume[i]}
				                </span>
				                ${ingridients[i]}
				              </li>
			              `
			            }
	      cocktail +=`
			          </ul>
			        </div>
			        <div class="cocktail__steps">
			          <h3 class="cocktail__steps-title">Приготовление:</h3>
			          <ol class="cocktail__steps-list">`
			            for (var i = 0; i < steps.length; i++) {
			              cocktail += `<li class="cocktail__steps-item">${steps[i]}</li>`
			            }
			  cocktail += `
				        </ol>
			        </div>
			      </div>

			      <section class="showcase product__related cocktail__related">
			          <div class="runway showcase__runway">
			            <div class="runway__shaft">
			              <div class="runway__lift">`;

											if (typeof related == 'object') {
												related.forEach(relatedName => {
													cocktail += getCocktailCard(relatedName);
												});
											}

		cocktail += `
			              </div>
			            </div>
			          </div>
			      </section>

			      <div class="cocktail__details-decor" style="background-image: url('./img/${theme}/ice-last.png');">
			      </div>
			    </div>
			    
			  </div>
			</section>
		`

		return cocktail;
	}

	function spawnCocktail(cocktailName, zIndex = 5) {
		const cocktailSection = getCocktailSection(cocktailName);
		if (!cocktailSection) return;

		let transitionTiming = 0
		const oldCocktail = document.querySelector('.js_product') || document.querySelector('.product') || document.querySelector('.cocktail');
		if (oldCocktail) {
			oldCocktail.querySelectorAll('.showcase-card').forEach(card => {
				card.removeEventListener('click', handleCardClick);
			})

			const lastProduct = oldCocktail.querySelector('.product--visible') || oldCocktail;
			if (lastProduct) {
				transitionTiming = 1200;
				lastProduct.classList.remove('product--visible');
				setTimeout(() => {
					oldCocktail.remove();
				}, transitionTiming);
			} else {
				oldCocktail.remove();
			}
		}

		const ajaxCocktail = document.createElement('div');
		ajaxCocktail.classList.add('js_product', 'js_product--inited');
		ajaxCocktail.innerHTML = cocktailSection;
		ajaxCocktail.style.zIndex = zIndex;
		document.querySelector('main').append(ajaxCocktail);

		setTimeout(() => {
			ajaxCocktail.querySelector('.cocktail').classList.add('cocktail--visible');
		}, transitionTiming + 100);

		const miniCards = ajaxCocktail.querySelectorAll('.showcase-card');
		miniCards.forEach(card => {
			initCard(card);
		})

		initCocktailTabs(ajaxCocktail);
	}

	function initCocktailTabs(ajaxCocktail) {
		const zIndex = calcZIndex();
		const tabs = ajaxCocktail.querySelectorAll('.cocktail__details-tabs-button');
		tabs.forEach(tab => {
			if (tab.classList.contains('cocktail__details-tabs-button--active')) return;
			tab.addEventListener('click', (e) => {
				e.preventDefault();
				spawnProduct(document.body.dataset.theme, zIndex);
			})
		})
	}
	window.initCocktailTabs = initCocktailTabs;
});