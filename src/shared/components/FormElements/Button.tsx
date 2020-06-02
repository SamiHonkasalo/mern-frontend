import React from 'react';
import { NavLink } from 'react-router-dom';

import './Button.css';

interface Props {
    href?: string;
    to?: string;
    children: React.ReactNode;
    inverse?: boolean;
    danger?: boolean;
    exact?: boolean;
    size?: string;
    type?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];
    disabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<Props> = (props: Props) => {
    if (props.href) {
        return (
            <a
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${
                    props.danger && 'button--danger'
                }`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <NavLink
                to={props.to}
                exact
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${
                    props.danger && 'button--danger'
                }`}
            >
                {props.children}
            </NavLink>
        );
    }
    return (
        <button
            className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${
                props.danger && 'button--danger'
            }`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
