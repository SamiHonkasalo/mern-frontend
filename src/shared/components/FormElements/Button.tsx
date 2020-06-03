import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.css';

interface Props {
  href?: string;
  to?: string;
  children: React.ReactNode;
  inverse?: boolean;
  danger?: boolean;
  isExact?: boolean;
  size?: string;
  buttonType?: 'submit' | 'button';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  href,
  to,
  children,
  inverse,
  danger,
  isExact,
  size,
  buttonType,
  onClick,
  disabled,
}: Props) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <NavLink
        to={to}
        exact={isExact}
        className={`button button--${size || 'default'} ${
          inverse && 'button--inverse'
        } ${danger && 'button--danger'}`}
      >
        {children}
      </NavLink>
    );
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`button button--${size || 'default'} ${
        inverse && 'button--inverse'
      } ${danger && 'button--danger'}`}
      onClick={onClick}
      disabled={disabled}
      type={buttonType}
    >
      {children}
    </button>
  );
};

export default Button;
