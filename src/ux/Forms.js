import React from 'react'

export const InputGroup = ({
    id,
    type,
    label,
    placeholder,
    value,
    error,
    errorMsg,
    onChange,
    srOnly=true}) => {
    if (label && !placeholder)
        placeholder = label
    return (
        <div className='form-group'>
            <label
                htmlFor={id}
                className={ srOnly ? 'sr-only' : null }>
                {label}
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

export const TextAreaGroup = ({
    id,
    label,
    placeholder,
    value,
    error,
    errorMsg,
    onChange,
    srOnly=true}) => {
    if (label && !placeholder)
        placeholder = label
    return (
        <div className='form-group'>
            <label
                htmlFor={id}
                className={ srOnly ? 'sr-only' : null }>
                {label}
            </label>
            <textarea
                id={id}
                placeholder={placeholder}
                className={ error || errorMsg ? 'error' : null }
                value={value}
                onChange={onChange} />
            { errorMsg ? <p className='help-block error'>{errorMsg}</p> : null }
        </div>
    )
}