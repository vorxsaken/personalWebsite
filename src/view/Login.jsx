import React, { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import { IoMdEyeOff, IoMdEye} from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isShow, setIsShow] = useState(false);
    const nav = useNavigate();

    const login = () => {
      const data = {
        user: username,
        password: password
      }
      fetch("http://localhost:3010/admin/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(result => {
        if(result.status == 500){
          window.alert("username atau password salah")
        }else if(result.status == 501){
          window.alert("field tidak boleh kosong")
        }else {
          return result.json();
        }
      })
      .then(json => {
        localStorage.setItem("_xvd", json.userToken);
        nav("../", {replace: true});
        window.location.reload();
      })
      .catch((err) => {console.log(err)})
    }

    return (
    <div className="w-full h-auto min-h-[80vh] flex justify-center items-start mt-16">
      <div className="w-auto h-auto py-8 px-12 flex shadow-xl rounded-lg flex-col items-center gap-8">
        <p className="text-6xl font-pacifico text-slate-600 font-thin mb-8">Login</p>
        <div className="flex flex-col gap-4">
          <input onChange={n => setUsername(n.target.value)} type="text" className="w-72 px-4 py-3 border border-slate-400
            rounded-md focus:outline-none text-sm text-slate-500" placeholder="username" />
          <div className="relative block">
            { isShow ? (
                <span onClick={() => {setIsShow(false)}} className="cursor-pointer absolute right-3 top-2 text-slate-400">
                    <IoMdEyeOff className="w-7 h-7 " />
                </span>
            ) : (
                <span onClick={() => {setIsShow(true)}} className="cursor-pointer absolute right-3 top-2 text-slate-400">
                    <IoMdEye className="w-7 h-7" />
                </span>
            ) }
            <input value={password} onChange={pass => setPassword(pass.target.value)} 
            type={isShow ? 'text' : 'password'} className="w-72 px-4 py-3 border border-slate-400 rounded-md 
            focus:outline-none text-sm text-slate-500" placeholder="password" />
          </div>
        </div>
        <div className="flex justify-center">
          <Buttons onClick={login}>Login</Buttons>
        </div>
      </div>
    </div>
  );
}

export default Login;
