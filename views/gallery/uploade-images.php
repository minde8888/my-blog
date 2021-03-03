<h1>
    Sukurti naują nuotraukų albumą
</h1>
<div class="form__group">
    <input type="text" class="form__input" id="albumName" placeholder="Iveskite albumo pavadinima" required="" />
</div>
<div class="galleryContainer" id="loadeGallery">
    <div class="gallerGrid" id='result'>
        <div id="message">
            <div class="wrapper">
                <div class="file-upload">
                    <label for="files"><span>&#43;</span></label>
                    <input class="galleryImage" type="file" id='files' name="img[]" accept="image/*" multiple>
                </div>
            </div>
            <div class="galleryUploade">
                <div class="svg-wrapper">
                    <svg height="60" width="150">
                        <rect id="shape" height="60" width="150" />
                        <div id="text">
                            <input class="uplodeBtn" type="button" id="submitImg" value='Siusti' /><span class="spot"></span>
                        </div>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="EventBoxHidden " id="actionBox">
    <div class="deleteImd">
        Trinti
    </div>
    <div class="checkboxUploade">
        <li>
            <label for="c1"> Naudoti kaip viršelio nuotrauka</label>
            <input id="c1" type="checkbox">
        </li>
    </div>
    <div class="tagImg ">
        <input type="text" class="tagInput" name="tagImage" placeholder="Iarsyti Tag" value="">
    </div>
</div>