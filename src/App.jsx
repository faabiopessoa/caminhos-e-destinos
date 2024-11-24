import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Checkout from "./pages/checkout";
import Jericoacoara from "./pages/Jericoacoara";
import Lagoinha from "./pages/Lagoinha";
import Canoa from "./pages/Canoa";
import Cumbuco from "./pages/Cumbuco";
import Flecheiras from "./pages/Flecheiras";
import MorroBranco from "./pages/MorroBranco";
import Mundau from "./pages/Mundau";
import Paracuru from "./pages/Paracuru";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/checkout') && (
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
        <Route path="/jericoacoara" element={<Jericoacoara />} />
        <Route path="/lagoinha" element={<Lagoinha />} />
        <Route path="/canoaquebrada" element={<Canoa />} />
        <Route path="/cumbuco" element={<Cumbuco />} />
        <Route path="/flecheiras" element={<Flecheiras />} />
        <Route path="/morrobranco" element={<MorroBranco />} />
        <Route path="/mundau" element={<Mundau />} />
        <Route path="/paracuru" element={<Paracuru />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
