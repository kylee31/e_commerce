# 🛒 E-Commerce

상품 관리(CRUD) 및 실시간 상품 데이터 반영, 주문 및 결제 연동 커머스 웹 사이트
<br/><br/>

## 설치 및 실행

```
## npm
git clone https://github.com/kylee31/e_commerce.git
npm install
npm run dev

## yarn
git clone https://github.com/kylee31/e_commerce.git
yarn install
yarn dev
```

## 기술스택 및 구현 기능

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat-square&logo=Tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/Shadcn/ui-000000?style=flat-square&logo=shadcn/ui&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Context API-61DAFB?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/zustand-4951F5?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/>

- NoSQL(firebase cloud store) 데이터(상품, 유저, 주문 내역) 관리 및 결제 연동
- 커스텀 훅, 전역 상태 관리 라이브러리 적용으로 비즈니스, 뷰 로직 분리
- 이미지 및 렌더링 최적화 적용
- 데이터 캐싱 및 등록 상품 실시간 데이터 동기화(react-query)<br/><br/>

▼ **프로젝트 기본 기능 요구사항**<br/>
| 1주차 | 2주차 | 3주차 | 4주차 |
|---|---|---|---|
| UI, Userflow 기획 | 상품(카테고리) CRUD | 구매자 기능(주문,결제) | 렌더링 최적화 |
| 페이지 라우팅 설계 | 장바구니 CRUD |판매자 기능(주문 관리) | 이미지 최적화 |
| 로그인, 회원가입 | | | 번들 사이즈 축소 |
| 판매자 상품 CRUD | | | |

  <br/>

## 디렉토리 구조, 아키텍처

| 디렉토리 구조                                                                                        | 아키텍처                                                                                             |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![dir2](https://github.com/kylee31/e_commerce/assets/106156087/a1620755-69b9-4c74-b59e-2b9301a49963) | ![arch](https://github.com/kylee31/e_commerce/assets/106156087/ffd98c01-93f6-4366-b7a4-a4c2e70db067) |

**[디렉토리 구조]** 파일의 기능 별(component, page, style, type 등)로 폴더 분리하여 디렉토리 구조화<br/>

- components 폴더: 컴포넌트가 사용되는 페이지(buyer, seller, main, common 등)로 폴더 구분<br/>
- services 폴더: 웹 사이트에 사용되는 정적 데이터, Context API, Zustand Store 및 비즈니스 로직(함수) 포함하는 폴더<br/>
  <br/>

## 주요 기능

|                                                                                                        |                                                                                                       |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **랜딩 페이지**                                                                                        | **로그인 및 회원가입**                                                                                |
| ![main](https://github.com/kylee31/e_commerce/assets/106156087/86aca2f3-bd59-4316-a4ae-0aeda85b80f3)   | ![login](https://github.com/kylee31/e_commerce/assets/106156087/31c5c150-d99f-4633-aa4d-061a1f5128ee) |
| **판매자(상품 CRUD, 주문 내역 관리)**                                                                  | **구매자(장바구니 상품 주문, 주문 내역 확인 및 취소)**                                                |
| ![seller](https://github.com/kylee31/e_commerce/assets/106156087/a2e5e0ef-fcf0-4ac6-ad5d-ec3bc377b37b) | ![buyer](https://github.com/kylee31/e_commerce/assets/106156087/5af1e4f7-2771-4f10-9394-c066bea5ef00) |

- 카테고리 검색 기능 (랜딩 페이지)
- 로그인 및 회원가입
- 상품 정렬
- 장바구니
- 상품 관리, 주문 내역 관리 (판매자)
- 장바구니 상품 주문 및 결제, 주문 내역 확인 및 취소 (구매자)<br/><br/>

## 링크

<h3>https://e-commerce-f517b.web.app</h3>

```
🔑 판매자 테스트 계정 [ID] seller@email.com / [Password] vksaowk2024^^!
```

```
🔑 구매자 테스트 계정 [ID] buyer@email.com / [Password] rnaowk2024^^!
```

<br/>

## 트러블슈팅

<details>
<summary><b>이미지 및 렌더링 최적화 (저장 이미지 리사이징, code split, 번들 사이즈 축소)</b></summary>
[문제] <br/>
1. 클라이언트 측에서 상품 저장 시 Firebase Store에 저장되는 상품 이미지 크기 제한이 없어 불필요하게 용량 차지<br/>
2. 메인 페이지 렌더링 시 로딩이 불필요한 페이지 컴포넌트이 함께 다운로드 되어 지연 발생<br/>
3. 상품 추가 버튼 클릭 시 해당 컴포넌트의 하위 컴포넌트(이미지, 링크 등)에서 불필요한 렌더링 발생<br/>
[해결] 리사이징, lazy, React.memo 적용 등<br/>
[결과] 프로덕션 환경에서 Lighthouse Performance 성능 82점→93점 향상<br/>
</details>

<details>
<summary><b>데이터 캐싱 및 실시간 데이터 동기화</b></summary>
[문제] 판매자가 상품 관리(등록,수정,삭제,변경) 시, 카테고리 아이템 리스트에 실시간으로 변경되는 사항 미반영<br/>
[원인] useQuery를 사용하여 아이템 데이터가 캐싱되어 있어, 상품 변경사항이 생기면 클라이언트 측에서 DB 변경 사항을 감지하고 refetch해주는 동작이 필요하다고 판단<br/>
[해결] 판매자 CRUD는 useMutation으로 관리, 데이터 변경 사항 반영 / 아이템 리스트 경우, router 컴포넌트에서 firebase onSnapshot으로 DB 구독, 변경사항이 발생하면 useQuery의 enabled(활성화) 옵션을 전역 상태(boolean)로 관리하여 쿼리 실행하여 데이터 refetching<br/>
</details>

<details>
<summary><b>비즈니스, 뷰 로직 분리</b></summary>
[문제] 판매자 상품 등록, 수정 기능 구현 시 등록, 수정 페이지에 sumbit 로직이 혼합되어 작성됨<br/>
[해결] 등록, 수정 기능에 공통적으로 사용되는 Form 컴포넌트를 분리, 등록, 수정 submit 로직을 분리하여 사용<br/>
[결과] 컴포넌트 재사용, 비즈니스 로직 분리로 페이지 컴포넌트에서 좀 더 직관적인 코드 구현 가능<br/>
</details>

<details>
<summary><b>데이터 변경에 따른 전역 상태 관리 라이브러리 적용 (기술 의사 결정)</b></summary>
[문제] user 정보는 전역으로 사용되나, 변동 사항이 적은 state로 Context API를 활용하여 관리함. 이후 장바구니 기능 추가로 인해 전역으로 사용되는 state 추가되었고, 장바구니 상태를 Context API로 관리할 시 잦은 변경으로 인해 불필요한 렌더링 증가 예상<br/>
[해결] Context API 대신 Zustand 활용하여 전역 상태 관리<br/>
[결과] Context API는 Provider 컴포넌트가 최상위 컴포넌트를 감싸기 때문에 불필요한 렌더링이 예상되었으나 Zustand로 관리하며 필요한 컴포넌트에서만 렌더링 발생<br/>
</details>

<details>
<summary><b>커스텀 훅으로 Firebase 데이터 가져오는 비즈니스 로직 추상화</b></summary>
[문제] Firebase 데이터를 가져오는 로직이 반복되어 사용되고, 비즈니스 로직과 뷰 로직 분리 필요한 상황 발생<br/>
[해결] 비즈니스 로직을 추상화하여 Firebase 데이터 사용 관련 로직을 Hook으로 구현, 데이터 반환<br/>
[결과] 커스텀 훅 사용으로 비즈니스 로직 분리, 가독성 및 유지 보수성 향상 <br/>
</details>

<details>
<summary><b>UI 개선 (스켈레톤 UI)</b></summary>
[문제] 메인 랜딩 페이지에서 상품 로딩 시간동안 layout(footer 영역) shift가 크게 변동됨<br/>
[원인] 로딩 중 상품의 크기만큼 화면 높이가 줄어들어 빈 화면이 보이기 때문에 큰 변동 발생<br/>
[결과] Skeleton UI 컴포넌트 삽입으로 CLS 개선<br/>
</details>
<br/>

## 현재 이슈, 코드 및 기능 개선사항

[UI 개선] 반응형 웹 사이즈 조정 필요(flex,grid로 유연한 크기 적용은 완료되어 있음)<br/>
[UI 개선] 메인 랜딩 페이지 스켈레톤 UI 적용하기 (2024.05.17 완료)<br/>
[UX 개선] 로그인, 회원가입 에러 유형별로 처리하기(유형별 메시지 반환하는 비즈니스 로직(함수))
<br/><br/>
