const path = WPURLS.apiUrl;

const startIdeas = document.getElementById('startIdeas');

function startAllIdeas() {
    if (startIdeas) {
        window.addEventListener('load', getData);
        const postBtn = document.getElementById("send");
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
            }
        });
    }
}

function getData() {

    axios.get(path + 'ideas-render-front', {

        })
        .then(function(response) {
            if (response.status == 200 && response.statusText == 'OK') {

                const data = response.data.allData;

                return renderColons(data);

            }
        }).catch(function(error) {
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

function renderColons(data) {

    let keys = [];
    for (let key in data) {
        keys.push(key);
    }

    const render = document.getElementById('renderIdeas');

    let HTMLString = '';
    var likenumber = [];
    var solution = [];
    var date = [];
    var content = [];
    var likeId = [];
    let count = 0;

    for (let i = keys.length - 1; i >= 0; i--) {

        count++;
        let value = data[keys[i]];

        solution.push(value.idea_solution);
        likenumber.push(value.idea_like);
        content.push(value.idea_content);
        date.push(value.post_date);
        likeId.push(value.ID);

        HTMLString +=
            `<div class="box ideabox" id="${count}">
          <div class="text">
            <div class="data" >
               ${value.post_date}
            </div>
            <div class="ideaContent">
                 ${value.idea_content}
            </div>
            <div class="likeH" id="${value.ID}">
           </div>
          </div>
         </div>`;
    }
    render.innerHTML = HTMLString;

    const likesHover = document.querySelectorAll(".box");

    for (let i = 0; i < likesHover.length; i++) {

        likesHover[i].addEventListener('mouseenter', e => {

            const text = document.getElementById(likesHover[i].id);

            if (solution[i] && solution[i] != "  ") {
                let HTML = '';
                HTML = `<div class="ideaSolutionText">
                     ${solution[i]}
                </div>`;
                text.innerHTML = HTML;
            } else {
                let HTML = '';
                HTML = `<div class="likeBox" class="likes" >
                  <svg height="25pt" viewBox="0 -20 480 480" width="25pt" xmlns="http://www.w3.org/2000/svg"><path d="m348 0c-43 .0664062-83.28125 21.039062-108 56.222656-24.71875-35.183594-65-56.1562498-108-56.222656-70.320312 0-132 65.425781-132 140 0 72.679688 41.039062 147.535156 118.6875 216.480469 35.976562 31.882812 75.441406 59.597656 117.640625 82.625 2.304687 1.1875 5.039063 1.1875 7.34375 0 42.183594-23.027344 81.636719-50.746094 117.601563-82.625 77.6875-68.945313 118.726562-143.800781 118.726562-216.480469 0-74.574219-61.679688-140-132-140zm-108 422.902344c-29.382812-16.214844-224-129.496094-224-282.902344 0-66.054688 54.199219-124 116-124 41.867188.074219 80.460938 22.660156 101.03125 59.128906 1.539062 2.351563 4.160156 3.765625 6.96875 3.765625s5.429688-1.414062 6.96875-3.765625c20.570312-36.46875 59.164062-59.054687 101.03125-59.128906 61.800781 0 116 57.945312 116 124 0 153.40625-194.617188 266.6875-224 282.902344zm0 0"/>
                      <span class="number"> ${likenumber[i]}</span>
                  </svg>    
          </div>`;
                text.innerHTML = HTML;
            }
        });

        likesHover[i].addEventListener('mouseout', e => {

            const contentHoverOut = document.getElementById(likesHover[i].id);

            let HTML = '';

            HTML +=
                ` <div class="text">
            <div class="data" >
               ${date[i]}
            </div>
            <div class="ideaContent">
                 ${content[i]}
            </div>
            <div class="likeH" id="${likeId[i]}">
           </div>
          </div> `;
            contentHoverOut.innerHTML = HTML;
        })
    }
}

function getText() {

    const textArea = document.getElementById("textArea");
    const txt = document.getElementById("textArea").value;

    if (txt != undefined && txt != null && txt.length >= 0 && txt != "" && txt != NaN) {
        let words = txt.split(/\s+/);
        textArea.value = '';
        axios.post(path + 'idea-create-front', {
            idea: words,
        }).catch(function(error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error);
        });
        setTimeout(getData, 500);
    }
};

export default startAllIdeas();