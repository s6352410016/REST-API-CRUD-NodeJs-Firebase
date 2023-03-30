import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateTravel from './compoenents/CreateTravel';
import ShowHistoryTravel from './compoenents/ShowHistoryTravel';
import UpdateTravel from './compoenents/UpdateTravel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateTravel />}></Route>
        <Route path='/showhistorytravel' element={<ShowHistoryTravel />}></Route>
        <Route path='/updatetravel/:id' element={<UpdateTravel />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
