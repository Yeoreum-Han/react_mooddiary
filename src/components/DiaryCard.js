import axios from 'axios';
import './DiaryCard.css';
import { useNavigate } from 'react-router-dom';

const DiaryCard = ({ id, title, date, mood, text , getPosts }) => {

    const navigate = useNavigate();

    const getConfirm = (id) => {
        if (window.confirm('삭제하겠습니까?')) {
            axios.delete(`http://localhost:5000/posts/${id}`)
                .then(() => {
                    alert('삭제됨!');
                    getPosts();

                });
        } else {
            alert('삭제안됨');
        };
    };

    const toEdit = (id) => {
        navigate(`/${id}/edit`);
    }

    return (
        <div className="diaryCardCover">
            <div className='cardTitle'>{title}</div>
            <div className='cardDateMoodCover'>
                <div className='cardDate'>{date}</div>
                <div className='cardMood'><span>{mood}</span></div>
            </div>
            <div className='cardText'>{text}</div>
            <div className='cardButtonsCover'>
                <div className='buttonEdit' onClick={()=> toEdit(id)}/>
                <div className='buttonDelete' onClick={() => getConfirm(id)} />
            </div>
        </div>

    );
};
export default DiaryCard;