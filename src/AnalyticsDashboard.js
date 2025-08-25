// src/AnalyticsDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AnalyticsDashboard.css'; // เราจะสร้างไฟล์ CSS นี้ในขั้นตอนถัดไป

// Data for stats cards
const statsData = [
  { icon: 'fas fa-chart-line', label: 'ยอดขายรวม', value: '฿113,400', change: '+12.5%', changeType: 'increase' },
  { icon: 'fas fa-star', label: 'สินค้าขายดีที่สุด', value: 'Game Figures', change: '3,600 / เดือน', changeType: 'increase' },
  { icon: 'fas fa-users', label: 'ลูกค้าใหม่', value: '82', change: '+5.8%', changeType: 'increase' },
  { icon: 'fas fa-chart-pie', label: 'อัตราการเติบโต', value: '8.7%', change: 'เทียบกับไตรมาสก่อน', changeType: 'increase' },
];

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState({ cpu: 15.4, memory: 35.2, speed: 127 });

  // Simulate initial AI processing
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // แสดงหน้า loading 2.5 วินาที
    return () => clearTimeout(timer);
  }, []);

  // Simulate live performance updates
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setPerformance({
          cpu: (Math.random() * 20 + 10).toFixed(1),
          memory: (Math.random() * 30 + 30).toFixed(1),
          speed: Math.floor(Math.random() * 50 + 100),
        });
      }, 2000); // อัปเดตทุก 2 วินาที
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2 className="loading-text">AI is analyzing data...</h2>
      <p className="loading-subtext">โปรดรอสักครู่ ระบบกำลังประมวลผลข้อมูลล่าสุด</p>
    </div>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="dashboard-container">
      {/* Performance Monitor - เอฟเฟกต์ AI สด */}
      <div className="performance-monitor">
        <div><strong>AI Status:</strong> <span className="status-online">●</span> Online</div>
        <div><strong>CPU:</strong> {performance.cpu}%</div>
        <div><strong>Memory:</strong> {performance.memory}%</div>
        <div><strong>Latency:</strong> {performance.speed}ms</div>
      </div>

      <header className="dashboard-header">
        <h1>AI Analytics Dashboard</h1>
        <p>ข้อมูลเชิงลึกแบบเรียลไทม์เพื่อขับเคลื่อนธุรกิจของคุณ</p>
      </header>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="card-header">
              <i className={stat.icon}></i>
              <span>{stat.label}</span>
            </div>
            <h2>{stat.value}</h2>
            <p className={`change ${stat.changeType}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts & Table Section */}
      <div className="charts-grid">
        <div className="chart-card large">
          <h3>Total Sales by Category</h3>
          <img src="/graph.png" alt="Total Sales by Category Chart" />
        </div>
        <div className="chart-card large">
          <h3>Monthly Sales Report</h3>
          <img src="/table.png" alt="Monthly Sales Table" />
        </div>
      </div>
      
      {/* AI Insights Section */}
      <div className="ai-insights-card">
        <h3><i className="fas fa-brain"></i> AI Insights & Recommendations</h3>
        <ul>
          <li><span className="insight-highlight">Game Figures</span> เป็นหมวดหมู่ที่ทำกำไรสูงสุด ควรโปรโมทเพิ่มเติมเพื่อเพิ่มยอดขาย</li>
          <li>ยอดขายมีแนวโน้มคงที่ตลอดทั้งปี แนะนำให้จัดโปรโมชันลดราคาในช่วงกลางปีเพื่อกระตุ้นยอดขาย</li>
          <li><span className="insight-highlight">Superhero Figure</span> มียอดขายน้อยที่สุด อาจพิจารณาทำโปรโมชันร่วมกับสินค้าหมวดอื่น</li>
        </ul>
      </div>

      <div className="back-to-home">
        <Link to="/mainpage" className="btn-back">
          <i className="fas fa-arrow-left"></i> กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;