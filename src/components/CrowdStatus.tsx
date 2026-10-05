import { Clock, Users, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CrowdBadge from './CrowdBadge';

interface Props {
  compact?: boolean;
}

export default function CrowdStatus({ compact = false }: Props) {
  const { canteenStatus, navigate } = useApp();
  const { level, waitTime, peopleWaiting, activeOrders } = canteenStatus;

  if (compact) {
    return (
      <button
        onClick={() => navigate('crowd-details')}
        className="w-full text-left rounded-xl border border-[#E2E0D8] bg-white p-4 hover:border-[#2A6B43]/30 transition-colors group"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#7A7970] uppercase tracking-widest">Canteen</span>
          <ChevronRight size={14} className="text-[#7A7970] group-hover:text-[#2A6B43] transition-colors" />
        </div>
        <div className="flex items-center gap-3">
          <CrowdBadge level={level} size="md" />
          <div className="flex items-center gap-1 text-[#7A7970]">
            <Clock size={13} />
            <span className="text-sm">{waitTime} min wait</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E0D8] bg-white p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-medium text-[#7A7970] uppercase tracking-widest mb-1">Current crowd</p>
          <CrowdBadge level={level} size="lg" />
        </div>
        <button
          onClick={() => navigate('crowd-details')}
          className="text-xs text-[#2A6B43] font-medium hover:underline flex items-center gap-1"
        >
          Details <ChevronRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-[#7A7970] mb-1 flex items-center gap-1">
            <Clock size={11} /> Wait
          </p>
          <p className="font-mono text-xl font-medium text-[#141412]">{waitTime}</p>
          <p className="text-xs text-[#7A7970]">min</p>
        </div>
        <div>
          <p className="text-xs text-[#7A7970] mb-1 flex items-center gap-1">
            <Users size={11} /> Waiting
          </p>
          <p className="font-mono text-xl font-medium text-[#141412]">{peopleWaiting}</p>
          <p className="text-xs text-[#7A7970]">people</p>
        </div>
        <div>
          <p className="text-xs text-[#7A7970] mb-1">Orders</p>
          <p className="font-mono text-xl font-medium text-[#141412]">{activeOrders}</p>
          <p className="text-xs text-[#7A7970]">active</p>
        </div>
      </div>

      <p className="text-xs text-[#7A7970]">Based on current orders and queue activity.</p>
    </div>
  );
}
