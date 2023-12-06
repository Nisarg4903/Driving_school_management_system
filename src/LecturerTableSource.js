export const lecturerColumns = [
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          src={params.value}
          alt="Instructor"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
      );
    },
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 230,
  },
  {
    field: "licenseNumber",
    headerName: "License Number",
    width: 150,
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
    field: "vehicleType",
    headerName: "Vehicle Type",
    width: 150,
  },
  {
    field: "specialization",
    headerName: "Specialization",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.availability}`}>
          {params.row.availability}
        </div>
      );
    },
  },
];
