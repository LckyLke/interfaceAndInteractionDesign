'use client';
import React, { useState, useEffect, useRef } from 'react';
import UserMessage from './UserMessage';
import ReplyMessage from './ReplyMessage';
import { data } from 'autoprefixer';

const API_KEY = process.env.NEXT_PUBLIC_KEY;

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: 'Hello, I am ChatGPT!',
      sender: 'ChatGPT',
    },
  ]);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    }
  };

  useEffect(scrollToBottom, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message == '') {
      return;
    }
    setChat((prevChat) => [...prevChat, { text: message, user: true }]);
    //for server side
    const newMessage = {
      message: message,
      sender: 'user',
      dircetion: 'outgoing',
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    // set typing indicator
    setTyping(true);

    setMessage('');
    //process message to chatGPT
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: 'system',
      content:
        'You are about to interact with AI DOC, an AI chatbot designed to provide general medical advice. AI DOC will provide short, informative responses based on the medical and health-related information it has been trained on.',
    };

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ]);

        setChat((prevChat) => [
          ...prevChat,
          { text: data.choices[0].message.content, user: false },
        ]);
        setTyping(false);
      });
  }

  return (
    <div className="flex flex-col h-full justify-end px-2  text-xs">
      <div className=" overflow-y-scroll custom-scrollbar">
        {chat.map((message, i) =>
          message.user ? (
            <UserMessage key={i} text={message.text} />
          ) : (
            <ReplyMessage
              key={i}
              ww={windowSize.width}
              wh={windowSize.height}
              text={message.text}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      {typing && (
        <p className="typing-indicator">
          AI DOC is typing<span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      )}
      <form onSubmit={sendMessage} className=" flex justify-between items-end ">
        <textarea
          spellCheck="false"
          type="text"
          className=" p-2 mb-2 border rounded resize-none overflow-hidden textarea"
          placeholder="Type a message..."
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex flex-col mb-2">
          <button
            type="button"
            className="flex justify-center items-center  text-white rounded btn doctorBtn"
          >
            <svg
              width={windowSize.height * 0.85 * (36 / 932)}
              height={windowSize.width * 0.85 * (30 / 932)}
              viewBox="0 0 38 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.74 6.45454H33.44C35.4 6.45454 37 8.05882 37 10.0241V27.4305C37 29.3957 35.4 31 33.44 31H4.56C2.6 31 1 29.3957 1 27.4305V10.0241C1 8.05882 2.6 6.45454 4.56 6.45454H10.26V4.70989C10.26 2.66444 11.94 1 13.96 1H24.02C26.06 1 27.72 2.68449 27.72 4.70989V6.45454H27.74Z"
                stroke="#F6F5F5"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24.3 6.47472H13.7V5.55226C13.7 4.73007 14.38 4.04825 15.2 4.04825H22.78C23.6 4.04825 24.28 4.73007 24.28 5.55226V6.47472H24.3Z"
                stroke="#F6F5F5"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.8 21.3744V23.3798C21.8 24.1619 21.16 24.8036 20.38 24.8036H17.6C16.82 24.8036 16.1799 24.1619 16.1799 23.3798V21.3744H14.1799C13.3999 21.3744 12.7599 20.7327 12.7599 19.9506V17.1833C12.7599 16.4012 13.3999 15.7595 14.1799 15.7595H16.1799V13.7541C16.1799 12.972 16.82 12.3303 17.6 12.3303H20.38C21.16 12.3303 21.8 12.972 21.8 13.7541V15.7595H23.8C24.58 15.7595 25.22 16.4012 25.22 17.1833V19.9506C25.22 20.7327 24.58 21.3744 23.8 21.3744H21.8Z"
                stroke="#F6F5F5"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="submit"
            className="flex justify-center items-center mt-1 rounded btn sendBtn"
          >
            <svg
              width={windowSize.height * 0.85 * (33 / 932)}
              height={windowSize.width * 0.85 * (33 / 932)}
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34 1L1 14.5882L14.5882 20.4118L20.4118 34L34 1Z"
                stroke="#F6F5F5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34 1L14.5882 20.4118"
                stroke="#F6F5F5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
