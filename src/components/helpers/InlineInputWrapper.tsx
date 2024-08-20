import { cn } from "@/lib/utils";

type Props = {
  disabled?: boolean;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  label?: string;
  optional?: string;
  error?: string;
};

const InlineInputWrapper = ({
  label,
  optional,
  required,
  className,
  disabled,
  children,
  error,
}: Props): React.ReactElement => {
  return (
    <div
      className={cn(
        "relative",
        "transition-all",
        "group mb-xs flex w-full flex-col items-start gap-1 rounded-none p-0",
        {
          "pointer-events-none [&>*]:!text-disabled": disabled,
        },
        className
      )}
    >
      {!!label && (
        <label className="flex w-full flex-row items-end justify-between self-stretch whitespace-nowrap text-sm font-bold text-gray-700">
          <span className="capitalize">
            {label}
            {required && <span className="ms-2 text-danger-heavy">*</span>}
          </span>
          <span className="text-xs font-regular text-gray-500">{optional}</span>
        </label>
      )}
      <div className="relative w-full">{children}</div>
      {!!error && !disabled ? (
        <span
          role="alert"
          aria-live="assertive"
          className="line-clamp-2 inline-block overflow-hidden text-ellipsis text-xs font-medium leading-3 text-danger-heavy"
        >
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default InlineInputWrapper;
