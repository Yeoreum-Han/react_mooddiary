import { Link } from 'react-router-dom';
import './Intro.css';

const Intro = () => {

    return (
        <div className='intro'>
            <div className='introContentCover'>
                <div className='introImg'/>
                <div className='introText'>
                    <h2> #mood, <span className='title'>감정일기</span> </h2>
                    <p>오늘 어떤 기분이었지? 나는 그때 왜 화났지? <br/>
                    평소 쓰던 일기에 <span className="highlight">감정을 추가</span> 해 보세요<br/> 
                    감정의 원인 찾기에 집중 하다 보면<br/>
                    나를 이해할 수 있고,<br/> <span className="highlight">스트레스 해소</span> 에도 도움이 됩니다! </p>
                    <p><Link to='/write' className='introButton'>일기 쓰러가기 &gt;&gt;</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Intro;