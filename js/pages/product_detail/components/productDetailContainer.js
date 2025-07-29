import { getProductSummary } from "./getProductSummary.js";
import { renderQuantityAndPrice } from "./renderQuantityAndPrice.js";
import { setQuantityAndPrice } from "./setQuantityAndPrice.js";
import { getActionButtons } from "./getActionButtons.js";
import { menuTab } from "./menuTab.js";

export function productDetail(productId) {
  const productDetailContainer = document.querySelector(
    ".product-detail__container"
  );

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
      if (!response.ok) {
        throw new Error(`api통신에 실패하였습니다. ${response.status}`);
      }

      const data = await response.json();
      renderProductDetail(data);
    } catch (error) {
      console.error("API 호출 실패:", error.message);
    }
  }

  function renderProductDetail(data) {
    if (!data) {
      productDetailContainer.innerHTML = `<p>상품 정보를 불러올 수 없습니다.</p>`;
      return;
    }

    productDetailContainer.innerHTML = `
      ${getProductSummary(data)}
      ${renderQuantityAndPrice(data)}
      <div class="product-detail__actions">
        <button class="product-detail__buy-now">바로 구매</button>
        <button class="product-detail__add-to-cart">장바구니</button>
      </div>
      </div> </div> 
      ${menuTab(data)}
    `;

    setQuantityAndPrice(data);

    const actionButtons = getActionButtons(productId, data?.stock);
    actionButtons.setupEventListeners(productDetailContainer);
  }

  return fetchProductDetail();
}
