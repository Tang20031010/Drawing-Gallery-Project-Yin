import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Drawings from"./pages/Drawings";
import Add from"./pages/Add";
import Update from"./pages/Update"
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Drawings />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
