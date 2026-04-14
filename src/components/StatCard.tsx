import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, description, trend, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {description && (
          <p className="text-xs text-slate-400 mt-2">{description}</p>
        )}
      </div>
    </motion.div>
  );
}
