import React, { useEffect, useRef, useState } from "react";

import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { arrayUnion, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
    const [chat, setChat] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [img, setImg] = useState({
        file: null,
        url: ''
    });

    const { currentUser } = useUserStore();
    const { chatId, user } = useChatStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (response) => {
            setChat(response.data());
        });

        return () => {
            unSub();
        }
    }, [chatId])

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSend = async () => {
        if (text === "") return;

        let imgUrl = null;

        try {

            if (img.file) {
                imgUrl = await upload(img.file);
            }

            await updateDoc(doc(db, "chats", chatId), {
                message: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createAt: new Date(),
                    ...(imgUrl && { img: imgUrl })
                })
            })

            const userIDs = [currentUser.id, user.id]

            userIDs.forEach(async (id) => {

                const userChatRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatRef);

                if ((userChatsSnapshot).exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updateAt = Date.now();

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats,
                    })
                }

            })

        } catch (error) {
            console.log(error);
        }

        setImg({
            file: null,
            url: "",
        })

        setText("")
    }

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} />
                    <div className="texts">
                        <span>{user?.username}</span>
                        {/* <p>Lorem ipsum dolor sit amet.</p> */}
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                {chat?.message.map((message) => (
                    <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createAt}>
                        <div className="texts">
                            {message.img && <img
                                src={message.img}
                                alt=""
                            />}
                            <p>
                                {message.text}
                            </p>
                            {/* <span>1 phút trước</span> */}
                        </div>
                    </div>
                ))}
                {img.url && (<div className="message own">
                    <div className="texts">
                        <img src={img.url} alt="" />
                    </div>
                </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
                <button className="sendButton" onClick={handleSend}>Gửi</button>
            </div>
        </div>
    );
};

export default Chat;
