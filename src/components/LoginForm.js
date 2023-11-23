import './LoginForm.css';

const LoginForm = ({isOpen, closeLogin}) => {
    return(
        <div className='loginFormCover' style={{display : isOpen ? 'block' : 'none'}}>
            <div>로그인모달창</div>
            <div onClick={closeLogin}>close버튼</div>
        </div>
    );
};

export default LoginForm;