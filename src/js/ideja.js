const path = WPURLS.apiUrl;
/*----------------------- save content axios----------------------------*/

function getText() {

  const textArea = document.getElementById("textArea");
  const txt = document.getElementById("textArea").value;

  if (txt != undefined && txt != null && txt.length >= 0 && txt != "" && txt != NaN) {
    let words = txt.split(/\s+/);
    textArea.value = '';
    axios.post(path + 'idea-create-front', {
      idea: words,
    }).catch(err => {
      console.log(err instanceof TypeError);
    });
    setTimeout(renderTreeColons, 500);
  }
};

/*-----------------------like button ------------------------------------------*/


function likeAdd(like) {

  if (like != undefined && like != null && like.length >= -1 && like != "" && like != NaN) {
    axios.post(path + 'idea-create-front', {
      idea_like: like,
    });
   
    setTimeout(renderTreeColons, 500);
  }
};

/*------------------------------render data  axios-----------------------------------------*/

const startIdea = document.getElementById("startIdeaFront");

function startHomeIdea() {
  if (startIdea) {
    window.addEventListener('load', renderTreeColons);
    const postBtn = document.getElementById("sendIdea");
    if (postBtn) {
      postBtn.addEventListener("click", getText);
    }
    textArea.addEventListener("input", function() {

      let maxlength = this.getAttribute("maxlength");
      let currentLength = this.value.length;

      if (currentLength >= maxlength) {
        document.getElementById("count").innerHTML = "0  simboliu liko";
      } else {
        document.getElementById("count").innerHTML = maxlength - currentLength + " simboliu liko";
        //console.log(maxlength - currentLength + " chars left");
      }
    });
  }
}

function renderTreeColons() {
  axios.get(path + 'idea-render-front', {})
    .then(function(response) {
      if (response.status == 200 && response.statusText == 'OK') {
        const data = response.data.allData;

        let keys = [];

        for (let key in data) {
          keys.push(key);
        }

        const rende = document.getElementById('box');
        let HTMLString = '';
        let count = 0;

        for (let i = keys.length - 1; i >= 0; i--) {
          let value = data[keys[i]];
          count++;
          if (count <= 3) {
            HTMLString +=
              `<div class="box"> 
          <div class="text"><div class="data" >${value.post_date}</div>                 
            </div>
            <div class="ideaContent">
                  ${value.idea_content}
            </div>   
            <div class="like" data-custom-id="${value.ID}">
              <svg class="like__btn animated" id="Capa_1" enable-background="new 0 0 512 512" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512" y2="0"><stop offset="0" stop-color="#fd3a84"/><stop offset="1" stop-color="#ffa68d"/></linearGradient><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="421" y2="121"><stop offset="0" stop-color="#ffc2cc"/><stop offset="1" stop-color="#fff2f4"/></linearGradient><g><g><g><circle cx="256" cy="256" fill="url(#SVGID_1_)" r="256"/></g></g><g><g><path d="m331 121c-32.928 0-58.183 18.511-75 46.058-16.82-27.552-42.077-46.058-75-46.058-25.511 0-48.788 10.768-65.541 30.32-15.772 18.409-24.459 42.993-24.459 69.225 0 28.523 10.698 54.892 33.666 82.986 20.138 24.632 49.048 49.971 82.524 79.313 12.376 10.848 25.174 22.065 38.775 34.306 2.853 2.567 6.444 3.85 10.035 3.85s7.182-1.283 10.035-3.851c13.601-12.241 26.398-23.458 38.775-34.306 33.476-29.341 62.386-54.681 82.524-79.313 22.968-28.092 33.666-54.462 33.666-82.985 0-53.637-36.748-99.545-90-99.545z" fill="url(#SVGID_2_)"/></g></g></g> 
                <span class="like__number">${value.idea_like}</span>
              </svg>
          </div>            
        </div>`;
          } else {
            break;
          }
        }
        rende.innerHTML = HTMLString;

        const likeBtn = document.querySelectorAll(".like");

        for (let i = 0; i < likeBtn.length; i++) {
          likeBtn[i].addEventListener('click', () => {
            let like = likeBtn[i].getAttribute("data-custom-id");
            likeAdd(like);
          });
        }
      }
      return response;

    }).catch(function(error) {
      // Error 
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    });
}

export default startHomeIdea();