export default function Story(story){
      return `<div class="story">
      <div> 
        <span class="gray">${story.index  || " "}</span>
        <span class="upvote">▲</span>
      <a target="_blank" href="${story.url}">${story.title}</a>
      <span>(${story.domain})</span>
    </div>
    <div>
      <div class="gray">
        ${story.points} points by ${story.user} ${story.time_ago}
        |
        <a href="#/item?id=${story.id}">
          ${story.comments_count} comments
        </a>
        |
        <span class="favorite" data-story='${JSON.stringify(story)}'>
          <img class="heart" src=${story.isFavorite?"https://cdn-icons.flaticon.com/png/128/2077/premium/2077502.png?token=exp=1653342622~hmac=564d7e7da347e72ebbd82ee70460a1fc":"https://cdn-icons-png.flaticon.com/128/1077/1077035.png"}>
          ${story.isFavorite ? "Remove From Favorites" : "Add To Favorites"}
        </span>
      </div>
    </div>
  </div>`
}