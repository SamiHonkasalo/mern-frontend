import React, { useCallback, useReducer } from 'react';

import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';

const INPUT_CHANGE = 'INPUT_CHANGE';

interface Props {}

interface InputStatus {
    value: string;
    isValid: boolean;
}

interface FormState {
    inputs: {
        [key: string]: InputStatus;
    };
    isValid: boolean;
}

interface ChangeAction {
    type: typeof INPUT_CHANGE;
    isValid: boolean;
    inputId: string;
    value: string;
}

type FormActions = ChangeAction;

const formReducer = (state: FormState, action: FormActions): FormState => {
    switch (action.type) {
        case INPUT_CHANGE:
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (state.inputs.hasOwnProperty(inputId)) {
                    if (inputId === action.inputId) {
                        formIsValid = formIsValid && action.isValid;
                    } else {
                        formIsValid = formIsValid && state.inputs[inputId].isValid;
                    }
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid },
                },
                isValid: formIsValid,
            };

        default:
            return state;
    }
};

const NewPlace: React.FC<Props> = ({}: Props) => {
    const initialState = {
        inputs: {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            address: {
                value: '',
                isValid: false,
            },
        },
        isValid: false,
    };
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const handleInputChange = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({ type: INPUT_CHANGE, isValid, inputId: id, value });
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Send to backend
        console.log(formState);
    };

    return (
        <form className="place-form" onSubmit={handleSubmit}>
            <Input
                element="input"
                type="text"
                label="Title"
                errorText="Enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                id="title"
                onInput={handleInputChange}
            />
            <Input
                element="textarea"
                label="Description"
                errorText="Enter a valid description (at least 5 characters)"
                validators={[VALIDATOR_MINLENGTH(5)]}
                id="description"
                onInput={handleInputChange}
            />
            <Input
                element="input"
                type="text"
                label="Title"
                errorText="Enter a valid address"
                validators={[VALIDATOR_REQUIRE()]}
                id="address"
                onInput={handleInputChange}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
