import { useState, useEffect } from "react"

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'emailError':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
                default:
                    break;
            }
        }

        return () => {
            for (const validation in validations) {
                switch (validation) {
                    case 'minLength':
                        value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                        break;
                    case 'isEmpty':
                        value ? setEmpty(false) : setEmpty(true)
                        break;
                    case 'emailError':
                        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                        break;
                    default:
                        break;
                }
            }
        }

        // eslint-disable-next-line
    }, [value])

    useEffect(() => {
        if(isEmpty || minLengthError || emailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

        return () => {
            if(isEmpty || minLengthError || emailError) {
                setInputValid(false)
            } else {
                setInputValid(true)
            }
        }
    }, [isEmpty, minLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid
    }

}

export default useValidation