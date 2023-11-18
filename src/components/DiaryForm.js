import './DiaryForm.css';
import Emotions from './Emotions';

const DiaryForm = () => {

    return (
        <div className='diaryFormCover'>
            <div className='emotionsCover'>
                <p>#mood</p>
                <div className='emotionsPositive'>
                    <Emotions emotions='positive' />
                </div>
                <div className='emotionsNegative'>
                    <Emotions emotions='negative' />
                </div>
            </div>
            <div className='formCover'>
                <h2>오늘의 일기</h2>
                <form action='/write' method='post' id='form' >
                    <input type='text' id='title' name='title' className='formTitle' placeholder='제목을 작성해주세요 (30자 이내)' />
                    <input type='date' id='date' name='date' className='formDate' />
                    <input type='text' id='mood' name='mood' className='formMood' placeholder='오늘의 감정' />
                    <textarea id='text' name='text' className='formText' />
                    <div className='formButtonsCover'>
                        <div className='buttonCancel'>취소</div>
                        <div className='buttonSave'>저장</div>
                    </div>

                </form>
            </div>
        </div>
    );
};
export default DiaryForm;