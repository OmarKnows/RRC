import { DOMAttributes, forwardRef, MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";
import InlineInputWrapper from "../helpers/InlineInputWrapper";
import { IconType } from "react-icons";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  placeholder?: string;
  type?: string;
  optional?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  size?: "super" | "lg" | "md" | "sm";
  startIcon?: IconType;
  endIcon?: IconType;
  onEndIconClick?: DOMAttributes<HTMLButtonElement>["onClick"];
}

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(
  {
    label,
    optional,
    error,
    disabled,
    type = "text",
    size = "md",
    placeholder,
    required,
    startIcon: StartIcon,
    endIcon: EndIcon,
    onEndIconClick,
    className,
    ...props
  }: IInputProps,
  ref
): React.ReactElement {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = (): void => setShowPassword((p) => !p);
  const handleEndIconClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (type === "password") handleTogglePassword();
    onEndIconClick?.(e);
  };

  const CurrentEndIcon = isPassword
    ? showPassword
      ? HiEye
      : HiEyeSlash
    : EndIcon;

  return (
    <InlineInputWrapper
      label={label}
      error={error}
      required={required}
      disabled={disabled}
      optional={optional}
      className={className}
    >
      <input
        ref={ref}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={label}
        aria-required={required}
        aria-invalid={!!error}
        autoComplete="off"
        className={cn(
          "peer",
          "border-0 !border-none outline-none outline-0 ring-0",
          "flex w-full items-center gap-2 self-stretch rounded-sm bg-primary/10 p-4 font-medium ring-1 ring-gray-200",
          "transition-all duration-200 ease-in-out",
          "text-base",
          "disabled:bg-gray-100",
          "focus:ring-2 focus:ring-primary ",
          { "ps-12": !!StartIcon, "pe-12": !!CurrentEndIcon },
          {
            "h-14": size === "super",
            "h-12": size === "lg",
            "h-11": size === "md",
            "h-[2.375rem]": size === "sm",
          }
        )}
        {...props}
      />
      {StartIcon && (
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-primary">
          {StartIcon && <StartIcon className="z-10 h-5 w-5" />}
        </div>
      )}
      {CurrentEndIcon &&
        (onEndIconClick || isPassword ? (
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full text-primary hover:text-primary/90 peer-placeholder-shown:text-primary"
            onClick={handleEndIconClick}
          >
            {CurrentEndIcon && <CurrentEndIcon className="z-10 h-5 w-5 " />}
          </button>
        ) : (
          <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 ">
            {CurrentEndIcon && <CurrentEndIcon className="z-10 h-5 w-5 " />}
          </div>
        ))}
    </InlineInputWrapper>
  );
});

export default Input;
