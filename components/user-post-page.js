import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderUserPageComponent({ appEl }) {
  console.log("Список постов пользователя:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appUlHtml = posts
    .map((post) => {
      return `
                
                  <li class="post" data-id="${post.id}">
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        <img src=${
                          post.isLiked
                            ? "./assets/images/like-active.svg"
                            : "./assets/images/like-not-active.svg"
                        }>
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${post.createdAt}
                    </p>
                  </li>
                
              `;
    })
    .join("");

  const appHtml = posts.map((post) => {
    return `
            <div class="page-container">
                <div class="header-container"></div>
                <div class="post-user-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-user-header__user-image">
                        <p class="post-user-header__user-name">${post.user.name}</p>
                    </div>
                    <ul class="posts">
                    ${appUlHtml}
                    </ul>
                    </div>`;
  });

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
