import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";

// AuthProvider의 상태와 함수들을 접근하는 hook
import { useAuth } from "../hooks/useAuth.js";

function Login2() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const { Login2 } = useAuth();

    function handleEmailChange(e){
        setEmail(e.target.value);
        console.log(email)
    } // 전통적인 방식
    //const handleEmailChange = (e) => {} // 잘쓰는 방식

    async function handleSubmit(e){
        e.preventDefault(); //

        console.log('로그인 버튼 클릭됨');

        // object 형태로 data를 구성함
        const data = {email, password};
        if(password === ""){
            alert("비밀번호를 입력하세요");
            return;
        }

        try{
            const response = await axios.post(
                "/api/user/login",
                data,
                {
                    headers:{
                        "Content-Type" : "application/json"
                    }
                }
            );
            if(response.data.status === "success"){
                // 로그인 처리
                console.log()
                Login2(response.data.data)
            }
        } catch( error ){
            // 에러처리
            setErrMsg(error.response.data.message || "로그인에 실패했습니다. 다시 시도해주세요.");
        }
    }

    return (<>
        <div className="login-container">
            <div className="login-form-wrapper">
                <h1>로그인</h1>
                <p>이메일과 패스워드를 입력하세요.</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        {/* 이메일 입력란 */}
                        <input 
                        type="email"
                        placeholder="이메일" 
                        value={email}
                        //onChange={(e) => setEmail(e.target.value)}
                        onChange={handleEmailChange}
                        className="border p-2 rounded"
                        required
                        />

                        {/* 비밀번호 입력란 */}
                        <input 
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="border p-2 rounded"
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-600"
                    >
                        로그인
                    </button>
                </form>

                {/* 에러 메세지 */}
                {errMsg && <p className="text-red-500"> { errMsg } </p>}

            </div>
        </div>
    </>)
    
}
export default Login2;