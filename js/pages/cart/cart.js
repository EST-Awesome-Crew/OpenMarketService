import { fetchWithAuth } from "../login/api.js";
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
  //장바구니 가져오기
  const response = await fetchWithAuth(
    "https://api.wenivops.co.kr/services/open-market/cart/",
    {
      method: "GET",
    }
  );
  const data = await response.json();
  //비어있을경우
  if (data.count == 0) {
    const cartList = document.querySelector(".cart__list");
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
    cartList.insertAdjacentHTML("beforeend", cartListNoneInnerHTML);
  } else {
    //비어있지 않을경우
    renderHtml(data.results);
  }

  //비어있지않을경우 랜더링
  //parameter : response(data).results 값 전달
  function renderHtml(data) {
    data.map(x => {
      allPrdPrice += Number(x.product.price) * Number(x.quantity);
      allShipping += x.product.shipping_fee;
      const id = x.product.id;
      const cartId = x.id;
      const imgUlr = x.product.image;
      const prdName = x.product.name;
      const prdSeller = x.product.seller.name;
      const prdPrice = x.product.price;
      const shipping_method =
        x.product.shipping_method == "PARCEL"
          ? "택배,소포,등기"
          : "직접배송(화물배달)";
      const shipping_fee = x.product.shipping_fee;
      const cartNum = x.quantity;
      const cartListInnerHTML = `
        <div class="cart__form-item">
          <article class="cart-item">
            <input type="hidden" class="cartId" value="${cartId}">
            <input type="hidden" class="prdId" value="${id}">
            <label class="cart-item__checkbox-label" for="check${id}">
              <input
                type="checkbox"
                class="cart-item__checkbox-input"
                id="check${id}"
                aria-label="상품 선택"
                checked
              />
              <span class="cart-item__checkbox-span" aria-hidden="true"></span>
            </label>
            <img src="${imgUlr}" alt="${prdName}" class="cart-item__image" />
            <div class="cart-item__info">
              <span class="cart-item__info-seller">${prdSeller}</span>
              <span class="cart-item__info-name">${prdName}</span>
              <span class="cart-item__info-price">${prdPrice.toLocaleString()} 원</span>
              <span class="cart-item__info-shipping">${shipping_method} / ${shipping_fee.toLocaleString()} 원</span>
            </div>
            <div class="cart-item__quantity">
              <button class="cart-item__quantity-btn minus"><img src="../../assets/icons/icon-minus-line.svg" alt="" /></button>
              <input
                type="number"
                class="cart-item__quantity-input"
                value="${cartNum}"
                aria-label="수량 입력"
                readonly
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
        </div>`;
      const cartList = document.querySelector(".cart__list");
      cartList.insertAdjacentHTML("beforebegin", cartListInnerHTML);
      updateSummary();
    });

    const cartSummary = document.querySelector(".cartOrder-summary");
    const cartAllOrderBtn = document.querySelector(
      ".cartOrder-summary__submit"
    );

    const summaryValue = document.querySelectorAll(".cartOrder-summary__value");
    summaryValue.forEach(el => {
      const num = parseInt(el.textContent.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(num)) {
        el.textContent = `${num.toLocaleString()}`;
      }
    });
    cartSummary.style.display = "block";
    cartAllOrderBtn.style.display = "block";
  }
  // 전체 체크 박스  기능
  const $allCheckBox = document.querySelector(".cart__header__checkbox-input");
  $allCheckBox.addEventListener("click", e => {
    const $checkBox = document.querySelectorAll(".cart-item__checkbox-input");
    if ($allCheckBox.checked) {
      const summaryValue = document.querySelectorAll(
        ".cartOrder-summary__value"
      );
      summaryValue.forEach(el => {
        const num = parseInt(el.textContent.replace(/[^0-9]/g, ""), 10);
        if (!isNaN(num)) {
          el.textContent = `${num.toLocaleString()}`;
        }
      });
      $checkBox.forEach(cb => {
        cb.checked = true;
      });
    } else {
      $checkBox.forEach(cb => {
        cb.checked = false;
      });
    }
    updateSummary();
  });
  // 수량 모달 open
  const $quantityBtn = document.querySelectorAll(".cart-item__quantity-btn");
  let modalPrdId;
  let modalCartId;
  $quantityBtn.forEach($quantity => {
    $quantity.addEventListener("click", e => {
      e.preventDefault();
      const $modal = document.querySelector(".modal--quantity");
      $modal.showModal();
      $modal.querySelector(".modal__quantity-input").value = e.target
        .closest(".cart-item__quantity")
        .querySelector("input").value;
      modalPrdId = e.target.closest(".cart-item").querySelector(".prdId").value;
      modalCartId = e.target
        .closest(".cart-item")
        .querySelector(".cartId").value;
    });
  });
  // 수량 모달 close
  const $quantityModal_cancel = document.querySelector(
    ".modal--quantity .modal__btn--cancel"
  );
  const $quantityModal_close = document.querySelector(
    ".modal--quantity .modal__close"
  );
  $quantityModal_close.addEventListener("click", e => {
    e.preventDefault();
    modalClose();
  });
  $quantityModal_cancel.addEventListener("click", e => {
    e.preventDefault();
    modalClose();
  });
  function modalClose() {
    const $modal = document.querySelector(".modal--quantity");
    $modal.close();
  }
  // 수량 숫자 수정
  const $quantityModal_plus = document.querySelector(".modal--quantity .plus");
  const $quantityModal_minus = document.querySelector(
    ".modal--quantity .minus"
  );
  $quantityModal_plus.addEventListener("click", e => {
    e.preventDefault();
    const $input = document.querySelector(".modal__quantity-input");
    $input.value = Number($input.value) + 1;
  });
  $quantityModal_minus.addEventListener("click", e => {
    e.preventDefault();
    const $input = document.querySelector(".modal__quantity-input");
    if ($input.value > 1) {
      $input.value = Number($input.value) - 1;
    }
  });
  // 수량 숫자 수정 API
  const $quantityModal_confirm = document.querySelector(
    ".modal--quantity .modal__btn--confirm"
  );
  $quantityModal_confirm.addEventListener("click", async e => {
    e.preventDefault();
    const $input = document.querySelector(".modal__quantity-input");
    if (
      $input.value.trim() == "" ||
      !/^[0-9]+$/.test($input.value.trim()) ||
      $input.value <= 0
    ) {
      alert("값을 확인해주세요");
      return;
    }
    const chStock = await checkStock($input.value);
    if (!chStock) {
      return;
    }
    const data = await fetchCart($input.value);
    if (data) {
      alert("수정이 완료되었습니다.");
      window.location.reload();
    } else {
      console.log("데이터를 가져오지 못했습니다.");
    }
  });
  async function checkStock(num) {
    const response = await fetchWithAuth(
      `https://api.wenivops.co.kr/services/open-market/products/${modalPrdId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data.stock);
    if (!response) return false;
    if (data.stock < num) {
      alert("해당 제품의 재고가 부족합니다 상세페이지에서 재고를 확인해주세요");
      return false;
    }
    return true;
  }
  // 장바구니 수량 수정 API
  async function fetchCart(num) {
    const response = await fetchWithAuth(
      `https://api.wenivops.co.kr/services/open-market/cart/${modalCartId}/`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity: num }),
      }
    );
    if (!response) return;
    return true;
  }
  // 장바구니 삭제 API
  const $quantityDel = document.querySelectorAll(".cart-item__delete");
  $quantityDel.forEach(el => {
    el.addEventListener("click", async e => {
      e.preventDefault();
      if (!confirm("장바구니에서 삭제하시겠습니까?")) {
        return;
      }
      const modalCartId = e.target
        .closest(".cart-item")
        .querySelector(".cartId").value;
      const response = await fetchWithAuth(
        `https://api.wenivops.co.kr/services/open-market/cart/${modalCartId}/`,
        {
          method: "DELETE",
        }
      );
      if (!response) return;
      alert("해당 상품이 삭제 되었습니다.");
      window.location.reload();
    });
  });
  // 제품별 주문하기 API
  const selectedItems = [];
  const order_type = "cart_order";
  const $itemOrder = document.querySelectorAll(".cart-item__order-btn");
  $itemOrder.forEach(el => {
    el.addEventListener("click", async e => {
      e.preventDefault();
      const selectedItem = [];
      const item = e.target.closest(".cart-item");
      const id = item.querySelector(".prdId").value;
      const cartId = item.querySelector(".cartId").value;
      const qty = item.querySelector(".cart-item__quantity-input").value;
      modalPrdId = item.closest(".cart-item").querySelector(".prdId").value;
      modalCartId = item.closest(".cart-item").querySelector(".cartId").value;
      const stock = await checkStock(qty);
      if (!stock) {
        return;
      }
      selectedItem.push({ id, qty, cartId });
      sessionStorage.setItem("orderList", JSON.stringify(selectedItem));
      sessionStorage.setItem("orderType", order_type);
      window.location.href = `/pages/checkout.html`;
    });
  });
  // 체크 제품 금액 산정 + 체크 제품 id 값 수집
  const $checkBox = document.querySelectorAll(".cart-item__checkbox-input");
  $checkBox.forEach(el => {
    const item = el.closest(".cart-item");
    const id = item.querySelector(".prdId").value;
    const cartId = item.querySelector(".cartId").value;
    const qty = item.querySelector(".cart-item__quantity-input").value;
    selectedItems.push({ id, qty, cartId });
    el.addEventListener("click", e => {
      updateSummary();
      if (el.checked) {
        if (!selectedItems.some(v => v.id === id)) {
          selectedItems.push({ id, qty, cartId });
        }
      } else {
        const index = selectedItems.findIndex(v => v.id === id);
        if (index !== -1) selectedItems.splice(index, 1);
      }
    });
  });
  function updateSummary() {
    let totalPrice = 0;
    let totalShipping = 0;
    document
      .querySelectorAll(".cart-item__checkbox-input:checked")
      .forEach(cb => {
        const cartItem = cb.closest(".cart-item");

        const price = Number(
          cartItem
            .querySelector(".cart-item__price")
            .textContent.replace(/[^0-9]/g, "")
        );
        const quantity = Number(
          cartItem
            .querySelector(".cart-item__quantity-input")
            .value.replace(/[^0-9]/g, "")
        );
        const shipping = Number(
          cartItem
            .querySelector(".cart-item__info-shipping")
            .textContent.replace(/[^0-9]/g, "")
        );
        totalPrice += price;
        totalShipping += shipping;
      });
    const cartSummaryList = document.querySelector(".cartOrder-summary__list");
    cartSummaryList.firstElementChild.querySelector(
      ".cartOrder-summary__value"
    ).textContent = totalPrice.toLocaleString();
    cartSummaryList.children[2].querySelector(
      ".cartOrder-summary__value"
    ).textContent = totalShipping.toLocaleString();
    cartSummaryList.children[3].querySelector(
      ".cartOrder-summary__value"
    ).textContent = (totalPrice + totalShipping).toLocaleString();
  }
  //체크된 제품 주문
  document
    .querySelector(".cartOrder-summary__submit")
    .addEventListener("click", async e => {
      e.preventDefault();
      document
        .querySelectorAll(".cart-item__checkbox-input:checked")
        .forEach(async cb => {
          const cartItem = cb.closest(".cart-item");
          const qty = cartItem.querySelector(".cart-item__quantity-input");
          modalPrdId = cartItem
            .closest(".cart-item")
            .querySelector(".prdId").value;
          modalCartId = cartItem
            .closest(".cart-item")
            .querySelector(".cartId").value;
          const stock = await checkStock(Number(qty.value));
          debugger;
          if (!stock) {
            cartItem.querySelector(".cart-item__quantity").focus();
            return;
          }
        });
      sessionStorage.setItem("orderList", JSON.stringify(selectedItems));
      sessionStorage.setItem("orderType", order_type);
      window.location.href = `/pages/checkout.html`;
    });
});
