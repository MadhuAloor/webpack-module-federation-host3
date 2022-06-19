import {Routes, Route} from 'react-router-dom'
import React from 'react'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/home2"
          element={
            <div>
              <p>Home2</p>
            </div>
          }
        />
        <Route
          path="about2"
          element={
            <div>
              <p>about2</p>
            </div>
          }
        />
        <Route
          path="contact2"
          element={
            <div>
              <p>contact2</p>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
