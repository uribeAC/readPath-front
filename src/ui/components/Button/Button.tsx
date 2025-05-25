import React, { type ComponentProps, type PropsWithChildren } from "react";
import "./Button.css";

type AllButtonProps = ComponentProps<"button">;

interface ButtonProps extends AllButtonProps {
  classModifierName?: string;
  isSelected: boolean;
  isDisabled: boolean;
  buttonType?: "button" | "submit";
  action: () => void;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  classModifierName,
  isSelected,
  isDisabled,
  buttonType = "button",
  action,
  children,
  ...buttonProps
}) => {
  const stateClassModifier = isSelected ? " button--selected" : "";
  const classModifier = classModifierName
    ? ` button--${classModifierName}`
    : "";
  const disabledClass = isDisabled ? " button--disabled" : "";

  return (
    <button
      type={buttonType}
      className={`button${stateClassModifier}${classModifier}${disabledClass}`}
      onClick={action}
      disabled={isDisabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
