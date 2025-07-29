# **🚀 OpenMarket - 프론트엔드 개발 프로젝트**

![img](./assets/icons/Logo-hodu.svg)

## 🌟 프로젝트 개요

OpenMarket은 오픈소스 기반의 마켓플레이스를 개발하는 프론트엔드 프로젝트입니다. 사용자 친화적인 인터페이스와 직관적인 쇼핑 경험을 제공하는 것을 목표로 합니다. 본 프로젝트는 3명의 프론트엔드 개발자가 협력하여 진행하며, 효율적인 협업을 위해 명확한 코드 컨벤션과 워크플로우를 준수합니다.

### 📑 목차

- [👥 팀원 소개](#-팀원-소개)
- [🛠️ 기술 스택 및 개발 환경](#️-기술-스택-및-개발-환경)
- [🎨 네이밍 규칙 및 컨벤션](#-네이밍-규칙-및-컨벤션)
- [📁 폴더 구조](#-폴더-구조)
- [📄 구현 페이지](#-구현-페이지)
- [✨ 주요 기능](#-주요-기능-api-명세-기반)
- [✅ 주요 페이지별 상세 기능](#-주요-페이지별-상세-기능)
- [🚀 개발 워크플로우](#-개발-워크플로우)

## 👥 팀원 소개

본 프로젝트는 3명의 프론트엔드 개발자가 함께 만들어갑니다.

- **민경현 (팀장, 프론트엔드 개발자)**
- **이상철 (팀원, 프론트엔드 개발자)**
- **이지언 (팀원, 프론트엔드 개발자)**

## 🛠️ 기술 스택 및 개발 환경

### **Frontend**

- **HTML5**: 시맨틱 마크업을 활용하여 웹 표준 준수 및 검색 엔진 최적화(SEO) 고려
- **CSS3 + Sass**: 모듈화된 스타일링 및 전처리기 기능을 통해 효율적인 스타일 관리 (BEM 방법론 적용)
- **JavaScript (ES6+)**: 인터랙티브한 동적 요소 구현 및 비즈니스 로직 처리

### **API & Authentication**

- **JWT (JSON Web Token)**: 사용자 인증 및 토큰 관리
- **Fetch API**: RESTful API 통신
- **다음 우편번호 API**: 주소 검색 기능

### **Storage**

- **Web Storage API**: localStorage, sessionStorage 활용

### **Development Tools**

- **Git/GitHub**: 버전 관리 및 팀 협업을 위한 시스템
- **VS Code**: 개발 환경
- **Live Server**: 로컬 개발 서버

## 🎨 네이밍 규칙 및 컨벤션

본 프로젝트는 [Google Style Guide](https://google.github.io/styleguide/htmlcssguide.html)를 기반으로 한 프론트엔드 코드 컨벤션을 따릅니다.

- **HTML 파일**: kebab-case 사용 (product-detail.html)
- **CSS/Sass 파일**: kebab-case 사용, Sass partial 파일은 언더스코어(\_)로 시작 (\_product-card.scss)
- **JavaScript 파일**: camelCase 사용 (productCard.js)
- **HTML 작성 규칙**: 2칸 들여쓰기, 소문자 태그, 쌍따옴표 사용, 시맨틱 HTML, 속성 순서 준수.
- **CSS/Sass 작성 규칙**: 2칸 들여쓰기, BEM 방법론 (Block\_\_Element--Modifier), 속성 선언 순서 준수 (Position \-\> Box Model \-\> Typography \-\> Visual \-\> Animation).
- **JavaScript 작성 규칙**: ES6+ 문법, camelCase 네이밍, 2칸 들여쓰기, 세미콜론 필수, const/let 사용.

**더 상세한 내용은 [프로젝트 Wiki \- 코드 컨벤션](https://www.google.com/search?q=https://github.com/%5BYour_Organization%5D/%5BYour_Repo%5D/wiki/%25EC%25BD%2594%25EB%2593%259C-%25EC%25BB%25A4%25EB%25B2%25A4%25EC%2585%2598)을 참고해 주세요.**

## **📖 프로젝트 소개**

### **📁 폴더 구조**

```
OpenMarketService/
├── assets/                    # 정적 자원
│   ├── icons/                # 아이콘 파일들 (SVG, ICO 등)
│   └── images/               # 이미지 파일들
├── css/                      # 컴파일된 CSS 파일
│   └── main.css             # 메인 CSS 파일
├── scss/                     # Sass 소스 파일
│   ├── abstracts/           # 변수, 믹스인, 함수
│   │   ├── _mixins.scss
│   │   └── _variables.scss
│   ├── base/                # 기본 스타일 (reset, typography 등)
│   │   ├── _base.scss
│   │   └── _reset.scss
│   ├── components/          # 컴포넌트별 스타일
│   │   ├── _button.scss
│   │   ├── _carousel.scss
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   │   └── _modal.scss
│   ├── layout/              # 레이아웃 스타일
│   │   └── _layout.scss
│   ├── pages/               # 페이지별 스타일
│   │   ├── _cart.scss
│   │   ├── _checkout.scss
│   │   ├── _login.scss
│   │   ├── _main.scss
│   │   ├── _product.scss
│   │   └── _signup.scss
│   └── main.scss            # 메인 Sass 파일
├── js/                      # JavaScript 파일
│   ├── components/          # 공통 컴포넌트 JS
│   │   ├── footer.js
│   │   └── header.js
│   ├── pages/               # 페이지별 JS
│   │   ├── cart/
│   │   ├── login/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── login.js
│   │   ├── main/
│   │   │   ├── components/
│   │   │   │   └── carousel.js
│   │   │   └── main.js
│   │   ├── product/
│   │   └── signup/
│   │       ├── components/
│   │       │   ├── IDvalidate.js
│   │       │   ├── PWvalidate.js
│   │       │   ├── buyerSignup.js
│   │       │   ├── formValidate.js
│   │       │   └── phoneNumberValidate.js
│   │       └── signup.js
│   └── utils/               # 유틸리티 함수
├── pages/                   # HTML 페이지
│   ├── cart.html
│   ├── checkout.html
│   ├── login.html
│   ├── product.html
│   └── signup.html
├── index.html               # 메인 페이지
└── README.md               # 프로젝트 문서
```

### **📄 구현 페이지**

본 프로젝트에서 구현할 주요 페이지 목록입니다.

- **로그인 페이지**
- **회원 가입 페이지**
- **상품 목록 페이지**
- **상품 상세 페이지**
- **장바구니 페이지**
- **주문/결제 페이지**
- **마이페이지 (UI만)**

### **✨ 주요 기능 (API 명세 기반)**

백엔드 API 명세를 기반으로 프론트엔드에서 구현할 핵심 기능들입니다.

- **계정 (Account)**
  - POST /account: 구매자 계정 생성
  - POST /account/seller: 판매자 계정 생성
  - POST /account/verify/id: 아이디 중복 검증
  - POST /account/verify/business-number: 사업자등록번호 검증
  - POST /login: 로그인 요청
  - POST /login/refresh: refresh token으로 새 access token 요청
  - POST /logout: 로그아웃
- **상품 (Product)**
  - GET /products: 상품 전체 불러오기
  - GET /products/seller: 판매자 상품 불러오기
  - POST /products: 상품 등록
  - GET /products/{productId}: 상품 디테일 불러오기
  - PUT /products/{productId}: 상품 수정
  - DELETE /products/{productId}: 상품 삭제
  - GET /products?title={keyword}: 상품 제목 검색
- **장바구니 (Cart)**
  - GET /cart: 장바구니 목록 보기
  - POST /cart: 장바구니에 물건 넣기
  - GET /cart/{cartItemId}: 장바구니 디테일
  - PUT /cart/{cartItemId}: 장바구니 수량 수정
  - DELETE /cart/{cartItemId}: 장바구니 개별 상품 삭제
  - DELETE /cart: 장바구니 전부 삭제
- **주문 (Order)**
  - POST /order/direct: direct_order로 주문 생성
  - POST /order/cart: cart_order로 주문 생성
  - GET /order: 주문 목록 가져오기
  - GET /order/{orderId}: 개별 주문 가져오기
  - PUT /order/{orderId}: 주문 수정
  - DELETE /order/{orderId}: 주문 삭제

### **✅ 주요 페이지별 상세 기능**

#### **1\) 로그인 페이지**

**✅ 구현 완료된 기능:**

- **구매자/판매자 탭 전환**: 구매회원 로그인/판매회원 로그인 탭 클릭으로 로그인 유형 변경
- **탭 활성화 상태**: 선택된 탭에 `login__type-button--active` 클래스 적용하여 시각적 구분
- **폼 유효성 검사**: 아이디/비밀번호 입력 필드 검증
- **에러 메시지 표시**: 로그인 실패 시 `error-message` 클래스로 경고 문구 표시
- **접근성 고려**: `aria-live="polite"` 속성으로 스크린 리더 지원
- **토큰 기반 인증**: JWT Access Token/Refresh Token 방식 구현
- **자동 토큰 갱신**: Refresh Token을 이용한 자동 Access Token 재발급
- **로그아웃 처리**: 토큰 만료 시 자동 로그아웃 및 로그인 페이지 리다이렉트

**🔧 주요 기술 구현:**

```javascript
// 토큰 저장 및 관리 (auth.js)
- localStorage를 이용한 토큰 저장
- Access Token/Refresh Token 분리 관리
- 토큰 만료 시 자동 클리어

// API 통신 (api.js)
- 토큰 자동 갱신 기능
- 401 에러 시 토큰 재발급 후 재시도
- fetchWithAuth 유틸리티 함수로 인증 API 호출 간소화
```

**\[화면 캡쳐\]**
![화면 기록 2025-07-29 오후 9 36 06-1](https://github.com/user-attachments/assets/8cc664b7-2b29-41a8-9b03-e8199dd2358a)


\<\!-- 로그인 페이지 화면 캡쳐 (성공, 실패, 경고 메시지 등) \--\>

#### **2\) 회원가입 페이지**

**✅ 구현 완료된 기능:**

- **구매자/판매자 회원 유형 선택**: 탭 버튼으로 회원 유형 전환, 선택된 탭에 `login__type-button--active` 클래스 적용
- **동적 폼 구조 변경**: 판매자 선택 시 `signup--seller` 클래스 추가로 사업자 등록번호, 스토어 이름 필드 표시
- **실시간 유효성 검사**:
  - **아이디 중복 확인**: API 연동하여 실시간 중복 검사 (`/accounts/validate-username/`)
  - **비밀번호 강도 검사**: 8자 이상, 영문 대소문자, 숫자, 특수문자 조합 검증 (디바운싱 500ms 적용)
  - **비밀번호 확인**: 비밀번호 일치 여부 실시간 검증
  - **전화번호 형식 검사**: 010, 016, 017, 070 번호 지원, 자동 길이 제한
- **시각적 피드백**:
  - **아이콘 상태 표시**: 성공/에러 아이콘으로 입력 상태 즉시 피드백
  - **에러 메시지**: 필드별 상세한 에러 메시지 표시
  - **버튼 상태 관리**: 모든 조건 만족 시에만 가입 버튼 활성화
- **API 연동 회원가입**:
  - **구매자 회원가입**: POST `/accounts/buyer/signup/` API 연동 완료
  - **에러 핸들링**: 필드별 API 에러 메시지 매핑 및 표시
  - **성공 시 리다이렉트**: 회원가입 완료 후 메인 페이지로 자동 이동

**🔧 주요 기술 구현:**

```javascript
// 모듈화된 컴포넌트 구조
- IDvalidate.js: 아이디 중복 확인 및 유효성 검사
- PWvalidate.js: 비밀번호 강도 검사 및 확인 (디바운싱 적용)
- phoneNumberValidate.js: 전화번호 형식 검증
- buyerSignup.js: 구매자 회원가입 API 연동
- formValidate.js: 전체 폼 유효성 상태 관리

// 실시간 유효성 검사
- 디바운싱을 통한 API 호출 최적화 (500ms)
- 정규식을 이용한 클라이언트 사이드 검증
- 시각적 피드백 (아이콘, 색상, 메시지)

// API 에러 핸들링
- 필드별 에러 메시지 매핑
- 네트워크 오류 처리
- 로딩 상태 표시 및 버튼 비활성화
```

**\[화면 캡쳐\]**

![화면 기록 2025-07-29 오후 9 48 53](https://github.com/user-attachments/assets/7dd4de2c-c82c-44ad-8fa5-863eb1e5883a)

\<\!-- 회원가입 페이지 화면 캡쳐 (성공, 유효성 검사 실패, 중복 확인 등) \--\>

#### **3\) 상품 목록 페이지**

**✅ 구현 완료된 기능:**

- **상품 목록 API 연동**: `GET /products/` API를 통한 실시간 상품 데이터 로드
- **검색 기능**: URL 쿼리 파라미터(`?query=검색어`)를 통한 상품 검색 지원
- **상품 카드 렌더링**: 상품 이미지, 판매자명, 상품명, 가격 정보를 카드 형태로 표시
- **상품 상세 페이지 연결**: 상품 클릭 시 `product-detail.html?id={productId}`로 이동
- **가격 포맷팅**: `toLocaleString()`을 사용한 천 단위 구분자 표시
- **에러 핸들링**: API 통신 실패 시 사용자 친화적 에러 메시지 표시
- **검색 결과 없음 처리**: 검색어에 대한 결과가 없을 때 안내 메시지 표시
- **자동 캐러셀**: 3초마다 자동으로 슬라이드 전환되는 프로모션 배너
- **캐러셀 인터랙션**:
  - 좌우 네비게이션 버튼으로 수동 슬라이드 제어
  - 인디케이터로 현재 슬라이드 위치 표시
  - 마우스 호버 시 자동 슬라이드 일시정지 (선택적)
- **반응형 레이아웃**: 다양한 화면 크기에 대응하는 상품 그리드 레이아웃

**🔧 주요 기술 구현:**

```javascript
// 상품 데이터 페칭 및 렌더링 (renderProduct.js)
- 비동기 API 호출 (async/await 패턴)
- URLSearchParams를 이용한 검색 쿼리 파싱
- 동적 HTML 생성 및 DOM 조작
- 에러 상황별 fallback UI 처리

// 캐러셀 컨트롤 (carousel.js)
- setInterval을 이용한 자동 슬라이드 (3초 간격)
- CSS transform(translateX)을 이용한 부드러운 애니메이션
- 이벤트 리스너를 통한 사용자 인터랙션 처리
- 무한 루프 슬라이드 구현

// 모듈화된 컴포넌트 구조
- ES6 모듈 시스템으로 기능별 분리
- 헤더/푸터 컴포넌트 동적 로드
- 재사용 가능한 함수형 컴포넌트 구조
```

**\[화면 캡쳐\]**


![화면 기록 2025-07-29 오후 9 55 55](https://github.com/user-attachments/assets/b810b3fd-dcc4-41ed-a6c5-055a619ba6fb)


\<\!-- 상품 목록 페이지 화면 캡쳐 \--\>

#### **4\) 상품 상세 페이지**

**✅ 구현 완료된 기능:**

- **상품 정보 API 연동**: `GET /products/{productId}/` API를 통한 상품 상세 정보 로드
- **URL 파라미터 기반 접근**: `product-detail.html?id={productId}` 형태로 상품 ID 전달
- **상품 정보 표시**:
  - 상품 이미지, 상품명, 가격, 배송 정보 표시
  - 가격 포맷팅 (`toLocaleString()`으로 천 단위 구분자)
  - 배송 방식 및 배송비 정보 (무료배송/유료배송 구분)
- **수량 선택 기능**:
  - +/- 버튼을 통한 수량 증감
  - 직접 입력을 통한 수량 설정
  - 재고 수량 초과 방지 및 경고 메시지
  - 재고 소진 시 모든 버튼 비활성화
- **실시간 가격 계산**: 선택 수량에 따른 총 상품 금액 자동 계산
- **로그인 상태 확인**:
  - 비로그인 사용자의 장바구니/구매 버튼 클릭 시 로그인 모달 표시
  - 구매자(BUYER) 타입만 구매 기능 이용 가능 (판매자 차단)
- **장바구니 추가**:
  - `POST /cart/` API 연동하여 장바구니에 상품 추가
  - 수량 검증 및 재고 확인
  - 성공 시 장바구니 페이지 이동 여부 확인
- **바로 구매**:
  - 선택된 상품과 수량으로 주문 페이지(`checkout.html`) 이동
  - URL 파라미터로 상품 정보 전달 (`productId`, `quantity`, `order_type`)
- **탭 메뉴 시스템**:
  - 상세정보, 리뷰, Q&A, 반품/교환정보 탭 구현
  - 동적 콘텐츠 렌더링 및 탭 활성화 상태 관리
  - 접근성 고려 (`aria-current` 속성 사용)
- **에러 처리**:
  - 잘못된 상품 ID 접근 시 에러 페이지 리다이렉트
  - API 통신 실패 시 사용자 친화적 에러 메시지
  - 재고 부족, 권한 없음 등 다양한 예외 상황 처리

**🔧 주요 기술 구현:**

```javascript
// 모듈화된 컴포넌트 구조
- productDetailContainer.js: 메인 상품 상세 로직 및 렌더링
- getProductSummary.js: 상품 기본 정보 렌더링
- setQuantityAndPrice.js: 수량 선택 및 가격 계산 로직
- getActionButtons.js: 장바구니/구매 버튼 이벤트 처리
- showLoginModal.js: 로그인 모달 표시 및 이벤트 관리
- menuTab.js: 탭 메뉴 시스템 구현

// 인증 및 권한 검사
- JWT 토큰 기반 사용자 인증
- 사용자 타입(BUYER/SELLER) 검증
- 로그인 상태에 따른 기능 제한

// 실시간 UI 업데이트
- 수량 변경 시 즉시 가격 계산 및 UI 반영
- 재고 상태에 따른 버튼 활성화/비활성화
- 탭 클릭 시 동적 콘텐츠 변경
```

**\[화면 캡쳐\]**

\<\!-- 상품 상세 페이지 화면 캡쳐 (수량 변경, 가격 계산 등) \--\>

![화면 기록 2025-07-29 오후 10 54 55](https://github.com/user-attachments/assets/524e24bb-2e6d-4e5b-9021-22204e222a86)

#### **5\) 장바구니 페이지**

**✅ 구현 완료된 기능:**

- **장바구니 목록 API 연동**: `GET /cart/` API를 통한 장바구니 상품 목록 로드
- **사용자 인증 검사**:
  - 비로그인 사용자 접근 시 로그인 모달 표시
  - 판매자(SELLER) 계정 차단 및 구매자(BUYER)만 이용 가능
  - JWT 토큰 기반 인증 및 만료 시 자동 로그인 페이지 리다이렉트
- **전체 선택/해제 기능**:
  - 헤더 체크박스로 모든 상품 일괄 선택/해제
  - 개별 체크박스와 전체 체크박스 상태 동기화
- **실시간 가격 계산**:
  - 선택된 상품만을 대상으로 총 상품금액, 배송비, 결제 예정 금액 자동 계산
  - 체크박스 상태 변경 시 즉시 가격 재계산 및 UI 업데이트
  - 천 단위 구분자(`toLocaleString()`) 적용
- **수량 수정 모달**:
  - +/- 버튼 클릭 시 수량 수정 모달 표시
  - 모달 내에서 실시간 수량 조절 및 재고 확인
  - 재고 수량 초과 시 + 버튼 비활성화 및 경고 메시지
  - `PUT /cart/{cartItemId}` API 연동으로 서버 수량 업데이트
- **상품 삭제 기능**:
  - X 버튼 클릭 시 삭제 확인 모달 표시
  - 사용자 확인 후 `DELETE /cart/{cartItemId}` API 호출
  - 삭제 완료 후 페이지 자동 새로고침으로 목록 업데이트
- **주문 페이지 연동**:
  - 선택된 상품들을 `checkout.html`로 전달
  - URL 파라미터를 통한 상품 정보 및 수량 데이터 전달
  - 아무것도 선택되지 않았을 때 주문 버튼 비활성화
- **빈 장바구니 처리**: 장바구니가 비어있을 때 안내 메시지 표시
- **에러 핸들링**:
  - API 통신 실패 시 사용자 친화적 에러 메시지
  - 토큰 만료, 권한 오류 등 다양한 예외 상황 처리

**🔧 주요 기술 구현:**

```javascript
// 모듈화된 장바구니 시스템
- cart.js: 메인 장바구니 로직 및 API 연동
- loadComponent(): 헤더/푸터 동적 로드 및 초기화
- fetchWithAuth(): JWT 토큰 기반 인증 API 호출
- renderCartItems(): 장바구니 상품 목록 동적 렌더링

// 실시간 상태 관리
- updateSelectedItems(): 체크박스 상태 변경 시 선택 항목 배열 업데이트
- updateSummary(): 선택된 상품 기준 가격 재계산 및 UI 반영
- setupCartFunctionality(): 이벤트 핸들러 통합 관리

// 모달 시스템
- 수량 수정 모달: 재고 검증 및 실시간 수량 조절
- 삭제 확인 모달: 사용자 의도 재확인 후 안전한 삭제
- 로그인 안내 모달: 비인증 사용자 가이드

// API 연동 및 에러 처리
- 장바구니 조회/수량 수정/삭제 API 완전 연동
- 401 인증 오류 시 자동 로그인 페이지 리다이렉트
- 네트워크 오류 및 서버 오류 상황별 핸들링
```

**\[화면 캡쳐\]**

![화면 기록 2025-07-29 오후 10 56 29](https://github.com/user-attachments/assets/cb369fe6-c617-4c32-a6cc-19023fa295f6)


\<\!-- 장바구니 페이지 화면 캡쳐 (모달, 수량 변경, 총 결제 금액 등) \--\>

#### **6\) 페이지 상단 글로벌 네비게이션 영역 (GNB)**

- **로고 및 브랜딩**:
  - 클릭 가능한 로고로 메인 페이지(`/`) 이동
  - 시각적으로 숨겨진 `<h1>` 태그로 SEO 및 접근성 고려
  - 판매자 센터 전용 헤더 (`header-seller.html`) 별도 구현
- **실시간 상품 검색**:
  - 검색창에서 Enter 또는 검색 버튼 클릭으로 검색 실행
  - 빈 검색어 입력 시 alert로 사용자 가이드
  - URLSearchParams를 이용한 메인 페이지 검색 쿼리 전달 (`/?query=검색어`)
  - 검색어 자동 포커스 및 사용자 경험 최적화
- **로그인 상태별 UI 분기**:
  - **비로그인 상태**: 장바구니, 로그인 메뉴만 표시
  - **로그인 상태**: 장바구니, 마이페이지 드롭다운 메뉴 표시
  - JWT 토큰 기반 실시간 로그인 상태 감지
- **장바구니 기능**:
  - 장바구니 페이지(`/pages/cart.html`) 바로가기 링크
  - 현재 페이지가 장바구니일 때 아이콘 활성화 상태 유지
- **마이페이지 드롭다운 시스템**:
  - 마이페이지 버튼 클릭 시 드롭다운 메뉴 토글
  - 외부 영역 클릭 시 드롭다운 자동 닫힘
  - 드롭다운 열림/닫힘에 따른 아이콘 및 텍스트 색상 변경
  - **마이페이지 링크**: UI만 구현 (`/pages/mypage.html`)
  - **로그아웃 기능**: 모든 토큰 삭제 후 페이지 새로고침
- **시각적 피드백**:
  - 드롭다운 활성화 시 메뉴 텍스트 및 아이콘 색상 변경 (메인 컬러 `#21bf48`)
  - 장바구니 페이지 접속 시 장바구니 아이콘 활성화 상태 유지
  - 호버 효과 및 클릭 상태의 명확한 시각적 구분
- **판매자 센터 헤더**:
  - 판매자 전용 헤더 컴포넌트 (`header-seller.html`)
  - 간소화된 UI로 로고와 "판매자 센터" 텍스트만 표시

**🔧 주요 기술 구현:**

```javascript
// 동적 헤더 초기화 (header.js)
- JWT 토큰 기반 로그인 상태 확인
- DOM 요소 동적 표시/숨김 처리
- 이벤트 리스너를 통한 인터랙션 관리

// 검색 기능
- form submit 이벤트로 검색 실행
- URLSearchParams를 이용한 쿼리 파라미터 생성
- 빈 검색어 검증 및 포커스 관리

// 드롭다운 시스템
- 클릭 이벤트 전파 방지 (e.stopPropagation())
- 전역 클릭 이벤트로 외부 클릭 감지
- CSS 클래스 토글을 통한 상태 관리

// 로그아웃 처리
- localStorage에서 모든 인증 토큰 제거
- 페이지 강제 새로고침으로 상태 초기화

// 아이콘 상태 관리
- 현재 페이지 경로 확인 (window.location.pathname)
- 조건부 아이콘 및 색상 변경
```

**\[화면 캡쳐\]**

\<\!-- GNB 화면 캡쳐 (로그인/비로그인 상태, 모달 등) \--\>

![화면 기록 2025-07-29 오후 10 58 13](https://github.com/user-attachments/assets/8af13000-ada2-47b0-99d3-47d74c44d88f)


#### **7\) 주문/결제 페이지**

**✅ 구현 완료된 기능:**

- **주문 상품 정보 표시**:
  - sessionStorage에서 주문 상품 목록 (`orderList`) 및 주문 유형 (`order_type`) 로드
  - 각 상품별 API 호출로 실시간 정보 조회 및 렌더링
  - 상품 이미지, 판매자명, 상품명, 수량, 개별 가격 표시
  - 할인 정보 및 배송비 정보 표시
- **가격 계산 시스템**:
  - 전체 상품 금액, 배송비, 총 주문 금액 자동 계산
  - `toLocaleString()`을 이용한 천 단위 구분자 표시
  - 실시간 최종 결제 금액 업데이트
- **주문자 정보 입력**:
  - 이름, 휴대폰 번호(3개 필드 분리), 이메일 입력
  - HTML5 기본 유효성 검사 및 추가 클라이언트 검증
  - 한글/영문 이름 검증, 숫자만 허용하는 전화번호 검증
- **배송지 정보 입력**:
  - 수령인, 휴대폰 번호, 배송 주소, 배송 메시지 입력
  - **다음 우편번호 API 연동**: 우편번호 조회 버튼으로 주소 자동 입력
  - 기본 주소와 상세 주소 분리 입력
- **결제 수단 선택**:
  - 라디오 버튼으로 단일 결제 수단 선택
  - 신용/체크카드, 무통장입금, 휴대폰결제, 네이버페이, 카카오페이 지원
  - 커스텀 라디오 버튼 UI로 시각적 일관성 유지
- **주문 확인 및 동의**:
  - 주문 내용 확인 및 정보 제공 동의 체크박스
  - 동의 체크 시에만 결제 버튼 활성화 (색상 및 커서 변경)
- **종합적인 유효성 검사**:
  - HTML5 기본 검증 + 커스텀 정규식 검증
  - 이름(한글/영문), 전화번호(숫자), 이메일, 주소 등 필드별 세부 검증
  - 필수 선택 항목(결제수단, 동의) 확인
- **주문 API 연동**:
  - `cart_order`와 `direct_order` 타입별 분기 처리
  - `POST /order/` API 호출로 주문 생성
  - JWT 토큰 기반 인증된 API 요청

**🔧 주요 기술 구현:**

```javascript
// 주문 상품 정보 렌더링
- sessionStorage에서 주문 데이터 로드
- 각 상품별 상세 정보 API 호출 (병렬 처리)
- 동적 HTML 생성 및 DOM 삽입
- 가격 계산 로직 (상품금액 + 배송비)

// 다음 우편번호 API 연동
- 외부 Postcode API 스크립트 로드
- 팝업 창을 통한 주소 검색
- 검색 결과를 입력 필드에 자동 입력

// 폼 유효성 검사
- HTML5 checkValidity() 기본 검증
- 정규식을 이용한 커스텀 검증
- 실시간 사용자 피드백 (alert)

// 주문 API 호출
- order_type에 따른 분기 처리
- fetchWithAuth를 이용한 인증된 API 요청
- 주문 완료 후 메인 페이지 리다이렉트
```

**\[화면 캡쳐\]**

![화면 기록 2025-07-29 오후 10 59 50](https://github.com/user-attachments/assets/311f75c8-ce9e-470d-a9a5-6d94092d97a5)


\<\!-- 주문/결제 페이지 화면 캡쳐 (입력 폼, 결제 버튼 등) \--\>

#### **8) 푸터 (Footer)**

**✅ 구현 완료된 기능:**

- **기본 디자인 구현**: 피그마 디자인에 맞춰 HTML 마크업 완료
- **정적 콘텐츠**: 회사 정보, 링크 등 기본 푸터 정보 표시
- **동적 로드**: 각 페이지에서 `loadComponent()` 함수로 푸터 동적 삽입

**🔧 주요 기술 구현:**

```javascript
// 동적 컴포넌트 로드
- loadComponent("footer", "./components/footer.html")
- 모든 페이지에서 공통으로 사용되는 푸터 컴포넌트
- HTML만으로 구성된 정적 콘텐츠
```

**\[화면 캡쳐\]**
<img width="1455" height="252" alt="스크린샷 2025-07-29 오후 11 02 48" src="https://github.com/user-attachments/assets/c35d7083-30f6-4148-b47b-3c90f6d5955e" />

\<\!-- 푸터 화면 캡쳐 \--\>

## **🚀 개발 워크플로우**

본 프로젝트는 효율적인 팀워크를 위해 다음과 같은 협업 규칙을 준수합니다.

### **🌿 브랜치 전략 (GitHub Flow)**

GitHub Flow를 사용하며, main 브랜치에서 기능별/목적별 브랜치를 생성하여 작업합니다.

- **브랜치 네이밍 컨벤션**:
  - feature/: 새로운 기능 개발 (feature/user-authentication)
  - design/: 디자인/스타일링 작업 (design/mobile-responsive)
  - hotfix/: 긴급 버그 수정 (hotfix/cart-calculation-bug)
  - refactor/: 코드 리팩토링 (refactor/sass-structure)
  - docs/: 문서 작업 (docs/readme-update)

### **📚 커밋 컨벤션 (Angular/Conventional Commits)**

\<타입\>(\<스코프\>): \<제목\>

\<본문\>

\<푸터\>

- **주요 커밋 타입**: feat (기능 추가), fix (버그 수정), design (UI/UX 변경), refactor (리팩토링), docs (문서 수정) 등
- **스코프**: header, product, cart, user 등 변경된 기능/영역 명시.
- **이슈 연결**: Closes \#이슈번호, Fixes \#이슈번호 등을 사용하여 GitHub 이슈와 연결.

**더 상세한 내용은 [프로젝트 Wiki \- 커밋 컨벤션](https://www.google.com/search?q=https://github.com/%5BYour_Organization%5D/%5BYour_Repo%5D/wiki/%25EC%25BB%25A4%25EB%25B0%258B-%25EC%25BB%25A8%25EB%25B2%25A4%25EC%2585%2598)을 참고해 주세요.**

### **🔄 PR (Pull Request) 워크플로우**

1. **PR 생성**: 기능 개발용 또는 버그 수정용 PR 템플릿을 사용하여 상세하게 작성하고, 스크린샷과 테스트 시나리오를 첨부합니다.
2. **코드 리뷰**: 지정된 리뷰어의 승인 (최대 24시간 이내) 후 Squash and merge를 통해 main 브랜치에 머지합니다.
3. **피드백 반영**: 리뷰어의 피드백을 신속하게 반영합니다.

**PR 템플릿 및 리뷰 가이드라인은 [프로젝트 Wiki \- PR 워크플로우](https://www.google.com/search?q=https://github.com/%5BYour_Organization%5D/%5BYour_Repo%5D/wiki/PR-%25EC%259B%258C%25ED%1481%25B4%25EB%25A1%259C%25EC%259A%25B0)를 참고해 주세요.**

## **⚙️ 개발 도구 권장 설정 (VS Code)**

원활한 개발을 위해 다음 VS Code 확장 프로그램 및 설정을 권장합니다.

- **확장 프로그램**: Prettier, Live Server, Sass Indented, HTML/CSS/JavaScript Language Features 등
- **Prettier 설정**: .prettierrc 파일을 통해 코드 포맷팅 규칙을 통일합니다.
- **Workspace 설정**: .vscode/settings.json을 통해 들여쓰기, 저장 시 자동 포맷팅 등을 설정합니다.

**자세한 설정 내용은 [프로젝트 Wiki \- 개발 도구 설정](https://www.google.com/search?q=https://github.com/%5BYour_Organization%5D/%5BYour_Repo%5D/wiki/%25EA%25B0%259C%25EB%25B0%259C-%25EB%258F%2584%25EA%25B5%25AC-%25EC%2584%25A4%25EC%25A0%2595)을 참고해 주세요.**
