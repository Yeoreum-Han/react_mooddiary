import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';
import LoginForm from './LoginForm';

const Header = () => {

    const [loginOpen, setLoginOpen] = useState(false);

    const openLogin = () => {
        setLoginOpen(true);
    }
    const closeLogin = () => {
        setLoginOpen(false);
    }
    return (
        <div className='headerCover'>
            <div className='modal'>
                <LoginForm isOpen={loginOpen} closeLogin={closeLogin} />
            </div>
            <div className='header'>
                <div className='navBar'>
                    <Link
                        to='/'
                        className='navLinkItem' />
                    <NavLink
                        to='/write'
                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                        className='navLinkItem'
                    >오늘의 일기</NavLink>
                    <NavLink
                        to='/mydiaries'
                        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
                        className='navLinkItem'
                    >나의 한 달</NavLink>
                    <div
                        className='navLinkItem'
                        onClick={openLogin}
                    >로그인</div>
                </div>
            </div>
        </div>
    );
};
export default Header;