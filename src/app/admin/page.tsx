import React, { useEffect, useState } from 'react';

const AdminPage: React.FC = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats-updates');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    // Получаем статистику сразу при загрузке
    fetchStats();

    // Обновляем статистику каждые 30 секунд
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default AdminPage; 