// // 헤더와 푸터 로드
// async function loadComponent(elementId, filePath) {
//   try {
//     const response = await fetch(filePath);
//     const html = await response.text();
//     document.getElementById(elementId).innerHTML = html;
//   } catch (error) {
//     console.error(`Failed to load ${filePath}:`, error);
//   }
// }

// // 페이지 로드 시 헤더와 푸터 로드
// document.addEventListener("DOMContentLoaded", function () {
//   loadComponent("header", "./components/header.html");
//   loadComponent("footer", "./components/footer.html");
// });
