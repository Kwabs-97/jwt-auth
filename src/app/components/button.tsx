import React, { ReactNode } from "react";
interface ButtonProps {
  className: string;
  children: ReactNode;
}
function Button({ className, children }: ButtonProps) {
  return <button className={`${className}`}>{children}</button>;
}

export default Button;
