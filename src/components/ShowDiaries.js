import './ShowDiaries.css';
import DiaryCard from "./DiaryCard";
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowDiaries = () => {

    const [posts, setPosts] = useState([]);

    //처음에 한번 데이터 가져오기
    useEffect(() => {
        getPosts();
    },[]);

    const getPosts = () => {
        axios.get('http://localhost:5000/posts',).then((res) => {
            setPosts(res.data);
        });
    };
    

    const renderDiaryCards = () => {
        return posts.map((post) => {
            return <DiaryCard
                id={post.id} title={post.title} date={post.date} mood={post.mood} text={post.text} getPosts={getPosts}/>
        });
    };

    return (
        <div className='showDiariesCover'>
            {renderDiaryCards()}
        </div>
    );
};
export default ShowDiaries;