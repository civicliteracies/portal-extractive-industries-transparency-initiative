import { CheckIcon } from "@heroicons/react/20/solid";
import { useSearchState } from "../dataset/search/SearchContext";
import { useRef } from "react";

type MultiCheckboxProps = {
  name: string;
  value: string;
  label: string;
  count?: number;
};

export const MultiCheckbox = ({
  name,
  value,
  label,
  count,
}: MultiCheckboxProps) => {
  const inputRef = useRef();
  const { setOptions, options: searchOptions } = useSearchState();

  const searchOptionsField = searchOptions[name] as Array<string>;
  const active = searchOptionsField?.includes(value);

  const select = () => {
    const searchOptionsValue = [...searchOptionsField];
    const indexOfNewValue = searchOptionsValue.findIndex((v) => v == value);

    if (indexOfNewValue >= 0) {
      searchOptionsValue.splice(indexOfNewValue, 1);
    } else {
      searchOptionsValue.push(value);
    }

    setOptions({ [name]: searchOptionsValue, offset: 0 });
  };

  return (
    <div className="flex items-center mb-[10px]">
      <input
        type="checkbox"
        id={`${name}-${value}`}
        checked={active}
        onChange={select}
        className="hidden"
        ref={inputRef}
      />
      <label
        htmlFor={`${name}-${value}`}
        tabIndex={0}
        className={`h-4 w-4 min-w-[1rem] flex items-center justify-center rounded-[3px] border-[1.5px] cursor-pointer ${
          active
            ? "bg-accent border-accent text-white"
            : "bg-white border-eiti-borderinput"
        } transition-colors`}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            select();
          }
        }}
      >
        {active && <CheckIcon width={12} />}
        <span className="sr-only">{label}</span>
      </label>
      <span
        onClick={select}
        className={`ml-3 cursor-pointer flex gap-1 w-full text-sm ${
          active ? "font-bold text-accent" : "text-eiti-ink"
        }`}
      >
        {label}
        {count && (
          <span className="ml-auto text-xs font-medium text-eiti-muted tabular-nums self-center">
            {count}
          </span>
        )}
      </span>
    </div>
  );
};

export default MultiCheckbox;
