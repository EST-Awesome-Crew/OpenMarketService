import { calc } from "./components/calc.js";
import { render } from "./components/render.js";
// 헤더와 푸터 로드
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error);
  }
  if (elementId == "header") {
    const { initHeader } = await import("../../components/header.js");
    initHeader();
  }
  const $cart = document.querySelector(".header__menu-cart");
  $cart.parentElement.querySelector("img").src =
    "../../assets/icons/icon-shopping-cart-2.svg";
  $cart.style.color = "#21bf48";
}

// 페이지 로드 시 헤더와 푸터 로드
document.addEventListener("DOMContentLoaded", async function () {
  const user = localStorage.getItem("user");
  let allPrdPrice = 0;
  let allShipping = 0;
  //유저인지 체크
  if (user == null) {
    document.querySelector(".cart").style.display = "none";
    const modal = document.getElementById("modal-login");
    modal.showModal();
    const $loginModal_cancel = document.querySelector(
      ".modal--login .modal__btn--cancel"
    );
    const $loginModal_close = document.querySelector(
      ".modal--login .modal__close"
    );
    const $loginModal_confirm = document.querySelector(
      ".modal--login .modal__btn--confirm"
    );
    $loginModal_confirm.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "/pages/login.html"; // 홈으로 이동
    });
    $loginModal_close.addEventListener("click", e => {
      e.preventDefault();
      const prevUrl = document.referrer;

      if (prevUrl && prevUrl !== window.location.href) {
        window.location.href = prevUrl; // 이전 페이지로 이동
      } else {
        window.location.href = "/"; // 홈(혹은 원하는 기본 페이지)
      }
    });
    $loginModal_cancel.addEventListener("click", e => {
      e.preventDefault();
      const prevUrl = document.referrer;
      if (prevUrl && prevUrl !== window.location.href) {
        window.location.href = prevUrl; // 이전 페이지로 이동
      } else {
        window.location.href = "/"; // 홈(혹은 원하는 기본 페이지)
      }
    });
    return;
  } else {
    //구매자인지 체크
    if (JSON.parse(user).user_type != "BUYER") {
      document.querySelector(".cart").style.display = "none";
      alert("구매자만 접근 가능한 페이지 입니다.");
      window.location.href = "/";
      return;
    }
  }
  loadComponent("header", "./components/header.html");
  loadComponent("footer", "./components/footer.html");
  //랜더링
  let modalPrdId;
  let modalCartId;
  render(allPrdPrice, allShipping, modalPrdId, modalCartId);
  calc();
});
