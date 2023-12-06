export const studentColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 230,
  },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 160,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
  {
    field: "course",
    headerName: "Course",
    width: 150,
  },
  {
    field: "registrationDate",
    headerName: "Registration Date",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
