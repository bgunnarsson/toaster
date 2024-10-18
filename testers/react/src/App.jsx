import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Basic from './Basic'
import Advanced from './Advanced'
import { ToasterProvider } from '@bgunnarsson/toaster/react'

import 'styles'

function App() {
  return (
    <ToasterProvider options={{ position: 'bottom right', offset: { x: 20, y: 20 }, customClass: 'my-toaster' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Basic />} />
          <Route path="advanced" element={<Advanced />} />
        </Routes>
      </Router>
    </ToasterProvider>
  )
}

export default App
