interface Props {
  title: string;
  icon: string;
  trail?: string;
}

const SectionHeader = ({ title, icon, trail }: Props) => (
  <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-6">
    <span className="material-symbols-outlined text-base text-primary leading-none">
      {icon}
    </span>
    <h2 className="font-mono text-[11px] font-medium text-on-surface uppercase tracking-widest flex-1">
      {title}
    </h2>
    {trail && (
      <span className="font-mono text-[11px] text-outline">{trail}</span>
    )}
  </div>
);

export default SectionHeader;
