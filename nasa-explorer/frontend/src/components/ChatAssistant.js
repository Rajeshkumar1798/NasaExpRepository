import React, { useState } from 'react';

export default function ChatAssistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://nasa-backend-hfke.onrender.com/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('Error contacting AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>🤖 Ask AI About Space</h3>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a space-related question..."
        style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {answer && <p style={{ marginTop: '10px' }}><strong>AI:</strong> {answer}</p>}
    </div>
  );
}
