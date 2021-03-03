"use strict";

class LightBox {
    constructor(target) {
        this.target = target;
        this.DOM = null;
        this.box;
        this.check = true;
        this.ontach();
    }

    ontach() {
        const DOM = document.getElementById(this.target);

        if (DOM) {
            const box = document.querySelectorAll(".imageBox")
            const footer = document.querySelector(".site-footer");
            this.box = box;

            for (let i = 0; i < box.length; i++) {
                let image = e => {
                    if (this.check) {
                        this.check = false;
                        box[i].classList.add("clickme");
                        box[i].removeEventListener("click", image);
                        let a = box[i];
                        footer.classList.add("hiden");
                        e.stopPropagation();
                        return this.next(a, i);
                    }
                }
                box[i].addEventListener('click', image);
            }
        }
    }

    next(a, i) {

        let c = i + 1;
        let d = i - 1;

        a.insertAdjacentHTML('beforeend', '<a class="previous">&#10094;</a><a class="next">&#10095;</a>');
        const prev = document.querySelector(".previous");
        const next = document.querySelector(".next");

        if (d > -1) {

            let previous = e => {
                a.classList.remove("clickme");
                a.childNodes[3].remove();
                a.childNodes[3].remove();
                this.box[d].classList.add("clickme");
                let b = this.box[d];
                e.stopPropagation();
                return this.next(b, d)
            }
            prev.addEventListener('click', previous);
        }

        if (c < this.box.length) {

            let second = e => {
                a.classList.remove("clickme");
                a.childNodes[3].remove();
                a.childNodes[3].remove();
                this.box[c].classList.add("clickme");
                let b = this.box[c];
                e.stopPropagation();
                return this.next(b, c)
            }
            next.addEventListener('click', second);
        }
        const close = document.querySelector(".pointer");
        close.classList.remove("hiden")

        let closed = e => {
            let clickme = document.querySelector(".clickme");
            const footer = document.querySelector(".site-footer");
            if (clickme) {
                clickme.classList.remove("clickme");
                const prev = document.querySelector(".previous");
                const next = document.querySelector(".next");
                next.remove();
                prev.remove();
                footer.classList.remove("hiden");
                this.check = true;
                return this.ontach();
            }
        }
        close.addEventListener("click", closed)
    }
}

export default LightBox;