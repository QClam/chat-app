import React, { useEffect, useRef, useState } from "react";

import EmojiPicker from "emoji-picker-react";
import "./chat.css";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  })

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  console.log(text);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              delectus impedit inventore quia corrupti sit beatae esse cumque
              perferendis. Ratione doloremque, quo commodi autem alias aut
              deserunt eos assumenda ipsum.
            </p>
            <span>1 phút trước</span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              delectus impedit inventore quia corrupti sit beatae esse cumque
              perferendis. Ratione doloremque, quo commodi autem alias aut
              deserunt eos assumenda ipsum.
            </p>
            <span>1 phút trước</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              delectus impedit inventore quia corrupti sit beatae esse cumque
              perferendis. Ratione doloremque, quo commodi autem alias aut
              deserunt eos assumenda ipsum.
            </p>
            <span>1 phút trước</span>
          </div>
        </div>
        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <img src="https://cdn.oneesports.vn/cdn-data/sites/4/2024/12/honkai-star-rail-castorice.jpg" alt="" />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              delectus impedit inventore quia corrupti sit beatae esse cumque
              perferendis. Ratione doloremque, quo commodi autem alias aut
              deserunt eos assumenda ipsum.
            </p>
            <span>1 phút trước</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Gửi</button>
      </div>
    </div>
  );
};

export default Chat;
