import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [performanceData, setPerformanceData] = useState({ cpu: 0, memory: 0, speed: 0 });

  const chartData = [
    { name: '🎌 Anime Figure', value: 2000, color: '#F44336' },
    { name: '🎮 Game Figures', value: 3600, color: '#FFC107' },
    { name: '🤖 Gundam Figure', value: 3000, color: '#2196F3' },
    { name: '🦸 Superhero Figure', value: 850, color: '#4CAF50' }
  ];

  const months = [
    '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
    '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
  ];

  const aiVoiceMessages = [
    "🤖 AI: กำลังวิเคราะห์แนวโน้มตลาด...",
    "📊 AI: ตรวจพบการเติบโตในหมวด Game Figures",
    "💡 AI: แนะนำเพิ่มการตลาดหมวด Superhero",
    "🎯 AI: ยอดขายมีเสียรภาพสูง แนวโน้มดี",
    "🔮 AI: คาดการณ์ยอดขายเดือนหน้าเพิ่มขึ้น 8%"
  ];

  // AI Processing Animation
  useEffect(() => {
    const steps = [1, 2, 3, 4];
    let stepIndex = 0;
    
    const stepTimer = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        setCurrentStep(steps[++stepIndex]);
      } else {
        clearInterval(stepTimer);
        setTimeout(() => {
          setIsLoading(false);
          initializeDashboard();
        }, 500);
      }
    }, 1000);

    return () => clearInterval(stepTimer);
  }, []);

  const initializeDashboard = () => {
    // Show chart
    setTimeout(() => setShowChart(true), 1000);
    
    // Show table
    setTimeout(() => {
      setShowTable(true);
      loadTableData();
    }, 2000);
    
    // Show insights
    setTimeout(() => setShowInsights(true), 3000);
    
    // Start sparkles
    setTimeout(() => startSparkles(), 4000);
    
    // Start AI messages
    setTimeout(() => {
      showAIMessage();
      setInterval(() => {
        if (Math.random() < 0.3) showAIMessage();
      }, 8000);
    }, 5000);
    
    // Update performance
    updatePerformance();
    setInterval(updatePerformance, 2000);
  };

  const loadTableData = () => {
    const data = [];
    months.forEach((month, index) => {
      setTimeout(() => {
        data.push({
          month,
          anime: '2,000.00',
          game: '3,600.00',
          gundam: '3,000.00',
          superhero: '850.00',
          total: '9,450.00'
        });
        setTableData([...data]);
      }, index * 100);
    });
  };

  const startSparkles = () => {
    setInterval(() => {
      if (Math.random() < 0.3) {
        const newSparkle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          emoji: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]
        };
        setSparkles(prev => [...prev, newSparkle]);
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 3000);
      }
    }, 500);
  };

  const showAIMessage = () => {
    const message = {
      id: Date.now(),
      text: aiVoiceMessages[Math.floor(Math.random() * aiVoiceMessages.length)]
    };
    setAiMessages(prev => [...prev, message]);
    
    setTimeout(() => {
      setAiMessages(prev => prev.filter(m => m.id !== message.id));
    }, 3000);
  };

  const updatePerformance = () => {
    setPerformanceData({
      cpu: (Math.random() * 30 + 10).toFixed(1),
      memory: (Math.random() * 40 + 30).toFixed(1),
      speed: (Math.random() * 50 + 100).toFixed(0)
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      showAIMessage();
      setRefreshing(false);
    }, 1500);
  };

  const handleStatCardClick = (e) => {
    // Create explosion effect
    const rect = e.currentTarget.getBoundingClientRect();
    const explosions = [];
    
    for (let i = 0; i < 10; i++) {
      explosions.push({
        id: Date.now() + i,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        emoji: ['🎉', '✨', '🎊', '💫'][Math.floor(Math.random() * 4)]
      });
    }
    
    // Add temporary explosion state if needed
    setTimeout(() => {}, 800);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-green-500 rounded-full relative mx-auto mb-5 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center text-3xl animate-spin">
              🧠
            </div>
          </div>
          <div className="text-green-500 text-lg mb-2">AI กำลังวิเคราะห์ข้อมูล...</div>
          <div className="text-gray-400 text-sm">
            {currentStep === 1 && "🔍 กำลังสแกนข้อมูลยอดขาย..."}
            {currentStep === 2 && "📊 กำลังสร้างกราฟวิเคราะห์..."}
            {currentStep === 3 && "🤖 กำลังประมวลผล AI Insights..."}
            {currentStep === 4 && "✅ เสร็จสิ้น! กำลังแสดงผล..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white overflow-hidden">
      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-10 animate-bounce"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: 'sparkleFloat 3s ease-out forwards'
          }}
        >
          {sparkle.emoji}
        </div>
      ))}

      {/* AI Messages */}
      {aiMessages.map(message => (
        <div
          key={message.id}
          className="fixed bottom-5 right-5 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-full text-sm font-bold z-50 shadow-lg border-2 border-white border-opacity-20 animate-pulse"
        >
          {message.text}
        </div>
      ))}

      {/* Performance Monitor */}
      <div className="fixed top-5 left-5 bg-black bg-opacity-70 text-green-500 px-4 py-3 rounded-lg text-xs font-mono z-50 border border-green-500">
        <div>🖥️ CPU: {performanceData.cpu}% | 💾 RAM: {performanceData.memory}% | ⚡ {performanceData.speed}ms</div>
        <div>🤖 AI Status: <span className="text-green-500">●</span> Online</div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="fixed top-24 right-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-full text-sm font-bold z-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        {refreshing ? '⏳ กำลังอัพเดท...' : '🔄 รีเฟรชข้อมูล AI'}
      </button>

      {/* Floating AI Assistant */}
      <button
        onClick={showAIMessage}
        className="fixed bottom-20 right-5 w-15 h-15 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-3xl cursor-pointer z-50 shadow-lg hover:shadow-xl animate-bounce border-4 border-white border-opacity-30"
      >
        🤖
      </button>

      {/* Navigation */}
      <nav className="bg-white bg-opacity-10 backdrop-blur-md px-8 py-4 sticky top-0 z-40 border-b border-white border-opacity-20">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🧸 ToyLand
          </div>
          <ul className="flex gap-8">
            <li><a href="mainpage.js" className="hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full transition-all">หน้าแรก</a></li>
            <li><a href="new.js" className="hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full transition-all">สินค้าใหม่</a></li>
            <li><a href="popular.js" className="hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full transition-all">สินค้ายอดนิยม</a></li>
            <li><span className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-full shadow-lg">AI Analytics</span></li>
            <li><a href="contact.js" className="hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full transition-all">ติดต่อเรา</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 rounded-full text-sm mb-4 animate-pulse shadow-lg">
            🤖 AI-Powered Analytics
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            ระบบวิเคราะห์ยอดขาย
          </h1>
          <p className="text-xl text-white text-opacity-80 mb-8">
            ข้อมูลเชิงลึกจาก AI เพื่อการตัดสินใจทางธุรกิจ
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { icon: '🎯', title: 'ยอดขายรวม', value: '113,400', change: '+12% จากเดือนที่แล้ว' },
            { icon: '🏆', title: 'สินค้าขายดี #1', value: 'Game Figures', change: '3,600 ต่อเดือน' },
            { icon: '📈', title: 'อัตราการเติบโต', value: '8.7%', change: 'เพิ่มขึ้นจากปีที่แล้ว' },
            { icon: '💰', title: 'กำไรเฉลี่ย', value: '9,450', change: 'บาท/เดือน' }
          ].map((stat, index) => (
            <div
              key={index}
              onClick={handleStatCardClick}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
              style={{ 
                animation: `slideInUp 0.8s ease forwards`,
                animationDelay: `${0.2 + index * 0.2}s`,
                opacity: 0,
                transform: 'translateY(50px)'
              }}
            >
              <span className="text-4xl block mb-4">{stat.icon}</span>
              <div className="text-sm text-white text-opacity-70 mb-2">{stat.title}</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-green-400 mt-2">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        {showChart && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 relative">
              📊 การวิเคราะห์ยอดขายตามหมวดหมู่
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-3 rounded"></div>
            </h2>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 relative overflow-hidden">
              <h3 className="text-xl font-bold text-center mb-6 text-yellow-400">
                🤖 AI Analysis: ยอดขายแต่ละหมวดหมู่
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '10px',
                      color: '#ffffff'
                    }} 
                  />
                  <Bar dataKey="value" fill="#4CAF50" radius={[5, 5, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Bar key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Table Section */}
        {showTable && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 relative">
              📋 รายงานยอดขายรายเดือน
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-3 rounded"></div>
            </h2>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 overflow-x-auto">
              <h3 className="text-xl font-bold text-center mb-6 text-yellow-400">
                💡 AI Prediction: แนวโน้มยอดขายปี 2025
              </h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-green-500 to-green-600">
                    <th className="p-4 text-center font-bold text-sm uppercase tracking-wider border-b border-white border-opacity-20">เดือน/ปี</th>
                    <th className="p-4 text-center font-bold text-sm uppercase tracking-wider border-b border-white border-opacity-20">🎌 Anime Figure</th>
                    <th className="p-4 text-center font-bold text-sm uppercase tracking-wider border-b border-white border-opacity-20">🎮 Game Figures</th>
                    <th className="p-4 text-center font-bold text-sm uppercase tracking-wider border-b border-white border-opacity-20">🤖 Gundam Figure</th>
                    <th className="p-4 text-center font-bold text-sm uppercase tracking-wider border-b border-white border-opacity-20">🦸 Superhero Figure</th>
                    <th className="p-4 text-center font-bold text-sm uppercase tracking-wider border-b border-white border-opacity-20">💰 ยอดรวม</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                      style={{
                        animation: `fadeInLeft 0.5s ease forwards`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <td className="p-4 text-center font-mono font-bold border-b border-white border-opacity-10">{row.month}</td>
                      <td className="p-4 text-center font-mono font-bold border-b border-white border-opacity-10">{row.anime}</td>
                      <td className="p-4 text-center font-mono font-bold border-b border-white border-opacity-10">{row.game}</td>
                      <td className="p-4 text-center font-mono font-bold border-b border-white border-opacity-10">{row.gundam}</td>
                      <td className="p-4 text-center font-mono font-bold border-b border-white border-opacity-10">{row.superhero}</td>
                      <td className="p-4 text-center font-mono font-bold border-b border-white border-opacity-10">{row.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-500 bg-opacity-20 border-2 border-green-500">
                    <td className="p-4 text-center font-bold">รวมทั้งปี</td>
                    <td className="p-4 text-center font-bold">24,000.00</td>
                    <td className="p-4 text-center font-bold">43,200.00</td>
                    <td className="p-4 text-center font-bold">36,000.00</td>
                    <td className="p-4 text-center font-bold">10,200.00</td>
                    <td className="p-4 text-center font-bold text-yellow-400">113,400.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Insights */}
        {showInsights && (
          <div className="bg-gradient-to-r from-green-500 from-opacity-20 to-green-600 to-opacity-20 rounded-2xl p-8 border border-green-500 border-opacity-30 relative">
            <div className="absolute -top-3 right-8 text-3xl animate-bounce">🧠</div>
            <h3 className="text-xl font-bold mb-4 text-green-400">🧠 AI Insights & Recommendations</h3>
            <ul className="space-y-3">
              {[
                'Game Figures เป็นสินค้าขายดีอันดับ 1 ด้วยยอดขาย 3,600 บาท/เดือน แนะนำให้เพิ่มสต็อก',
                'Gundam Figure มียอดขายสถิร 3,000 บาท/เดือน เหมาะสำหรับลูกค้าคอเลคเตอร์',
                'Anime Figure มีศักยภาพเติบโต แนะนำการตลาดเพิ่มเติม',
                'Superhero Figure ยอดขายต่ำสุด แต่มีโอกาสเติบโตจากหนังฮีโร่ที่กำลังมา',
                'ช่วงเวลา ยอดขายคงที่ตลอดปี แสดงถึงความมั่นคงของตลาด'
              ].map((insight, index) => (
                <li 
                  key={index} 
                  className="border-l-4 border-green-500 pl-4 py-2 bg-white bg-opacity-5 rounded-r-lg"
                >
                  <strong>{insight.split(' ')[0]} {insight.split(' ')[1]}</strong> {insight.split(' ').slice(2).join(' ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes sparkleFloat {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(-10px) rotate(45deg) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-100px) rotate(315deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-120px) rotate(360deg) scale(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AIAnalytics;