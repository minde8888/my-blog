"use strict";

import Api from './api'

class FrontMenu {

    constructor(target) {

    this.target = target;

        this.renderSideMenu();
    }

    renderSideMenu() {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector('.navMenu');
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("hiden");     
        })
    }
}

export default FrontMenu;