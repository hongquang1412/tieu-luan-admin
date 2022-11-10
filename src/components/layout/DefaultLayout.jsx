import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
function DefaultLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
