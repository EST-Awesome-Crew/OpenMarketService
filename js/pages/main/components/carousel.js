//캐러셀 동작을 위한 함수
export function carouselControl() {
  const carouselButton1 = document.querySelector(".carousel-container_button1");
  const carouselButton2 = document.querySelector(".carousel-container_button2");
  const carouselSlide = document.querySelector(".carousel-slide");
  const carouselIndicator = document.querySelector(
    ".carousel-container_indicator"
  );
  let count = 0;

  //캐러셀 이미지 배열
  const carouselImage = [
    "../../../assets/images/blankit.png",
    "../../../assets/images/keyling.jpg",
    "../../../assets/images/keyling2.jpg",
    "../../../assets/images/pouch.jpg",
    "../../../assets/images/sticker.jpg",
  ];
  /**
   * @param button
   * 캐러셀의 버튼을 누르면 캐러셀을 100%씩 이동시키는 함수
   */
  function carouselButton(button) {
    const imageLength = carouselImage.length - 1;
    if (button === carouselButton1) {
      count--;
      if (count === -1) count = imageLength;
    } else {
      count++;
      if (count > imageLength) count = 0;
    }
    carouselSlide.style.transform = `translateX(-${count * 100}%)`;
    renderCarouselIndicator();
  }

  /**
   * 캐러셀 이미지 베열을 순회하면서 li로 이미지를 추가하는 함수
   */
  function renderCarouselImages() {
    carouselSlide.innerHTML = carouselImage
      .map(v => `<li class="carousel-image"><img src="${v}" alt=""></li>`)
      .join("");
  }

  function renderCarouselIndicator() {
    carouselIndicator.innerHTML = carouselImage
      .map(
        (_, i) =>
          `<span class="indicator${i === count ? " active" : ""}"></span>`
      )
      .join("");
  }

  renderCarouselImages();
  renderCarouselIndicator();
  carouselButton1?.addEventListener("click", () => {
    carouselButton(carouselButton1);
  });
  carouselButton2?.addEventListener("click", () => {
    carouselButton(carouselButton2);
  });
}
