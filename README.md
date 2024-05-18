# 🛒 E-Commerce

상품 관리(CRUD) 및 실시간 상품 데이터 반영, 주문 및 결제 연동 커머스 웹 사이트
<br/><br/>

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
🔑 판매자 테스트 계정 [ID] sky@naver.com / [Password] .
```

```
🔑 구매자 테스트 계정 [ID] vip@naver.com / [Password] .
```

<br/>

## 트러블슈팅

<summary><b>최적화 (이미지 리사이징, code split, 번들 사이즈 축소 등</b>)</summary>
[문제] store에 올라가는 이미지 크기 클라이언트 측에서 리사이징, lazy, React.memo 적용 등<br/>
[원인] <br/>
[결과] <br/>
+ performance 성능 향상 : code split, 이미지 리사이징, React.memo 적용, 프로덕션 환경에서 Lighthouse Performance 성능 82점→93점 향상<br/>
</details>
<details>
<summary><b>데이터 캐싱 및 실시간 데이터 동기화</b></summary>
[문제] 판매자가 상품 관리(등록,수정,삭제,변경) 시, 카테고리 아이템 리스트에 실시간으로 변경된 사항 미반영<br/>
[원인] useQuery를 사용하여 아이템 데이터가 캐싱되어 있어, 상품 변경사항이 생기면 클라이언트 측에서 DB 변경 사항을 감지하고 refetch해주는 동작이 필요하다고 판단<br/>
[해결] 판매자 CRUD는 useMutation으로 관리, 데이터 변경 사항 반영 / 아이템 리스트 경우, router 컴포넌트에서 firebase onSnapshot으로 DB 구독, 변경사항이 발생하면
useQuery의 enabled(활성화) 옵션을 전역 상태(boolean)로 관리하여 쿼리 실행
+ 실시간 데이터 동기화 : 판매자 상품 등록 시 실시간 데이터 반영하기 위해 react-query 사용하여 DB 변경 감지로 쿼리 실행, 데이터 refetching
<br/>
</details>
<details>
<summary><b>비즈니스, 뷰 로직 분리</b></summary>
[문제] form 컴포넌트 작성 시 sumbit 과정이 혼합되어 작성됨<br/>
[원인] <br/>
[결과] <br/>
</details>
<details>
<details>
<summary><b>데이터에 따른 전역 상태 관리 라이브러리 적용 (context api, zustand)</b></summary>
[문제] <br/>
[원인] <br/>
[결과] <br/>
</details>
<details>
<summary><b>firebase NoSQL 연동, 데이터 관리 (커스텀 훅)</b></summary>
[문제] <br/>
[원인] <br/>
[결과] <br/>
</details>
<summary><b>UI 개선 (반응형, 스켈레톤)</b></summary>
[문제] <br/>
[원인] <br/>
[결과] <br/>
</details>
<br/>

## 현재 이슈, 코드 및 기능 개선사항

[UI 개선] 반응형 웹 사이즈 조정 필요(flex,grid로 유연한 크기 적용은 완료)<br/>
[UI 개선] 메인 랜딩 페이지 스켈레톤 UI 적용하기 (2024.05.17 완료)
<br/><br/>

## 프로젝트 개발환경

React (version 18.2.0), Typescript (version 5.2.2), Tailwind CSS (version 3.4.3), Node.js (version 20.9.1)
