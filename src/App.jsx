import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [joke, setJoke] = useState({ setup: "", punchline: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchJoke() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setJoke(data)
    } catch (err) {
      setError("Could not fetch a joke. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const getButtonText = () => {
    if (loading) return 'Fetching...'
    if (error) return 'Try again'
    return 'Fetch joke'
  }

  return (
    <div className="App">
      <div className='container'>
        <h1>Random Joke</h1>
        <p>Click the button to fetch a fresh one.</p>
        <button
          className='btn'
          onClick={fetchJoke}
          disabled={loading}
        >
          {getButtonText()}
        </button>
        {error && <p className='error'>{error}</p>}
        {joke.setup === '' && joke.punchline === '' ? (
          <p>No joke yet</p>
        ) : (
          <>
            <p>{joke.setup}</p>
            <p>{joke.punchline}</p>
          </>
        )}
      </div>
    </div>
  )
}
