import React from "react";
import { useMutation } from "@apollo/react-hooks";
import ADD_VISITOR_COUNT from "../graphql/add-visitor-count.mutation";

const AddVisitorCount = () => {
  const [addVisitorCount] = useMutation(ADD_VISITOR_COUNT);
  const handleVisiorCount = async () => {
    console.log("Add Visitor Counts");
    await addVisitorCount();
    sessionStorage.setItem("visitor_count", "true");
  };
  React.useEffect(() => {
    const visitorCount = sessionStorage.getItem("visitor_count");
    if (!visitorCount) {
      handleVisiorCount();
    }
  }, []);
  return null;
};

export default AddVisitorCount;
