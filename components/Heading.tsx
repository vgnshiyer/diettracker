import React from 'react'

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h1 className={`text-2xl font-bold text-primary ${className}`}>
      {children}
    </h1>
  )
}

export default Heading
