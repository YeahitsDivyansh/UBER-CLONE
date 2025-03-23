import { useRef, useState } from "react"; // Importing hooks from React
import { useGSAP } from "@gsap/react"; // Importing useGSAP hook from GSAP React plugin
import gsap from "gsap"; // Importing GSAP for animations
import "remixicon/fonts/remixicon.css"; // Importing Remix Icons CSS for icons
import LocationSearchPanel from "../components/LocationSearchPanel"; // Importing LocationSearchPanel component
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  // State variables to store user input
  const [pickup, setPickup] = useState(""); // Stores the pick-up location
  const [destination, setDestination] = useState(""); // Stores the destination
  const [panelOpen, setPanelOpen] = useState(false); // Controls the visibility of the panel
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  // Refs to target specific elements for animation
  const panelRef = useRef(null); // Reference for the location search panel
  const panelCloseRef = useRef(null); // Reference for the close button inside the panel
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

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

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
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
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14"
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
