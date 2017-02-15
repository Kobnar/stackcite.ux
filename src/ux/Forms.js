import React from 'react'

export const InputGroup = ({id, type, placeholder, value, error, errorMsg, onChange}) => {
    return (
        <div className='form-group'>
            <label
                htmlFor={id}
                className='sr-only'>
                Email
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={ error || errorMsg ? 'error' : null }
                value={value}
                onChange={onChange}/>
            { errorMsg ? <p className='help-block error'>{errorMsg}</p> : null }
        </div>
    )
}