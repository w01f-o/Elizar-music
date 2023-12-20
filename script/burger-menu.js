"use strict";

const PreventPageScrolling = false;
const PreventPointerEvents = false;
const ClosingMenuIfOutsideClick = true;

const playerControls = document.querySelector(".player-controls");

const MenuBox = document.querySelector(".burger__menubox");
const BurgerMenuButton = document.querySelector(
  ".player-controls__playListButton"
);

const bodyEl = document.querySelector(".body");
const mainEl = document.querySelector(".main");

BurgerMenuButton.addEventListener("click", () => {
  MenuBox.classList.toggle("menubox-visibility");
  playerControls.classList.toggle("open");

  if (PreventPageScrolling) {
    bodyEl.classList.toggle("overflow-hidden");
  }

  if (PreventPointerEvents) {
    mainEl.classList.toggle("pointer-event-none");
  }

  if (ClosingMenuIfOutsideClick) {
    bodyEl.addEventListener("click", (event) => {
      let target = event.target;
      if (
        !target.matches(".player-controls__playListButton") &&
        !target.matches(".burger__menubox")
      ) {
        MenuBox.classList.remove("menubox-visibility");
        bodyEl.classList.remove("overflow-hidden");
        mainEl.classList.remove("pointer-event-none");
        playerControls.classList.remove("open");
      }
    });
  }
});


