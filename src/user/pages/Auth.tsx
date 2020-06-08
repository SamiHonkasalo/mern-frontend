import React, { useState, useContext } from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import useForm from '../../shared/hooks/useForm';
import AuthContext from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import useHttpClient from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const { error, loading, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const data = await sendRequest({
          url: 'http://localhost:3001/api/users/login',
          method: 'POST',
          body: JSON.stringify({
            email: formState.inputs.email?.value,
            password: formState.inputs.password?.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        auth.login(data?.user?.id);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    } else {
      try {
        const data = await sendRequest({
          url: 'http://localhost:3001/api/users/signup',
          method: 'POST',
          body: JSON.stringify({
            name: formState.inputs.name?.value,
            email: formState.inputs.email?.value,
            password: formState.inputs.password?.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        auth.login(data?.user?.id);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  };

  const handleSwitch = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        typeof formState.inputs.email !== 'undefined' &&
          typeof formState.inputs.password !== 'undefined' &&
          formState.inputs.email?.isValid &&
          formState.inputs.password?.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {loading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              errorText="Invalid image"
              onInput={inputHandler}
              center
              id="image"
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText="Enter a valid email"
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
            errorText="Enter a valid password, atleast 6 characters"
          />
          <Button buttonType="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse buttonType="button" onClick={handleSwitch}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
