# 원티드 프리온보딩 12th 3주차 개인 과제

원티드 프리온보딩 12th 3주차에 진행된 개인 과제입니다.

본 과제는 [한국임상정보](https://clinicaltrialskorea.com/)의 검색 기능을 구현하는 것이 목표입니다.

## 🧑🏻‍💻 프로젝트 정보

### 실행 방법
- 배포 링크: [Search sick page (https://devseop-search-sick.netlify.app)](https://devseop-search-sick.netlify.app)
- 링크가 실행되지 않는 경우 아래 명령어를 차례대로 입력하여 실행해주세요.

```jsx
git clone https://github.com/devseop/po-fe-12th-w3
npm install
npm run dev
```

### 프로젝트 구조

```jsx
src
 ┣ api
 ┃ ┗ api.ts
 ┣ components
 ┃ ┣ DeleteButton.tsx
 ┃ ┣ HighlitedKeyword.tsx
 ┃ ┣ SearchBar.tsx
 ┃ ┗ SearchKeywordList.tsx
 ┣ constants
 ┃ ┗ constant.ts
 ┣ context
 ┃ ┗ searchContext.tsx
 ┣ hooks
 ┃ ┣ useDebounce.ts
 ┃ ┗ useInput.ts
 ┣ pages
 ┃ ┣ ErrorPage.tsx
 ┃ ┗ SearchSection.tsx
 ┣ types
 ┃ ┗ type.ts
 ┣ utils
 ┃ ┗ cache.ts
 ┣ App.tsx
 ┣ index.tsx
 ┗ style.css
```

### 사용 라이브러리

```jsx
"dependencies": {
    "@emotion/styled": "^11.11.0",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
  },

"devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@typescript-eslint/parser": "^5.62.0",
    "concurrently": "^8.2.1",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "husky": "^8.0.3",
    "json-server": "^0.17.3",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.2"
  },
```

## 📝 구현 내용
```markdown
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
  - 검색어가 없을 시 “검색어 없음” 표출

- API 호출별로 로컬 캐싱 구현
  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - expire time을 구현
    
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
```

### ✅ Assignment 1
- API 호출을 통한 검색어 추천 기능 구현
- 검색어가 없을 시 “검색어 없음” 표출


### ✅ Assignment 2
- API 호출별로 로컬 캐싱 구현 
- expire time 구현 (선택)


### ✅ Assignment 3
입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

### ✅ Assignment 4
API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

### ✅ Assignment 5
키보드만으로 추천 검색어들로 이동 가능하도록 구현

## 🫱🏻‍🫲🏿 Commit Convention

커밋 컨벤션과 브랜치 전략은 1주차 팀 과제 진행시 결정된 팀 컨벤션을 따랐습니다.

e.g. FEAT: 로그인 유효성 검증 기능 구현

| 태그      | 설명 (한국어로만 작성하기)                                     |
| --------- | -------------------------------------------------------------- |
| FEAT:     | 새로운 기능 추가 (변수명 변경 포함)                            |
| FIX:      | 버그 해결                                                      |
| DESIGN:   | CSS 등 사용자 UI 디자인 변경                                   |
| STYLE:    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| REFACTOR: | 프로덕션 코드 리팩토링                                         |
| COMMENT:  | 필요한 주석 추가 및 변경                                       |
| DOCS:     | 문서를 수정한 경우                                             |
| CHORE:    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |
| RENAME:   | 파일 혹은 폴더명을 수정하거나 옮기는 작업                      |
| REMOVE:   | 파일을 삭제하는 작업만 수행한 경우                             |
| INIT:     | 초기 커밋을 진행한 경우                                        |
