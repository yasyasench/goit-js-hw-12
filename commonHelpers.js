import{a as y,S as b,i}from"./assets/vendor-BPs2jpei.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&d(h)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const L="45387575-fad478ac390e3d49aace0fe1c";async function g(s,e){const o=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15});return(await y.get(`https://pixabay.com/api/?key=${L}&q=${s}&${o}`)).data}const w=document.querySelector(".gallery"),v=new b(".gallery-link",{captionsData:"alt",captionDelay:250,disableScroll:!0}),m=s=>{const e=s.map(o=>`<li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
          <img
          width="400"
          height="240"
            class="item-image"
            src="${o.webformatURL}"
            alt="${o.tags}"
          />
        </a>
        <div class="main-content">
          <ul class="card-list">
            <li class="card-list-li">
              <h3>Likes</h3>
              <p>${o.likes}</p>
            </li>
            <li class="card-list-li">
              <h3>Views</h3>
              <p>${o.views}</p>
            </li>
            <li class="card-list-li">
              <h3>Comments</h3>
              <p>${o.comments}</p>
            </li>
            <li class="card-list-li">
              <h3>Downloads</h3>
              <p>${o.downloads}</p>
            </li>
          </ul>
        </div>
      </li>`).join("");w.insertAdjacentHTML("beforeend",e),v.refresh()},C=document.querySelector(".input"),p=document.querySelector(".gallery"),u=document.querySelector(".form"),c=document.querySelector(".loader"),n=document.querySelector(".load-more-btn");let a=1,l="";u.addEventListener("submit",async s=>{if(s.preventDefault(),l=C.value.trim(),n.classList.add("is-hidden"),a=1,l===""){i.show({title:"❌",message:"Please enter the appropriate search query!",messageColor:"white",backgroundColor:"red",position:"topRight"});return}c.classList.remove("is-hidden"),p.innerHTML="";try{const e=await g(l,a);if(e.hits.length===0){i.show({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"black",backgroundColor:"orange",position:"topRight"});return}m(e.hits),f(),u.reset(),e.totalHits>15&&n.classList.remove("is-hidden")}catch(e){i.show({title:"❌",message:e.message,messageColor:"black",backgroundColor:"red",position:"topRight"})}finally{c.classList.add("is-hidden")}});n.addEventListener("click",S);async function S(){a++,c.classList.remove("is-hidden");try{const s=await g(l,a);m(s.hits),f();const e=Math.ceil(s.totalHits/15);a===e&&(n.classList.add("is-hidden"),i.show({title:"❌",message:"We're sorry, but you've reached the end of search results.",messageColor:"black",backgroundColor:"light blue",position:"topRight"}))}catch(s){i.show({title:"❌",message:s.message,messageColor:"black",backgroundColor:"red",position:"topRight"})}finally{c.classList.add("is-hidden")}}function f(){const{height:s}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
