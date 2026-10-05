import { ArrowLeft } from 'lucide-react';

interface Props {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'Back' }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-[#7A7970] hover:text-[#141412] transition-colors mb-6"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
