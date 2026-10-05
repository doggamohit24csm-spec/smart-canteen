import type { CrowdLevel } from '../types';

interface Props {
  level: CrowdLevel;
  size?: 'sm' | 'md' | 'lg';
}

const config: Record<CrowdLevel, { label: string; dot: string; text: string; bg: string }> = {
  LOW: { label: 'LOW', dot: '#2A6B43', text: '#2A6B43', bg: '#EBF5EF' },
  MODERATE: { label: 'MODERATE', dot: '#B87A0A', text: '#B87A0A', bg: '#FEF7E6' },
  HIGH: { label: 'HIGH', dot: '#B04040', text: '#B04040', bg: '#FDF2F2' },
  'VERY HIGH': { label: 'VERY HIGH', dot: '#8B2020', text: '#8B2020', bg: '#FDF2F2' },
};

export default function CrowdBadge({ level, size = 'md' }: Props) {
  const c = config[level];
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };
  const dotSizes = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-2.5 h-2.5' };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-full ${sizes[size]}`}
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      <span
        className={`${dotSizes[size]} rounded-full flex-shrink-0 animate-pulse-gentle`}
        style={{ backgroundColor: c.dot }}
      />
      {c.label}
    </span>
  );
}
