import './Emotions.css';

const Emotions = () => {

    const emos = ['기쁨', '신남', '즐거움'];
    return (
        <>
            <div className='emotionsBox'>
                {emos.map(emo => {
                    return (
                        <div>{emo}</div>
                    );
                })}

            </div>
        </>
    );
};

export default Emotions;