import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const token = localStorage.getItem('access_token');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastLogin, setLastLogin] = useState(null);
  const [tip, setTip] = useState('');
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [showScroll, setShowScroll] = useState(false);

  const tips = [
    'Stay hydrated throughout the day.',
    'Take short breaks to stay focused.',
    'Set achievable goals for today.',
    'Keep a positive mindset!',
    'Plan your tasks the night before.',
    'Remember to smile :)',
    'Try a new hobby this week!',
  ];

  const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];

  function getGreeting(hour) {
    if (hour < 12) return { text: 'Good morning', emoji: '☀️' };
    if (hour < 18) return { text: 'Good afternoon', emoji: '🌤️' };
    return { text: 'Good evening', emoji: '🌙' };
  }

  async function fetchActiveUsers() {
    if (!token) return;
    try {
      const res = await fetch('https://vdart-proj-r05z.onrender.com', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActiveUsers(await res.json());
      } else {
        setActiveUsers([]);
      }
    } catch (err) {
      console.error('Error fetching active users:', err);
      setActiveUsers([]);
    }
  }

  useEffect(() => {
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setLastLogin(payload.last_login || null);
    } catch {
      setLastLogin(null);
    }

    const hour = new Date().getHours();
    const greet = getGreeting(hour);
    setGreeting(greet.text);
    setEmoji(greet.emoji);
    setTip(getRandomTip());
    fetchActiveUsers();

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [token]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setShowScroll(scrollPosition > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const snowWhiteText = { color: '#333333', textShadow: 'none' };

  const graphData = [
    { day: 'Mon', users: 12 },
    { day: 'Tue', users: 15 },
    { day: 'Wed', users: 10 },
    { day: 'Thu', users: 18 },
    { day: 'Fri', users: 20 },
    { day: 'Sat', users: 8 },
    { day: 'Sun', users: 14 },
  ];

  const MENU_BAR_HEIGHT = 60; // adjust to your actual menu bar height

  return (
    <>
      {/* Scrollable container */}
      <div
        className="scroll-container"
        style={{
          padding: '3rem',
          fontFamily: 'Segoe UI, sans-serif',
          textAlign: 'center',
          maxWidth: 1400,
          margin: 'auto',
          height: `calc(100vh - ${MENU_BAR_HEIGHT}px)`, // full screen minus menu bar
          overflowY: 'auto',
          border: '1px solid #444',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', ...snowWhiteText }}>
          {greeting} {emoji}, welcome to your Dashboard!
        </h1>

        {lastLogin && (
          <p style={{ marginTop: '0.5rem', ...snowWhiteText }}>
            Your last login was on{' '}
            <strong>{new Date(lastLogin).toLocaleString()}</strong>
          </p>
        )}

        <div
          style={{
            margin: '2rem auto',
            fontSize: '3rem',
            fontFamily: 'monospace',
            animation: 'pulse 1s infinite alternate',
            ...snowWhiteText,
          }}
        >
          {currentTime.toLocaleTimeString()}
        </div>

        {/* Graph Section */}
        <h2 style={{ marginTop: '2rem', ...snowWhiteText }}>
          Active Users Last 7 Days
        </h2>
        <div style={{ width: '100%', height: 300, margin: 'auto' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={graphData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="day" stroke="#FFFAFA" />
              <YAxis stroke="#FFFAFA" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#222',
                  borderRadius: '5px',
                  color: '#fff',
                }}
                itemStyle={{ color: '#FFFAFA' }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#1976d2"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active Users Card Table */}
        <h2 style={{ marginTop: '2rem', ...snowWhiteText }}>Active Users</h2>
        {activeUsers.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            {activeUsers.map((u) => (
              <div
                key={u.id}
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '10px',
                  padding: '1rem',
                  width: '250px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  textAlign: 'left',
                }}
              >
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>👤 {u.username}</h4>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Last Login:
                  <br />
                  <strong>{new Date(u.last_login).toLocaleString()}</strong>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={snowWhiteText}>No active users found.</p>
        )}

        {/* Tip Section */}
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            marginTop: '2rem',
            ...snowWhiteText,
          }}
        >
          Tip of the moment:
        </p>
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: 'auto',
            ...snowWhiteText,
          }}
        >
          "{tip}"
        </p>
        <button
          onClick={() => setTip(getRandomTip())}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
          }}
        >
          Show another tip
        </button>
      </div>

      {/* Scroll To Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: '#1976d2',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '50%',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            zIndex: 1000,
            userSelect: 'none',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Scroll to top"
          title="Scroll to top"
          type="button"
        >
          ↑
        </button>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.7; transform: scale(1.05); }
        }

        /* Scrollbar styles on scroll-container */
        .scroll-container::-webkit-scrollbar {
          width: 10px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: #222;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background-color: #1976d2;
          border-radius: 10px;
          border: 2px solid #222;
        }

        /* Firefox scrollbar */
        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #1976d2 #222;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
