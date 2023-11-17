import './DiaryCard.css';

const DiaryCard = () =>{
    return(
        <div className="diaryCardCover">
            <div className='cardTitle'>제목</div>
            <div className='cardDateMoodCover'>
                <div className='cardDate'>날짜</div>
                <div className='cardMood'>기분</div>
            </div>
            <div className='cardText'>내용</div>
            <div className='cardButtonsCover'>
                <div>수정</div>
                <div>삭제</div>
            </div>
        </div>
    );
};
export default DiaryCard;