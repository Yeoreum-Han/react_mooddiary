import axios from 'axios';
import './DiaryCard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const DiaryCard = ({ id, title, date, mood, text, getPosts }) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })


    }, []);


    const getConfirm = (id) => {
        if (window.confirm('삭제하겠습니까?')) {
            axios.delete(`https://marsh-harsh-microraptor.glitch.me/${id}`)
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
            {isLoggedIn && <div className='cardButtonsCover'>
                <div className='buttonEdit' onClick={() => toEdit(id)} />
                <div className='buttonDelete' onClick={() => getConfirm(id)} />
            </div>
            }
        </div>
    );
};
export default DiaryCard;