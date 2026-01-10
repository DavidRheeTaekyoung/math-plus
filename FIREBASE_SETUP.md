# Firebase 설정 가이드

## 1. Firestore 데이터베이스 생성

1. Firebase 콘솔에서 "Firestore Database" 메뉴로 이동
2. "데이터베이스 만들기" 클릭
3. 프로덕션 모드 또는 테스트 모드 선택
   - **테스트 모드**: 30일간 모든 읽기/쓰기 허용 (개발용)
   - **프로덕션 모드**: 보안 규칙 설정 필요

## 2. Firestore 보안 규칙 설정

Firebase 콘솔 → Firestore Database → 규칙 탭

### 테스트/개발용 (모든 사용자 허용)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rankings/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 프로덕션용 (제한적 접근)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rankings/{document=**} {
      allow read: if true;  // 모든 사용자 읽기 허용
      allow write: if request.resource.data.score is int 
                   && request.resource.data.correctCount is int
                   && request.resource.data.username is string
                   && request.resource.data.date is timestamp;  // 데이터 검증
    }
  }
}
```

## 3. Firestore 인덱스 확인

현재 코드는 `score` 필드로만 정렬하므로 기본 인덱스로 충분합니다.
만약 나중에 복합 쿼리를 사용한다면 인덱스가 필요할 수 있습니다.

Firebase 콘솔에서 인덱스가 필요하다는 에러가 나오면:
1. Firestore Database → 인덱스 탭
2. 에러 메시지의 "인덱스 만들기" 링크 클릭
3. 자동으로 인덱스 생성

## 4. 현재 프로젝트 정보

- **프로젝트 ID**: math-plus-303a1
- **앱 ID**: 1:76435894401:web:5dcb2daae2b7312f5d9d80
- **컬렉션 이름**: `rankings`
- **필드 구조**:
  - `username` (string)
  - `score` (number)
  - `correctCount` (number)
  - `date` (timestamp)

## 5. 확인 사항 체크리스트

- [ ] Firestore 데이터베이스가 생성되어 있는가?
- [ ] 보안 규칙이 읽기/쓰기를 허용하는가?
- [ ] `rankings` 컬렉션에 데이터가 저장되고 있는가?
- [ ] 브라우저 콘솔에 Firebase 관련 에러가 없는가?

## 6. 문제 해결

### 데이터가 저장되지 않는 경우
1. Firestore 보안 규칙 확인
2. 브라우저 콘솔에서 에러 메시지 확인
3. Firebase 콘솔 → Firestore Database → 데이터 탭에서 컬렉션 확인

### 데이터를 불러오지 못하는 경우
1. Firestore 보안 규칙에서 `read: if true` 확인
2. 네트워크 탭에서 Firebase 요청 상태 확인
3. Firebase 콘솔에서 실제 데이터 존재 여부 확인
