import React from "react";

import "./detail.css";
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

const Detail = () => {

    const { user } = useChatStore();

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                {/* <p>Lorem ipsum, dolor sit amet.</p> */}
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Cài đặt</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Quyền riêng tư và hỗ trợ</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Ảnh</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    {/* <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://cdn.oneesports.vn/cdn-data/sites/4/2024/12/honkai-star-rail-castorice.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://cdn.oneesports.vn/cdn-data/sites/4/2024/12/honkai-star-rail-castorice.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://cdn.oneesports.vn/cdn-data/sites/4/2024/12/honkai-star-rail-castorice.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://cdn.oneesports.vn/cdn-data/sites/4/2024/12/honkai-star-rail-castorice.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                    </div> */}
                </div>

                <div className="option">
                    <div className="title">
                        <span>File được chia sẻ</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                </div>
                {/* <button>Chặn</button> */}
                <button className="logout" onClick={() => auth.signOut()}>Đăng xuất</button>
            </div>
        </div>
    );
};

export default Detail;
