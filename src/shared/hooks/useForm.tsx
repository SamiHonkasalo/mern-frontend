import { useCallback, useReducer } from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';

const SET_DATA = 'SET_DATA';

interface InputStatus {
  value: string;
  isValid: boolean;
}

interface InputsState {
  [key: string]: InputStatus | undefined;
}

interface FormState {
  inputs: {
    [key: string]: InputStatus | undefined;
  };
  isValid: boolean;
}

interface ChangeAction {
  type: typeof INPUT_CHANGE;
  isValid: boolean;
  inputId: string;
  value: string;
}

interface SetAction {
  type: typeof SET_DATA;
  inputs: InputsState;
  formIsValid: boolean;
}

type FormActions = ChangeAction | SetAction;

const formReducer = (state: FormState, action: FormActions): FormState => {
  switch (action.type) {
    case INPUT_CHANGE: {
      let formIsValid = true;
      Object.keys(state.inputs).forEach((inputId) => {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid &&
            typeof state.inputs[inputId]?.isValid !== 'undefined';
        }
      });

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }

    case SET_DATA: {
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    }

    default:
      return state;
  }
};

const useForm = (
  initialInputs: InputsState,
  initialFormValidity: boolean
): [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (inputData: InputsState, formValidity: boolean) => void
] => {
  const initialState = {
    inputs: initialInputs,
    isValid: initialFormValidity,
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({ type: INPUT_CHANGE, isValid, inputId: id, value });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: InputsState, formValidity: boolean) => {
      dispatch({
        type: SET_DATA,
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, handleInputChange, setFormData];
};

export default useForm;
