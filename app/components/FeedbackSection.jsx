'use client';
import React, { useState } from 'react';

const FeedbackSection = () => {
  const [feedback, setFeedback] = useState('');
  const [storedFeedback, setStoredFeedback] = useState('');

  const submitFeedback = () => {
    setStoredFeedback(feedback);
    setFeedback('');
  };

  const downloadFeedback = () => {
    const data = `data:text/csv;charset=utf-8,${storedFeedback}`;

    const encodedUri = encodeURI(data);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'feedback.csv');
    link.click();
  };

  return (
    <div>
      <h2>Feedback Section</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Leave your feedback here..."
      />
      <button onClick={submitFeedback}>Submit Feedback</button>
      <button onClick={downloadFeedback}>Download Feedback</button>
    </div>
  );
};

export default FeedbackSection;
