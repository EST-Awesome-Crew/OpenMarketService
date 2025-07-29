import { refreshAccessToken } from "/js/pages/login/api.js";
import { clearAuth, getAccessToken } from "/js/pages/login/auth.js";
export function initHeader() {
  //헤더를 위한 js파일입니다.
  //로그인 유무에따른 마이페이지 ,로그인 텍스트 변경
  const $headerMenuLogin = document.querySelector(".header__menu-login");
  const $headerDropdown = document.querySelector(".dropdown");
  const $searchForm = document.querySelector(".header__search-form");
  refreshAccessToken().then(result => {
    if (!result) clearAuth(); // false
  });
  const token = getAccessToken();
  if (token) {
    $headerDropdown.style.display = "block";
  } else {
    $headerMenuLogin.parentElement.parentElement.style.display = "block";
  }

  const $headerSearchInput = document.querySelector(".header__search-input");
  $searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const input = $headerSearchInput.value.trim();
    if (input === "") {
      alert("검색어를 작성 해주세요");
      $headerSearchInput.focus();
      return;
    }

    // URLSearchParams로 변경
    const params = new URLSearchParams({
      query: input,
    });
    window.location.href = `/?${params.toString()}`;
  });

  //마이페이지 클릭 토글
  const $dropdown = document.querySelector(".dropdown");
  const $headerMyText = document.querySelectorAll(".header__menu-link");
  const $button = document.querySelector(".dropdown__button");

  if ($button) {
    $button.addEventListener("click", e => {
      e.stopPropagation();
      $dropdown.classList.toggle("open");

      if ($dropdown.classList.contains("open")) {
        $headerMyText.forEach(menu => {
          menu.style.color = "#21bf48"; // 글자색
        });
        const $cartImg = document
          .querySelector(".header__menu-cart")
          .parentElement.querySelector("img");
        $cartImg.src = "/assets/icons/icon-shopping-cart-2.svg";
        const $myPageImg = document.querySelector(".dropdown__button img");
        $myPageImg.src = "/assets/icons/icon-user-2.svg";
      } else {
        $headerMyText.forEach(menu => {
          menu.style.color = "#767676"; // 글자색
        });
        const $cartImg = document
          .querySelector(".header__menu-cart")
          .parentElement.querySelector("img");
        const currentPath = window.location.pathname;
        if (currentPath !== "/pages/cart.html") {
          $cartImg.src = "/assets/icons/icon-shopping-cart.svg";
        }
        const $myPageImg = document.querySelector(".dropdown__button img");
        $myPageImg.src = "/assets/icons/icon-user.svg";
      }
    });
  }

  // 다른 영역 클릭 시 닫기
  document.addEventListener("click", e => {
    if ($dropdown && !$dropdown.contains(e.target)) {
      $dropdown.classList.remove("open");
    }
  });
  //로그아웃
  const $logoutBtn = document.querySelector(".dropdown__logout");
  $logoutBtn.addEventListener("click", e => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.reload(true);
  });
}
