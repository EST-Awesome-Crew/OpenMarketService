async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Failed to load ${filePath}:`, error);
  }
  if (elementId == "header") {
    const { initHeader } = await import("../../components/header.js");
    initHeader();
  }
}

// 페이지 로드 시 헤더와 푸터 로드
document.addEventListener("DOMContentLoaded", async function () {
  loadComponent("header", "./components/header.html");
  loadComponent("footer", "./components/footer.html");
});
