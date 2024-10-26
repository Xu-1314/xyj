import React from 'react';
import { Menu, User, FileText, Activity, MessageCircle, BookOpen, Settings } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { icon: User, label: '用户中心', href: '#profile' },
    { icon: FileText, label: '健康档案', href: '#records' },
    { icon: Activity, label: '健康数据', href: '#data' },
    { icon: MessageCircle, label: '在线咨询', href: '#consult' },
    { icon: BookOpen, label: '健康教育', href: '#education' },
    { icon: Settings, label: '系统管理', href: '#admin' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold">中医药健康管理系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">欢迎, 张医生</span>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=40&h=40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } lg:block fixed lg:relative lg:w-64 bg-white shadow-lg h-screen z-50`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <item.icon size={20} className="text-emerald-600" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;