import React from "react";
interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  className: string;
}

function Input({ type, className, placeholder, name }: InputProps) {
  return (
    <input
      type={type}
      className={`${className} py-2  `}
      placeholder={placeholder}
      name={name}
    />
  );
}

export default Input;
