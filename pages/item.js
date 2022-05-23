import view from "../utils/view.js";
import Story from "../components/Story.js";
import Comment from "../components/comment.js";
export default async function Item(){
    let hasError = false
    let story = null;
    let hasComments = false
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
    ${Story(story)}
    <hr/>
    ${`<div>${hasComments?story.comments.map(comment=>Comment(comment)).join(""):"no comments available"}</div>`}
    </div>`
}
async function  getStory(){
    const id = window.location.hash.split("?id=")[1];
    const response = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`)
    const data = await response.json()
    return data
}