import { Link } from "react-router-dom";
const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1494129935429-873eafa78178?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          alt="uber logo"
        />
        <div className="py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
