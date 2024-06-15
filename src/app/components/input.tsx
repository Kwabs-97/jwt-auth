import React from "react";
interface InputProps {
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLElement>) => void;
  className: string;
  placeholder: string;
}

function Input({ type, value, onChange, className, placeholder }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      className={`${className} `}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
