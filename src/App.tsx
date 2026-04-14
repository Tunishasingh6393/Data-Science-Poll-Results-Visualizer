import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  Star, 
  TrendingUp, 
  Download, 
  Filter, 
  RefreshCcw,
  Sparkles,
  Search
} from 'lucide-react';
import { mockResponses } from './data/mockData';
import { StatCard } from './components/StatCard';
import { PollCharts } from './components/PollCharts';
import { FeedbackList } from './components/FeedbackList';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [data, setData] = useState(mockResponses);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalVotes = data.length;
    const avgSatisfaction = data.reduce((acc, curr) => acc + curr.satisfaction, 0) / totalVotes;
    
    const toolCounts = data.reduce((acc, curr) => {
      acc[curr.preferredTool] = (acc[curr.preferredTool] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topTool = Object.entries(toolCounts).sort((a, b) => (b[1] as number) - (a[1] as number))[0][0];

    return {
      totalVotes,
      avgSatisfaction: avgSatisfaction.toFixed(1),
      topTool,
      participationRate: "94%" // Simulated
    };
  }, [data]);

  const handleRefresh = () => {
    setIsGenerating(true);
    // Simulate data refresh
    setTimeout(() => {
      setData([...mockResponses].sort(() => Math.random() - 0.5));
      setIsGenerating(false);
    }, 800);
  };

  const generateAiInsights = async () => {
    setIsGenerating(true);
    // In a real app, you'd call the Gemini API here
    // For this demo, we'll simulate a professional insight
    setTimeout(() => {
      setAiInsight(
        `Based on the current data, ${stats.topTool} is the dominant tool with high user retention. ` +
        `However, there's a noticeable satisfaction gap in the ${data[0].region} region. ` +
        `Recommendation: Focus on improving onboarding for younger demographics (18-24) to increase long-term adoption.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BarChart3 className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">PollVis <span className="text-indigo-600">Pro</span></h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              disabled={isGenerating}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCcw size={18} className={isGenerating ? "animate-spin" : ""} />
            </button>
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Download size={16} /> Export
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
              New Poll
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Survey Overview</h2>
            <p className="text-slate-500 text-sm mt-1">Analyzing 150 responses from the Q1 2024 Developer Tool Survey.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search responses..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Responses" 
            value={stats.totalVotes} 
            icon={<Users size={20} />} 
            trend={{ value: 12, isUp: true }}
            description="vs. previous month"
          />
          <StatCard 
            title="Avg. Satisfaction" 
            value={stats.avgSatisfaction} 
            icon={<Star size={20} />} 
            trend={{ value: 0.4, isUp: true }}
            description="Out of 5.0 scale"
          />
          <StatCard 
            title="Top Tool" 
            value={stats.topTool} 
            icon={<TrendingUp size={20} />} 
            description="Most preferred by users"
          />
          <StatCard 
            title="Participation" 
            value={stats.participationRate} 
            icon={<BarChart3 size={20} />} 
            description="Target completion rate"
          />
        </div>

        {/* AI Insights Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-indigo-200" />
                  <h3 className="font-bold text-lg">AI Smart Insights</h3>
                </div>
                {!aiInsight && (
                  <button 
                    onClick={generateAiInsights}
                    disabled={isGenerating}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    {isGenerating ? "Analyzing..." : "Generate Analysis"}
                  </button>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {aiInsight ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <p className="text-indigo-50 leading-relaxed">
                      {aiInsight}
                    </p>
                    <button 
                      onClick={() => setAiInsight(null)}
                      className="text-xs text-indigo-200 mt-3 hover:text-white transition-colors"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                ) : (
                  <p className="text-indigo-100 text-sm">
                    Let AI analyze your poll data to find hidden patterns, regional trends, and sentiment correlations.
                  </p>
                )}
              </AnimatePresence>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -left-8 -top-8 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <PollCharts data={data} />
          </div>
          <div className="xl:col-span-1">
            <FeedbackList data={data} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            &copy; 2024 PollVis Pro Analytics. All rights reserved. Built for Industry-Grade Survey Analysis.
          </p>
        </div>
      </footer>
    </div>
  );
}
