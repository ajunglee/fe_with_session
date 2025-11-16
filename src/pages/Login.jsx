import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import '../App.css'

// axios 기본 설정: 쿠키 자동 전송
axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // 에러 메시지 초기화
    
    try {
      // 로그인 API 호출
      const response = await axios.post('/api/user/login', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('로그인 성공:', response.data);
      // 로그인 성공 시 사용자 정보를 context에 저장하고 홈으로 이동
      const userData = response.data.data || response.data;
      if (userData) {
        login(userData);
      }
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      // alert 대신 하단에 에러 메시지 표시
      setErrorMessage(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <div className="form-container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">패스워드</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="패스워드를 입력하세요"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">로그인</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>취소</button>
        </div>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;

