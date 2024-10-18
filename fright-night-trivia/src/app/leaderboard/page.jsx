'use client';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from "react";
import "./leaderboard.css";

// Create a single supabase client for interacting with your database
const supabase = createClient('https://drtiadnwtwtpurixjyss.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydGlhZG53dHd0cHVyaXhqeXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNDYzNzgsImV4cCI6MjA0NDgyMjM3OH0.IEoeD0HvsLVc4scOqkX6n6wGeY27HNeAwaftXPbZYi4');

export default function Home() {
  const [dbData, setDbData] = useState([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [questions, setQuestions] = useState([]);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from('HalloweenLeaderBoard')
        .select('*')
        .order('Score', { ascending: false });
      
      if (error) throw error;
      setDbData(data);
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchQuestions() {
    try {
      const response = await fetch('http://localhost:3001/quiz');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setQuestions(data);
      console.log('Fetched questions:', data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchQuestions();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('HalloweenLeaderBoard')
        .insert([{ Name: name, Score: score }])
        .select();
      
      if (error) throw error;
      console.log('Inserted data:', data);

      fetchData();
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div>
      <div className="main">
        <h1 className="title">Haunted Hall of High Scores</h1>
        {dbData.map((user, index) => (
          <div key={index} className="leaderBoard">
            <h1>Name: {user.Name}</h1>
            <h1>Score: {user.Score}</h1>
            <h1>Rank: {user.Creature_Name}</h1>
          </div>
        ))}
      </div>

      <div className="form">
        <form onSubmit={handleClick}>
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </label>
          <label>
            Score:
            <input 
              type="text" 
              name="score" 
              value={score} 
              onChange={(e) => setScore(e.target.value)} 
              required 
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

      <button onClick={fetchData}>Refresh</button>
    </div>
  );
}
