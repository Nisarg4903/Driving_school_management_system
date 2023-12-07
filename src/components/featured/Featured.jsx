import "./featured.scss";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";


const Featured = () => {

 const [totalPayments, setTotalPayments] = useState(0);
 const targetAmount = 100000; // 100% target

 useEffect(() => {
   const fetchPayments = async () => {
     const querySnapshot = await getDocs(collection(db, "users"));
     const total = querySnapshot.docs.reduce((sum, doc) => {
       const payment = Number(doc.data().payment) || 0;
       return sum + payment;
     }, 0);
     setTotalPayments(total);
   };

   fetchPayments();
 }, []);

 // Calculate the percentage of the target achieved
 const percentageOfTarget = (totalPayments / targetAmount) * 100;


  
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          {/* Display the progress towards the $100,000 target */}
          <CircularProgressbar
            value={percentageOfTarget}
            text={`${percentageOfTarget.toFixed(2)}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made today</p>
        {/* Display the total payments fetched */}
        <p className="amount">${totalPayments.toLocaleString()}</p>
        <p className="desc">
          Previous transactions proccesing. Last payment may not be included
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
