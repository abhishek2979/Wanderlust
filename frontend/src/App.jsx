import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import ShowListing from "./pages/ShowListing";
import NewListing from "./pages/NewListing";
import EditListing from "./pages/EditListing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings/new" element={<NewListing />} />
            <Route path="/listings/:id" element={<ShowListing />} />
            <Route path="/listings/:id/edit" element={<EditListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 404 catch-all */}
            <Route
              path="*"
              element={
                <div className="container text-center py-5">
                  <h1 style={{ fontSize: "5rem" }}>404</h1>
                  <h4>Oops! Page not found 😕</h4>
                  <a href="/" className="btn btn-wanderlust mt-3">Go Home</a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
