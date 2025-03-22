import { useRef, useState } from "react"; // Importing hooks from React
import { useGSAP } from "@gsap/react"; // Importing useGSAP hook from GSAP React plugin
import gsap from "gsap"; // Importing GSAP for animations
import "remixicon/fonts/remixicon.css"; // Importing Remix Icons CSS for icons
import LocationSearchPanel from "../components/LocationSearchPanel"; // Importing LocationSearchPanel component

const Home = () => {
  // State variables to store user input
  const [pickup, setPickup] = useState(""); // Stores the pick-up location
  const [destination, setDestination] = useState(""); // Stores the destination
  const [panelOpen, setPanelOpen] = useState(false); // Controls the visibility of the panel
  const [vehiclePanel, setVehiclePanel] = useState(false);

  // Refs to target specific elements for animation
  const panelRef = useRef(null); // Reference for the location search panel
  const panelCloseRef = useRef(null); // Reference for the close button inside the panel
  const vehiclePanelRef = useRef(null);

  // Function to handle form submission (currently prevents default behavior)
  const submitHandler = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
  };

  // useGSAP hook to handle animations whenever `panelOpen` state changes
  useGSAP(
    function () {
      if (panelOpen) {
        // If panelOpen is true, animate panel expansion and fade-in
        gsap.to(panelRef.current, {
          height: "70%", // Expands panel to 70% height
          padding: 24, // Adds padding for better spacing
          opacity: 1, // Makes the panel fully visible
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1, // Makes the close button visible
        });
      } else {
        // If panelOpen is false, animate panel collapse and fade-out
        gsap.to(panelRef.current, {
          height: "0%", // Shrinks panel to 0% height (hidden)
          padding: 0, // Removes padding
          opacity: 0, // Makes the panel fully transparent
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0, // Hides the close button
        });
      }
    },
    [panelOpen] // Dependency array: re-run this animation whenever `panelOpen` changes
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Full-screen background image */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt="Background"
        />
      </div>

      {/* UI Container - Contains trip search form and location panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        {/* Search form container (Bottom panel) */}
        <div className="h-[30%] p-6 bg-white relative">
          {/* Close button for the panel */}
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false); // Closes the panel when clicked
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>{" "}
            {/* Remix Icon for close */}
          </h5>

          {/* Heading for the trip search panel */}
          <h4 className="text-2xl font-semibold">Find a trip</h4>

          {/* Form for entering pickup and destination */}
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {/* Vertical line between pickup and destination inputs */}
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>

            {/* Input field for pickup location */}
            <input
              onClick={() => setPanelOpen(true)} // Opens the panel when clicked
              value={pickup} // Binds input value to state
              onChange={(e) => setPickup(e.target.value)} // Updates state on input change
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />

            {/* Input field for destination */}
            <input
              onClick={() => setPanelOpen(true)} // Opens the panel when clicked
              value={destination} // Binds input value to state
              onChange={(e) => setDestination(e.target.value)} // Updates state on input change
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Location search panel (Initially hidden, expands when `panelOpen` is true) */}
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />{" "}
          {/* Component for location search */}
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8"
      >
        <h5 className="p-3 text-center absolute top-0 left-1/2 transform -translate-x-1/2">
          <i className="ri-arrow-down-wide-line"></i>
        </h5>

        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div className="flex border-2 border-white active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">₹193.20</h2>
        </div>

        <div className="flex border-2 border-white active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-base">
              Moto{" "}
              <span>
                <i className="ri-user-3-fill"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable motor cycle ride
            </p>
          </div>
          <h2 className="text-xl font-semibold">₹65.17</h2>
        </div>

        <div className="flex border-2 border-white active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberAuto{" "}
              <span>
                <i className="ri-user-3-fill"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable auto rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">₹118.68</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
