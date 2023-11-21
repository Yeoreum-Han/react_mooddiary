import './LoadingSpinner.css';
import Spinner from '../assets/loadingSpinner.gif';

const LoadingSpinner = () => {
    return(
        <div className='loadingSpinnerCover'>
            <img src={Spinner} alt='스피너이미지'/>
        </div>
    );
};
export default LoadingSpinner;