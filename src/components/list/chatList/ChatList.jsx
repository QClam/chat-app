import React, { useEffect, useState } from 'react'

import AddUser from './addUser/addUser';
import { useUserStore } from '../../../lib/userStore';

import './chatList.css'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const ChatList = () => {

    const [addMore, setAddMore] = useState(false);
    const [chats, setChats] = useState();

    const { currentUser } = useUserStore();

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
                    <div className="item" key={chat.chatId}>
                        <img src="./avatar.png" alt="" />
                        <div className='texts'>
                            <span>{chat.user?.name || "Unknown"}</span>
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