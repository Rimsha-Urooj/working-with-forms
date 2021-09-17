import  { useState, useReducer } from 'react';

const initialInputState = {
    value: '',
    isTouched: false
};

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT'){
        return {
            value: action.value,
            isTouched: state.isTouched,
        };
    }
    if (action.type === 'BLUR'){
        return {
            isTouched: true,
            value: state.value,
        };
    }
    if (action.type === 'RESET'){
        return {
            isTouched: false,
            value: '',
        };
    }
    return inputStateReducer;
};

function useInput(validateValue) {

    // with useReducer
    const [inputState, dispatch ] = useReducer(inputStateReducer, initialInputState);

    // with useState
    // const [enteredValue, setEnteredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    // with useReducer
    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    // with useState
    // const valueIsValid = validateValue(enteredValue);
    // const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        // with useReducer
        dispatch({
            type: 'INPUT',
            value: event.target.value,
        });
        // with useState
        // setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event) => {
        // with useReducer
        dispatch({
            type: 'BLUR'
        });

        // with useState
        // setIsTouched(true);
    }

    const reset = () => {
        // with useReducer
        dispatch({
            type: 'RESET'
        });

        // with useState
        // setEnteredValue('');
        // setIsTouched(false);
    };

    return {

        // with useReducer
        value: inputState.value, 
        isValid: valueIsValid,
        hasError, 
        valueChangeHandler, 
        inputBlurHandler,
        reset,

        // with useState
        // value: enteredValue, 
        // isValid: valueIsValid,
        // hasError, 
        // valueChangeHandler, 
        // inputBlurHandler,
        // reset,
    };
};

export default useInput;
