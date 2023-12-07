import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// In the import line below the user info is being imported from datatablesource.js
import { studentColumns } from "../../datatablesource";
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
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // Add a new property to each record to save Firestore document ID
        list.push({ id: doc.id, ...doc.data(), firestoreId: doc.id });
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
    const itemToDelete = data.find((item) => item.id === id);
    if (itemToDelete) {
      await deleteDoc(doc(db, "users", itemToDelete.firestoreId));
      setData(data.filter((item) => item.id !== id));
    }
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
              onClick={() => handleDelete(params.row.firestoreId)} // Use firestoreId here
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
        Add New User
        <Link to="/student/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={studentColumns.concat(actionColumn)}
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
