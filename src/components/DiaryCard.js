import './DiaryCard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';



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
        });

    }, []);


    const getConfirm = async (id) => {
        if (window.confirm('삭제하겠습니까?')) {
            await deleteDoc(doc(db, 'posts', id));
            alert('삭제됐습니다');
            getPosts();
        } else {
            alert('취소했습니다');
        };
    };

    const toEdit = (id) => {
        navigate(`/${id}/edit`);
    }

    return (
        <div className='diaryCardCover'>
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