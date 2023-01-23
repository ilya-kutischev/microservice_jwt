import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <div>
            <select
                value={value}
                onChange={event => onChange(event.target.value)}
            >
                <option disabled value="">{defaultValue}</option>
                {options.map( el => <option key={el.value} value={el.value}>{el.name}</option>)}
            </select>
        </div>
    );
};

export default MySelect;