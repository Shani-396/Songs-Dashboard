import { Route,  BrowserRouter as Router, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import SongTable from "../pages/SongTable";
import UploadCsv from "../pages/UploadCsv";
import About from "../pages/About";


export default function AppRoutes() {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="songs" element={<SongTable />} />
            <Route path="upload" element={<UploadCsv />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    )
}