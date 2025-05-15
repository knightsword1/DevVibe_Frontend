import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const messagesEndRef = useRef(null);
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        text,
        time: formatDistanceToNow(new Date(createdAt), { addSuffix: true }),
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loads, the socket connection is established and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, photoUrl, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [
        ...messages,
        {
          firstName,
          lastName,
          photoUrl,
          text,
          time: formatDistanceToNow(new Date(), { addSuffix: true }),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className=" w-3/4 mx-auto border border-gray-600 h-[80vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600"></h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              {user.firstName === msg.firstName ? (
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={msg.photoUrl}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{msg.time}</time>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ) : (
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={msg.photoUrl}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{msg.time}</time>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button
          onClick={sendMessage}
          className="btn btn-sm bg-yellow-500 hover:bg-yellow-400 text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
