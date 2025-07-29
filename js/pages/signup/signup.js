//**회원가입 페이지**

// - 회원가입 할 때는 모든 입력을 완료하고 동의하기 체크를 눌러야만 회원가입이 가능합니다.
// - 회원 정보 입력 후 회원가입 버튼을 누르면 로그인 페이지로 이동합니다.
// - 아이디의 중복 확인 버튼을 눌렀을 때 중복이 된다면 입력창 아래에 경고 문구가 나타납니다.
// - 구매자 : 구매 회원 가입 탭을 누르고, 모든 입력을 마친 뒤(이용약관 체크박스 포함) 가입하기 버튼을 누르면 구매자로 회원가입이 됩니다.
// 1. 모든 필드는 필수로 작성해야 합니다.
// 2. 비밀번호는 8자 이상, 영소문자를 포함해야 합니다.
// 3. 핸드폰 번호는 010으로 시작하는 10~11자리 숫자로만 이루어져 있습니다.
// 4. 이름(name)은 중복될 수 있습니다.

import { IDvalidate } from "./components/IDvalidate.js";
import { PWvalidate } from "./components/PWvalidate.js";
import { buyerSignup } from "./components/buyerSignup.js";
import { formValidate } from "./components/formValidate.js";

const $form = document.querySelector(".signup");
const $loginType = document.querySelector(".login__type");
const $userType = document.querySelector(".userType");

// 판매자, 구매자 버튼 클릭 active 기능
$loginType.addEventListener("click", e => {
  const target = e.target.closest(".login__type-button");
  if (!target) return;

  $loginType
    .querySelector(".login__type-button--active")
    ?.classList.remove("login__type-button--active");

  target.classList.add("login__type-button--active");

  if (target.classList.contains("login__type-button--seller")) {
    $userType.value = "SELLER";
    $form.classList.add("signup--seller"); // 클래스 추가

    // 판매자 필드 입력 요소들 활성화
    document.querySelector("#signup__seller-number").disabled = false;
    document.querySelector("#store-name").disabled = false;
  } else {
    $userType.value = "BUYER";
    $form.classList.remove("signup--seller"); // 클래스 제거

    // 판매자 필드 입력 요소들 비활성화
    document.querySelector("#signup__seller-number").disabled = true;
    document.querySelector("#store-name").disabled = true;
  }
});

// 폼 유효성 검사 초기화
const validator = formValidate();
validator.init();

// 전역에서 접근 가능하도록 설정
window.formValidator = validator;

// 개별 컴포넌트 초기화
IDvalidate();
PWvalidate();

// 구매자 가입 컴포넌트 초기화
const buyerSignupHandler = buyerSignup();

// 폼 제출 시 최종 검사
$form.addEventListener("submit", async e => {
  e.preventDefault();

  if (validator.validateAll()) {
    // 사용자 타입에 따라 다른 처리
    const userType = $userType.value;

    if (userType === "BUYER") {
      // 구매자 회원가입 처리
      await buyerSignupHandler.handleSignup();
    } else if (userType === "SELLER") {
      // TODO: 판매자 회원가입 처리 (추후 구현)
      console.log("판매자 회원가입은 추후 구현 예정");
    }
  }
});

// 페이지 로드 시 기본값을 구매자로 설정
document.addEventListener("DOMContentLoaded", function () {
  const $userType = document.querySelector(".userType");
  if ($userType) {
    $userType.value = "BUYER";
  }

  // 판매자 필드들 기본 비활성화
  const sellerNumber = document.querySelector("#signup__seller-number");
  const storeName = document.querySelector("#store-name");
  if (sellerNumber) sellerNumber.disabled = true;
  if (storeName) storeName.disabled = true;
});
