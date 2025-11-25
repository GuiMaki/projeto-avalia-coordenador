import colors from '@/theme/colors';

import Icon, { TIcon } from '../../Icon';

export type NavBarItemProps = {
  selected?: boolean;
  icon: TIcon;
  label: string;
  onPress?: () => void;
  fill?: string;
};

const NavBarIcon = ({
  icon,
  label,
  selected,
  onPress,
  fill,
}: NavBarItemProps) => {
  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl p-2 hover:bg-neutral-300"
      onClick={onPress}
    >
      <Icon
        color={selected ? colors.primary[100] : colors.neutral[60]}
        fill={fill}
        name={icon}
        size={24}
      />

      <span
        className="text-neutral-70 text-sm"
        style={{ color: selected ? colors.primary[100] : colors.neutral[60] }}
      >
        {label}
      </span>
    </div>
  );
};

export default NavBarIcon;
