import React from 'react';
import { PollResponse } from '../types';
import { Star, MapPin, User } from 'lucide-react';

interface FeedbackListProps {
  data: PollResponse[];
}

export function FeedbackList({ data }: FeedbackListProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-bottom border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Recent Feedback</h3>
      </div>
      <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
        {data.slice(0, 10).map((item) => (
          <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                  {item.preferredTool[0]}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{item.preferredTool} User</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {item.ageGroup}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {item.region}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold">{item.satisfaction}</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "{item.feedback}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
