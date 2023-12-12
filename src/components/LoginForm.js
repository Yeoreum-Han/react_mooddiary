import axios from 'axios';
import './LoginForm.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const bcyrpt = require('bcryptjs');

const LoginForm = ({ isOpen, closeLogin }) => {

    const ref = useRef(null);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    const [cookies, setCookie] = useCookies();

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

    useEffect(() => {
        getUserInfo()
    }, []);

    const getUserInfo = async () => {
        await axios.get('https://marsh-harsh-microraptor.glitch.me/users', {
        }).then((res) => {
            setUserInfo(res.data[0]);
        });
    };

    const regCheckEmail = (e) => {
        const regex = /[\w\-\.]+\@[\w\-]+\.[\w]/g;
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

    const login = async () => {
        //bcyrpt.compare로 비밀번호 비교해서 t/f return
        const validPwd = await bcyrpt.compare(loginInput.loginPwd, userInfo.password);
        
        if (!isLoginValid.isLoginEmailV || !isLoginValid.isLoginPwdV) {
            alert('이메일 또는 비밀번호를 확인하세요');
            return;
        }
        if (loginInput.loginEmail !== userInfo.email) {
            alert('존재하지 않는 이메일입니다');
            return;
        }
        if (!validPwd) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        await axios.post('https://marsh-harsh-microraptor.glitch.me/login', { email: loginInput.loginEmail, password: loginInput.loginPwd })
            .then((res) => {
                closeLogin();
                setCookie('accessToken', res.data.accessToken);
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