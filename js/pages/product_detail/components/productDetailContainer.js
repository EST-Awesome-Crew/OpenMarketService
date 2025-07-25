import { shippingMethodMap } from "../../../utils/constants.js"; //

export function productDetail(productId) {
  //
  const productDetailContainer = document.querySelector(
    ".product-detail__container"
  );

  function numberFormation(number) {
    if (typeof number !== "number" || isNaN(number)) {
      return String(number);
    }
    return number.toLocaleString("ko-KR");
  }

  // 이미지와 기본 상품 정보 섹션 템플릿
  function getProductSummary(data) {
    return `
      <img class="product-detail__image" src="${data?.image}" alt="상품 사진">
      <div class="product-detail__summary">
        <p class="product-detail__category">백엔드 글로벌</p>
        <h2 class="product-detail__name">
          ${data?.name}
        </h2>
        <p class="product-detail__price"><span class="xl-font">${numberFormation(
          data?.price
        )}</span><span>원</span></p>

        <p class="product-detail__delivery-cost">
          <span>${
            shippingMethodMap[data?.shipping_method] || "알 수 없음"
          }</span>
          <span class="divider" aria-hidden="true">/</span>
          <span>
            ${
              data?.shipping_fee !== 0
                ? "배송비 " + numberFormation(data?.shipping_fee) + "원"
                : "무료배송"
            }
          </span>
        </p>
    `;
  }

  function setQuantityAndPrice(data) {
    const price = data?.price;
    let quantity = 1;

    const decreaseBtn = document.querySelector(
      ".product-detail__quantity-decrease"
    );
    const increaseBtn = document.querySelector(
      ".product-detail__quantity-increase"
    );
    const inputQuantity = document.querySelector(
      ".product-detail__quantity-count"
    );
    const quantityResult = document.querySelector(
      ".product-detail__quantity-count-result"
    );
    const priceResult = document.querySelector(".product-detail__price-number");

    function updateUI() {
      quantity = Number(inputQuantity.value);
      quantityResult.textContent = quantity;
      priceResult.textContent = (price * quantity).toLocaleString();
    }

    decreaseBtn.addEventListener("click", () => {
      if (Number(inputQuantity.value) > 1) {
        inputQuantity.value = Number(inputQuantity.value) - 1;
        updateUI();
      }
    });

    increaseBtn.addEventListener("click", () => {
      if (Number(inputQuantity.value) < data?.stock) {
        inputQuantity.value = Number(inputQuantity.value) + 1;
        updateUI();
      }
    });
    // 초기 UI 설정
    updateUI();
  }

  // 수량 조절 및 총 상품 금액 섹션 템플릿
  function renderQuantityAndPrice(data) {
    return `
      <span class="section-divider" aria-hidden="true"></span>
      <div class="product-detail__quantity">
        <button class="product-detail__quantity-decrease"></button>
        <input type="number" class="product-detail__quantity-count" value="1">
        <button class="product-detail__quantity-increase"></button>
      </div>
      <span class="section-divider" aria-hidden="true"></span>

      <div class="product-detail__price-result">
        <span class="product-detail__price-label">총 상품 금액</span>

        <div class="product-detail__price-meta">
          <span class="product-detail__quantity-result">
            총 수량 <span class="product-detail__quantity-count-result"></span>개
          </span>

          <span class="divider" aria-hidden="true">|</span>

          <div class="product-detail__total-price">
            <span class="product-detail__price-number">17,500</span>
            <span class="product-detail__price-unit">원</span>
          </div>
        </div>
      </div>
    `;
    setQuantityAndPrice(data);
  }

  // 액션 버튼 섹션 템플릿
  function getActionButtons() {
    return `
      <div class="product-detail__actions">
        <button class="product-detail__buy-now">바로 구매</button>
        <button class="product-detail__add-to-cart">장바구니</button>
      </div>
    `;
  }

  async function fetchProductDetail() {
    try {
      const response = await fetch(
        `https://api.wenivops.co.kr/services/open-market/products/${productId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`response: ${response}`);
      if (!response.ok) {
        throw new Error(`api통신에 실패하였습니다. ${response.status}`);
      }

      const data = await response.json();
      console.log("상품 정보:", data);
      renderProductDetail(data);
    } catch (error) {
      console.error("API 호출 실패:", error.message);
    }
  }

  // 최종 렌더링 함수: 모든 부분을 합쳐서 한 번에 할당
  function renderProductDetail(data) {
    if (!data) {
      productDetailContainer.innerHTML = `<p>상품 정보를 불러올 수 없습니다.</p>`;
      return;
    }

    // 각 부분에서 생성된 HTML 문자열을 합칩니다.
    // getProductSummaryHtml에서 닫히지 않은 div를 마지막에 닫아줍니다.
    productDetailContainer.innerHTML = `
      ${getProductSummary(data)}
      ${renderQuantityAndPrice(data)}
      ${getActionButtons()}
      </div> </div> 
    `;
    setQuantityAndPrice(data);
  }

  return fetchProductDetail();
}
