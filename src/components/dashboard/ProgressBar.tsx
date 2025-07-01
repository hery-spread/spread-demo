interface ProgressBarProps {
  label: string;
  current: number;
  total: number | 'unlimited';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  showPercentage?: boolean;
}

export default function ProgressBar({
  label,
  current,
  total,
  color = 'purple',
  showPercentage = true,
}: ProgressBarProps) {
  const isUnlimited = total === 'unlimited';
  const percentage = isUnlimited ? 0 : Math.round((current / total) * 100);

  const getColorClass = () => {
    if (isUnlimited) return 'bg-green-500';
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    return `bg-${color}-500`;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          {isUnlimited ? `${current} (illimité)` : `${current}/${total}`}
          {showPercentage && !isUnlimited && ` (${percentage}%)`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColorClass()}`}
          style={{
            width: isUnlimited ? '100%' : `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
