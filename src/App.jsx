import CreateDish from "./components/pages/createDish";
import Dishes from "./components/pages/dishes";
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
            <Route path="/" element={<Dishes />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </>
  );
}

export default App;
