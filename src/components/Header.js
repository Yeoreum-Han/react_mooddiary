import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Header = () => {

    const [loginOpen, setLoginOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const logo = process.env.PUBLIC_URL;

    const auth = getAuth();

    const openLogin = () => {
        setLoginOpen(true);
    }
    const closeLogin = () => {
        setLoginOpen(false);
    }
    const logout = () => {
        auth.signOut();
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
        navigate('/');
    }

    //로그인 상태일 때만 글 작성하도록. 로그인 안 되어있으면 페이지이동 방지. 
    const needLogin = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            setLoginOpen(true);
        } else {
            navigate('/write');
        }
    }

    //처음 렌더시부터 로그인상태 확인, 상태변경에 따라 리렌더링
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })
    }, [isLoggedIn]);

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
                        <img src={`${logo}/images/moodlogo_42.png`} alt='상단로고' />
                    </Link>
                    <NavLink
                        to='/write'
                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                        className='navLinkItem' onClick={(e) => { needLogin(e) }}
                    >오늘의 일기</NavLink>
                    <NavLink
                        to='/mydiaries'
                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                        className='navLinkItem'
                    >나의 한 달</NavLink>
                    {isLoggedIn ? <div className='navLinkItem' onClick={logout}>로그아웃</div> : <div
                        className='navLinkItem'
                        onClick={openLogin}
                    >로그인</div>}
                </div>
            </div>
        </div>
    );
};
export default Header;