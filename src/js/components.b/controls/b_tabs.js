window.addEventListener('DOMContentLoaded', (event) => {
	// #region tabs
/**
 * @tabs
 *
 * Табы инициируются все
 * У какой кнопки таба есть класс из js переменной TAB_ACTIVE_CLASS, тот таб и будет активным сразу
 *
 * .b_tabs>.b_tabs-button-wrap>button.b_tabs-button*2^.b_tabs-page-wrap>.b_tabs__page*2
 *
 */
const tabsBars = document.querySelectorAll(".b_tabs-button-wrap");
const tabsPagesWraps = document.querySelectorAll(".b_tabs-page-wrap");
const TAB_ACTIVE_CLASS = "active";
const TAB_ANIMATED_CLASS = "tab--animated";

// Добавляем активное состояние для табов, чтоб инициализировать Swiper
tabsBars.forEach((tabsBar) => {
  if (tabsBar.dataset.tabs) {
    tabsPagesWraps.forEach((tabsPagesWrap) => {
      const tabPages = tabsPagesWrap.querySelectorAll(".b_tabs-page");
      tabPages.forEach((tabPage) => {
        tabPage.classList.add(TAB_ACTIVE_CLASS);
      });
    });
  }
});

tabsBars.forEach(tabsBar => {
  if (!tabsBar.querySelector(`.${TAB_ACTIVE_CLASS}`)) {
    tabsBar.querySelector('.b_tabs-button').classList.add(TAB_ACTIVE_CLASS)
  }
})
tabsPagesWraps.forEach(wrap => {
  if (!wrap.querySelector(`.${TAB_ACTIVE_CLASS}`)) {
    wrap.querySelector('.b_tabs-page').classList.add(TAB_ACTIVE_CLASS)
  }
})
// Задержка нужна, чтобы Swiper слайдеры не разъезжались
setTimeout(() => {
  tabsBars.forEach((tabsBar) => {
    const tabBarButtons = tabsBar.querySelectorAll(".b_tabs-button");
    let clickedCount = 0;
    tabBarButtons.forEach((tabButton, buttonIndex) => {
      tabButton.addEventListener("click", () => {
        if (clickedCount != 0) {
          //
        } else {
          clickedCount++;
        }
        tabBarButtons.forEach((tab) => {
          tab.classList.remove(TAB_ACTIVE_CLASS);
        });
        tabButton.classList.add(TAB_ACTIVE_CLASS);

        if (tabsBar.dataset.tabs) {
          const tabPages = document
            .querySelector(`.b_tabs-pages[data-tabs="${tabsBar.dataset.tabs}"]`)
            .querySelectorAll(".b_tabs-page");

          if (tabPages[buttonIndex]) {
            tabPages.forEach((tabPage, tabIndex) => {
              if (tabIndex !== buttonIndex) {
                tabPage.classList.remove(TAB_ANIMATED_CLASS);
                tabPage.classList.remove(TAB_ACTIVE_CLASS);
              }
            });
            tabPages[buttonIndex].classList.add(TAB_ACTIVE_CLASS);
            setTimeout(() => {
              tabPages[buttonIndex].classList.add(TAB_ANIMATED_CLASS);
            }, 60);
          }
        }
      });
    });

    if (tabsBar.dataset.tabs) {
      tabBarButtons.forEach((tabButton) => {
        if (tabButton.classList.contains(TAB_ACTIVE_CLASS)) {
          tabButton.click();
        }
      });
    }
  });
}, 150);

// #endregion tabs

});
