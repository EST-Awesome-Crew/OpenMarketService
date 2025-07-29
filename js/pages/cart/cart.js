import { getAccessToken } from "../login/auth.js";
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
  $cart.parentElement.querySelector("img").src = "../../assets/icons/icon-shopping-cart-2.svg";
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
    const $loginModal_cancel = document.querySelector(".modal--login .modal__btn--cancel");
    const $loginModal_close = document.querySelector(".modal--login .modal__close");
    const $loginModal_confirm = document.querySelector(".modal--login .modal__btn--confirm");
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
  const jwt = getAccessToken();
  try {
    const response = await fetch("https://api.wenivops.co.kr/services/open-market/cart/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("오류가 발생했습니다.");
    }
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
  } catch (error) {
    console.error(`Failed to load :`, error);
  }

  //비어있지않을경우 랜더링
  //parameter : response(data).results 값 전달
  function renderHtml(data) {
    data.map(x => {
      allPrdPrice += Number(x.product.price) * Number(x.quantity);
      allShipping += x.product.shipping_fee;
      const id = x.product.id;
      const imgUlr = x.product.image;
      const prdName = x.product.name;
      const prdSeller = x.product.seller.name;
      const prdPrice = x.product.price;
      const shipping_method = x.product.shipping_method == "PARCEL" ? "택배,소포,등기" : "직접배송(화물배달)";
      const shipping_fee = x.product.shipping_fee;
      const cartNum = x.quantity;
      const cartListInnerHTML = `
        <div class="cart__form-item">
          <article class="cart-item">
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
              <p class="cart-item__price">${(prdPrice * cartNum).toLocaleString()}원</p>
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
    const cartAllOrderBtn = document.querySelector(".cartOrder-summary__submit");

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
      const summaryValue = document.querySelectorAll(".cartOrder-summary__value");
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
  $quantityBtn.forEach($quantity => {
    $quantity.addEventListener("click", e => {
      e.preventDefault();
      const $modal = document.querySelector(".modal--quantity");
      $modal.showModal();
      $modal.querySelector(".modal__quantity-input").value = e.target
        .closest(".cart-item__quantity")
        .querySelector("input").value;
      modalPrdId = e.target.closest(".cart-item").querySelector(".prdId").value;
    });
  });
  // 수량 모달 close
  const $quantityModal_cancel = document.querySelector(".modal--quantity .modal__btn--cancel");
  const $quantityModal_close = document.querySelector(".modal--quantity .modal__close");
  $quantityModal_close.addEventListener("click", e => {
    e.preventDefault();
    const $modal = document.querySelector(".modal--quantity");
    $modal.close();
  });
  $quantityModal_cancel.addEventListener("click", e => {
    e.preventDefault();
    const $modal = document.querySelector(".modal--quantity");
    $modal.close();
  });
  // 수량 숫자 수정
  const $quantityModal_plus = document.querySelector(".modal--quantity .plus");
  const $quantityModal_minus = document.querySelector(".modal--quantity .minus");
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
  const $quantityModal_confirm = document.querySelector(".modal--quantity .modal__btn--confirm");
  $quantityModal_confirm.addEventListener("click", async e => {
    e.preventDefault();
    const $input = document.querySelector(".modal__quantity-input");
    if ($input.value.trim() == "" || !/^[0-9]+$/.test($input.value.trim()) || $input.value <= 0) {
      alert("값을 확인해주세요");
      return;
    }
    const data = await fetchCart(jwt, $input.value);
    if (data) {
      alert("수정이 완료되었습니다.");
      window.location.reload();
    } else {
      console.log("데이터를 가져오지 못했습니다.");
    }
  });
  async function fetchCart(jwt, num) {
    try {
      const response = await fetch(`https://api.wenivops.co.kr/services/open-market/cart/${modalPrdId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: num }),
      });

      // 응답 상태 체크
      if (response.status === 401) {
        throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
      } else if (!response.ok) {
        throw new Error(`서버 오류 발생 (status: ${response.status})`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to load:`, error);
      return null; // 실패 시 null 반환
    }
  }
  // 장바구니 삭제 API
  const $quantityDel = document.querySelectorAll(".cart-item__delete");
  $quantityDel.forEach(el => {
    el.addEventListener("click", async e => {
      e.preventDefault();
      const modalPrdId = e.target.closest(".cart-item").querySelector(".prdId").value;
      try {
        const response = await fetch(`https://api.wenivops.co.kr/services/open-market/cart/${modalPrdId}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        // 응답 상태 체크
        if (response.status === 401) {
          throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        } else if (!response.ok) {
          throw new Error(`서버 오류 발생 (status: ${response.status})`);
        }
        alert("해당 상품이 삭제 되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error(`Failed to load:`, error);
        return null; // 실패 시 null 반환
      }
    });
  });
  // 제품별 주문하기 API
  const selectedItems = [];
  const order_type = "cart_order";

  const $quantityOrder = document.querySelectorAll(".cart-item__order-btn");
  $quantityOrder.forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const selectedItem = [];
      const item = e.target.closest(".cart-item");
      const id = item.querySelector(".prdId").value;
      const qty = item.querySelector(".cart-item__quantity-input").value;
      selectedItem.push({ id, qty });
      const query = encodeURIComponent(JSON.stringify(selectedItem));
      window.location.href = `/pages/checkout.html?items=${query}&order_type=${order_type}`;
    });
  });
  // 체크 제품 금액 산정 + 체크 제품 id 값 수집
  const $checkBox = document.querySelectorAll(".cart-item__checkbox-input");
  $checkBox.forEach(el => {
    const item = el.closest(".cart-item");
    const id = item.querySelector(".prdId").value;
    const qty = item.querySelector(".cart-item__quantity-input").value;
    selectedItems.push({ id, qty });
    el.addEventListener("click", e => {
      updateSummary();
      if (el.checked) {
        if (!selectedItems.some(v => v.id === id)) {
          selectedItems.push({ id, qty });
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
    document.querySelectorAll(".cart-item__checkbox-input:checked").forEach(cb => {
      const cartItem = cb.closest(".cart-item");

      const price = Number(cartItem.querySelector(".cart-item__price").textContent.replace(/[^0-9]/g, ""));
      const quantity = Number(cartItem.querySelector(".cart-item__quantity-input").value.replace(/[^0-9]/g, ""));
      const shipping = Number(cartItem.querySelector(".cart-item__info-shipping").textContent.replace(/[^0-9]/g, ""));
      totalPrice += price;
      totalShipping += shipping;
    });
    const cartSummaryList = document.querySelector(".cartOrder-summary__list");
    cartSummaryList.firstElementChild.querySelector(".cartOrder-summary__value").textContent =
      totalPrice.toLocaleString();
    cartSummaryList.children[2].querySelector(".cartOrder-summary__value").textContent = totalShipping.toLocaleString();
    cartSummaryList.children[3].querySelector(".cartOrder-summary__value").textContent = (
      totalPrice + totalShipping
    ).toLocaleString();
  }
  //체크된 제품 주문

  document.querySelector(".cartOrder-summary__submit").addEventListener("click", e => {
    e.preventDefault();
    const query = encodeURIComponent(JSON.stringify(selectedItems));
    console.log(decodeURIComponent(query));
    window.location.href = `/pages/checkout.html?items=${query}&order_type=${order_type}`;
  });
});
