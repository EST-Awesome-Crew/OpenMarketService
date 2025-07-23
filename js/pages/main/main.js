//메인 페이지 js파일입니다.

//캐러셀 버튼 function
const carouselButton1 = document.querySelector(".carousel-container_button1");
const carouselButton2 = document.querySelector(".carousel-container_button2");
const carouselSlide = document.querySelector(".carousel-slide");
//캐러셀 버튼 이벤트 함수
let count = 0;
/**
 *
 * @param button
 * 캐러셀의 버튼을 누르면 캐러셀을 100%씩 이동시키는 함수
 */
function carouselButton(button) {
  if (button === carouselButton1) {
    count--;
    if (count < 0) count = 2;
  } else {
    count++;
    if (count > 2) count = 0;
  }
  carouselSlide.style.transform = `translateX(-${count * 100}%)`;
}

carouselButton1.addEventListener("click", () => {
  carouselButton(carouselButton1);
});
carouselButton2.addEventListener("click", () => {
  carouselButton(carouselButton2);
});

const productList = document.querySelector(".product-container__list");

function renderProducts(products) {
  const productHTML = products
    .map(
      product => `
    <li class="product-item">
      <img src="${product.image}" alt="${product.name}">
      <p>${product.seller.store_name}</p>
      <p>${product.name}</p>
      <p>${product.price.toLocaleString()}원</p>
    </li>
  `
    )
    .join("");

  productList.innerHTML = productHTML;
}

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://api.wenivops.co.kr/services/open-market/products/"
    );

    if (!response.ok) {
      throw new Error(`api통신에 실패하였습니다. ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`API 호출 실패:, ${error} `);
    return [];
  }
}

// 헤더와 푸터 로드
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error);
  }
}

// 페이지 로드 시 헤더와 푸터 로드
document.addEventListener("DOMContentLoaded", async function () {
  loadComponent("header", "./components/header.html");
  loadComponent("footer", "./components/footer.html");

  // 상품 데이터 로드 및 렌더링
  const products = await fetchProducts();
  if (products.length > 0) {
    renderProducts(products);
  } else {
    productList.innerHTML = "<li>상품을 불러올 수 없습니다.</li>";
  }
});
