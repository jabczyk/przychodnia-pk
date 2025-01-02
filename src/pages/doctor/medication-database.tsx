import React from "react";
import { type NextPage } from "next";
import { MedicationDatabase } from "~/features/doctor/MedicationDatabase";
import { Navbar } from "~/components/navbar/Navbar";
import { Button } from "~/components/forms/Button";

const MedicationDatabasePage: NextPage = () => {
  const medicines = [
    { id: 1, name: "Aspirin", description: "Pain relief medication" },
    { id: 2, name: "Ibuprofen", description: "Anti-inflammatory drug" },
  ];

  return (
    <>
      <Navbar>
        <Button variant="secondary" size="base">
          Overview
        </Button>
        <Button variant="secondary" size="base">
          Calendar
        </Button>
        <Button variant="secondary" size="base">
          Medications
        </Button>
        <Button variant="secondary" size="base">
          Statistics
        </Button>
      </Navbar>{" "}
      <div className="mx-auto my-14 w-3/4 rounded-2xl bg-default-white p-6">
        <MedicationDatabase medicines={medicines}></MedicationDatabase>{" "}
      </div>
    </>
  );
};

export default MedicationDatabasePage;
