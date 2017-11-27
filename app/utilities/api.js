const axios = require('axios');
const config = require('../config.js');

const apiKey = config.giphyKey;
const keyStr = '?api_key=' + apiKey;

function fetchRandomGif(count) {
    const promises = [];
    for(let i = 0; i < count; i++){
        promises.push(axios.get('https://api.giphy.com/v1/gifs/random' + keyStr));
    }
    return promises;
}

function loadGifs(count) {
    return axios.all(fetchRandomGif(count)).then((response) => {
        return response;
    });
}

module.exports = {
    fetchRandomGifs: (count) => {
        return loadGifs(count).then((data) => {
            return data;
        });
    }
}
