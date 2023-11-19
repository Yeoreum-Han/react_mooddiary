import './ShowDiaries.css';
import DiaryCard from "./DiaryCard";
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowDiaries = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        axios.get('http://localhost:5000/posts',).then((res) => {
            setPosts(res.data);
        });
    };

    const renderDiaryCards = () => {
        return posts.map((post) => {
            return <DiaryCard
                key={post.id} title={post.title} date={post.date} mood={post.mood} text={post.text} />
        });
    };
    
    return (
        <div className='showDiariesCover'>
            {renderDiaryCards()}
        </div>
    );
};
export default ShowDiaries;