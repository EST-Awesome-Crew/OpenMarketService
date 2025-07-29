import { fetchWithAuth } from "../../login/api.js";
import { updateSummary } from "./calc.js";

export async function render(
  allPrdPrice,
  allShipping,
  modalPrdId,
  modalCartId
) {
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
    checkStockHtml(data.results);
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
              <p class="cart-item__info-seller">${prdSeller}</p>
              <p class="cart-item__info-name">${prdName}</p>
              <p class="cart-item__info-price">${prdPrice.toLocaleString()} 원</p>
              <p class="cart-item__info-shipping">${shipping_method} / ${shipping_fee.toLocaleString()} 원</p>
            </div>
            <div class="cart-item__quantity">
              <button type="button" class="cart-item__quantity-btn minus"><img src="../../assets/icons/icon-minus-line.svg" alt="수량 감소"  /></button>
              <input
                type="number"
                class="cart-item__quantity-input"
                value="${cartNum}"
                aria-label="수량 입력"
                readonly
              />
              <button type="button" class="cart-item__quantity-btn plus"><img src="../../assets/icons/icon-plus-line.svg" alt="수량 증가" /></button>
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
      sessionStorage.setItem("order_type", order_type);
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

  //체크된 제품 주문
  document
    .querySelector(".cartOrder-summary__submit")
    .addEventListener("click", async e => {
      e.preventDefault();
      const filteredItems = [];
      document
        .querySelectorAll(".cart-item__checkbox-input:checked")
        .forEach(async cb => {
          const cartItem = cb.closest(".cart-item");
          const qty = cartItem.querySelector(
            ".cart-item__quantity-input"
          ).value;
          modalPrdId = cartItem
            .closest(".cart-item")
            .querySelector(".prdId").value;
          modalCartId = cartItem
            .closest(".cart-item")
            .querySelector(".cartId").value;
          const id = modalPrdId;
          const cartId = modalCartId;
          filteredItems.push({ id, qty, cartId });
        });
      sessionStorage.removeItem("orderList");
      sessionStorage.setItem("orderList", JSON.stringify(filteredItems));
      window.location.href = `/pages/checkout.html`;
    });
  //재고체크
  async function checkStock(num) {
    const response = await fetchWithAuth(
      `https://api.wenivops.co.kr/services/open-market/products/${modalPrdId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response) return false;
    if (data.stock < num) {
      alert("해당 제품의 재고가 부족합니다 상세페이지에서 재고를 확인해주세요");
      return false;
    }
    return true;
  }
  async function checkStock2(num, id) {
    const response = await fetchWithAuth(
      `https://api.wenivops.co.kr/services/open-market/products/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response) return false;
    return data.stock;
  }
  function checkStockHtml(data) {
    data.map(async x => {
      const item = document
        .querySelector(`#check${x.product.id}`)
        .closest(".cart-item");
      const qty = Number(await checkStock2(x.quantity, x.product.id));
      console.log(qty, x.product.id);
      sessionStorage.setItem("orderList", JSON.stringify(selectedItems));
      sessionStorage.setItem("order_type", order_type);
      if (qty < x.quantity) {
        item.querySelector(".cart-item__checkbox-input").remove();
        item.querySelector(".cart-item__order-btn").disabled = true;
        item
          .querySelectorAll(".cart-item__quantity-btn")
          .forEach(btn => (btn.disabled = true));
        item
          .querySelector(".cart-item__info")
          .insertAdjacentHTML(
            "beforeend",
            "<p style='color:red ; padding-top:6px'>재고 소진</p>"
          );
        updateSummary();
      }
    });
  }
}
