import './AccountForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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


    const inputRegexs = {
        nameRegex: /[a-zA-Z가-힣\s]{1,30}/,
        emailRegex: /[\w\-.]+@[\w-]+\.[\w]/g,
    };

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
        if(isInputValid.isCheckPwdV === false ){
            alert('비밀번호 확인란을 작성해주세요.');
            return;
        }

        if (inputValue.userPwd !== inputValue.checkPwd) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, inputValue.userEmail, inputValue.userPwd)
            .then(() => {
                setInputValue({
                    userName: '',
                    userEmail: '',
                    userPwd: '',
                    checkPwd: ''
                });
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/invalid-email'
                        : return alert('이메일을 확인해주세요.');
                    case 'auth/email-already-in-use'
                        : return alert('이미 가입된 이메일입니다.');
                    case 'auth/missing-password'
                        : return alert('비밀번호를 작성해주세요.');
                    case 'auth/weak-password'
                        : return alert('비밀번호를 6자리 이상 작성해주세요.');
                    case 'auth/network-request-failed'
                        : return '네트워크 연결에 실패했습니다.';
                    default
                        : return alert('회원가입에 실패했습니다');
                }
            });
    };

    return (
        <div className='accountFormCover'>
            <div className='accountForm'>
                <p className='accountFormTitle'>회원가입</p>
                <form action='/createAccount' method='post' id='accountForm'>
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