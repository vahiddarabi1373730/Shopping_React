export interface ValueLabelProps {
  value: string;
  label: string;
}
export function ValueLabel({ value, label }: ValueLabelProps) {
  return (
    <div className="flex justify-between">
      <span className="text-base font-semibold text-(--gray-400)">{label}</span>
      <span className="text-base font-semibold text-(--gray-400)">{value}</span>
    </div>
  );
}
