"use strict";

// Важно подключить первым, чтобы все быстрее отработало
import "./helpers.b/_quickfix.js"

import "./components.b/groupers/_bayan.js";

// import "./components.b/header/header.js";
import "./components.b/controls/formich.js";
import "./components.b/spawners/b_modal.js";
import "./components.b/controls/_button-sticky.js";

import "./components.miri/_input-calendar.js";

window.addEventListener('DOMContentLoaded', (event) => {
	const sectionBayans = document.querySelectorAll('.section__bayan');
	sectionBayans.forEach(bayan => {
		const section = bayan.closest('.section');
		if (window.innerWidth > 1100) {
			section.classList.add('section--closed');
		} else {
			bayan.classList.add('bayan--opened')
		}
		bayan.addEventListener('bayan-open', () => {
			section.classList.remove('section--closed');
		})
		bayan.addEventListener('bayan-close', () => {
			section.classList.add('section--closed');
		})
	})
});
