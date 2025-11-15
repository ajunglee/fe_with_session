// react 패키지로부터 StrictMode 가져오기
import { StrictMode } from 'react'
// react-dom 패키지로부터 createRoot 함수를 가져오기
import { createRoot } from 'react-dom/client'

import{BrowserRouter} from 'react-router-dom'
// index.css 파일 가져오기
import './index.css'
import App from './App.jsx' // App 컴포넌트를 가져오기

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 라우터 설정 */}
      <App /> {/* App 컴포넌트 렌더링 하기 */}
    </BrowserRouter>
  </StrictMode>,
)
