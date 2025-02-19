import React, {useState} from 'react'

import './chatList.css'

const ChatList = () => {

const [addMore, setAddMore] = useState(false);

  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="" />
                <input type="text" placeholder='Tìm người dùng' />
            </div>
            <img src={addMore ? "./minus.png" : "./plus.png"} alt="" className='add' onClick={() => setAddMore((prev) => !prev)}/>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className='texts'>
                <span>Jane Doe</span>
                <p>Hello</p>
            </div>
        </div>
    </div>
  )
}

export default ChatList