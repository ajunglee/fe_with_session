import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

// axios 기본 설정: 쿠키 자동 전송
axios.defaults.withCredentials = true;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
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
    
    // 패스워드 확인 검증
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('패스워드가 일치하지 않습니다.');
      return;
    }
    
    try {
      // 회원가입 API 호출
      const response = await axios.post('/api/user/signup', {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname
      });
      
      console.log('회원가입 성공:', response.data);
      // 회원가입 성공 시 성공 페이지로 이동
      navigate('/signup/success');
    } catch (error) {
      console.error('회원가입 실패:', error);
      // alert 대신 하단에 에러 메시지 표시
      setErrorMessage(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="form-container">
      <h1>회원가입</h1>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">패스워드 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="패스워드를 다시 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">사용자 이름</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            placeholder="사용자 이름을 입력하세요"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">회원가입</button>
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

export default Signup;

