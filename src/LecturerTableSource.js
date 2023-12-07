export const lecturerColumns = [
  {
    field: "id", // This now corresponds to the row number, not the Firebase ID
    headerName: "No.",
    width: 10,
  },
  {
    field: "img",
    headerName: "Image",
    width: 50,
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
    width: 150,
  },
  {
    field: "licenseNumber",
    headerName: "License Number",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 130,
  },
  {
    field: "vehicleType",
    headerName: "Vehicle Type",
    width: 100,
  },
  {
    field: "specialization",
    headerName: "Specialization",
    width: 180,
  },
];
