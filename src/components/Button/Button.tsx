import React, { type ComponentProps, type PropsWithChildren } from "react";
import "./Button.css";

type AllButtonProps = ComponentProps<"button">;

interface ButtonProps extends AllButtonProps {
  classModifierName?: string;
  isSelected: boolean;
  isDisabled: boolean;
  action: () => void;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  classModifierName,
  isSelected,
  isDisabled,
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
      type="button"
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
