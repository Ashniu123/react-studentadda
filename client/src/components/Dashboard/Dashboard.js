import React from "react";

import Notes from "./Notes/Notes";
import Calendar from "./Calendar";

const Dashboard = () => (
  <main>
    <Notes />
    <hr className="hr-75 hr-rounded-warning" />
    <Calendar />
    <hr className="hr-75 hr-rounded-warning" />
  </main>
);

export default Dashboard;
