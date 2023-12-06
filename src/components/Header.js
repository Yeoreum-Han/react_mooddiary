import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { useCookies } from 'react-cookie';
import logo from '../assets/moodlogo_42.png';

const Header = () => {

    const [loginOpen, setLoginOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [cookies, removeCookie] = useCookies();

    const navigate = useNavigate();

    const openLogin = () => {
        setLoginOpen(true);
    }
    const closeLogin = () => {
        setLoginOpen(false);
    }
    const logout = () => {
        removeCookie('accessToken');
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
        navigate('/');
    }

    //accessToken유무에 따라 로그인 상태 t/f 변경
    const checkLogin = () => {
        const token = cookies.accessToken;

        if( !token || token ==='undefined') {
            setIsLoggedIn(false);
        } else{            
            setIsLoggedIn(true);
        }

    }

    //로그인 상태일 때만 글 작성하도록. 로그인 안 되어있으면 페이지이동 방지. 
    const needLogin = (e) => {
        checkLogin();
        if(!isLoggedIn) {
            e.preventDefault();
            setLoginOpen(true);
        } else {
            navigate('/write');
        }
    }

    //처음 렌더시부터 로그인상태 확인, 토큰값 변경에 따라 리렌더링
    useEffect(()=>{
        checkLogin();
    },[cookies.accessToken]);

    return (
        <div className='headerCover'>
            <div className='modal'>
                <LoginForm isOpen={loginOpen} closeLogin={closeLogin} />
            </div>
            <div className='header'>
                <div className='navBar'>
                    <Link
                        to='/'
                        className='navLinkItem'>
                            <img src={logo} alt='로고이미지'/>
                        </Link>
                    <NavLink
                        to='/write'
                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                        className='navLinkItem' onClick={(e)=>{needLogin(e)}}
                    >오늘의 일기</NavLink>
                    <NavLink
                        to='/mydiaries'
                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                        className='navLinkItem'
                    >나의 한 달</NavLink>
                    { isLoggedIn ? <div className='navLinkItem' onClick={logout}>로그아웃</div> :<div
                        className='navLinkItem'
                        onClick={openLogin}
                    >로그인</div>}
                </div>
            </div>
        </div>
    );
};
export default Header;