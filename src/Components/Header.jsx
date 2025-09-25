import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <div className="weather-icon">🌤️</div>
            <div className="brand-info">
              <h1 className="app-title">WeatherScope</h1>
              <p className="app-subtitle">Your Personal Weather Companion</p>
            </div>
          </div>
          <div className="header-features">
            <div className="feature-item">
              <span className="feature-icon">📍</span>
              <span className="feature-text">Location-based</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span className="feature-text">5-Day Forecast</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Real-time Updates</span>
            </div>
          </div>
        </div>
        <div className="header-decoration">
          <div className="floating-cloud cloud-1">☁️</div>
          <div className="floating-cloud cloud-2">⛅</div>
          <div className="floating-cloud cloud-3">🌥️</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
