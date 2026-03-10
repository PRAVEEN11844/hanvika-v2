import React from "react";
import { useNavigate } from "react-router-dom";
import "./Select.css";

const Select = () => {
  const navigate = useNavigate();

  return (
    <div className="select-page">

      {/* ── LEFT PANEL — Brand / Hero ──────────────────── */}
      <div className="select-left">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Logo */}
        <div className="select-logo">
          <div className="logo-square">H</div>
          <div className="logo-text">
            <span className="logo-brand">HanVika</span>
            <span className="logo-sub">Workforce Platform</span>
          </div>
        </div>

        <button className="back-home-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        {/* Hero */}
        <div className="select-hero">
          <h1 className="hero-title">
            India's Trusted<br />
            <span className="hero-accent">Workforce</span><br />
            Platform
          </h1>
          <p className="hero-desc">
            Connecting skilled professionals with businesses
            and households across Hyderabad
          </p>
        </div>

        {/* Stats */}
        <div className="select-stats">
          <div className="stat-item">
            <span className="stat-num">500+</span>
            <span className="stat-label">Workers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">2000+</span>
            <span className="stat-label">Jobs Done</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">4.9★</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Role Selection ───────────────── */}
      <div className="select-right">
        <div className="select-card">
          <div className="card-header">
            <h2 className="card-title">Welcome Back</h2>
            <p className="card-sub">Choose how you want to continue</p>
          </div>

          <div className="role-list">
            {/* Service Partner */}
            <button className="role-btn role-worker" onClick={() => navigate("/worker-login")}>
              <div className="role-icon-wrap worker-icon"><span>👷</span></div>
              <div className="role-info">
                <span className="role-title">Service Partner</span>
                <span className="role-desc">Workers & field professionals</span>
              </div>
              <div className="role-arrow">→</div>
            </button>

            {/* Customer */}
            <button className="role-btn role-customer" onClick={() => navigate("/login")}>
              <div className="role-icon-wrap customer-icon"><span>🏠</span></div>
              <div className="role-info">
                <span className="role-title">Customer</span>
                <span className="role-desc">Businesses & individuals</span>
              </div>
              <div className="role-arrow">→</div>
            </button>

            {/* Admin */}
            <button className="role-btn role-admin" onClick={() => navigate("/admin-login")}>
              <div className="role-icon-wrap admin-icon"><span>🛡️</span></div>
              <div className="role-info">
                <span className="role-title">Admin</span>
                <span className="role-desc">HanVika staff only</span>
              </div>
              <div className="role-badge">RESTRICTED</div>
              <div className="role-arrow">→</div>
            </button>
          </div>

          <p className="card-footer-text">
            By continuing you agree to HanVika's Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default Select;
