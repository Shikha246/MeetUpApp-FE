import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
const [selectedType, setSelectedType] = useState("All");
const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetch("https://meet-up-app-weld.vercel.app/")
      .then((res) => res.json())
      .then((data) => {
        // Since your backend might return an array or object, 
        // ensure we are setting an array.
        setEvents(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="spinner-border text-danger" role="status"></div>
        <p style={{ marginTop: "10px" }}>Loading events...</p>
      </div>
    </div>
  );
}


    

  
// const filteredEvents =
//   selectedType === "All"
    // ? events
//     : events.filter(
//         (event) =>
//           event.eventType[0]?.toLowerCase() ===
//           selectedType.toLowerCase()
//       );

// const filterByType = (events) => {
//   if (selectedType === "All") return events;
//   return events.filter(
//     (event) =>
//       event.eventType?.toLowerCase() === selectedType.toLowerCase()
//   );
// };

const filterByType = (events) => {
  if (selectedType === "All") return events;

  return events.filter((event) =>
    event.eventType?.some(
      (type) =>
        type.toLowerCase() === selectedType.toLowerCase()
    )
  );
};


const filterBySearch = (events) => {
  if (!searchTerm.trim()) return events;
  return events.filter((event) =>
    event.eventName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
};

let filteredEvents = filterBySearch(filterByType(events));

  return (
    <div className="container-fluid">
    {/* Navbar */}
<nav className="navbar navbar-expand-lg bg-dark border-bottom navbar-dark">
  <div className="container-fluid">

    {/* Logo */}
    <Link className="navbar-brand fw-bold text-danger" to="/">
      meetup
    </Link>

    {/* Toggle Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navbar Content */}
    <div className="collapse navbar-collapse" id="navbarContent">

      {/* Left Links */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
        <li className="nav-item">
          <Link className="nav-link active fw-semibold" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-semibold" to="/create">
            Create Meet
          </Link>
        </li>
      </ul>

      {/* Search + Dropdown */}
      <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-3 mt-3 mt-lg-0 w-100 w-lg-auto">

        <input
          className="form-control"
          type="search"
          placeholder="Search by title"
           value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select"
          style={{ width: "180px" }}
          value={selectedType}
  onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">both</option>
          <option value="online">online</option>
          <option value="offline">offline</option>
          
        </select>
</div>
      </div>
    </div>
 
</nav>
<div className="container py-4">
      <div className="d-flex justify-content-between align-items-center m-4">

        <h2 className="fw-bold">Upcoming Meetups</h2>
      </div>

      {/* The 'row' is crucial to prevent the cards from squashing */}
      <div className="row g-4 justify-content-center">
        {filteredEvents.map((event) => (
          <div className="col-12 col-md-6 col-lg-4" key={event._id}>
            <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden">
              
              {/* Image with Badge */}
              <div className="position-relative">
                <img
                  src={event.coverImgUrl}
                  className="card-img-top img-fluid"
                  alt={event.eventName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <span className="badge bg-white text-dark position-absolute top-0 start-0 m-2 shadow-sm">
                   {event.eventType}
                </span>
              </div>

              {/* Card Content */}
              <div className="card-body">
                <p className="text-muted small mb-1">
                  {new Date(event.startDateTime).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
                
                <h5 className="card-title fw-bold mb-3">{event.eventName}</h5>

                {/* Stretched Link makes the whole card clickable */}
                <Link
                  to={`/meetups/${event._id}`}
                  className="stretched-link"
                ></Link>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  </div>
  );

};
   

export default EventList;