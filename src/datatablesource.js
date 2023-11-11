export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: "230",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//Temporary Files
export const userRows = [
  // Original rows transformed
  {
    id: 1,
    username: "jon.snow",
    img: "https://via.placeholder.com/150",
    status: "Active",
    email: "jon.snow@example.com",
    age: 35,
  },
  {
    id: 2,
    username: "cersei.lannister",
    img: "https://via.placeholder.com/150",
    status: "Inactive",
    email: "cersei.lannister@example.com",
    age: 42,
  },
  {
    id: 3,
    username: "jaime.lannister",
    img: "https://via.placeholder.com/150",
    status: "Pending",
    email: "jaime.lannister@example.com",
    age: 45,
  },
  {
    id: 4,
    username: "arya.stark",
    img: "https://via.placeholder.com/150",
    status: "Active",
    email: "arya.stark@example.com",
    age: 16,
  },
  {
    id: 5,
    username: "daenerys.targaryen",
    img: "https://via.placeholder.com/150",
    status: "Inactive",
    email: "daenerys.targaryen@example.com",
    age: "N/A",
  },
  {
    id: 6,
    username: "unknown.melisandre",
    img: "https://via.placeholder.com/150",
    status: "Pending",
    email: "unknown.melisandre@example.com",
    age: 150,
  },
  {
    id: 7,
    username: "ferrara.clifford",
    img: "https://via.placeholder.com/150",
    status: "Active",
    email: "ferrara.clifford@example.com",
    age: 44,
  },
  {
    id: 8,
    username: "rossini.frances",
    img: "https://via.placeholder.com/150",
    status: "Inactive",
    email: "rossini.frances@example.com",
    age: 36,
  },
  {
    id: 9,
    username: "harvey.roxie",
    img: "https://via.placeholder.com/150",
    status: "Pending",
    email: "harvey.roxie@example.com",
    age: 65,
  },
  {
    id: 10,
    username: "user.ten",
    img: "https://via.placeholder.com/150",
    status: "Active",
    email: "user.ten@example.com",
    age: "N/A",
  },
];
