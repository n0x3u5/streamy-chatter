import { useState, useCallback, FormEvent } from 'react';
import { streamResponse } from './stream-response.ts';

console.log(streamResponse);

function Chat() {
  const [messages, setMessages] = useState<Array<{ id: `${string}-${string}-${string}-${string}-${string}`, content: string, type: 'user' }>>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => {
      const res = prev.slice();
      res.push({ id: crypto.randomUUID(), content: inputMessage, type: 'user' });
      return res;
    });

    setInputMessage('');
  }, [inputMessage]);

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
