import React from 'react';
import { Users, FileText, Activity, MessageCircle, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: Users, label: '注册用户', value: '2,451', change: '+12%' },
    { icon: FileText, label: '健康档案', value: '1,834', change: '+8%' },
    { icon: Activity, label: '今日问诊', value: '245', change: '+15%' },
    { icon: MessageCircle, label: '待回复咨询', value: '48', change: '-5%' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <stat.icon size={24} className="text-emerald-600" />
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">健康趋势分析</h2>
            <TrendingUp className="text-emerald-600" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">健康数据趋势图表</p>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">健康预警</h2>
            <AlertCircle className="text-emerald-600" />
          </div>
          <div className="space-y-4">
            {[
              { title: '血压异常提醒', time: '10分钟前', severity: 'high' },
              { title: '运动量不足提醒', time: '2小时前', severity: 'medium' },
              { title: '睡眠质量预警', time: '5小时前', severity: 'low' },
            ].map((alert) => (
              <div
                key={alert.title}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm text-gray-500">{alert.time}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    alert.severity === 'high'
                      ? 'bg-red-100 text-red-700'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {alert.severity === 'high' ? '紧急' : alert.severity === 'medium' ? '中等' : '低危'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;