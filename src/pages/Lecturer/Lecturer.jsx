import "./lecturer.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import LecturerTable from "../../components/Lecturer/LecturerTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <LecturerTable />
      </div>
    </div>
  );
};

export default List;
