import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

interface ActionProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    faIcon?: IconDefinition;
};

const Action = ({ children, onClick, className, faIcon }: ActionProps) => {
  return (
    <button
        onClick={onClick}
        className={`text-black font-semibold px-4 py-2 mt-4 ${className}`}
    >
        {children}
        {faIcon && <FontAwesomeIcon icon={faIcon} className="ml-2" />}
    </button>
  )
}

export default Action
