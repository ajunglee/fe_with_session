import { useNavigate, useLocation } from 'react-router-dom'
import '../App.css'

function LoginSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || '사용자';

  const handleLogout = () => {
    // 로그아웃 로직 (필요시 추가)
    navigate('/');
  };

  return (
    <div className="form-container">
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#646cff', marginBottom: '1rem' }}>
          {nickname}님 환영합니다
        </h1>
        <div className="form-actions" style={{ marginTop: '2rem' }}>
          <button className="btn btn-primary" onClick={handleLogout}>
            로그아웃
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/signup')}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSuccess;

