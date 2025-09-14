// src/AnalyticsDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// นำเข้า Components จาก Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './AnalyticsDashboard.css';

// Data for stats cards
const statsData = [
  { icon: 'fas fa-chart-line', label: 'ยอดขายรวม', value: '฿113,400', change: '+12.5%', changeType: 'increase' },
  { icon: 'fas fa-star', label: 'สินค้าขายดีที่สุด', value: 'Game Figures', change: '3,600 / เดือน', changeType: 'increase' },
  { icon: 'fas fa-users', label: 'ลูกค้าใหม่', value: '82', change: '+5.8%', changeType: 'increase' },
  { icon: 'fas fa-chart-pie', label: 'อัตราการเติบโต', value: '8.7%', change: 'เทียบกับไตรมาสก่อน', changeType: 'increase' },
];

// Sample data for the charts
const salesByCategoryData = [
  { name: 'Anime Figure', sales: 24000 },
  { name: 'Game Figures', sales: 43200 },
  { name: 'Gundam Figure', sales: 36000 },
  { name: 'Superhero Figure', sales: 10200 },
];

const monthlySalesData = [
  { month: 'ม.ค.', sales: 15000, orders: 85 },
  { month: 'ก.พ.', sales: 17000, orders: 90 },
  { month: 'มี.ค.', sales: 20000, orders: 110 },
  { month: 'เม.ย.', sales: 22000, orders: 125 },
  { month: 'พ.ค.', sales: 25000, orders: 140 },
  { month: 'มิ.ย.', sales: 23000, orders: 130 },
];

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState({ cpu: 15.4, memory: 35.2, speed: 127 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setPerformance({
          cpu: (Math.random() * 20 + 10).toFixed(1),
          memory: (Math.random() * 30 + 30).toFixed(1),
          speed: Math.floor(Math.random() * 50 + 100),
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

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

      <div className="charts-grid">
        <div className="chart-card large">
          <h3>Total Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip 
                contentStyle={{ background: '#333', border: 'none' }} 
                labelStyle={{ color: '#fff' }} 
              />
              <Legend />
              <Bar dataKey="sales" fill="#00aaff" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card large">
          <h3>Monthly Sales Report</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip 
                contentStyle={{ background: '#333', border: 'none' }} 
                labelStyle={{ color: '#fff' }} 
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#aa55ff" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="orders" stroke="#28a745" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="ai-insights-card">
        <h3><i className="fas fa-brain"></i> AI Insights & Recommendations</h3>
        <ul>
          <li><span className="insight-highlight">Game Figures</span> เป็นหมวดหมู่ที่ทำกำไรสูงสุด ควรโปรโมทเพิ่มเติมเพื่อเพิ่มยอดขาย</li>
          <li>ยอดขายมีแนวโน้มคงที่ตลอดทั้งปี แสดงถึงความมั่นคงของตลาด</li>
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