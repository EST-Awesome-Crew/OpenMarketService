//캐러셀 관련 기능을 초기화하는 함수
export function carouselControl() {
  const carouselButton1 = document.querySelector(".carousel-container_button1");
  const carouselButton2 = document.querySelector(".carousel-container_button2");
  const carouselSlide = document.querySelector(".carousel-slide");
  let count = 0;

  /**
   * @param button
   * 캐러셀의 버튼을 누르면 캐러셀을 100%씩 이동시키는 함수
   */
  function carouselButton(button) {
    if (button === carouselButton1) {
      count--;
      if (count === -1) count = 2;
    } else {
      count++;
      if (count > 2) count = 0;
    }
    carouselSlide.style.transform = `translateX(-${count * 100}%)`;
  }

  //캐러셀의 이미지를 만드는 함수
  carouselSlide.innerHTML = `
    <li>
    <img/>

    </li>
    `;

  carouselButton1?.addEventListener("click", () => {
    carouselButton(carouselButton1);
  });
  carouselButton2?.addEventListener("click", () => {
    carouselButton(carouselButton2);
  });
}
