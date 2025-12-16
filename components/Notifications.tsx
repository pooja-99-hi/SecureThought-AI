import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Threat, Severity } from '../types';

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  threats: Threat[];
}

type NotificationItem = 
  | { id: string; type: 'system'; title: string; time: string; status: string }
  | { id: string; type: 'threat'; title: string; time: string; severity: Severity };

export const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose, threats }) => {
  if (!isOpen) return null;

  // Generate some mock system notifications mixed with threats
  const notifications: NotificationItem[] = [
    {
      id: 'sys-1',
      type: 'system',
      title: 'Encryption Keys Rotated',
      time: 'Just now',
      status: 'success'
    },
    ...threats.slice(0, 4).map(t => ({
      id: t.id,
      type: 'threat' as const,
      title: `Threat Detected: ${t.type}`,
      time: '2 mins ago',
      severity: t.severity
    })),
    {
      id: 'sys-2',
      type: 'system',
      title: 'Database Backup Complete',
      time: '1 hour ago',
      status: 'info'
    }
  ];

  return (
    <div className="absolute top-16 right-4 w-96 z-50 animate-fade-in-up">
      <div className="glass-panel rounded-xl shadow-2xl overflow-hidden border border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyber-primary" />
            <span className="font-bold text-white text-sm">Notifications</span>
            <span className="px-1.5 py-0.5 rounded-full bg-cyber-primary/20 text-cyber-primary text-[10px] font-mono">
              {notifications.length} NEW
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex gap-3">
                <div className="mt-1">
                  {notif.type === 'system' ? (
                    notif.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-500" />
                    )
                  ) : (
                    <AlertTriangle className={`w-5 h-5 ${
                      notif.severity === 'Critical' ? 'text-red-500' : 'text-orange-500'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-200 font-medium group-hover:text-cyber-primary transition-colors">
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
                {notif.type === 'threat' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-primary mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-black/40 text-center border-t border-white/10">
          <button className="text-xs text-gray-400 hover:text-white transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};