export function setQuantityAndPrice(data) {
  const price = data?.price;
  const stock = data?.stock;
  console.log(stock);

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
  const stockMessage = document.querySelector(".product-detail__stock-message");

  function updateUI() {
    let currentQuantity = Number(inputQuantity.value);

    if (currentQuantity < 1 || isNaN(currentQuantity)) {
      currentQuantity = 1;
      inputQuantity.value = 1;
    }
    if (currentQuantity > stock) {
      inputQuantity.value = stock; // 재고만큼만 입력되도록 강제
      currentQuantity = stock;

      if (stockMessage) {
        stockMessage.textContent = `재고가 부족합니다! (현재 재고: ${stock}개)`;
        stockMessage.style.display = "block"; // 메시지 표시
        stockMessage.style.color = "red"; // 빨간색으로 표시
      }
    } else {
      if (stockMessage) {
        stockMessage.style.display = "none";
      }
    }

    currentQuantity = Number(inputQuantity.value);
    quantityResult.textContent = currentQuantity;
    priceResult.textContent = (price * currentQuantity).toLocaleString();
  }

  decreaseBtn.addEventListener("click", () => {
    if (Number(inputQuantity.value) > 1) {
      inputQuantity.value = Number(inputQuantity.value) - 1;
      updateUI();
    }
  });

  increaseBtn.addEventListener("click", () => {
    // 변경: 재고 물량 체크 로직 강화
    if (Number(inputQuantity.value) < stock) {
      //
      inputQuantity.value = Number(inputQuantity.value) + 1;
      updateUI();
    } else {
      // 재고가 없을 때도 메시지 표시 (증가 버튼 클릭 시)
      if (stockMessage) {
        stockMessage.textContent = `재고가 부족합니다! ${stock}개 이하로 주문해주세요.`;
        stockMessage.style.display = "block";
        stockMessage.style.color = "red";
        stockMessage.style.marginBottom = "30px";
      }
    }
  });

  if (!inputQuantity.value) {
    inputQuantity.value = 1;
  }
  // 초기 UI 설정
  updateUI();
}
