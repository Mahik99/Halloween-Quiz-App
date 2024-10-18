'use client';
import Image from "next/image";

import { createClient } from '@supabase/supabase-js'
import { useEffect } from "react";
import { useState } from "react";
import "./leaderboard.css";

// Create a single supabase client for interacting with your database
const supabase = createClient('https://drtiadnwtwtpurixjyss.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydGlhZG53dHd0cHVyaXhqeXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNDYzNzgsImV4cCI6MjA0NDgyMjM3OH0.IEoeD0HvsLVc4scOqkX6n6wGeY27HNeAwaftXPbZYi4')

export default function Home() {

  const [dbData, setDbData] = useState([])

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from('HalloweenLeaderBoard')
        .select('*')
        .order('Score', { ascending: false });
      setDbData(data)
      if (error) throw error;
      
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    fetchData()
  },[]);

  return (
    <div className="main">
      <h1 className="title">Haunted Hall of High Scores</h1>
      <h1>{dbData.map((user, index) => (
        <div key={index} className="leaderBoard">
          <h1>Name: {user.Name}</h1>
          <h1>Score: {user.Score}</h1>
          <h1>Rank: {user.Creature_Name}</h1>
        </div>
      ))}
      </h1>
    </div>
  )
}
