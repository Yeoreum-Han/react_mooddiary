import { Link, useNavigate } from 'react-router-dom';
import './Intro.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import LoginForm from './LoginForm';


const Intro = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, removeCookie] = useCookies();
    const navigate = useNavigate();

    const introImg = process.env.PUBLIC_URL;

    const closeLogin = () => {
        setLoginOpen(false);
    }

    //accessToken유무에 따라 로그인 상태 t/f 변경
    const checkLogin = () => {
        const token = cookies.accessToken;
        if (!token || token === 'undefined') {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }

    //로그인 상태일 때만 넘어가도록. 로그인 안 되어있으면 페이지이동 방지. 
    const needLogin = (e) => {
        checkLogin();
        if (!isLoggedIn) {
            e.preventDefault();
            setLoginOpen(true);
        } else {
            navigate('/write');
        }
    }
    useEffect(() => {
        checkLogin();
    }, [cookies.accessToken]);

    return (
        <div>
            <div className='modal'>
                <LoginForm isOpen={loginOpen} closeLogin={closeLogin} />
            </div>
            <div className='introCover'>
                <div className='introImg'>
                    <img src={`${introImg}/images/mainImg_800.png`} alt='인트로이미지' />
                </div>
                <div className='introText'>
                    <h2> #mood, <span className='title'>감정일기</span> </h2>
                    <p>오늘 어떤 기분이었지? 나는 그때 왜 화났지? <br />
                        평소 쓰던 일기에 <span className="highlight">감정을 추가</span> 해 보세요<br />
                        감정의 원인 찾기에 집중 하다 보면<br />
                        나를 이해할 수 있고,<br /> <span className="highlight">스트레스 해소</span> 에도 도움이 됩니다! </p>
                    <p><Link to='/write' className='introButton' onClick={(e) => { needLogin(e) }}>일기 쓰러가기 &gt;&gt;</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Intro;