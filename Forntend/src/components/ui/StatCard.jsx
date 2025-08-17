import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatMiniChart = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const colorMap = {
    blue: '#3B82F6',
    orange: '#F97316',
    green: '#10B981',
    purple: '#8B5CF6'
  };

  return (
    <div className="flex items-end gap-0.5 h-8 w-12">
      {data.map((value, index) => {
        const height = range === 0 ? 4 : ((value - min) / range) * 24 + 4;
        return (
          <div
            key={index}
            className="flex-1 rounded-sm"
            style={{
              height: `${height}px`,
              backgroundColor: colorMap[color],
              opacity: 0.8
            }}
          />
        );
      })}
    </div>
  );
};

const StatCard = ({ title, value, change, trend, color, chartData }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <StatMiniChart data={chartData} color={color} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
