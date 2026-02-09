"use client";

import { useParams } from "next/navigation";
import React from "react";

const PaymentFail = () => {
  const { transactionId } = useParams();
  return (
    <div>
      <h2>your payment failed. please try again {transactionId}</h2>
    </div>
  );
};

export default PaymentFail;
