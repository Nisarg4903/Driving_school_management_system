//Import the CSS file
import "./table.scss";
//Import the Table components from ReactTable
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


function createData(
  trackingId,
  img,
  product,
  customer,
  date,
  amount,
  paymentMethod,
  status
) {
  return {
    trackingId,
    img,
    product,
    customer,
    date,
    amount,
    paymentMethod,
    status,
  };
}

const rows = [
  createData(
    "12345",
    "/images/chick.jpg",
    "Frozen yoghurt",
    "John Doe",
    "2023-01-01",
    159,
    "Credit Card",
    "Approved"
  ),
  createData(
    "12346",
    "/images/ninja.jpg",
    "Ice cream sandwich",
    "Jane Smith",
    "2023-01-02",
    237,
    "Debit Card",
    "Pending"
  ),
  createData(
    "12347",
    "/images/soldier.jpg",
    "Eclair",
    "Jim Brown",
    "2023-01-03",
    262,
    "PayPal",
    "Approved"
  ),
  createData(
    "12348",
    "/images/spiderman.jpg",
    "Cupcake",
    "Jessie Pinkman",
    "2023-01-04",
    305,
    "Cash on Delivery",
    "Pending"
  ),
];

const List = () => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="tableCell">{row.trackingId}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt={row.product} className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.paymentMethod}</TableCell>
              <TableCell className="tableCell">
                <span className= {`status ${row.status}`}>{row.status}</span>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
