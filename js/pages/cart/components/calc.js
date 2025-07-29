export async function updateSummary(modalPrdId) {
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
export async function calc() {
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
}
