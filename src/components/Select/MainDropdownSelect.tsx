import { Icon } from "iconsax-react";
import React, { Fragment, useCallback, useState } from "react";
import { HiOutlineChevronUp } from "react-icons/hi2";
import Select, {
  components,
  StylesConfig,
  Props as SelectProps,
} from "react-select";
import SelectControl from "./SelectControl";
import { cn } from "@/lib/utils";
import InlineInputWrapper from "../helpers/InlineInputWrapper";
import { EPALETTE } from "@/color-palette";

interface IMainDropDownSelect<OptionType = any, IsMulti extends boolean = false>
  extends SelectProps<OptionType, IsMulti> {
  label?: string;
  optional?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  size?: "super" | "large" | "medium" | "small";
  startIcon?: Icon;
  endIcon?: Icon;
}

export default function MainDropDownSelect({
  label = "",
  optional,
  required,
  error,
  size = "super",
  className,
  startIcon,
  endIcon,
  disabled,
  ...props
}: Readonly<IMainDropDownSelect>): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const EndIcon = endIcon;

  const Control = useCallback(
    (props: any) => <SelectControl startIcon={startIcon} {...props} />,
    [startIcon]
  );

  const ValueContainer = useCallback(
    (props: any): React.ReactElement => (
      <Fragment>
        <components.ValueContainer {...props} />
        {EndIcon && <EndIcon className="z-10 me-md h-5 w-5" />}
      </Fragment>
    ),
    [endIcon]
  );

  //use this to change border color when focused
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused
        ? `0 0 0 2px ${EPALETTE.PRIMARY}`
        : provided.boxShadow,
      borderColor: state.isFocused ? EPALETTE.PRIMARY : provided.borderColor,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? EPALETTE.PRIMARY // Background color when the option is selected
        : state.isFocused
        ? EPALETTE.SECONDARY // Background color when the option is focused
        : "#fff", // Default background color
      color: state.isSelected
        ? "#fff" // Text color when the option is selected
        : "#000", // Default text color
      cursor: "pointer",
    }),
  };

  return (
    <InlineInputWrapper
      label={label}
      error={error}
      required={required}
      disabled={disabled}
      optional={optional}
      className={className}
    >
      <Select
        placeholder=""
        styles={customStyles}
        isSearchable={false}
        onMenuClose={() => setIsOpen(false)}
        onMenuOpen={() => setIsOpen(true)}
        classNames={{
          container(props): string {
            return cn(
              "w-full z-10 grow-0 ",
              "group flex w-full flex-col items-start gap-1 !rounded-sm p-0",
              {
                "z-20": isOpen,
              }
            );
          },
          control(props): string {
            return cn(
              "peer",
              "border-0 !border-none outline-none outline-0 ring-0", //reset
              "flex w-full items-center gap-2 self-stretch !rounded-[inherit] bg-primary font-medium ring-1 ring-gray-200",
              "transition-all duration-300 ease-in-out",
              "text-base text-primary placeholder-shown:text-primary",
              "disabled:bg-surface-disabled",
              "focus:ring-2 focus:ring-primary group-hover:bg-primary/10 group-hover:placeholder-shown:text-primary", // Updated line
              {
                "h-14": size === "super",
                "h-12": size === "large",
                "h-11": size === "medium",
                "h-10": size === "small",
              }
            );
          },

          valueContainer() {
            return cn(
              "overflow-y-auto max-h-full focus:ring-2 focus:ring-primary"
            );
          },
          multiValue(props) {
            return cn("max-w-[40%]");
          },
          dropdownIndicator({ selectProps }) {
            return cn(
              "[&_svg]:transition-all [&_svg]:duration-300 [&_svg]:ease-in-out",
              {
                "[&_svg]:-rotate-180": selectProps.menuIsOpen,
              }
            );
          },
          placeholder() {
            return cn({
              "!text-sm": size === "small",
            });
          },
        }}
        components={{
          DownChevron: HiOutlineChevronUp,
          Control,
          ValueContainer,
        }}
        {...props}
      />
    </InlineInputWrapper>
  );
}
