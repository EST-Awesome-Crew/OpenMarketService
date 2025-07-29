import { showLoginModal } from "./showLoginModal.js";
import { fetchWithAuth } from "../../login/api.js"; // fetchWithAuth 임포트

export function getActionButtons(productId, stock) {
  function checkAuthAndUserType() {
    const accessToken = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");
    const userData = JSON.parse(userString);

    const isLoggedIn = accessToken !== null;

    if (!isLoggedIn) {
      showLoginModal(
        () => {
          window.location.href = "/login.html";
        },
        () => {
          console.log("사용자가 로그인을 거부하거나 모달을 닫았습니다.");
        }
      );
      return false;
    }

    if (userData.user_type !== "BUYER") {
      alert("구매자(BUYER)만 이용 가능한 기능입니다.");
      return false;
    }
    return true;
  }

  async function handleAddToCart() {
    if (!checkAuthAndUserType()) {
      return;
    }

    const inputQuantityElement = document.querySelector(
      ".product-detail__quantity-count"
    );
    const currentQuantity = inputQuantityElement
      ? Number(inputQuantityElement.value)
      : 1;

    if (isNaN(currentQuantity) || currentQuantity < 1) {
      alert("수량은 1개 이상으로 입력해주세요.");
      return;
    }

    if (currentQuantity > stock) {
      alert(`현재 선택하신 수량은 재고(${stock}개)보다 많습니다.`);
      return;
    }

    const cartItemData = {
      product_id: productId,
      quantity: currentQuantity,
      order_type: "cart_order",
    };

    try {
      const response = await fetchWithAuth(
        `https://api.wenivops.co.kr/services/open-market/cart/`,
        {
          method: "POST",
          body: JSON.stringify(cartItemData),
        }
      );

      if (!response) {
        alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
        sessionStorage.removeItem("cartItemToAdd");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `장바구니 추가 실패: ${response.status} - ${
            errorData.message || "알 수 없는 오류"
          }`
        );
      }

      const result = await response.json();
      console.log("장바구니 추가 성공:", result);
      alert("상품이 장바구니에 추가되었습니다.");
      sessionStorage.removeItem("cartItemToAdd");
    } catch (error) {
      console.error("장바구니 추가 중 오류:", error);
      alert("장바구니 추가 중 오류가 발생했습니다.");
      sessionStorage.removeItem("cartItemToAdd");
    }
  }

  async function handleBuyNow() {
    if (!checkAuthAndUserType()) {
      return;
    }

    const inputQuantityElement = document.querySelector(
      ".product-detail__quantity-count"
    );
    const currentQuantity = inputQuantityElement
      ? Number(inputQuantityElement.value)
      : 1;

    if (isNaN(currentQuantity) || currentQuantity < 1) {
      alert("수량은 1개 이상으로 입력해주세요.");
      return;
    }

    if (currentQuantity > stock) {
      alert(`현재 선택하신 수량은 재고(${stock}개)보다 많습니다.`);
      return;
    }

    const orderData = {
      id: productId,
      qty: currentQuantity,
    };
    sessionStorage.setItem("orderList", JSON.stringify(orderData));
    sessionStorage.setItem("order_type", "direct_order");

    window.location.href = "/pages/checkout.html";
  }

  function setupEventListeners(containerElement) {
    const buyNowBtn = containerElement.querySelector(
      ".product-detail__buy-now"
    );
    const addToCartBtn = containerElement.querySelector(
      ".product-detail__add-to-cart"
    );

    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", handleBuyNow);
    }
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", handleAddToCart);
    }
  }

  return { setupEventListeners };
}
