export function productDetail() {
  const productDetailContainer = document.querySelector(
    ".product-detail__container"
  );

  const data = async function fetchProductDetail(id) {
    try {
      const response = await fetch(
        `https://api.wenivops.co.kr/services/open-market/products/${id}/`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`api통신에 실패했습니다. ${response.status}`);
      }
      const data = await response.json();
      console.log(`data:${data}`);
      return data;
    } catch (error) {
      console.error(`API 호출 실패: ${error}`);
      return;
    }

    data(id).then(productData => {
      renderProductDetail(productData);
    });
  };

  function renderProductDetail(data) {
    if (!data) {
      productDetailContainer.innerHTML = `<p>상품 정보를 불러올 수 없습니다.</p>`;
      return;
    }
    productDetailContainer.innerHTML = `
    <img class="product-detail__image" src="../assets/images/blankit.png" alt="상품 사진">
    <div class="product-detail__summary">
      <p class="product-detail__category">백엔드 글로벌</p>
      <h2 class="product-detail__name">
        ${data.name}
      </h2>
      <p class="product-detail__price"><span class="xl-font">17,500</span><span>원</span></p>

      <p class="product-detail__delivery-cost">
        <span>택배배송</span>
        <span class="divider" aria-hidden="true">/</span>
        <span>무료배송</span>
      </p>

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
            총 수량 <span class="product-detail__quantity-count-result">1</span>개
          </span>

          <span class="divider" aria-hidden="true">|</span>

          <div class="product-detail__total-price">
            <span class="product-detail__price-number">17,500</span>
            <span class="product-detail__price-unit">원</span>
          </div>
        </div>
      </div>

      <div class="product-detail__actions">
        <button class="product-detail__buy-now">바로 구매</button>
        <button class="product-detail__add-to-cart">장바구니</button>
      </div>
    </div>
    `;
  }
  return renderProductDetail();
}
