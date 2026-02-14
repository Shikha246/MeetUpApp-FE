import { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    hostedBy: "",
    eventType:"",
    coverImgUrl: "",
    details: "",
    dressCode: "",
    ageRestrictions: "",
    eventTags: [],
    startDateTime: "",
    endDateTime: "",
    location: {
      plotNo: "",
      address: "",
      city: ""
    },
    amount: "",
    speakers: [
      {
        speakersImageUrl: "",
        speakersName: "",
        speakersProfession: ""
      }
    ]
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value
      }
    });
  };
 const handleTypeChange = (e) => {
  setFormData({
    ...formData,
    eventType: e.target.value
  });
};


 const handleSpeakerChange = (e) => {
  const { name, value } = e.target;
  // We map through speakers. If we had multiple, we'd pass an 'index' to this function.
  const updatedSpeakers = formData.speakers.map((speaker, index) => {
    if (index === 0) { // For now, we only have one speaker at index 0
      return { ...speaker, [name]: value };
    }
    return speaker;
  });
  
  setFormData({ ...formData, speakers: updatedSpeakers });
};

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      eventTags: prev.eventTags.includes(value)
        ? prev.eventTags.filter(tag => tag !== value)
        : [...prev.eventTags, value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      alert("Event Created Successfully 🎉");
    } catch (error) {
      console.error(error);
      alert("Error creating event");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Meetup Event</h2>

      <form onSubmit={handleSubmit}>

        <input className="form-control mb-2" name="eventName" placeholder="Event Name" onChange={handleChange} />
       


<label className="mt-2">Event Type</label>
<br />

<input
  type="radio"
  name="eventType"
  value="Online"
  checked={formData.eventType === "Online"}
  onChange={handleTypeChange}
/>
<span className="ms-1">Online</span>

<input
  type="radio"
  name="eventType"
  value="Offline"
  checked={formData.eventType === "Offline"}
  onChange={handleTypeChange}
  className="ms-3"
/>
<span className="ms-1">Offline</span>

        <input className="form-control mb-2" name="hostedBy" placeholder="Hosted By" onChange={handleChange} />
        <input className="form-control mb-2" name="coverImgUrl" placeholder="Cover Image URL" onChange={handleChange} />

        <textarea className="form-control mb-2" name="details" placeholder="Event Details" onChange={handleChange} />

        <input className="form-control mb-2" name="dressCode" placeholder="Dress Code" onChange={handleChange} />
        <input className="form-control mb-2" name="ageRestrictions" placeholder="Age Restrictions" onChange={handleChange} />

        <label className="mt-2">Event Tags</label><br />
        <input type="checkbox" value="Marketing" onChange={handleTagsChange} /> Marketing
        <input type="checkbox" value="Digital" onChange={handleTagsChange} className="ms-3" /> Digital

        <br /><br />

        <label>Start Date & Time</label>
        <input type="datetime-local" className="form-control mb-2" name="startDateTime" onChange={handleChange} />

        <label>End Date & Time</label>
        <input type="datetime-local" className="form-control mb-2" name="endDateTime" onChange={handleChange} />

        <h5 className="mt-3">Location</h5>
        <input className="form-control mb-2" name="plotNo" placeholder="Plot No" onChange={handleLocationChange} />
        <input className="form-control mb-2" name="address" placeholder="Address" onChange={handleLocationChange} />
        <input className="form-control mb-2" name="city" placeholder="City" onChange={handleLocationChange} />

        <input className="form-control mb-2" name="amount" type="number" placeholder="Price" onChange={handleChange} />

        <h5 className="mt-3">Speaker</h5>
        <input className="form-control mb-2" name="speakersName" placeholder="Speaker Name" onChange={handleSpeakerChange} />
        <input className="form-control mb-2" name="speakersProfession" placeholder="Speaker Profession" onChange={handleSpeakerChange} />
        <input className="form-control mb-2" name="speakersImageUrl" placeholder="Speaker Image URL" onChange={handleSpeakerChange} />

        <button className="btn btn-primary mt-3">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
     