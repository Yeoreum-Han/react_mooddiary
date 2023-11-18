import './DiaryCard.css';

const DiaryCard = () =>{
    return(
        <div className="diaryCardCover">
            <div className='cardTitle'>제목</div>
            <div className='cardDateMoodCover'>
                <div className='cardDate'>2023-11-18</div>
                <div className='cardMood'><span>기분</span></div>
            </div>
            <div className='cardText'>일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십</div>
            <div className='cardButtonsCover'>
                <div className='buttonEdit'/>
                <div className='buttonDelete'/>
            </div>
        </div>
    );
};
export default DiaryCard;