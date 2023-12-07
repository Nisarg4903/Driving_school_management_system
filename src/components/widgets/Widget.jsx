import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import {collection, query, where, getDocs} from "firebase/firestore"
import {db} from "../../Firebase"

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff] = useState(null);
  let data;

  switch (type) {
    case "student":
      data = {
        title: "STUDENTS",
        isMoney: false,
        link: "See all Students",
        icon: (
          <GroupsIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "instructor":
      data = {
        title: "INSTRUCTORS",
        isMoney: false,
        link: "See all Instructors",
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 162, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let querySnapshot;
        if (type === "student") {
          const studentsQuery = query(
            collection(db, "users"),
            where("role", "==", "student")
          );
          querySnapshot = await getDocs(studentsQuery);
          setAmount(querySnapshot.docs.length);
        } else if (type === "instructor") {
          const instructorsQuery = collection(db, "instructors");
          querySnapshot = await getDocs(instructorsQuery);
          setAmount(querySnapshot.docs.length);
        } else if (type === "earning") {
          const earningsQuery = collection(db, "users");
          querySnapshot = await getDocs(earningsQuery);
          const totalEarnings = querySnapshot.docs.reduce((total, doc) => {
            const payment = doc.data().payment;
            return total + (Number(payment) || 0); // Convert payment to a number and accumulate
          }, 0);
          setAmount(totalEarnings);
        }

        // Additional cases for "balance" can be handled here if needed
        // ...
      } catch (err) {
        console.error("Error fetching data: ", err);
        setAmount(0); // Set the amount to 0 if there is an error
      }
    };

    fetchData();
  }, [type]); // Add type as a dependency, so it re-runs when type changes

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
