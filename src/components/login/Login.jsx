import React, { useState } from "react";

import "./login.css";
import { toast } from "react-toastify";

const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    });

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        toast.warn("Hello World")
    }

    return <div className="login">
        <div className="item">
            <h2>Chào mừng</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Mật Khẩu" name="password" />
                <button>Đăng nhập</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>Đăng ký tài khoản</h2>
            <form>
                <label htmlFor="file">
                    <img src={avatar.url || './avatar.png'} alt=""/>
                    Tải ảnh đại diện
                </label>
                <input type="file" id="file" style={{ display: 'none' }} onChange={handleUpload} />
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Mật Khẩu" name="password" />
                <button>Đăng ký</button>
            </form>
        </div>
    </div>;
};

export default Login;
