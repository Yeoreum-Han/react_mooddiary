import axios from 'axios';
import './AccountForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const AccountForm = () => {

    const [inputValue, setInputValue] = useState({
        userName: '',
        userEmail: '',
        userPwd: '',
        checkPwd: ''
    });
    // const [userName, setUserName] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    // const [userPwd, setUserPwd] = useState('');
    // const [checkPwd, setCheckPwd] = useState('');

    const [isInputValid, setIsInputValid] = useState({
        isUserNameV: false,
        isUserEmailV: false,
        isUserPwdV: false,
    });

    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies();

    const [className, setClassName] = useState('');

    const inputRegexs = {
        nameRegex: /[a-zA-Z가-힣\s]{1,30}/,
        emailRegex: /[\w\-\.]+\@[\w\-\.]+/g,
    };

    const regCheckName = (e) => {
        setInputValue({ ...inputValue, userName: e.target.value })
        const validName = inputRegexs.nameRegex.test(inputValue.userName);
        setIsInputValid({ ...isInputValid, isUserNameV: validName });
    }
    const regCheckEmail = (e) => {
        setInputValue({ ...inputValue, userEmail: e.target.value })
        const validEmail = inputRegexs.emailRegex.test(inputValue.userEmail);
        setIsInputValid({ ...isInputValid, isUserEmailV: validEmail });
    }
    // const regCheckPwd = (e) => {
    //     setInputValue({ ...inputValue, userPwd: e.target.value })
    //     const validPwd = inputRegexs.pwdRegex.test(inputValue.userPwd);
    //     setIsInputValid({ ...isInputValid, isUserPwdV: validPwd });
    // }

    const onCreate = () => {
        if (inputValue.userPwd !== inputValue.checkPwd) {
            alert('비밀번호가 일치하지 않습니다');
        } else {
            axios.post('http://localhost:5000/users', {
                inputValue
            })
                .then((res) => {
                    setCookie('accessToken', res.data.accessToken);
                    navigate('/');
                });
        }
    };

    return (
        <div className='accountFormCover'>
            <div className='accountForm'>
                <p className='accountFormTitle'>회원가입</p>
                <form action='/createAccount' method='post' id='accountForm'>
                    <input type='text' className={isInputValid.isUserNameV ? 'valid' : 'invalid'} placeholder='이름' id='userName' name='name' value={inputValue.userName} onChange={(e) => { regCheckName(e) }} />
                    <input type='email' className={className} placeholder='이메일' id='userEmail' name='email' value={inputValue.userEmail} onChange={(e) => { regCheckEmail(e) }} />
                    <input type='password' className={className} placeholder='비밀번호' id='userPwd' name='password' value={inputValue.userPwd} onChange={(e) => { setInputValue({ ...inputValue, userPwd: e.target.value }) }} />
                    <input type='password' className={className} placeholder='비밀번호 확인' id='checkPwd' value={inputValue.checkPwd} onChange={(e) => { setInputValue({ ...inputValue, checkPwd: e.target.value }) }} />
                    <div className='registerButton' onClick={onCreate}>가입하기</div>
                </form>
            </div>
        </div>
    );
};
export default AccountForm;