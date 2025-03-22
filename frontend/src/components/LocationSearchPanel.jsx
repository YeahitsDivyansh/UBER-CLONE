const LocationSearchPanel = (props) => {
  console.log(props);
  //sample array for location search
  const locations = [
    "House No.43, Near SDSN Degree College, Gomtinagar, Lucknow",
    "House No.47/112, Near Kapoor N Sons Cafe Gomtinagar, Lucknow",
    "House No.51, City Mall, Indiranagr, Lucknow",
    "House No.42C, Singhania Office, Kapoorthala, Lucknow",
  ];

  return (
    <div>
      {locations.map(function (elem, idx) {
        return (
          <div
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            key={idx}
            className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-4 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
