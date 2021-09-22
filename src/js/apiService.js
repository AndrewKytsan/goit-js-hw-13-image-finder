export default class ImageSearchService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }



fetchImage() {
    const API_KEY = '23486768-997b33f9cb0e02e3e0af30e3b';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
return fetch(url)
        .then(response =>
        response.json())
        .then(data => {
            this.incrementPage()
            return data.hits;
        })
    }
    
get query() {
        return this.searchQuery;
    }
set query(newQuery){
        this.searchQuery = newQuery;
    }
incrementPage(){
    this.page += 1;
}
resetPage(){
    this.page = 1
    }
}