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
  loadComponent("header", "./components/header.html");
  loadComponent("footer", "./components/footer.html");
  const cartList = document.querySelector(".cart__list");
  const cartSummary = document.querySelector(".cartOrder-summary");
  const cartAllOrderBtn = document.querySelector(".cartOrder__btn-wrap");
  const cartListNoneInnerHTML = `
      <div class="cart-empty" aria-labelledby="cart-empty-title">
        <header class="cart-empty__header">
          <h2 id="cart-empty-title" class="cart-empty__title">
            장바구니에 담긴 상품이 없습니다.
          </h2>
        </header>
        <p class="cart-empty__description">
          원하는 상품을 장바구니에 담아보세요!
        </p>
      </div>
    `;

  const id = 1;
  const imgUlr = "상품이미지1.png";
  const prdName = "상품명";
  const prdSeller = "상품판매자";
  const prdPrice = 17000;
  const cartNum = 1;
  const shipping_method = "택배 배송";
  const shipping_fee = "무료배송";

  const cartListInnerHTML = `
        <form class="cart__form-item">
          <article class="cart-item">
            <label class="cart-item__checkbox-label" for="check${id}">
              <input
                type="checkbox"
                class="cart-item__checkbox-input"
                id="check${id}"
                aria-label="상품 선택"
              />
              <span class="cart-item__checkbox-span" aria-hidden="true"></span>
            </label>
            <img src="${imgUlr}" alt="${prdName}" class="cart-item__image" />
            <div class="cart-item__info">
              <span class="cart-item__info-seller">${prdSeller}</span>
              <span class="cart-item__info-name">${prdName}</span>
              <span class="cart-item__info-price">${prdPrice.toLocaleString()}</span>
              <span class="cart-item__info-shipping">${shipping_method}/${shipping_fee}</span>
            </div>
            <div class="cart-item__quantity">
              <button class="cart-item__quantity-btn minus"><img src="../../assets/icons/icon-minus-line.svg" alt="" /></button>
              <input
                type="number"
                class="cart-item__quantity-input"
                value="${cartNum}"
                aria-label="수량 입력"
              />
              <button class="cart-item__quantity-btn plus"><img src="../../assets/icons/icon-plus-line.svg" alt="" /></button>
            </div>
            <div class="cart-item__price-wrap">
              <p class="cart-item__price">${(
                prdPrice * cartNum
              ).toLocaleString()}원</p>
              <button class="cart-item__order-btn">주문하기</button>
            </div>
            <button type="button" class="cart-item__delete"><img src="../../assets/icons/icon-delete.svg" alt="장바구니 삭제"></button>
          </article>
        </form>`;

  //cartList.insertAdjacentHTML("beforeend", cartListInnerHTML);
  cartList.insertAdjacentHTML("beforeend", cartListNoneInnerHTML);
  const summaryValue = document.querySelectorAll(".cartOrder-summary__value");
  summaryValue.forEach(el => {
    const num = parseInt(el.textContent.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num)) {
      el.textContent = `${num.toLocaleString()}`;
    }
  });

  // const modal = document.getElementById("modal-login");
  // modal.showModal();
});
