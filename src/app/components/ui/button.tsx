import React, { ReactNode } from "react";
interface ButtonProps {
  className: string;
  children: ReactNode;
}
function Button({ className, children }: ButtonProps) {
  return (
    <button
      className={`${className} w-full p-3 rounded-md text-white bg-gray-700`}
    >
      {children}
    </button>
  );
}

export default Button;
