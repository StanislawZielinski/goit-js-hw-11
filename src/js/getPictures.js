const axios = require('axios').default;
const API_KEY = '28203095-60f45d0309e92efa731dcf20a';
async function getPictures(searchQueryValue, pageNr) {
const searchParams = new URLSearchParams(
    {
    key: API_KEY,
    q: searchQueryValue,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40,
    page: pageNr,
    }
);  

let response = await axios({
    method: 'get',
    url: `https://pixabay.com/api/?${searchParams}`,
});
const data = response.data;
return data
};

export default getPictures;