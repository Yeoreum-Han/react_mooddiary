import './Emotions.css';

const Emotions = (props) => {

    const emos = ['기쁘다', '좋다', '만족스럽다', '흐뭇하다', '감격스럽다', '흥겹다', '가슴벅차다', '사랑스럽다', '열정있다', '온화하다', '애착이간다', '뿌듯하다', '믿음직하다', '갖고싶다', '활기차다'];
    const emosNeg = ['화난다', '신경질난다', '싫다', '속상하다', '불쾌하다', '서운하다', '환멸난다', '답답하다', '상처받았다', '처량하다', '암담하다', '서럽다', '불안하다', '부끄럽다', '약오른다'];


    return (
        <>
            <div className='emotionsBox'>
                {props.emotions === 'positive' ?
                    emos.map(emo => {
                        return (
                            <div className='emo'>
                                <span>{emo}</span>
                            </div>
                        );
                    })
                    :
                    emosNeg.map(emo => {
                        return (
                            <div className='emo'>
                                <span>{emo}</span>
                            </div>
                        );
                    })
                }

            </div>
        </>
    );
};

export default Emotions;