import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {

    const activeStyle = {
        fontWeight: 'bold',
    };
    return (
        <div className='header'>
            <div className='navBar'>
                <Link 
                to='/'
                className='navLinkItem' />
                <NavLink 
                to='/write' 
                activeStyle={activeStyle}
                className='navLinkItem'
                >오늘의 감정</NavLink>
                <NavLink 
                to='/mydiaries' 
                activeStyle={activeStyle}
                className='navLinkItem'
                >나의 한 달</NavLink>
                <NavLink 
                to='/login' 
                activeStyle={activeStyle}
                className='navLinkItem'
                >로그인</NavLink>
            </div>
        </div>
    );
};
export default Header;