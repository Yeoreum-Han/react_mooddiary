import './LoginForm.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({ isOpen, closeLogin }) => {

    const ref = useRef(null);
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({
        loginEmail: '',
        loginPwd: '',
    });

    const [isLoginValid, setIsLoginValid] = useState({
        isLoginEmailV: false,
        isLoginPwdV: false,
    });

    const modalClose = (e) => {
        if (ref.current === e.target) {
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

    const moveToCreate = () => {
        closeLogin();
        navigate('/createAccount');
    }

    const regCheckEmail = (e) => {
        const regex = /[\w\-.]+@[\w-]+\.[\w]/g;
        const validEmail = regex.test(e.target.value);
        setIsLoginValid({ ...isLoginValid, isLoginEmailV: validEmail });
        setLoginInput({ ...loginInput, loginEmail: e.target.value });
        if (e.target.value === '') {
            setIsLoginValid({ ...isLoginValid, isLoginEmailV: false });
        }
    }

    const regCheckPwd = (e) => {
        setIsLoginValid({ ...isLoginValid, isLoginPwdV: true });
        setLoginInput({ ...loginInput, loginPwd: e.target.value });
        if (e.target.value === '') {
            setIsLoginValid({ ...isLoginValid, isLoginPwdV: false });
        }
    }

    const login = () => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, loginInput.loginEmail, loginInput.loginPwd)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoginInput({
                    loginEmail: '',
                    loginPwd: '',
                });
                setPersistence(auth, browserSessionPersistence)
                    .then(() => {
                        return signInWithEmailAndPassword(auth, loginInput.loginEmail, loginInput.loginPwd);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, `\n`, errorMessage);
                    });
                closeLogin();
            })
            .catch((error) => {
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

    return (
        <div className='loginFormBg' style={{ display: isOpen ? 'block' : 'none' }} onClick={(e) => { modalClose(e) }} ref={ref}>
            <div className='loginFormCover'>
                <div className='loginTitle'>
                    <p>Log In</p>
                </div>
                <form className='loginForm'>
                    <div className='userInfo'>
                        <input type='email' id='loginEmail' name='loginEmail' placeholder='userEmail' className={isLoginValid.isLoginEmailV ? 'valid' : 'invalid'} value={loginInput.loginEmail} onChange={(e) => { regCheckEmail(e) }} />
                        <input type='password' id='loginPwd' name='loginPwd' placeholder='password' className={isLoginValid.isLoginPwdV ? 'valid' : 'invalid'} value={loginInput.loginPwd} onChange={(e) => { regCheckPwd(e) }} />
                    </div>
                    <div className='loginButton' onClick={login}>Log In</div>
                </form>
                <div className='createAccountCover'>
                    회원이 아니신가요?
                    <div className='createAccount' onClick={moveToCreate}>
                        계정 만들기
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;