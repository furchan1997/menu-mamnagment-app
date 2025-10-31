import CreateDish from "./components/pages/createDish";
import Summary from "./components/pages/summary";
import "./index.css";
import { Route, Routes } from "react-router-dom";
function App() {
  // רכיב ראשי, כאן התקבלו שאר הרכיבים
  return (
    <>
      <div className="main-app">
        <header>
          {/*
          רכיב אשר מסביר על מהות האפליקציה
           */}
          <Summary />
        </header>
        <main>
          {/*
       ניהול הניווטים
           */}
          <Routes>
            <Route path="/Create-dish" element={<CreateDish />} /> 
          </Routes>
        </main>
        <footer></footer>
      </div>
    </>
  );
}

export default App;
