import view from "../utils/view.js";
import store from "../store.js";
import Story from "./Story.js";
import checkFavorite from "../utils/checkFavorite.js";
export default function Favorites(){
    const {favorites} = store.getState()
    const hasFavorite = favorites.length
    view.innerHTML = `
    <div>${hasFavorite ? favorites.map(story=>Story({...story, isFavorite:checkFavorite(favorites, story)})).join("") : "you haven't added any favorite stories"}</div>
    `
    document.querySelectorAll(".favorite").forEach(favoriteButton=>{
        favoriteButton.addEventListener("click",  function(){
          const story = JSON.parse(this.dataset.story);  
          const isFavorited = checkFavorite(favorites,story)
          store.dispatch({type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE",payload:{favorite:story}})
             Favorites()
        })
      })
}