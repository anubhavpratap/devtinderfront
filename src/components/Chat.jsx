import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [targetUserName, setTargetUserName] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.msgTime).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };
  

useEffect(() => {
  const fetchTargetUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${targetUserId}`, {
        withCredentials: true,
      });
      const { firstName, lastName } = response.data;
      setTargetUserName(`${firstName} ${lastName}`);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  fetchTargetUser();
}, [targetUserId]);


  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text,createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        msgTime: createdAt, 
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    // ✅ Create socket only once
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text,createdAt }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text,msgTime:createdAt }]);
    });

    socket.on("userOnlineStatus", ({ incomingId, isOnline, lastSeen }) => {
      if (incomingId === targetUserId) {
        setIsOnline(isOnline);
        if (!isOnline && lastSeen) {
          setLastSeen(lastSeen);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // ✅ Use the same socket
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  function extractTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const groupedMessages = groupMessagesByDate(messages);
  
  
  return (
    <div className="w-2/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 flex items-center justify-between">
        <div>
          Chat with {targetUserName}
          <div className="text-sm text-gray-400 flex items-center gap-2">
            {isOnline ? (
              <>
                <span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                Online
              </>
            ) : (
              <>
                <span className="h-2 w-2 bg-gray-400 rounded-full inline-block"></span>
                {lastSeen ? `Last seen ${new Date(lastSeen).toLocaleTimeString()}` : "Offline"}
              </>
            )}
          </div>
        </div>
      </h1>
      <div className="flex-1 overflow-scroll p-5">
    {Object.entries(groupedMessages).map(([date, msgs]) => (
      <div key={date}>
        <div className="text-center text-sm text-gray-400 my-4">
          {date}
        </div>
        {msgs.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
              
            </div>
            <div className="chat-bubble">
                {msg.text}
                <br/>
                <time className="text-xs opacity-50">
                {extractTime(msg.msgTime)}
              </time>

            </div>
          </div>
        ))}
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
