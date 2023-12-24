import './DiaryForm.css';
import Emotions from './Emotions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';


const DiaryForm = ({ editing }) => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [mood, setMood] = useState('');
    const [text, setText] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/mydiaries');
    };

    const onSubmit = async () => {
        if (editing) {
            const editRef = doc(db, 'posts', id);
            await updateDoc(editRef, {
                title: title,
                date: date,
                mood: mood,
                text: text
            });
            navigate('/mydiaries');
        } else {
            // Add a new document with a generated id.
            await addDoc(collection(db, 'posts'), {
                title: title,
                date: date,
                mood: mood,
                text: text,
                timestamp: Timestamp.now()
            });
            navigate('/mydiaries');
        }
    };

    useEffect(() => {
        if (editing) {
            const fbIdData = async () => {
                const idData = await getDoc(doc(db, 'posts', id));
                setTitle(idData.data().title);
                setDate(idData.data().date);
                setMood(idData.data().mood);
                setText(idData.data().text);
            }
            fbIdData();
        }
    }, [id, editing]);

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
                    <input type='text' id='title' name='title' className='formTitle' placeholder='제목을 작성해주세요 (30자 이내)' value={title} onChange={(e) => { setTitle(e.target.value); }} />
                    <input type='date' id='date' name='date' className='formDate' value={date} onChange={(e) => { setDate(e.target.value) }} />
                    <input type='text' id='mood' name='mood' className='formMood' placeholder='오늘의 감정' value={mood} onChange={(e) => { setMood(e.target.value) }} />
                    <textarea id='text' name='text' className='formText' value={text} onChange={(e) => { setText(e.target.value) }} />
                    <div className='formButtonsCover'>
                        <div className='buttonCancel' onClick={onCancel}>취소</div>
                        <div className='buttonSave' onClick={onSubmit}>저장</div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default DiaryForm;