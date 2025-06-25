import React, { useState } from 'react';

export default function ChatAssistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await fetch('https://nasa-backend-hfke.onrender.com/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Server error');
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error('AI error:', err);
      setError(err.message || 'Failed to fetch AI response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h3>🤖 Ask AI About Space</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a space-related question..."
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          marginBottom: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#2d72d9',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: '15px' }}>
          ❌ {error}
        </p>
      )}

      {answer && (
        <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
          <strong>🧠 AI:</strong> {answer}
        </p>
      )}
    </div>
  );
}
