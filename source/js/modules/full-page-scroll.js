import throttle from "lodash/throttle";
const body = document.body;

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(
        `.screen:not(.screen--result)`
    );
    this.menuElements = document.querySelectorAll(
        `.page-header__menu .js-menu-link`
    );
    this.animatedBackground = document.querySelector(`.animated-background`);

    this.prevScreen = `top`;
    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(
        `wheel`,
        throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true})
    );
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex(
        (screen) => location.hash.slice(1) === screen.id
    );
    this.activeScreen = newIndex < 0 ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    if (this.screenElements[this.activeScreen].id === `story`) {
      body.classList.add(`is-story`);
    } else {
      body.classList.remove(`is-story`);
    }
    if (
      this.prevScreen === `story` &&
      this.screenElements[this.activeScreen].id === `prizes`
    ) {
      this.animatedBackground.classList.add(`active`);

      setTimeout(() => {
        this.animatedBackground.classList.remove(`active`);
        this.screenElements.forEach((screen) => {
          screen.classList.add(`screen--hidden`);
          screen.classList.remove(`active`);
        });
        this.screenElements[this.activeScreen].classList.remove(
            `screen--hidden`
        );
        this.screenElements[this.activeScreen].classList.add(`active`);
        this.animatedBackground.classList.remove(`active`);
      }, 400);
    } else {
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.add(`active`);
      }, 100);
    }

    this.prevScreen = this.screenElements[this.activeScreen].id;
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
        (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(
          this.screenElements.length - 1,
          ++this.activeScreen
      );
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
