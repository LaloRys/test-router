import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Dashboard, Home, Landing, Analytics, Admin } from "./pages";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  const Login = () => {
    //request done
    setUser({
      id: 1,
      name: "John",
      permission: ['analize'],
      roles: ['']
    });
  };

  const Logout = () => setUser(null);

  // !!user devuelve true si user tiene algo, false si no tiene nada 
  // user ? true : false

  return (
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={Logout}>Logout</button>
      ) : (
        <button onClick={Login}>Login</button>
      )}

      <Routes>
        <Route index element={<Landing />} />
        {/* <Route path="/" element={<Landing/>}/> */}
        <Route path="/landing" element={<Landing />} /> 
        {/* <Route path="/home" element={<ProtectedRoute user={user} redirectTo="/admin"> <Home /></ProtectedRoute>} /> */}

        <Route element={<ProtectedRoute isAllowed={!!user} redirectTo="/" />}>

          <Route path="/home" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />} />

        </Route>
        
        <Route path="/analytics" element={
          <ProtectedRoute 
          isAllowed={!!user && user.permission.includes('analize')} 
          redirectTo="/home">
            <Analytics />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
        <ProtectedRoute 
          isAllowed={!!user && user.roles.includes('admin')}
          redirectTo="/home">
          <Admin />
        </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Landing">Landing</Link>
        </li>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
export default App;
