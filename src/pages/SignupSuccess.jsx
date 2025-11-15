import { useNavigate } from 'react-router-dom'
import '../App.css'

function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#646cff', marginBottom: '1rem' }}>회원가입 성공!</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          회원가입이 완료되었습니다.
        </p>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            홈으로 이동
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupSuccess;

