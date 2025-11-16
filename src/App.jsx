import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import SignupSuccess from './pages/SignupSuccess'
import Login from './pages/Login'
import LoginSuccess from './pages/LoginSuccess'
import AuthProvider from "./context/AuthContext.jsx";
import { useAuth } from "./hooks/useAuth";



function App() {
  // state(상태)를 정의하고 초기화한다.
  //const [count, setCount] = useState(0); // count라는 이름의 state를 정의하고 초기값을 0으로 설정한다.

// 상태 정의하기
// const [상태이름, 상태값을 변경하는 함수] = useState(초기값)
function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header 영역 */}
      <header style={{ 
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f5f5f5',
        padding: '1rem 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* GNB 메뉴 */}
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <button 
              onClick={() => navigate('/')} 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#333'
              }}
            >
              Home
            </button>
            <button 
              onClick={() => {}} 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#333'
              }}
            >
              Product
            </button>
            <button 
              onClick={() => {}} 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#333'
              }}
            >
              Service
            </button>
            <button 
              onClick={() => {}} 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#333'
              }}
            >
              About
            </button>
          </nav>

          {/* 로그인 상태에 따라 버튼과 환영 메시지 표시 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user ? (
              <>
                <span style={{ fontSize: '0.95rem', color: '#333' }}>
                  {user.nickname || user.nick_name}님 환영합니다
                </span>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/login')}
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                >
                  로그인
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/signup')}
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 100px)',
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#333'
        }}>
          Hello My Hompage
        </h1>
      </main>
    </div>
  )
}

// 상태(state)의 특징
// 상태값이 변경되면 페이지의 해당 컴포넌트가 다시 렌더링된다.

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signup/success" element={<SignupSuccess />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/success" element={<LoginSuccess />}></Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
