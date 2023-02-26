import fetch from "node-fetch";
import axios from "axios";

const request = search => {    // fetch(`https://itunes.apple.com/search?term=${search}`)
    axios.get(`https://itunes.apple.com/search?term=Eminem`)
        .then(data => {
            const albums = new Set(data.data.results.map(item => item.collectionName))
            console.log([...albums].sort().slice(0,5))
            // return[...albums].sort().slice(0,5)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
request()