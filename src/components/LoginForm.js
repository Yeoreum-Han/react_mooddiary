import './LoginForm.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ isOpen, closeLogin }) => {

    const ref = useRef(null);
    const navigate = useNavigate();

    const modalClose = (e) => {
        if(ref.current === e.target) {
            closeLogin();
        }
    };

    const moveToCreate = () => {
        closeLogin();
        navigate('/createAccount');
    }

    return (
        <div className='loginFormBg' style={{ display: isOpen ? 'block' : 'none' }}  onClick={(e)=>{modalClose(e)}} ref={ref}>
            <div className='loginFormCover'>
                <div className='loginTitle'>
                    <p>Log In</p>
                </div>
                <form className='loginForm'>
                    <div className='userInfo'>
                        <input type='text' id='userId' placeholder='username' className='userId' />
                        <input type='password' id='userPwd' placeholder='password' className='userPwd' />
                    </div>
                    <div className='loginButton'>Log In</div>
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