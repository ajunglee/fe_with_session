import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Signup from './pages/Signup'
import SignupSuccess from './pages/SignupSuccess'
import Login from './pages/Login'
import LoginSuccess from './pages/LoginSuccess'

// axios 기본 설정: 쿠키 자동 전송
axios.defaults.withCredentials = true;

function App() {
  // state(상태)를 정의하고 초기화한다.
  const [count, setCount] = useState(0); // count라는 이름의 state를 정의하고 초기값을 0으로 설정한다.

// 상태 정의하기
// const [상태이름, 상태값을 변경하는 함수] = useState(초기값)
function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 세션 정보 확인
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/user/session');
        if (response.data && response.data.status === 'success' && response.data.data) {
          setUserInfo(response.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('세션 확인 실패:', error);
        setUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout');
      setUserInfo(null);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>로딩 중...</h1>
      </div>
    );
  }

  return (
    <>
      <div>
        {userInfo && userInfo.data ? (
          <>
            <h1>{userInfo.data.nickname}님 환영합니다!</h1>
            <p>로그인 상태입니다.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={handleLogout}>로그아웃</button>
              <button className="btn btn-secondary" onClick={() => navigate('/signup')}>회원가입</button>
            </div>
          </>
        ) : (
          <>
            <h1>환영합니다!</h1>
            <p>로그인하거나 회원가입을 진행해주세요.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => navigate('/login')}>로그인</button>
              <button className="btn btn-secondary" onClick={() => navigate('/signup')}>회원가입</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// 상태(state)의 특징
// 상태값이 변경되면 페이지의 해당 컴포넌트가 다시 렌더링된다.

  return (<Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/signup/success" element={<SignupSuccess />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/login/success" element={<LoginSuccess />}></Route>
  </Routes>)
}

export default App
