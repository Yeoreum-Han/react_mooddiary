import './ShowDiaries.css';
import DiaryCard from "./DiaryCard";
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ShowDiaries = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    //처음에 한번 데이터 가져오기
    useEffect(() => {
        getPosts();
    },[]);
    
    
    const getPosts = () => {
        axios.get('https://marsh-harsh-microraptor.glitch.me/posts').then((res) => {
            setPosts(res.data);
            setLoading(false);
        });
    };
    
    
    const renderDiaryCards = () => {
        return posts.map((post) => {
            return <DiaryCard
            id={post.id} title={post.title} date={post.date} mood={post.mood} text={post.text} getPosts={getPosts}/>
        });
    };
    
    if(loading) { return <LoadingSpinner/>}
    
    return (
        <div className='showDiariesCover'>
            {renderDiaryCards()}
        </div>
    );
};
export default ShowDiaries;