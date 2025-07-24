//헤더를 위한 js파일입니다.
import { getAccessToken } from "../pages/login/auth.js";
//로그인 유무에따른 마이페이지 ,로그인 텍스트 변경
const $headerMenuText = document.querySelector(".header__menu-text");
const $headerMenuLink = document.querySelector(".header__menu-link");
const token = getAccessToken();
if (token) {
  $headerMenuText.innerHtml = "마이페이지";
  $headerMenuLink.setAttribute("href", "/pages/mypage.html");
} else {
  $headerMenuText.innerHtml = "로그인";
  $headerMenuLink.setAttribute("href", "/pages/login.html");
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
  const params = {
    query: encodeURIComponent(input),
  };
  window.location.href = `/pages/main.html?${params.toString()}`;
});
