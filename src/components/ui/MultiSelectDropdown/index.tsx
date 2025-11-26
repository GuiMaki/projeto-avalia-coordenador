'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { Icon } from '@/components/ui';
import CheckBox from '@/components/ui/CheckBox';
import { IDiscipline } from '@/interfaces/disciplines';
import colors from '@/theme/colors';

type MultiSelectDropdownProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: IDiscipline[];
  placeholder?: string;
  label?: string;
};

const MultiSelectDropdown = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder = 'Selecione',
  label,
}: MultiSelectDropdownProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedValues = (value as number[]) || [];

  const handleToggle = (optionValue: number) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    onChange(newValues);
  };

  const selectedLabels = options
    .filter(opt => selectedValues.includes(opt.id))
    .map(opt => opt.name);

  const displayText =
    selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder;

  return (
    <div className="w-full flex-col gap-2">
      {label && (
        <label className="text-xl text-[#454545]" htmlFor={name}>
          {label}
        </label>
      )}

      <div ref={dropdownRef} className="relative w-full">
        <button
          className="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2 text-left shadow-sm hover:border-gray-400 focus:outline-none"
          style={{
            borderColor: error
              ? colors.alert.error.primary
              : colors.neutral[40],
            color:
              selectedLabels.length > 0
                ? colors.neutral[60]
                : colors.neutral[40],
          }}
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className="truncate text-lg">{displayText}</span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <Icon color={colors.neutral[80]} name="ChevronIcon" size={24} />
          </motion.div>
        </button>

        {isOpen && (
          <ul className="absolute left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {options.map(option => (
              <li
                key={option.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                <CheckBox
                  isSelected={selectedValues.includes(option.id)}
                  label={option.name}
                  onClick={() => handleToggle(option.id)}
                />
              </li>
            ))}
          </ul>
        )}

        {error?.message && (
          <span className="text-alert-error text-[16px] text-red-500">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
