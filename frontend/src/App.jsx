import { useEffect, useState } from "react";

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then(setListings);
  }, []);

  return (
    <div>
      <h1>WanderLust</h1>
      <div className="listings">
        {listings.map((list) => (
          <div key={list._id}>
            <img src={list.image.url} alt={list.title} className="h-[20rem]"/>
            <h2>{list.title}</h2>
            <p>₹{list.price}/night</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;