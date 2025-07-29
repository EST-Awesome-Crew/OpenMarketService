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
  stockMessage.style.display = "block";
  stockMessage.style.color = "red";
  stockMessage.style.marginBottom = "30px";

  const buyNowBtn = document.querySelector(".product-detail__buy-now");
  const addToCartBtn = document.querySelector(".product-detail__add-to-cart");

  function updateUI() {
    let currentQuantity = Number(inputQuantity.value);

    if (currentQuantity < 1 || isNaN(currentQuantity)) {
      currentQuantity = 1;
      inputQuantity.value = 1;
    }
    if (currentQuantity > stock) {
      inputQuantity.value = stock;
      currentQuantity = stock;

      if (stockMessage) {
        stockMessage.textContent = `재고 소진`;
        stockMessage.style.display = "block";
        stockMessage.style.color = "red";
        stockMessage.style.marginBottom = "30px";

        decreaseBtn.disabled = true;
        increaseBtn.disabled = true;
        inputQuantity.disabled = true;
        buyNowBtn.disabled = true;
        addToCartBtn.disabled = true;

        buyNowBtn.classList.add("deactivate");
        addToCartBtn.classList.add("deactivate");
      }
    } else {
      if (stockMessage) {
        stockMessage.style.display = "none";

        decreaseBtn.disabled = false;
        increaseBtn.disabled = false;
        inputQuantity.disabled = false;
        buyNowBtn.disabled = false;
        addToCartBtn.disabled = false;

        buyNowBtn.classList.remove("deactivate");
        addToCartBtn.classList.remove("deactivate");
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
    if (Number(inputQuantity.value) < stock) {
      inputQuantity.value = Number(inputQuantity.value) + 1;
      updateUI();
    } else {
      if (stockMessage) {
        stockMessage.textContent = `재고가 부족합니다! ${stock}개 이하로 주문해주세요.`;
      }
    }
  });

  if (!inputQuantity.value) {
    inputQuantity.value = 1;
  }
  updateUI();
}
