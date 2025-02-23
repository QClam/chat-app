import React, { useState } from "react";

import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

import "./login.css";
import upload from "../../lib/upload";
import { CircularProgress } from "@mui/material";

const Login = () => {

    const [loading, setLoading] = useState();

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

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {

            setLoading(true);

            const response = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = avatar.file ? await upload(avatar.file) : '';

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: response.user.uid,
                block: [],
            });

            await setDoc(doc(db, "userchats", response.user.uid), {
                chats: [],
            });

            toast.success('Tạo tài khoản thành công, Bạn có thể đăng nhập ngay bây giờ')

            e.target.reset();
            setAvatar({ file: null, url: '' });

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { email, password } = Object.fromEntries(formData);

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            // toast.success("Đăng nhập thành công")
        } catch (error) {
            toast.error("Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại")
        } finally {
            setLoading(false);
        }
    }

    return <div className="login">
        <div className="item">
            <h2>Chào mừng</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Mật Khẩu" name="password" />
                <button disabled={loading}>{loading ? <CircularProgress size={20} color='inherit' /> : "Đăng nhập"}</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || './avatar.png'} alt="" />
                    Tải ảnh đại diện
                </label>
                <input type="file" id="file" style={{ display: 'none' }} onChange={handleUpload} />
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Mật Khẩu" name="password" />
                <button disabled={loading}>{loading ? <CircularProgress size={20} color='inherit' /> : "Đăng ký"}</button>
            </form>
        </div>
    </div>;
};

export default Login;
