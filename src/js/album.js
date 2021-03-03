"use strict";

import Pagination from './pagination';

class Album extends Pagination{

    constructor(target) {
        super();
        this.api = "album-create-admin";
        this.target = target;
        this.pages = 5;
        this.changes;
        this.watch = document.querySelector(".albumImages");
        this.init();
    }

    async init() {
        const DOM = document.querySelector(this.target);
        if (DOM) {
            let hash = location.hash.split('#')[1];
            if (hash) {
                this.hashChange(hash);
            } else {
                this.hashChange();
            }
            this.paging();
        }
    }
}

export default Album;