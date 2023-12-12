import axios from 'axios';
import './DiaryForm.css';
import Emotions from './Emotions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DiaryForm = ({editing}) => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [mood, setMood] = useState('');
    const [text, setText] = useState('');

    const {id} = useParams();

    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/mydiaries');
    };

    const onSubmit = () => {
        if(editing){
            axios.patch(`https://marsh-harsh-microraptor.glitch.me/${id}`,{ title, date, mood, text })
            .then(()=>{
                navigate('/mydiaries');
            });
        } else {
            axios.post('https://marsh-harsh-microraptor.glitch.me/posts', { title, date, mood, text })
            .then(() => {
                navigate('/mydiaries');
            });
    
        }
    };

    useEffect(()=>{
        if(editing) {
            axios.get(`https://marsh-harsh-microraptor.glitch.me/posts/${id}`)
            .then((res)=>{
                setTitle(res.data.title);
                setDate(res.data.date);
                setMood(res.data.mood);
                setText(res.data.text);
            });
        }
    },[id, editing]);

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
                    <input type='text' id='title' name='title' className='formTitle' placeholder='제목을 작성해주세요 (30자 이내)' value={title} onChange={(e) => { setTitle(e.target.value);}} />
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