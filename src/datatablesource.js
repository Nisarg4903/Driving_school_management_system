export const studentColumns = [
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.value}
            alt="Avatar"
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
        </div>
      );
    },
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "password",
    headerName: "Password",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 130,
  },
  {
    field: "lessons",
    headerName: "Lessons",
    width: 80,
  },
  {
    field: "ID-Number",
    headerName: "ID-Number",
    width: 100,
  },
  {
    field: "payment",
    headerName: "Payment Amount",
    width: 150,
  },
];
