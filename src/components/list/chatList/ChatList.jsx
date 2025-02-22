import React, { useEffect, useState } from 'react'

import AddUser from './addUser/addUser';
import { useUserStore } from '../../../lib/userStore';
import { useChatStore } from '../../../lib/chatStore';

import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import './chatList.css'

const ChatList = () => {

    const [addMore, setAddMore] = useState(false);
    const [chats, setChats] = useState();

    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();
    // console.log(chatId);


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (response) => {
            const items = response.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        }
    }, [currentUser.id]);

    const handleSelect = async (chat) => {

        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });

        const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId)

        userChats[chatIndex].isSeen = true;

        const userChatRef = doc(db, "userchats", currentUser.id);
        try {
            await updateDoc(userChatRef, {
                chats: userChats,
            });
            changeChat(chat.chatId, chat.user)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder='Tìm người dùng' />
                </div>
                <img src={addMore ? "./minus.png" : "./plus.png"} alt="" className='add' onClick={() => setAddMore((prev) => !prev)} />
            </div>
            {chats?.length > 0 ? (
                chats.map((chat) => (
                    <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)} style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}>
                        <img src={chat.user.avatar || "./avatar.png"} alt="" />
                        <div className='texts'>
                            <span>{chat.user.username || "Unknown"}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )}

            {addMore && <AddUser />}
        </div>
    )
}

export default ChatList