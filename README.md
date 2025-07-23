# **🚀 OpenMarket \- 프론트엔드 개발 프로젝트**

![img](./assets/icons/Logo-hodu.svg)

## 🌟 프로젝트 개요

OpenMarket은 오픈소스 기반의 마켓플레이스를 개발하는 프론트엔드 프로젝트입니다. 사용자 친화적인 인터페이스와 직관적인 쇼핑 경험을 제공하는 것을 목표로 합니다. 본 프로젝트는 3명의 프론트엔드 개발자가 협력하여 진행하며, 효율적인 협업을 위해 명확한 코드 컨벤션과 워크플로우를 준수합니다.

### **👥 [팀원 소개](https://www.google.com/search?q=%23%ED%8C%80%EC%9B%90-%EC%86%8C%EA%B0%9C)**

### **🛠️ [기술 스택 및 개발 환경](https://www.google.com/search?q=%23%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-%EB%B0%8F-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD)**

### **🎨 [네이밍 규칙 및 컨벤션](https://www.google.com/search?q=%23%EB%84%A4%EC%9D%B4%EB%B0%8D-%EA%B7%9C%EC%B9%99-%EB%B0%8F-%EC%BB%A8%EB%B2%A4%EC%85%98)**

## **📖 프로젝트 소개**

### **📁 [폴더 구조](https://www.google.com/search?q=%23%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0)**

### **📄 [구현 페이지](https://www.google.com/search?q=%23%EA%B5%AC%ED%98%84-%ED%8E%98%EC%9D%B4%EC%A7%80)**

### **✨ [주요 기능 (API 명세 기반)](https://www.google.com/search?q=%23%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-api-%EB%AA%85%EC%84%B8-%EA%B8%B0%EB%B0%98)**

### **✅ [주요 페이지별 상세 기능](https://www.google.com/search?q=%23%EC%A3%BC%EC%9A%94-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%B3%84-%EC%83%81%EC%84%B8-%EA%B8%B0%EB%8A%A5)**

## **👥 팀원 소개**

본 프로젝트는 3명의 프론트엔드 개발자가 함께 만들어갑니다.

- **민경현 (팀장, 프론트엔드 개발자)**
- **이상철 (팀원, 프론트엔드 개발자)**
- **이지언 (팀원, 프론트엔드 개발자)**

## **🌟 프로젝트 개요**

### **🛠️ 기술 스택 및 개발 환경**

- **HTML5**: 시맨틱 마크업을 활용하여 웹 표준 준수 및 검색 엔진 최적화(SEO) 고려
- **CSS3 \+ Sass**: 모듈화된 스타일링 및 전처리기 기능을 통해 효율적인 스타일 관리 (BEM 방법론 적용)
- **JavaScript (ES6+)**: 인터랙티브한 동적 요소 구현 및 비즈니스 로직 처리
- **Git/GitHub**: 버전 관리 및 팀 협업을 위한 시스템
- **개발 환경**: VS Code (권장), Live Server (로컬 개발 서버)

### **🎨 네이밍 규칙 및 컨벤션**

본 프로젝트는 [Google Style Guide](https://google.github.io/styleguide/htmlcssguide.html)를 기반으로 한 프론트엔드 코드 컨벤션을 따릅니다.

- **HTML 파일**: kebab-case 사용 (product-detail.html)
- **CSS/Sass 파일**: kebab-case 사용, Sass partial 파일은 언더스코어(\_)로 시작 (\_product-card.scss)
- **JavaScript 파일**: camelCase 사용 (productCard.js)
- **HTML 작성 규칙**: 2칸 들여쓰기, 소문자 태그, 쌍따옴표 사용, 시맨틱 HTML, 속성 순서 준수.
- **CSS/Sass 작성 규칙**: 2칸 들여쓰기, BEM 방법론 (Block\_\_Element--Modifier), 속성 선언 순서 준수 (Position \-\> Box Model \-\> Typography \-\> Visual \-\> Animation).
- **JavaScript 작성 규칙**: ES6+ 문법, camelCase 네이밍, 2칸 들여쓰기, 세미콜론 필수, const/let 사용.

**더 상세한 내용은 [프로젝트 Wiki \- 코드 컨벤션](https://www.google.com/search?q=https://github.com/%5BYour_Organization%5D/%5BYour_Repo%5D/wiki/%25EC%25BD%2594%25EB%2593%259C-%25EC%25BB%25A8%25EB%25B2%25A4%25EC%2585%2598)을 참고해 주세요.**

## **📖 프로젝트 소개**

### **📁 폴더 구조**

OpenMarketService/  
├── assets/ \# 정적 자원 (이미지, 아이콘, 폰트 등)  
├── css/ \# 컴파일된 CSS 파일  
├── scss/ \# Sass 소스 파일  
│ ├── abstracts/ \# 변수, 믹스인, 함수  
│ ├── base/ \# 기본 스타일 (reset, typography 등)  
│ ├── components/ \# 컴포넌트별 스타일  
│ ├── layout/ \# 레이아웃 스타일 (header, footer 등)  
│ ├── pages/ \# 페이지별 스타일  
│ └── main.scss \# 메인 Sass 파일  
├── js/ \# JavaScript 파일  
│ ├── components/ \# 컴포넌트별 JS  
│ ├── pages/ \# 페이지별 JS  
│ ├── utils/ \# 유틸리티 함수 (API 호출, 헬퍼 함수 등)  
│ └── main.js \# 메인 JS 파일  
├── pages/ \# HTML 페이지 (로그인, 회원가입 등)  
└── index.html \# 메인 페이지

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

- **경고 문구**: 아이디/비밀번호 불일치 또는 미입력 시 경고 문구 표시.
- **로그인 버튼 비활성화**: 경고창 표시 중에는 로그인 버튼 비활성화.
- **Focus 이벤트**: 미입력된 입력 창에 focus 이벤트 작동.
- **비밀번호 초기화**: 아이디/비밀번호 불일치 시 비밀번호 입력창 focus 및 빈칸으로 초기화.
- **페이지 이동**: 로그인 성공 시 로그인하기 이전 페이지로 이동.
- **구매자 로그인**: '구매 회원 로그인' 탭 클릭 시 구매 회원으로 로그인.

**\[화면 캡쳐\]**

\<\!-- 로그인 페이지 화면 캡쳐 (성공, 실패, 경고 메시지 등) \--\>

#### **2\) 회원가입 페이지**

- **회원가입 조건**: 모든 입력 완료 및 이용약관 동의 체크 시에만 회원가입 가능.
- **페이지 이동**: 회원 정보 입력 후 '회원가입' 버튼 클릭 시 로그인 페이지로 이동.
- **아이디 중복 확인**: 아이디 중복 확인 버튼 클릭 시 중복 여부에 따른 경고 문구 표시.
- **구매자 회원가입**: '구매 회원 가입' 탭 클릭 후 모든 입력 및 약관 동의 시 구매자로 회원가입.
- **유효성 검사 오류 메시지**: \[클릭\] 회원가입 유효성 검사 오류 메시지 정리 (별도 문서 링크 또는 상세 내용 추가 예정)

**\[화면 캡쳐\]**

\<\!-- 회원가입 페이지 화면 캡쳐 (성공, 유효성 검사 실패, 중복 확인 등) \--\>

#### **3\) 상품 목록 페이지**

- **페이지 이동**: 목록에서 상품 클릭 시 상품 상세 페이지로 이동.
- **상품 정보 표시**: 상품 판매자, 상품명, 가격 정보 표시.

**\[화면 캡쳐\]**

\<\!-- 상품 목록 페이지 화면 캡쳐 \--\>

#### **4\) 상품 상세 페이지**

- **상품 정보 로딩**: productId에 해당하는 상품을 불러와 정보 표시.
- **수량 변경**: \+/- 버튼으로만 수량 변경 가능.
- **재고 초과 처리**: 재고 수량 초과 시 \+ 버튼 비활성화.
- **가격 계산**: 선택된 옵션에 맞춰 가격 계산 및 총 가격 표시.
- **중복 상품 처리**: 이미 선택된 상품을 다시 선택 시 추가되지 않음.

**\[화면 캡쳐\]**

\<\!-- 상품 상세 페이지 화면 캡쳐 (수량 변경, 가격 계산 등) \--\>

#### **5\) 장바구니 페이지**

- **수량 수정 모달**: 상품 수량 수정 시 \+/- 버튼 클릭 시 모달창 표시.
- **모달 내 재고 처리**: 모달창 내에서 재고 수량 초과 시 \+ 버튼 비활성화.
- **총 결제 가격**: 선택된 정보만 총 상품금액, 할인, 배송비가 적용되어 총 결제 가격 표시.
- **상품 삭제 모달**: 상품 x 버튼 클릭 시 상품 삭제 재확인 모달 창 중앙에 표시.
- **상품 삭제**: 삭제 재확인 모달의 '확인' 버튼 클릭 시 상품 삭제.
- **수량 합산**: 이미 장바구니에 있는 제품을 다시 추가 시, 이전 수량과 합산 (예: 기존 2개 \+ 추가 3개 \= 총 5개).
- **재고 초과 경고**: 합산된 수량이 제품의 재고 수량 초과 시 경고 모달창 표시.

**\[화면 캡쳐\]**

\<\!-- 장바구니 페이지 화면 캡쳐 (모달, 수량 변경, 총 결제 금액 등) \--\>

#### **6\) 페이지 상단 글로벌 네비게이션 영역 (GNB)**

- **검색창**: UI로만 존재.
- **비로그인/구매 회원 GNB**: 검색창과 장바구니 버튼만 존재.
- **로그인 안내 모달**: 비로그인 유저가 장바구니 버튼 클릭 시 로그인 안내 모달창 표시.
- **장바구니 이동**: 장바구니 버튼 클릭 시 장바구니 페이지로 이동.

**\[화면 캡쳐\]**

\<\!-- GNB 화면 캡쳐 (로그인/비로그인 상태, 모달 등) \--\>

#### **7\) 주문/결제 페이지**

- **상품 정보**: 상품 정보 수정 불가.
- **배송 정보 입력**: 배송 정보 칸에 주문자 정보와 배송지 정보 입력 가능.
- **결제 버튼 활성화**: 모든 입력 완료 시 결제하기 버튼 활성화.
- **결제 진행**: '결제하기' 버튼 클릭 시 결제 진행.

**\[화면 캡쳐\]**

\<\!-- 주문/결제 페이지 화면 캡쳐 (입력 폼, 결제 버튼 등) \--\>

#### **8\) 로그인을 요청하는 모달**

- **모달 표시**: 비로그인 사용자가 장바구니, 바로구매를 클릭했을 시 로그인을 요청하는 모달 창 표시.

**\[화면 캡쳐\]**

\<\!-- 로그인 요청 모달 화면 캡쳐 \--\>

#### **9\) 마이페이지**

- **드롭다운 메뉴**: 상단 네비게이션 마이페이지 클릭 시 드롭다운 박스 (마이페이지, 로그아웃) 표시.
- **마이페이지 UI**: 드롭다운 박스 내 마이페이지는 UI로만 존재.
- **로그아웃**: 드롭다운 박스 내 로그아웃 클릭 시 로그아웃.
- **아이콘 변경**: 마이페이지 아이콘 클릭 시 메인 컬러로 변경.
- **드롭다운 UI**: 드롭다운 UI 나타나며 외부 클릭 시 UI 사라짐.

**\[화면 캡쳐\]**

\<\!-- 마이페이지 드롭다운 화면 캡쳐 \--\>

#### **10\) 푸터 (Footer)**

- **디자인 구현**: 피그마 디자인에 맞춰 구현.

**\[화면 캡쳐\]**

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

**PR 템플릿 및 리뷰 가이드라인은 [프로젝트 Wiki \- PR 워크플로우](https://www.google.com/search?q=https://github.com/%5BYour_Organization%5D/%5BYour_Repo%5D/wiki/PR-%25EC%259B%258C%25ED%2581%25B4%25EB%25A1%259C%25EC%259A%25B0)를 참고해 주세요.**

## **⚙️ 개발 도구 권장 설정 (VS Code)**

원활한 개발을 위해 다음 VS Code 확장 프로그램 및 설정을 권장합니다.

- **확장 프로그램**: Prettier, Live Server, Sass Indented, HTML/CSS/JavaScript Language Features 등
- **Prettier 설정**: .prettierrc 파일을 통해 코드 포맷팅 규칙을 통일합니다.
- **Workspace 설정**: .vscode/settings.json을 통해 들여쓰기, 저장 시 자동 포맷팅 등을 설정합니다.

**자세한 설정 내용은 [프로젝트 Wiki \- 개발 도구 설정](https://www.google.com/search?q=https://github.com/%5BYour_Organization%5D/%5BYour_Repo%5D/wiki/%25EA%25B0%259C%25EB%25B0%259C-%25EB%258F%2584%25EA%25B5%25AC-%25EC%2584%25A4%25EC%25A0%2595)을 참고해 주세요.**
