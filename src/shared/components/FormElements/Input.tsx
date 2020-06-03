import React, { ChangeEvent, useReducer, useEffect } from 'react';

import './Input.css';
import { validate, CustomValidator } from '../../util/validators';

const CHANGE = 'CHANGE';
const TOUCH = 'TOUCH';

interface Props {
  label: string;
  id: string;
  element?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  rows?: number;
  errorText?: string;
  validators: CustomValidator[];
  initialValue?: string;
  initialValidity?: boolean;
  onInput: (id: string, val: string, valid: boolean) => void;
}

interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

interface ChangeAction {
  type: typeof CHANGE;
  val: string;
  validators: CustomValidator[];
}

interface TouchAction {
  type: typeof TOUCH;
}

type InputActions = ChangeAction | TouchAction;

const inputReducer = (state: InputState, action: InputActions): InputState => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case TOUCH:
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const Input: React.FC<Props> = ({
  id,
  label,
  type,
  validators,
  onInput,
  element,
  errorText,
  placeholder,
  rows,
  initialValue,
  initialValidity,
}: Props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValidity || false,
    isTouched: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: CHANGE,
      val: event.target.value,
      validators,
    });
  };

  const handleTouch = () => {
    dispatch({ type: TOUCH });
  };

  const el =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleTouch}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={handleChange}
        onBlur={handleTouch}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {el}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
