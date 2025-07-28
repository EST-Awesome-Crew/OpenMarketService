import { showLoginModal } from "./showLoginModal.js";
import { getAccessToken } from "../../login/auth.js";

// 💡 변경: stock 인자를 추가했습니다. 이 인자가 없으면 재고 검사를 할 수 없습니다.
export function getActionButtons(productId, stock) {
  function checkAuthAndUserType() {
    const accessToken = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");
    const userData = JSON.parse(userString);

    const isLoggedIn = accessToken !== null;

    if (!isLoggedIn) {
      showLoginModal(
        () => {
          console.log(
            "사용자가 로그인에 동의했습니다. 로그인 페이지로 이동합니다."
          );
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
    const jwt = getAccessToken();

    if (isNaN(currentQuantity) || currentQuantity < 1) {
      alert("수량은 1개 이상으로 입력해주세요.");

      return;
    }

    if (currentQuantity > stock) {
      alert(`현재 선택하신 수량은 재고(${stock}개)보다 많습니다.`);
      return;
    }

    try {
      // 장바구니 추가 API 호출
      const response = await fetch(
        `https://api.wenivops.co.kr/services/open-market/cart/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: productId,
            quantity: currentQuantity,
          }),
        }
      );

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
      alert("상품이 장바구니에 추가되었습니다!");
      // showCartModal();
    } catch (error) {
      console.error("장바구니 추가 중 오류:", error);
      alert(`장바구니 추가 중 오류가 발생했습니다: ${error.message}`);
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
    // 💡 추가: 수량 유효성 검사 로직 끝

    const params = new URLSearchParams();
    params.append("productId", productId);
    params.append("quantity", currentQuantity);
    params.append("order_type", "direct_order");

    const orderPageUrl = `/checkout.html?${params.toString()}`;
    window.location.href = orderPageUrl;
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
