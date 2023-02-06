import React, {useEffect} from 'react';
import classes from './/YesNoBox.module.css'
const YesNoBox = ({visible, setVisible}) => {

    const rootClasses = [classes.yesNo]
    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className='closeBtn'>
                <button>X</button>
            </div>
            <div className='yesNoBtns'>
                <button>Yes</button>
                <button>No</button>
            </div>

        </div>
    );
};

export default YesNoBox;