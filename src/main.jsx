import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import RequestService from "./components/RequestService.jsx";
import TrackRequest from "./components/TrackRequest.jsx";
import TrackDetails from "./components/TrackDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      { index: true, element: <Hero /> },
      { path: "services", element: <Services /> },
      {
        path: "services/request/:serviceId/:serviceName",
        element: <RequestService />,
      },
      {
        path:"track",
        element:<TrackRequest/>
      },
      {
        path:"track/:requestId",
        element:<TrackDetails/>
      }
 ] } 
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <RouterProvider router={router} />
    
  </StrictMode>
);
