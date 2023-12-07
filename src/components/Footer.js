import './Footer.css';
import footerLogo from '../assets/moodlogo_42.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className='addressCover'>
                <div className='footerLogo'>
                    <img src={footerLogo} alt='하단로고'/>
                </div>
                <address>경기도 성남시 수정구 수정로 218<br />(신흥동 3435번지) 수정구 보건소 5층<br />
                </address>
            </div>
            <div className='contectCover'>
                <div>TEL : 031-7080-1234 </div>
                <div>E-mail : yrh.summer@gmail.com</div>
            </div>
        </div>
    );
};

export default Footer;