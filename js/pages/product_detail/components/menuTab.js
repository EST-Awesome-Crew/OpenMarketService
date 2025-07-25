export function menuTab() {
  const tabList = document.querySelector(".product-tab__list");

  function renderTabMenu() {
    tabList.innerHTML = `
    <li class="product-tab__item">
      <button class="product-tab__button product-tab__button--active" aria-current="true">
        리뷰
        <span class="product-tab__underline product-tab__underline--active" aria-hidden="true"></span>
      </button>
    </li>
  `;
  }
  return renderTabMenu();
}
