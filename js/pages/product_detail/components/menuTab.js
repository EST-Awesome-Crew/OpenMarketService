export function menuTab() {
  const tabList = document.querySelector(".product-tab__list");
  const tabContent = document.querySelector(".product-tab__content");

  const tabs = [
    { name: "상세정보", content: "<p>상품 상세정보 입니다.</p>" },
    { name: "리뷰", content: "<p>상품 리뷰입니다.</p>" },
    { name: "Q&A", content: "<p>Q&A 콘텐츠입니다.</p>" },
    { name: "반품/교환정보", content: "<p>반품/교환정보 콘텐츠입니다.</p>" },
  ];

  function renderTabMenu() {
    tabList.innerHTML = tabs
      .map(
        (tab, index) => `
      <li class="product-tab__item">
        <button 
          class="product-tab__button ${
            index === 0 ? "product-tab__button--active" : ""
          }" 
          data-index="${index}"
          aria-current="${index === 0 ? "true" : "false"}">
          ${tab.name}
          <span 
            class="product-tab__underline ${
              index === 0 ? "product-tab__underline--active" : ""
            }" 
            aria-hidden="true">
          </span>
        </button>
      </li>
    `
      )
      .join("");

    tabContent.innerHTML = tabs[0].content;

    addTabEventListeners();
  }

  function addTabEventListeners() {
    const buttons = tabList.querySelectorAll(".product-tab__button");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const selectedIndex = button.dataset.index;

        // 버튼 활성화 클래스 초기화
        buttons.forEach(btn => {
          btn.classList.remove("product-tab__button--active");
          btn.setAttribute("aria-current", "false");
          btn
            .querySelector(".product-tab__underline")
            ?.classList.remove("product-tab__underline--active");
        });

        // 클릭된 버튼에 클래스 추가
        button.classList.add("product-tab__button--active");
        button.setAttribute("aria-current", "true");
        button
          .querySelector(".product-tab__underline")
          ?.classList.add("product-tab__underline--active");

        // 콘텐츠 변경
        tabContent.innerHTML = tabs[selectedIndex].content;
      });
    });
  }

  return renderTabMenu();
}
