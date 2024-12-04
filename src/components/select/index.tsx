import Select, {
  components,
  GroupBase,
  Props,
  DropdownIndicatorProps,
  PlaceholderProps,
} from 'react-select';

import './index.css';

export type Option = {
  value: string;
  label: string;
};

const DropdownIndicator = ({
  ...props
}: DropdownIndicatorProps<Option, false, GroupBase<Option>>) => {
  return (
    <components.DropdownIndicator
      {...props}
      className="flex aspect-square h-4 w-full items-center lg:h-5 3xl:h-6"
    >
      <img
        src="/icons/chevron.svg"
        alt="chevron-left"
        className="h-6 w-auto -rotate-90 lg:h-5"
      />
    </components.DropdownIndicator>
  );
};

const Placeholder = ({
  children,
  ...props
}: PlaceholderProps<Option, false, GroupBase<Option>>) => {
  return (
    <components.Placeholder {...props}>
      <p className="text-ellipsis">{children}</p>
    </components.Placeholder>
  );
};

const CustomSelect = ({
  options,
  onChange,
  isDisabled: disabled,
  ...props
}: Props<Option, false, GroupBase<Option>>) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      unstyled
      classNamePrefix="react-select"
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="react-select__container"
      menuPlacement="auto"
      isDisabled={disabled}
      isClearable
      styles={{
        control: (baseStyle, { isFocused }) => ({
          ...baseStyle,
          outline: isFocused ? '2px auto #4285F4' : 'unset',
          boxSizing: 'content-box',
        }),
        indicatorsContainer: (baseStyle, { isDisabled }) => ({
          ...baseStyle,
          display: isDisabled ? 'none' : baseStyle.display,
        }),
      }}
      classNames={{
        container: () =>
          `flex flex-1 w-full rounded border ${
            disabled ? 'bg-[rgba(239,239,239,0.3)]' : ''
          }`,
        control: () =>
          'flex flex-1 rounded items-center justify-center text-base font-medium p-3',
        placeholder: () => 'h-full text-gray-400 text-base',
        menu: () => 'rounded border border-[#CCC] p-2.5 my-2 bg-white',
        valueContainer: () => 'flex flex-1',
        option: () =>
          'text-base font-normal hover:bg-[#F1F1F1] cursor-pointer p-2.5 rounded',
      }}
      components={{ DropdownIndicator, Placeholder }}
      {...props}
    />
  );
};

export default CustomSelect;
