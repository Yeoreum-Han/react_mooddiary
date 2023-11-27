import axios from 'axios';
import './LoginForm.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LoginForm = ({ isOpen, closeLogin }) => {

    const ref = useRef(null);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPwd, setLoginPwd] = useState('');

    const [cookies, setCookie] = useCookies(['accessToken']);


    const modalClose = (e) => {
        if(ref.current === e.target) {
            closeLogin();
        }
    };

    const moveToCreate = () => {
        closeLogin();
        navigate('/createAccount');
    }

    const login = () => {
        axios.post('http://localhost:5000/login', { email : loginEmail, password : loginPwd})
        .then((res)=>{
            closeLogin();
            setCookie('accessToken', res.data.accessToken);
        });
    }

    return (
        <div className='loginFormBg' style={{ display: isOpen ? 'block' : 'none' }}  onClick={(e)=>{modalClose(e)}} ref={ref}>
            <div className='loginFormCover'>
                <div className='loginTitle'>
                    <p>Log In</p>
                </div>
                <form className='loginForm'>
                    <div className='userInfo'>
                        <input type='email' id='loginEmail' name='loginEmail' placeholder='userEmail' className='userId' value={loginEmail} onChange={(e)=>{setLoginEmail(e.target.value)}}/>
                        <input type='password' id='loginPwd' name='loginPwd' placeholder='password' className='userPwd' value={loginPwd} onChange={(e)=>{setLoginPwd(e.target.value)}} />
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