import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { AboutPage, ContactPage, MomentsPage, ServicePage } from "./Interior";
import Layout, { ScrollTop } from "./Layout";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="o-meni" element={<AboutPage />} />
          <Route path="trenuci" element={<MomentsPage />} />
          <Route path="upit" element={<ContactPage />} />
          <Route path=":slug" element={<ServicePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
