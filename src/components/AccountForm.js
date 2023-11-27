import axios from 'axios';
import './AccountForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AccountForm = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [checkPwd, setCheckPwd] = useState('');

    const navigate = useNavigate();


    const onCreate = () => {    
        if(userName === '' || userEmail === '' || userPwd === '' || checkPwd === '' ){
            alert('모든 입력칸을 작성해 주세요!');
        } else {
            axios.post('http://localhost:5000/users', { 
                name : userName , email : userEmail, password : userPwd 
            })
            .then(()=>{
                navigate('/');   
            });
        }
    };

    return (
        <div className='accountFormCover'>
            <div className='accountForm'>
                <p className='accountFormTitle'>회원가입</p>
                <form action='/createAccount' method='post' id='accountForm'>
                    <input type='text' placeholder='이름' id='userName' name='name' value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                    <input type='email' placeholder='이메일' id='userEmail' name='email' value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}}/>
                    <input type='password' placeholder='비밀번호' id='userPwd' name='password' value={userPwd} onChange={(e)=>{setUserPwd(e.target.value)}}/>
                    <input type='password' placeholder='비밀번호 확인' id='checkPwd' value={checkPwd} onChange={(e)=>{setCheckPwd(e.target.value)}}/>
                    <div className='registerButton' onClick={onCreate}>가입하기</div>
                </form>
            </div>
        </div>
    );
};
export default AccountForm;