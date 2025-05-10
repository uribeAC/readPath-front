import React, { type ComponentProps } from "react";
import "./Button.css";

type AllButtonProps = ComponentProps<"button">;

interface ButtonProps extends AllButtonProps {
  classModifierName?: string;
  isSelected: boolean;
  action: () => void;
}

const Button: React.FC<ButtonProps> = ({
  classModifierName,
  isSelected,
  action,
  ...buttonProps
}) => {
  const stateClassModifier = isSelected ? " button--selected" : "";
  const classModifier = classModifierName
    ? ` button--${classModifierName}`
    : "";

  return (
    <button
      type="button"
      className={`button${stateClassModifier}${classModifier}`}
      onClick={action}
      {...buttonProps}
    ></button>
  );
};

export default Button;
