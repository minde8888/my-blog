
import Api from './api';

class Pagination {
    constructor() {
        this.axios = new Api();
        this.hash;
    }

    paging() {
        const page = document.querySelectorAll(".paging");
        if (page.length) {

            for (let i = 0; i < page.length; i++) {

                let nextPage = () => {
         
                    let id = parseInt(page[i].id);
                    location.hash = id;
                    page[i].removeEventListener("click", nextPage);
                }
                page[i].addEventListener('click', nextPage);
            }
        }
    }

    async hashChange(hash = null, HTML = null) {
        if (HTML && hash) {
            this.watch.innerHTML = HTML
            const page = document.querySelectorAll(".paging");
            let hash = location.hash.split('#')[1];
            if (hash > page.length - 4) {
                hash = 1
                location.hash = hash
            }
        } else if (hash && HTML == null) {
            console.log(11111111);
            let pages = this.pages;
            let obj = {
                api: this.api,
                pageSelected: pages,
                hash: hash
            }
            this.watch.innerHTML = await this.axios.getPostData(obj);
        } else if (hash == undefined ||
            hash == null ||
            hash < 0 ||
            hash == "" ||
            hash == NaN ||
            hash == Infinity) {
            hash = 1
            location.hash = hash
            let pages = this.pages;
            let obj = {
                api: this.api,
                pageSelected: pages,
                hash: hash
            }
            this.watch.innerHTML = await this.axios.getPostData(obj);
        }else {
            let hash = location.hash.split('#')[1];


            
            location.hash = hash
            let obj = {
                api: this.api,
                pageSelected: this.pages,
                hash: hash
            }
            this.watch.innerHTML = await this.axios.getPostData(obj);
            const page = document.querySelectorAll(".paging");

            if (hash > page.length - 4) {
                hash = 1
                location.hash = hash
            }
        }
        this.paging();
        HTML = "";
        let addColor = document.querySelector('.nr-' + location.hash.split('#')[1]);
        if (addColor) {
            addColor.classList.add("active");

        }
        var changes = async () => {
            hash = location.hash.split('#')[1];
            if (hash != undefined &&
                hash != null &&
                hash > 0 &&
                hash != "" &&
                hash != NaN &&
                hash != Infinity) {
                let pages = this.pages;
                let obj = {
                    api: this.api,
                    pageSelected: pages,
                    hash: hash
                }
                HTML = await this.axios.getPostData(obj);
                window.removeEventListener('hashchange', changes);
                this.hashChange(hash, HTML);
            }
        }
        window.addEventListener('hashchange', changes);
        this.changes = changes;
        const option = document.getElementById("items");
        option.value = this.pages;
        var selected = () => {
            this.pages = option.value;
            location.hash = 1;
            window.removeEventListener('hashchange', changes);
            changes();
            option.removeEventListener('change', selected);
        }
        option.addEventListener('change', selected);
        // child class implements button listeners or etc html functions 
        // this.addAction();

    }
}
export default Pagination;