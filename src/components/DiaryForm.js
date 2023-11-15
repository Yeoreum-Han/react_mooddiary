import './DiaryForm.css';
import Emotions from './Emotions';

const DiaryForm = () => {
    return (
        <div className='diaryForm'>
            <div className='writeContentCover'>
                <div className='emotionsCover'>
                    {/* <div>긍정</div>
                        데이터 따로 빼서 map으로 돌리기
                    <div>부정</div> */}
                    <p>#mood</p>
                    <div className='emotionsPositive'>
                        <Emotions/>
                    </div>
                    <div className='emotionsNegative'>
                        <Emotions/>
                    </div>
                </div>
                <div className='formCover'>
                    <h2>오늘의 일기</h2>
                    <form action='/write' method='post' id='form' >
                        <input type='text' id='title' className='formTitle' placeholder='제목을 작성해주세요 (30자 이내)' />
                        <input type='date' id='date' className='formDate' />
                        <input type='text' id='mood' className='formMood' placeholder='오늘의 감정' />
                        <textarea className='formText' />
                        <div className='formButtons'>
                            <div className='buttonCancel'>취소</div>
                            <div className='buttonSave'>저장</div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};
export default DiaryForm;