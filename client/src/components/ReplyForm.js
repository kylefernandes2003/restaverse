import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../Styles/ReplyForm.css";

const ReplyForm = () => {
  const { id } = useParams();
  const [replyText, setReplyText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  //added validation for name and email field using regex(regular expressions)
  const validateName = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      setNameError('Name must contain only letters and spaces.');
    } else {
      setNameError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };

  const handleReply = () => {
    validateName();
    validateEmail();
    
    if (nameError || emailError) {
        return; // Don't proceed if there are validation errors
    }

    fetch(`http://localhost:5000/reply/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `reply_text=${encodeURIComponent(replyText)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
    })
      .then(response => response.text())
      .then(data => {
        console.log('Server Response:', data);
      })
      .catch(error => {
        console.error('Error replying to review:', error);
      });
  };

  return (
    <div className="reply-form-container">
      <h2>Reply to Review</h2><br></br>
      <div className="form-field">
        <label>Name:</label><br></br>
        <input type="text" value={name} onChange={e => setName(e.target.value)} onBlur={validateName} />
        {nameError && <span className="error-message">{nameError}</span>}
      </div>
      <div className="form-field">
        <label>Email:</label><br></br>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={validateEmail}/>
        {emailError && <span className="error-message">{emailError}</span>}
      </div>
      <div className="form-field">
        <label>Reply:</label><br></br>
        <textarea
          placeholder="Type your reply here"
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleReply}>Reply</button>
    </div>
  );
};

export default ReplyForm;