import './ShowDiaries.css';
import DiaryCard from "./DiaryCard";

const ShowDiaries = () => {
    return (
        <div className='showDiariesCover'>
            <DiaryCard/>
            <DiaryCard/>
            <DiaryCard/>
            <DiaryCard/>
            <DiaryCard/>
        </div>
    );
};
export default ShowDiaries;