// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="text-center">
      <h2>Welcome to Task Management App</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Tasks</h5>
              <p className="card-text">Create and edit your tasks efficiently.</p>
              <a href="/tasklist" className="btn btn-primary">
                View Tasks
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Track Progress</h5>
              <p className="card-text">Monitor your progress on the dashboard.</p>
              <a href="/dashboard" className="btn btn-success">
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Learn More</h5>
              <p className="card-text">Understand how this app helps you.</p>
              <a href="/about" className="btn btn-info">
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
