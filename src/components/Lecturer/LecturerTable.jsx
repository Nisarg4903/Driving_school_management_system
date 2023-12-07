import "./lecturertable.scss";
import { DataGrid } from "@mui/x-data-grid";
// In the import line below the user info is being imported from datatablesource.js
import { lecturerColumns } from "../../LecturerTableSource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";

const Datatable = () => {
  const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "instructors"));
      let counter = 1; // Initialize a counter to assign row numbers
      querySnapshot.forEach((doc) => {
        list.push({ id: counter, ...doc.data() }); // Use the counter as the id
        counter++; // Increment the counter for the next row
      });
      setData(list);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Lecturer
        <Link to="/lecturer/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={lecturerColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
