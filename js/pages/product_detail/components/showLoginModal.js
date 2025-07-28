export function showLoginModal() {
  const backdrop = document.getElementById("login-modal__backdrop");
  const loginModal = document.getElementById("login-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const loginBtn = document.getElementById("login");

  if (!loginModal) {
    console.error("Error: 'loginModal' element not found.");
    return;
  }
  if (!closeModalBtn) {
    console.error("Error: 'closeModal' button not found within loginModal.");
    return;
  }
  if (!loginBtn) {
    console.error("Error: 'login' button not found within loginModal.");
    return;
  }

  backdrop.style.display = "flex";

  // '아니오' 버튼 클릭 시 모달 닫기
  closeModalBtn.addEventListener("click", () => {
    backdrop.style.display = "none";
  });

  // '네' 버튼 클릭 시 login.html로 이동
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // 모달 외부 클릭 시 닫기
  loginModal.addEventListener("click", event => {
    if (event.target === loginModal) {
      loginModal.close();
    }
  });
}
