import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle size={16} className="text-[#2A6B43]" />,
    error: <XCircle size={16} className="text-[#B04040]" />,
    info: <Info size={16} className="text-[#7A7970]" />,
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-[#141412] text-white text-sm px-4 py-3 rounded-xl shadow-lg max-w-sm">
        {icons[toast.type]}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
