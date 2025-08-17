import React from 'react';
import StatCard from '../components/ui/StatCard';
import { statsData } from '../data/stats';

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome back, Julie 👋
        </h1>
        <p className="text-gray-600">
          Here's what you need to focus on today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            color={stat.color}
            chartData={stat.chartData}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
