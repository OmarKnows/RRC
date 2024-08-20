import type { IconType } from "react-icons/lib";
import { ControlProps, components } from "react-select";
import React from "react";

interface SelectControlProps extends ControlProps<unknown, false> {
  startIcon?: IconType;
}

export default function SelectControl({
  children,
  startIcon,
  ...props
}: SelectControlProps) {
  const StartIcon = startIcon as React.ElementType;

  return (
    <components.Control {...props}>
      {startIcon && <StartIcon className="z-10 ms-md h-6 w-6" />} {children}
    </components.Control>
  );
}
