"use strict";
import Api from './api'

class ImageUploade {

    constructor(target) {

        this.target = target;
        this.DOM = null;
        this.path = WPURLS.apiUrl;
        this.index = 0;
        this.imageShow();
    }

    imageShow() {
        const DOM = document.getElementById(this.target);

        if (DOM) {
            let filesAll = [];
            if (window.File && window.FileList && window.FileReader) {

                let filesInput = document.getElementById("files");

                filesInput.addEventListener("change", (event) => {

                    let files = event.target.files;

                    for (let i = 0; i < files.length; i++) {
                        if (files[i].size <= 1048576) {
                            if (files[i].type.match("image")) {
                                ((file, i) => {
                                    filesAll.push(file)

                                    const fileReader = new FileReader();

                                    fileReader.onloadend = (e) => {

                                        const imgFile = e.target;
                                        let j = this.index++

                                        let deleteId = this.getID();
                                        let dot = this.getID();
                                        let imageId = this.getID();
                                        let imadeDivId = this.getID();

                                        const tagInput = document.querySelector(".tagInput");
                                        const currentDiv = document.getElementById("message");
                                        const output = document.getElementById("result");
                                        const div = document.createElement("div");

                                        div.className = "galleryDiv";
                                        div.setAttribute("id", imadeDivId);
                                        div.innerHTML = `<img class="uploadeImageGallery galleryCell" data="false" tag="" id="${imageId}" src="${imgFile.result} "
                                      alt=" "/>
                                      <div class="dots" id="${dot}"><div/>`;
                                        output.insertBefore(div, currentDiv);

                                        let deleteDiv = document.querySelectorAll(".galleryDiv");
                                        let dots = document.getElementById(dot);
                                        const actionBtn = document.getElementById("actionBox");
                                        const deleteBtn = document.querySelector(".deleteImd");
                                        const checkBox = document.getElementById("c1");
                                        const image = document.querySelectorAll(".uploadeImageGallery");

                                        dots.addEventListener("click", () => {

                                            tagInput.value = "";
                                            deleteDiv[j].setAttribute("id", deleteId);
                                            actionBtn.classList.remove("EventBoxHidden");
                                            actionBtn.classList.add("boxImg");
                                            console.log(j);
                                            let renderActionBtn = (e) => {
                                                console.log(j);
                                                e.stopPropagation();

                                                actionBtn.removeEventListener("click", renderActionBtn);
                                                const check = document.querySelector(".albumImage");

                                                if (checkBox.checked && !check) {
                                                    console.log(checkBox.checked);
                                                    deleteDiv[j].classList.add("albumImage");
                                                    image[j].setAttribute("data", "true");
                                                    deleteDiv[j].removeAttribute("id", deleteId);

                                                } else if (checkBox.checked && check) {
                                                    image[j].setAttribute("data", "false");
                                                    deleteDiv[j].classList.remove("albumImage");
                                                }
                                                actionBtn.classList.remove("boxImg");
                                                actionBtn.classList.add("EventBoxHidden");
                                                checkBox.checked = false;
                                                image[j].setAttribute("tag", tagInput.value);
                                                deleteDiv[j].removeAttribute("id", deleteId);
                                            }
                                            actionBtn.addEventListener("click", renderActionBtn);
                                        });

                                        deleteBtn.addEventListener("click", (e) => {
                                            e.stopPropagation();
                                            let deleteImage = document.getElementById(deleteId);
                                            if (deleteImage) {
                                                deleteImage.remove();
                                                filesAll.splice(j, 1);
                                                this.index--;
                                                filesInput.value = "";
                                            }
                                            actionBtn.classList.remove("boxImg");
                                            actionBtn.classList.add("EventBoxHidden");
                                        });

                                        const checkBoxUploade = document.querySelector(".checkboxUploade");
                                        const tagImg = document.querySelector(".tagImg");

                                        checkBoxUploade.addEventListener("click", (e) => {
                                            e.stopPropagation();
                                        })

                                        tagImg.addEventListener("click", (e) => {
                                            e.stopPropagation();
                                        })
                                    }
                                    fileReader.readAsDataURL(files[i]);
                                })(files[i], i);
                            } else alert("Tai nėra paveikslėlio tipo formatas");
                        } else alert("Paveikslėlio dydis viršija 1MB, rekomenduojamas dydis yra iki 200kb");
                    }
                });
            }

            const uploadeImg = document.getElementById("submitImg");

            uploadeImg.addEventListener("click", () => {

                this.sendImageData(filesAll);

            });
        }
    }

    sendImageData(filesAll) {
        let obj;
        let images = []
        let tags = [];
        let albums = [];

        const api = 'gallery-store-front';

        const image = [...document.querySelectorAll(".uploadeImageGallery")];
        const album = document.getElementById("albumName");

        let avatarImage = image.filter(el => el.getAttribute("data") == 'true');

        if (album.value) {
            if (Array.isArray(avatarImage) && avatarImage.length) {
                for (let i = 0; i < image.length; i++) {
                    images.push(filesAll[i]);
                    tags.push(image[i].getAttribute("tag"));
                    albums.push(image[i].getAttribute("data"));
                }

                obj = {
                    tag: tags,
                    album: albums,
                    albumTitle: album.value,
                    api: api
                }

                let axios = new Api;
                axios.getPostData(obj, images);
                location.reload();
            } else {
                alert("Nepasirinktas albumo paveikslėlis!!!")
            }
        } else {
            alert("Neįvestas albumo pavadinimas!!!")
        }
    }

    getID() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
}


export default ImageUploade;