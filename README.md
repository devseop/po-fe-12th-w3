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

![search_sick](https://github.com/devseop/po-fe-12th-w3/assets/102455161/cc47790e-0729-4222-98b4-0fddf8e83b04)

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
1. API 호출을 통한 검색어 추천 기능 구현
> `axios.create()`를 사용하여 `api`라는 axios 인스턴스를 생성합니다. <br /> 이 인스턴스를 통해 기본 URL(BASE_URL)을 설정하고, 이후에 이 인스턴스를 사용하여 모든 API 요청을 보냅니다. <br />이렇게 코드를 작성하여 중복된 URL을 사용하지 않고 효율적으로 코드를 관리합니다.

2. 검색어가 없을 시 “검색어 없음” 표출
> Context API와 useReducer()를 이용해 전역 상태로 데이터를 관리합니다. <br /> 저장한 상태값(sickList)의 1번째 인덱스가 `undefined`인 경우 "검색어 없음"이 표출됩니다.


### ✅ Assignment 2
- API 호출별로 로컬 캐싱 구현
- expire time 구현 (선택)
> 입력한 검색어에 따른 결과를 따로 저장하고 추후 재사용한다는 것에 초점을 맞춰 `localStorage`를 이용해 구현했으나, <br />  추후 팀과제 중 `localStorage`의 저장 용량 이슈에 대해 알게 되어 cache API를 사용하여 리팩토링을 했습니다. <br /> 키 생성, 데이터 및 만료 시간 저장, 캐시에서 데이터를 가져오기, 삭제 등 기능별로 함수를 구분하여 구현했습니다. <br /> 이 때 만료시간에 사용되는 값은 상수화하여 관리가 용이하도록 했습니다.
 
<details>
  <summary>코드 보기</summary>
 https://github.com/devseop/po-fe-12th-w3/blob/d2e8f4a0c89343efa9d88947eb79ee9743f9bdd9/src/utils/cache.ts#L9-L65
</details>

### ✅ Assignment 3
입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
> 검색창에서 발생하는 이벤트는 ‘텍스트를 입력’하는 것이고, 입력한 텍스트에 대한 결과를 요청(query)하여 검색창 하단에 보여줄 것입니다. <br /> 검색창에서 질환을 입력시에 키보드 이벤트가 발생할 때마다가 API를 호출하므로 이는 호출 횟수의 증가뿐만 아니라 비용 또한 상승하게 됩니다. <br /> 따라서 디바운싱을 이용해 이벤트를 몇 번이나 발생시키든 이벤트를 실행하지 않고 일정한 시간이 지난 뒤에 API가 호출되도록 제어합니다. 저는 `value`와 `delay`를 인자로 받아 디바운싱된 `value`를 반환하도록 custom hook으로 구현했습니다.

<details>
  <summary>코드 보기</summary>
 https://github.com/devseop/po-fe-12th-w3/blob/d2e8f4a0c89343efa9d88947eb79ee9743f9bdd9/src/hooks/useDebounce.ts#L4-L18
</details>


### ✅ Assignment 4
API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
> API 호출 / 호출 실패 / 로컬 캐싱 사용의 목적에 따라 다른 콜솔이 호출됩니다. 실질적으로 API 호출을 요청하는 역할을 담당하는 `api/ts` 파일에 작성했습니다.

https://github.com/devseop/po-fe-12th-w3/blob/d2e8f4a0c89343efa9d88947eb79ee9743f9bdd9/src/api/api.ts#L19-L44

### ✅ Assignment 5
키보드만으로 추천 검색어들로 이동 가능하도록 구현
> `keydown` 이벤트로 키보드의 방향키를 눌렀을 때 리스트 사이를 이동합니다.. 별도의 `selectedIndex`상태값을 두어 `selectedIndex`와 검색어 아이템의 인덱스가 같을 경우, `ref.current.focus()`로 해당 아이템을 포커싱하여 강조하는 스타일링을 구현했습니다.

<details>
  <summary>코드 보기</summary>
https://github.com/devseop/po-fe-12th-w3/blob/d2e8f4a0c89343efa9d88947eb79ee9743f9bdd9/src/pages/SearchSection.tsx#L11-L49
</details>

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
