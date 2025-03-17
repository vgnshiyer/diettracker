import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  faIcon?: IconDefinition;
}

const SecondaryButton = ({ children, onClick, className, faIcon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-black font-semibold px-4 py-2 mt-4 rounded-md ${className} hover:bg-gray-200`}
    >
      {children}
      {faIcon && <FontAwesomeIcon icon={faIcon} className="ml-2" />}
    </button>
  )
}

export default SecondaryButton;
