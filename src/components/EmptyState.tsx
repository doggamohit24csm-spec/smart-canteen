interface Props {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, action, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {icon && <div className="text-[#C8C6BC] mb-6">{icon}</div>}
      <h3 className="font-display text-2xl text-[#141412] mb-2">{title}</h3>
      <p className="text-[#7A7970] text-sm max-w-xs leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 bg-[#141412] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#2A6B43] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
