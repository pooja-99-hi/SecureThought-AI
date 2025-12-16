import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, Network, BarChart2, Terminal, Lock, Menu, X, Bell, History, LogOut, BookOpen } from 'lucide-react';
import { cyborgService } from '../services/cyborgdb';
import { Login } from './Login';
import { Onboarding } from './Onboarding';
import { Notifications } from './Notifications';
import { User, Threat } from '../types';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1 group ${
          isActive
            ? 'bg-cyber-primary/10 text-cyber-primary border-l-2 border-cyber-primary'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon className="w-5 h-5 group-hover:text-cyber-primary transition-colors" />
      <span className="font-medium tracking-wide">{label}</span>
    </NavLink>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [threats, setThreats] = useState<Threat[]>([]);
  const location = useLocation();

  useEffect(() => {
    setUser(cyborgService.getCurrentUser());
    
    // Subscribe to threat stream for notifications
    cyborgService.streamThreats((threat) => {
      setThreats(prev => [threat, ...prev].slice(0, 10));
    });
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setShowOnboarding(true); // Show onboarding after login
  };

  const handleLogout = () => {
    cyborgService.logout();
    setUser(null);
    setShowOnboarding(false);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-cyber-black text-gray-200 flex flex-col md:flex-row overflow-hidden font-sans selection:bg-cyber-primary/30">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-cyber-dark/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-cyber-primary animate-pulse-slow" />
          <span className="font-bold text-lg tracking-wider text-white">SECURE<span className="text-cyber-primary">THOUGHT</span></span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-cyber-dark/95 border-r border-white/5 backdrop-blur-xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3 mb-6 hidden md:flex">
            <div className="relative">
              <Shield className="w-8 h-8 text-cyber-primary" />
              <div className="absolute inset-0 bg-cyber-primary blur-lg opacity-40 animate-pulse-slow"></div>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-wider text-white">SECURE<span className="text-cyber-primary">THOUGHT</span></h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] ml-0.5">Powered by CyborgDB</p>
            </div>
          </div>

          <div className="px-6 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
               <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full bg-cyber-primary" />
               <div className="overflow-hidden">
                 <p className="text-sm font-bold text-white truncate">{user.username}</p>
                 <p className="text-[10px] text-cyber-secondary uppercase">Level {user.clearanceLevel} Access</p>
               </div>
            </div>
          </div>

          <nav className="flex-1 px-3 space-y-1">
            <SidebarItem to="/" icon={LayoutDashboard} label="Mission Control" />
            <SidebarItem to="/get-started" icon={BookOpen} label="Guide & Features" />
            <SidebarItem to="/search" icon={Search} label="Threat Hunter" />
            <SidebarItem to="/architecture" icon={Network} label="Security Architecture" />
            <SidebarItem to="/analytics" icon={BarChart2} label="Analytics & Audit" />
            <SidebarItem to="/history" icon={History} label="My History" />
            <SidebarItem to="/api" icon={Terminal} label="API Playground" />
          </nav>

          <div className="p-4 mt-auto border-t border-white/5 space-y-4">
            <div className="glass-panel p-3 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse"></div>
              <div>
                <p className="text-xs text-gray-400">System Status</p>
                <p className="text-sm font-semibold text-cyber-primary">Encrypted & Secure</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-colors text-xs font-bold uppercase">
               <LogOut className="w-4 h-4" /> Disconnect
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-cyber-black/80 backdrop-blur-md flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white capitalize">
              {location.pathname === '/' ? 'Mission Control' : location.pathname.substring(1).replace('-', ' ')}
            </h2>
            {location.pathname === '/search' && (
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/30">
                AES-256 ENFORCED
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-6 relative">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <Lock className="w-3 h-3 text-green-400" />
              <span className="text-xs font-mono text-green-400">ENCRYPTION ACTIVE</span>
            </div>
            
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative transition-colors ${showNotifications ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-cyber-danger rounded-full animate-pulse"></span>
            </button>
            
            <Notifications 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
              threats={threats} 
            />
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-primary to-cyber-secondary border border-white/20"></div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative">
           {/* Background Grid Effect */}
           <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
               style={{ 
                 backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
               }}>
           </div>
           
           <div className="relative z-10 max-w-7xl mx-auto w-full">
             {children}
           </div>
        </div>
      </main>
    </div>
  );
};
