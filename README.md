# moodDiary - 감정일기

## 🙋 소개
![md_mooddiary01](https://github.com/Yeoreum-Han/react_mooddiary/assets/127937169/3e4de3b5-c359-4764-80f5-746fe82fb9c0)  
 건강한 마음을 가지기 위해서는 자신의 감정을 돌아보고 명확히 표현할 수 있어야 합니다. 이 [**일기장**](https://yeoreum-han.github.io/react_mooddiary)은 감정표현이 어려운 사람들을 위해 기획했습니다. 여러 <ins>*감정단어*</ins>를 가이드로 제시하고, 한달간의 일기를 보여주며 <ins>*자신에 대한 이해*</ins>와 <ins>*스트레스 해소*</ins>를 도와줍니다.

## 📖 기술스택
 * html5
 * css3
 * react 
 * firebases

## 💡 핵심기능  
1. 회원가입과 로그인  
![md_mooddiary02](https://github.com/Yeoreum-Han/react_mooddiary/assets/127937169/4ae9a5af-105e-41f1-8255-7edba3741ace)
![md_mooddiary03](https://github.com/Yeoreum-Han/react_mooddiary/assets/127937169/fa02e26e-cb0c-4073-baa1-0e4983c36932)   
-- firebase Auth를 사용해 이메일과 비밀번호로 **회원가입 및 로그인** 기능을 구현했습니다. 에러코드에 따라 **alert 메세지**를 띄워 사용자에게 안내합니다.  
-- 로그인 시 regCheckEmail, regCheckPwd 함수로 입력값의 **유효성을 검사**하면서 input의 색을 변경하도록 했습니다.  
-- 또한 **로그인 상태에 따라** 일기 작성과 수정, 삭제기능이 제한됩니다.
```js
// 로그인 함수
const login = () => {
  const auth = getAuth();   // 이메일로 로그인 인증
  signInWithEmailAndPassword(auth, loginInput.loginEmail, loginInput.loginPwd)
  .then((userCredential)=>{
    ...
    setPersistence(auth, browserSessionPersistence)   // 인증 상태 지속성 -브라우저세션으로 설정
        .then(() => {
            return signInWithEmailAndPassword(auth, loginInput.loginEmail, loginInput.loginPwd);
                    })
        .catch((error) => {
          ...
        });
    closeLogin();
  })
  .catch((error) => {     // 에러코드에 따라 alert 메시지
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/invalid-email'
          : return alert('이메일을 확인해주세요.');
      case 'auth/missing-password'
          : return alert('비밀번호를 작성해주세요.');
      case 'auth/weak-password'
          : return alert('비밀번호를 제대로 작성해주세요.');
      case 'auth/network-request-failed'
          : return '네트워크 연결에 실패했습니다.';
      default
          : return alert('로그인에 실패했습니다');
                }
  });
}
```
```js
const regCheckEmail = (e) => {
    const regex = /[\w\-.]+@[\w-]+\.[\w]/g;
    const validEmail = regex.test(e.target.value);
    setIsLoginValid({ ...isLoginValid, isLoginEmailV: validEmail });    // boolean 타입의 isLoginValid 변수
    setLoginInput({ ...loginInput, loginEmail: e.target.value });
    if (e.target.value === '') {    // 빈칸일 경우
      setIsLoginValid({ ...isLoginValid, isLoginEmailV: false });
    }
}
```
2. 일기 작성과 조회  
![md_mooddiary04](https://github.com/Yeoreum-Han/react_mooddiary/assets/127937169/063a2666-89d7-45e1-a093-a61211025940)
![md_mooddiary05](https://github.com/Yeoreum-Han/react_mooddiary/assets/127937169/f1010b7d-619f-44b1-a770-a6cd8e8933ae)  
-- 감정일기 작성에 도움이 되도록 긍정과 부정감정들을 예시로 제시했습니다.  
-- 저장후에는 나의 한 달 페이지로 넘어가면서 작성한 일기들을 볼 수 있습니다. 일기들은 **최신순**으로 정렬했습니다. 
```js
const getPosts = async () => {
  const postData = collection(db, 'posts');
  const orderData = query(postData, orderBy('timestamp', 'desc'));
  //snapshot받아오기 전에 query
  const querySnapshot = await getDocs(orderData);
  const fbData = querySnapshot.docs.map(doc => ({
    //포스트의 id 
      id : doc.id,
      timestamp : doc.timestamp,
      ...doc.data(),
  }));
  setPosts(fbData);
  setLoading(false);
};
```

## 🤔 트러블슈팅
1. 로그인 모달창  
로그인창을 띄우고 배경 클릭 시 닫히는 기능을 만들고 싶었는데 로그인창 내부를 클릭하면 닫히고, 외부를 누르면 오류가 발생했다.  
-> 이는 배경공간을 따로 만들지 않았기 때문에 발생한 일로 상위에 div를 추가하는 것으로 수정했다. 또한 **useRef**를 사용해 **클릭된 지점에 따라** closeLogin 함수를 실행하도록 코드를 작성해 해결했다. 

```jsx
<!--가장 상위 div
isOpen상태에 따라 display변경
onClick이벤트에 modalClose 연결
ref 기준 설정--!>
<div className='loginFormBg' style={{ display: isOpen ? 'block' : 'none' }} onClick={(e) => { modalClose(e) }} ref={ref}> 
```
```js
const modalClose = (e) => {
  if (ref.current === e.target) {  
    //현재 클릭한 대상(ref.current)와 이벤트가 있는 타겟(e.target)이 같은지 비교
    closeLogin();
    setLoginInput({
      loginEmail: '',
      loginPwd: '',
    });
    setIsLoginValid({
      isLoginEmailV: false,
      isLoginPwdV: false,
    });
  }
};
```
