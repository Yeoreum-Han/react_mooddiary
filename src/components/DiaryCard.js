import './DiaryCard.css';

const DiaryCard = ({ title, date, mood, text }) => {

    return (
        <div className="diaryCardCover">
            <div className='cardTitle'>{title}</div>
            <div className='cardDateMoodCover'>
                <div className='cardDate'>{date}</div>
                <div className='cardMood'><span>{mood}</span></div>
            </div>
            <div className='cardText'>{text}</div>
            <div className='cardButtonsCover'>
                <div className='buttonEdit' />
                <div className='buttonDelete'/>
            </div>
        </div>

    );
};
export default DiaryCard;