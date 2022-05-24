import view from "../utils/view.js";
import Comment from "../components/comment.js";
import Favorites from "../components/favorites.js";
import Story from "../components/Story.js";
import checkFavorite from "../utils/checkFavorite.js"
import store from "../store.js";
export default async function Item(){
    let hasError = false
    let story = null;
    let hasComments = false;
    const {favorites} = store.getState()
    try {
      story = await getStory()
        hasComments = story.comments.length 
        
      }
      catch(err) {
        hasError = true
        console.error(err)
      }
      if (hasError) {
        view.innerHTML = `<div class="error">invalid post id</div>`;
     }
    view.innerHTML = `<div>
    ${Story({...story, isFavorite:checkFavorite(favorites,story)})} 
    <hr/>
    ${`<div>${hasComments?story.comments.map(comment=>Comment(comment)).join(""):"no comments available"}</div>`}
    </div>`
    document.querySelector(".favorite").addEventListener("click",async function(e){
      console.log("--------------------------")

      const isFavorited = checkFavorite(favorites,story)
      store.dispatch({type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE",payload:{favorite:story}})
      console.log(favorites)
      console.log(store.getState())
      Item()
    })
}
async function  getStory(){
    const id = window.location.hash.split("?id=")[1];
    const response = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`)
    const data = await response.json()
    return data
}