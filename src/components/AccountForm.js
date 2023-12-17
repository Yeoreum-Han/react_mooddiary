// import axios from 'axios';
import './AccountForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const AccountForm = () => {

    const [inputValue, setInputValue] = useState({
        userName: '',
        userEmail: '',
        userPwd: '',
        checkPwd: ''
    });

    const [isInputValid, setIsInputValid] = useState({
        isUserNameV: false,
        isUserEmailV: false,
        isUserPwdV: false,
        isCheckPwdV: false,
    });

    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies();

    const inputRegexs = {
        nameRegex: /[a-zA-Z가-힣\s]{1,30}/,
        emailRegex: /[\w\-\.]+\@[\w\-]+\.[\w]/g,
    };

    const regCheckName = (e) => {
        const validName = inputRegexs.nameRegex.test(e.target.value);
        setIsInputValid({ ...isInputValid, isUserNameV: validName });
        setInputValue({ ...inputValue, userName: e.target.value });
        if (e.target.value === '') {
            setIsInputValid({ ...isInputValid, isUserNameV: false });
        }
    }
    const regCheckEmail = (e) => {
        const validEmail = inputRegexs.emailRegex.test(e.target.value);
        setIsInputValid({ ...isInputValid, isUserEmailV: validEmail });
        setInputValue({ ...inputValue, userEmail: e.target.value });
        if (e.target.value === '') {
            setIsInputValid({ ...isInputValid, isUserEmailV: false });
        }
    }
    const regCheckPwd = (e) => {
        setIsInputValid({ ...isInputValid, isUserPwdV: true });
        setInputValue({ ...inputValue, userPwd: e.target.value });
        if (e.target.value === '') {
            setIsInputValid({ ...isInputValid, isUserPwdV: false });
        }
    }

    const pwdCheck = (e) => {
        setInputValue({ ...inputValue, checkPwd: e.target.value });
        if (inputValue.userPwd !== e.target.value) {
            setIsInputValid({ ...isInputValid, isCheckPwdV: false });
        } else {
            setIsInputValid({ ...isInputValid, isCheckPwdV: true });
        }
    }

    const onCreate = () => {
        // if (!isInputValid.isUserNameV || !isInputValid.isUserEmailV || !isInputValid.isUserPwdV) {
        //     alert('입력창을 확인해주세요');
        //     return;
        // }
        // if (inputValue.userPwd !== inputValue.checkPwd) {
        //     alert('비밀번호가 일치하지 않습니다');
        //     return;
        // }
        // axios.post('https://marsh-harsh-microraptor.glitch.me/users', {
        //     name: inputValue.userName,
        //     email: inputValue.userEmail,
        //     password: inputValue.userPwd,
        // })
        //     .then((res) => {
        //         setCookie('accessToken', res.data.accessToken);
        //         navigate('/');
        //     });
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, inputValue.userEmail, inputValue.userPwd)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setInputValue({
                    userName: '',
                    userEmail: '',
                    userPwd: '',
                    checkPwd: ''
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorCode : ', errorCode, `\n`, 'errorMessage : ', errorMessage);
                alert('회원가입에 실패했습니다.', `\n`, '다시 시도해주세요');
            });
            // auth/missing-password
            // auth/invalid-email
            // auth/email-already-in-use
            // auth/weak-password
        };

    return (
        <div className='accountFormCover'>
            <div className='accountForm'>
                <p className='accountFormTitle'>회원가입</p>
                <form action='/createAccount' method='post' id='accountForm'>
                    <input type='text' className={isInputValid.isUserNameV ? 'valid' : 'invalid'} placeholder='이름' id='userName' name='name' value={inputValue.userName} onChange={(e) => { regCheckName(e) }} />
                    <input type='email' className={isInputValid.isUserEmailV ? 'valid' : 'invalid'} placeholder='이메일' id='userEmail' name='email' value={inputValue.userEmail} onChange={(e) => { regCheckEmail(e) }} />
                    <input type='password' className={isInputValid.isUserPwdV ? 'valid' : 'invalid'} placeholder='비밀번호' id='userPwd' name='password' value={inputValue.userPwd} onChange={(e) => { regCheckPwd(e) }} />
                    <input type='password' className={isInputValid.isCheckPwdV ? 'valid' : 'invalid'} placeholder='비밀번호 확인' id='checkPwd' value={inputValue.checkPwd} onChange={(e) => { pwdCheck(e) }} />
                    <div className='registerButton' onClick={onCreate}>가입하기</div>
                </form>
            </div>
        </div>
    );
};
export default AccountForm;