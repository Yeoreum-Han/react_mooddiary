import './AccountForm.css';
import { useNavigate} from 'react-router-dom';

const AccountForm = () => {

    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/');
    };

    const onCreate = () => {    
        //가입누르면 홈으로 이동하고 axios로 정보저장
    };

    return (
        <div className='diaryFormCover'>
            <div className='emotionsCover'>
                <p>빈자리</p>
            </div>
            <div className='formCover'>
                <h2>회원가입</h2>
                <form action='/write' method='post' id='form' >
                    <div className='formButtonsCover'>
                        <div className='buttonCancel' onClick={onCancel}>취소</div>
                        <div className='buttonSave' onClick={onCreate}>저장</div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AccountForm;