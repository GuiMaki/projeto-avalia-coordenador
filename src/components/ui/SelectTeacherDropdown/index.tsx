'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { Icon } from '@/components/ui';
import { ITeacher } from '@/interfaces/teachers';
import colors from '@/theme/colors';

type DropdownFormProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: ITeacher[];
  placeholder?: string;
};

export const DropdownFormTeacher = <T extends FieldValues>({
  label,
  name,
  control,
  options,
  placeholder = 'Selecione',
}: DropdownFormProps<T>) => {
  const {
    field: { value, onChange },
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

  const handleSelect = (option: ITeacher) => {
    onChange(option.user.id);
    setIsOpen(false);
  };

  const selectedOption = options.find(o => o.user.id === value);

  return (
    <div ref={dropdownRef} className="relative w-full flex-col">
      {/* LABEL IGUAL DO INPUT */}
      {label && (
        <label className="my-2 block text-xl text-[#454545]" htmlFor={name}>
          {label}
        </label>
      )}

      <button
        className="text-neutral-60 flex w-full items-center justify-between rounded-lg border border-[#D0D0D0] bg-white p-2 px-4 py-2 text-left text-lg shadow-sm hover:border-gray-400 focus:outline-none"
        id={name} // pra conectar o label com o botão
        style={{ paddingRight: 44 }}
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Icon color={colors.neutral[80]} name="ChevronIcon" size={24} />
        </motion.div>
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map(option => (
            <li
              key={option.id}
              className="text-neutral-60 cursor-pointer px-4 py-2 text-lg hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
