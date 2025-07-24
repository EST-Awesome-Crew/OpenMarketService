//캐러셀 관련 기능을 초기화하는 함수
export function carouselControl() {
  const carouselButton1 = document.querySelector(".carousel-container_button1");
  const carouselButton2 = document.querySelector(".carousel-container_button2");
  const carouselSlide = document.querySelector(".carousel-slide");
  let count = 0;
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
  }

  //캐러셀의 이미지를 만드는 함수

  function renderCarouselImages() {
    carouselSlide.innerHTML = carouselImage
      .map(v => `<li class="carousel-image"><img src="${v}" alt=""></li>`)
      .join("");
  }

  renderCarouselImages();
  carouselButton1?.addEventListener("click", () => {
    carouselButton(carouselButton1);
  });
  carouselButton2?.addEventListener("click", () => {
    carouselButton(carouselButton2);
  });
}
