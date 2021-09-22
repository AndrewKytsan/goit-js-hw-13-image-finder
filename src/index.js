import ImageSearchService from './js/apiService'
import imageTpl from './templates/image-card'

import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css'

import './sass/main';

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';
defaults.styling = 'material';
defaults.hide = 'true';
defaults.delay = '1000';
defaults.shadow = 'true';
defaults.animation = 'fade';

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    nextPageBtn: document.querySelector('.next-page'),
    gallery:document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.nextPageBtn.addEventListener('click',onLoadMore)
refs.gallery.addEventListener('click', createAndOpenLightBox)
refs.nextPageBtn.style.visibility = 'hidden';

const imageSearchService = new ImageSearchService()



function onSearch(e) {
    e.preventDefault()
    const input = e.currentTarget;

    imageSearchService.query= input.elements.query.value;
    if (imageSearchService.query === '') {
        
         return alert({
                            type: 'error',
                            text: 'Type some search request',
                        });
    }

    refs.gallery.innerHTML = '';
     
    input.reset();
    imageSearchService.resetPage()
    imageSearchService.fetchImage().then(data => {
        imageMarkUp(data)
        if (data.length >= 12) {
            refs.nextPageBtn.style.visibility = 'visible';
        }
    })
     
     
    
}

function imageMarkUp(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', imageTpl(hits))
}
 

function onLoadMore(){
    imageSearchService.fetchImage().then(data => {
        imageMarkUp(data)

        refs.nextPageBtn.scrollIntoView({
      top:'refs.gallery.clientHeight',
  behavior: 'smooth',
  block: 'end',
});
    })
}

function createAndOpenLightBox(e) {
    const { largeImage } = e.target.dataset
    if (!largeImage) return;
    
    const instance = basicLightbox.create(`
    <img src="${largeImage}" width="600" height="450">
`)

    instance.show()
window.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
            instance.close()
      }
});
}



