import './ShowDiaries.css';
import DiaryCard from './DiaryCard';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { db } from '../firebase';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';

const ShowDiaries = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    //처음에 한번 데이터 가져오기
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const postData = collection(db, 'posts');
        const orderData = query(postData, orderBy('timestamp', 'desc'));
        //snapshot받아오기 전에 query
        const querySnapshot = await getDocs(orderData);
        const fbData = querySnapshot.docs.map(doc => ({
            //포스트의 id 
            id : doc.id,
            timestamp : doc.timestamp,
            ...doc.data(),
        }));
        setPosts(fbData);
        setLoading(false);
    };



    const renderDiaryCards = () => {
        return posts.map((post) => {
            return <DiaryCard
                key={post.id} id={post.id} title={post.title} date={post.date} mood={post.mood} text={post.text} getPosts={getPosts} />
        });
    };

    if (loading) { return <LoadingSpinner /> }

    return (
        <div className='showDiariesCover'>
            {renderDiaryCards()}
        </div>
    );
};
export default ShowDiaries;