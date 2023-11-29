import axios from 'axios';
import './LoginForm.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const bcyrpt = require('bcryptjs');

const LoginForm = ({ isOpen, closeLogin }) => {

    const ref = useRef(null);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPwd, setLoginPwd] = useState('');
    const [userInfo, setUserInfo] = useState({});

    const [cookies, setCookie] = useCookies();


    const modalClose = (e) => {
        if (ref.current === e.target) {
            closeLogin();
        }
    };

    const moveToCreate = () => {
        closeLogin();
        navigate('/createAccount');
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    const getUserInfo = () => {
        axios.get('http://localhost:5000/users', {
        }).then((res) => {
            setUserInfo(res.data[0]);
        });
    };


    const login = async () => {
        //bcyrpt.compare로 비밀번호 비교해서 t/f return
        const validPwd = await bcyrpt.compare(loginPwd, userInfo.password);

        if (loginEmail === userInfo.email) {
            if(validPwd){
                axios.post('http://localhost:5000/login', { email: loginEmail, password: loginPwd })
                    .then((res) => {
                        closeLogin();
                        setCookie('accessToken', res.data.accessToken);
                    });
            } else {
                alert('비밀번호가 일치하지 않습니다');
            }
        } else {
            alert('이메일 또는 비밀번호를 확인해주세요');
        }
    }

    return (
        <div className='loginFormBg' style={{ display: isOpen ? 'block' : 'none' }} onClick={(e) => { modalClose(e) }} ref={ref}>
            <div className='loginFormCover'>
                <div className='loginTitle'>
                    <p>Log In</p>
                </div>
                <form className='loginForm'>
                    <div className='userInfo'>
                        <input type='email' id='loginEmail' name='loginEmail' placeholder='userEmail' className='userId' value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }} />
                        <input type='password' id='loginPwd' name='loginPwd' placeholder='password' className='userPwd' value={loginPwd} onChange={(e) => { setLoginPwd(e.target.value) }} />
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