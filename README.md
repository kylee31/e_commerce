# 🛒 E-Commerce

상품 등록 및 결제 연동 커머스 웹 사이트 (Typescript, Tailwind CSS, React, Firebase)
<br/><br/>

## 구현 기술

- NoSQL(firebase cloud store) 데이터(상품, 유저, 주문 내역) 관리 및 결제 연동
- 커스텀 훅, 전역 상태 관리 라이브러리 적용으로 비즈니스, 뷰 로직 분리
- 이미지 및 렌더링 최적화 적용
- 데이터 캐싱 및 등록 상품 실시간 데이터 동기화(react-query)

**[프로젝트 요구사항]** (4주차 요구사항 내용 빼서 따로 넣기)

  <br/>

## 주요 기능

- 카테고리 검색 기능 (랜딩 페이지)
- 로그인 및 회원가입
- 상품 정렬 기능
- 장바구니 기능
- 상품 관리, 주문 내역 관리 (판매자)
- 장바구니 상품 주문, 주문 내역 확인 및 취소 (구매자)

|                                                                                                        |                                                                                                       |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **랜딩 페이지**                                                                                        | **로그인 및 회원가입**                                                                                |
| ![main](https://github.com/kylee31/e_commerce/assets/106156087/86aca2f3-bd59-4316-a4ae-0aeda85b80f3)   | ![login](https://github.com/kylee31/e_commerce/assets/106156087/31c5c150-d99f-4633-aa4d-061a1f5128ee) |
| **판매자(상품 CRUD, 주문 내역 관리)**                                                                  | **구매자(장바구니 상품 주문, 주문 내역 확인 및 취소)**                                                |
| ![seller](https://github.com/kylee31/e_commerce/assets/106156087/a2e5e0ef-fcf0-4ac6-ad5d-ec3bc377b37b) | ![buyer](https://github.com/kylee31/e_commerce/assets/106156087/5af1e4f7-2771-4f10-9394-c066bea5ef00) |

## 링크

<h3>https://e-commerce-f517b.web.app</h3>
<br/>

## 트러블슈팅

(아래 내용 상세히, 깃북으로 따로 빼기)

- 비즈니스, 뷰 로직 분리
- 최적화 (이미지 리사이징)
- firebase NoSQL 연동, 데이터 관리 (커스텀 훅)
- 데이터에 따른 전역 상태 관리 라이브러리 적용 (context api, zustand)
- 데이터 캐싱
- 실시간 데이터 동기화
  <br/><br/>

## 현재 이슈, 코드 및 기능 개선사항

[UI 개선] 반응형 웹 사이즈 조정 필요(flex,grid로 유연한 크기 적용은 완료)<br/>
[UI 개선] 메인 랜딩 페이지 스켈레톤 UI 적용하기
<br/><br/>

## 프로젝트 개발환경

React (version 18.2.0), Typescript (version 5.2.2), Tailwind CSS (version 3.4.3), Node.js (version 20.9.1)
