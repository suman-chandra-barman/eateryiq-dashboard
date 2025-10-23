/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";

interface HelpSupportCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
}

const HelpSupportCard: React.FC<HelpSupportCardProps> = ({
  title,
  value,
  icon: Icon,
  iconBgColor,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${iconBgColor}`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {/* Value */}
        <p className="text-gray-600 text-base">{value}</p>
      </div>
    </div>
  );
};

export default HelpSupportCard;
