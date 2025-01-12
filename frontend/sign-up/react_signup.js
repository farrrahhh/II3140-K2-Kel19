// src/components/SignUp.js
import React, { useState } from 'react';
import '../style.css'; // Pastikan Anda membuat file CSS yang sesuai
import formImage from '../assets/form.png';
import musicImage from '../assets/music.png';
import backgroundMusic from '../music/music.mp3'; // Pastikan file audio berada di folder aset

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [audio] = useState(new Audio(backgroundMusic));

  // Memutar musik saat komponen dimuat
  React.useEffect(() => {
    audio.play();
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        window.location.href = '/login';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <main>
      <section className="form-section">
        <div className="form-picture">
          <div className="picture-text">
            <div className="form-image-text-wrapper">
              <img src={musicImage} alt="Music" />
            </div>
            <h1 className="title">CapyLingo</h1>
            <h2 className="subtitle">Learn English the Capybara Way: Calm, Confident, and Clever!</h2>
          </div>
          <div className="form-image-wrapper">
            <img src={formImage} alt="form-picture" />
          </div>
        </div>
        <div className="form-box">
          <div className="form-details">
            <h1 className="title">Sign Up to CapyLingo!</h1>
            <p className="subtitle">Ready to sharpen your English skills and have some fun? Let’s get started!</p>
          </div>
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>

              <button type="submit">Sign Up</button>
            </form>
            <div className="bottom-link">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;