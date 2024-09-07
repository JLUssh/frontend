import TopBar from "@comp/TopBar";
import Homepage from "@pag/Homepage";
import SinglePage from "@pag/SinglePage";
import LoginPage from "@pag/LoginPage";
import RegisterPage from "@pag/RegisterPage";
import Settings from "@pag/Settings";
import Write from "@pag/Write";
import ImageAll from "@pag/ImageAll";

// import React, { useEffect } from "react";
import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { withScrollTop } from "./hoc";

const NewHomePage = withScrollTop(Homepage);

const App: React.FC = () => {
  return (
    <div className="App">
      {/* React.Fragment */}
      <>
        <TopBar />
        <Routes>
          <Route path="/" element={<NewHomePage />} />
          <Route path="/post/:postId" element={<SinglePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/write" element={<Write />} />
          <Route path="/test" element={<ImageAll />} />
        </Routes>
        {/* <Home /> */}
      </>
    </div>
  );
};

export default App;
