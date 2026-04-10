import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import Home from "./pages/Home";


import Checkout from "./pages/Checkout";

import { AuthProvider } from "./contexts/AuthContext";


export default function App() {
  return (
    <Router>
      <AuthProvider>
       
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black">
            <Navbar />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
           
          
               
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>

            <Footer />
          </div>
       
      </AuthProvider>
    </Router>
  );
}
