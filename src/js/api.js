"use strict";

class Api {
    constructor() {
        this.path = WPURLS.apiUrl;
        this.html = null;
        this.isRespose = false;
    }

    async delete(api, id) {
        try {
            let response = await axios.post(this.path + api + id, { deleteId: id, })
            if (response.status == 200 && response.statusText == "OK") {
                return response;
            }
        } catch (e) {
            console.error(e);
            console.log("Data from the server is not available !!!");
        }
    }

    async getData(api) {
        try {
            let response = await axios.post(this.path + api,)
            if (response.status == 200 && response.statusText == "OK") {
                return response.data.html;
            }
        } catch (e) {
            console.error(e);
            console.log("Data from the server is not available !!!");
        }
    }

    async getPostData(obj, images = null) {
        if (obj.api) {
            try {
                let formData = new FormData();
                for (var key in obj) {
                    formData.append(key, obj[key])
                }
                if (images != null) {
                    for (let i = 0; i < images.length; i++) {
                        formData.append('image[' + i + ']', images[i])
                    }
                }
                // console.log(Object.fromEntries(formData))
                let response = await axios.post(this.path + obj.api, formData, {});

                if (response.status == 200 && response.statusText == "OK") {
                    return await response.data.html;
                }
            } catch (e) {
                console.error(e);
                console.log("Data from the server is not available !!!");
            }
        } else {
            throw 'can not find API';
        }
    }

    async getResponseData(obj) {
        if (obj.api) {
            try {
                let formData = new FormData();
                for (var key in obj) {
                    formData.append(key, obj[key])
                }
                // console.log(Object.fromEntries(formData))
                let response = await axios.post(this.path + obj.api, formData, {});

                if (response.status == 200 && response.statusText == "OK") {
                    return await response;
                }
            } catch (e) {
                console.error(e);
                console.log("Data from the server is not available !!!");
            }
        } else {
            throw 'can not find API';
        }
    }
}

export default Api;