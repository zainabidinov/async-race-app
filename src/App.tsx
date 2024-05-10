import { Routes, Route, Navigate } from 'react-router-dom';
import Garage from './pages/Garage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/garage" />} />
        <Route path="/garage" element={<Garage />} />
      </Routes>
    </div>
  );
}

export default App;
