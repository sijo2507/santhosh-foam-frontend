import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const responses = {
    hello: "Hello! Welcome to Santhosh Foam And Furnishings 😊",
    products: "You can browse all our products here: /products",
    mattresses: "We have a wide range of mattresses for comfort and durability.",
    cushions: "Check out our cushions section for cozy additions to your home.",
    contact: "You can contact us at +91 94447 65603 or visit our Contact Us page.",
    default: "Sorry, I didn't understand that. Please ask about products, mattresses, cushions, or contact."
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Determine bot response
    const lowerInput = input.toLowerCase();
    let botReply = responses.default;
    for (let key in responses) {
      if (lowerInput.includes(key)) {
        botReply = responses[key];
        break;
      }
    }

    setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-25 right-6 bg-[#C00000] hover:bg-[#E60000] text-[#FDD700] p-4 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      {/* Chat Modal */}
      {isOpen && (
  <div className="fixed bottom-20 right-5 w-80 md:w-96 bg-white shadow-xl rounded-lg flex flex-col z-50">
    {/* Chat Header with Close Button */}
    <div className="bg-[#C00000] text-[#FDD700] px-4 py-2 rounded-t-lg font-bold flex justify-between items-center">
      <span>Chat with us</span>
      <button 
        onClick={() => setIsOpen(false)} 
        className="text-[#FDD700] font-bold text-lg hover:text-white"
      >
        &times;
      </button>
    </div>

    {/* Chat Body */}
    <div className="flex-1 p-4 overflow-y-auto h-64">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-2 ${msg.from === 'bot' ? 'text-left' : 'text-right'}`}>
          <span className={`inline-block px-3 py-2 rounded-lg ${msg.from === 'bot' ? 'bg-[#FFFCCF] text-[#000]' : 'bg-[#C00000] text-[#FDD700]'}`}>
            {msg.text}
          </span>
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="flex p-2 border-t border-gray-300">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-[#C00000] hover:bg-[#E60000] text-[#FDD700] px-4 rounded-r-lg font-semibold"
      >
        Send
      </button>
    </div>
  </div>
)}
    </>
  );
};

export default ChatBot;
