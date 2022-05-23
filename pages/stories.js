import view from "../utils/view.js";
import Story from "../components/Story.js";
import store from "../store.js";
import checkFavorite from "../utils/checkFavorite.js";

export default async function Stories(path) {
  const stories = await getStories(path)
  const {favorites} = store.getState()
  const hasPage = stories.length > 0
  view.innerHTML = `<div>${hasPage ? stories.map((story,index)=> Story({...story, index:index +1 ,isFavorite:checkFavorite(favorites,story)})).join(""):"there aren't any stories available"}</div>`
  document.querySelectorAll(".favorite").forEach(favoriteButton=>{
    favoriteButton.addEventListener("click", async function(){
      const story = JSON.parse(this.dataset.story);  
      const isFavorited = checkFavorite(favorites,story)
      store.dispatch({type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE",payload:{favorite:story}})
        await Stories(path)
    })
  })
}

async function getStories(path){
  const isHomeRoute = path === "/"
  const isNewRoute = path === "/new"
  path = isHomeRoute ? path = "/news" : isNewRoute ? "/newest" :path 
  const response = await fetch(`https://node-hnapi.herokuapp.com${path}`)
  const data = await response.json()
  return data
}



