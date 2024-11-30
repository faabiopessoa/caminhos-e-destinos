import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Checkout from "./pages/checkout";
import Admin from "./pages/Admin";
import AttractionDetails from "./pages/AttractionDetails";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/checkout' || pathname == '/admin') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )
      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/attraction/:id" element={<AttractionDetails />} />
      </Routes>
    </>
  );
}

export default App;
