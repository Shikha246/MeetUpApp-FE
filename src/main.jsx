import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventList from "./pages/EventList.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <EventList />,
  },
  {
    path: "/create",
    element: <CreateEvent />,
  },
  {
    path: "/meetups/:meetId",
    element: <EventDetails />,
  },
 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
