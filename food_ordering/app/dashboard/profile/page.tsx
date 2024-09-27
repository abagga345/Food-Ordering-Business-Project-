"use client";
import { AiFillEdit } from "react-icons/ai";

const MyProfile = () => {
  let globaluser = { fname: "Make", lname: " me" };
  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 md:gap-10 w-full md:w-[80%] mx-auto justify-center items-center">
      <h1 className="text-black font-semibold text-2xl md:text-4xl font-inter">
        My Profile
      </h1>
      <div className="flex flex-col gap-6 md:gap-8 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-4 justify-between items-center text-white bg-red-800 p-4 md:p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between w-full">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${globaluser?.fname}%20${globaluser?.lname}`}
              alt="profile"
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="flex flex-col md:items-start items-center text-center md:text-left">
              <p className="text-lg">
                {globaluser?.rank}
                {"  "}
                {globaluser?.fname + " "}
                {globaluser?.lname ? globaluser?.lname : ""}
              </p>
              <p className="text-[#838894] text-md">{globaluser?.email}</p>
            </div>
            <button
              onClick={() => {
                window.location.href = "/dashboard/settings";
              }}
            >
              <div className="flex flex-row items-center gap-2">
                <AiFillEdit />
                Edit
              </div>
            </button>
          </div>
        </div>

        {/* {!loggedInTeacher && (
          <div className="flex flex-col gap-4 justify-between items-center text-white bg-red-800 p-4 md:p-8 rounded-lg w-full">
            <div className="flex flex-col gap-6 justify-between w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <p className="text-lg">Personal Details</p>
                <IconBtn
                  text="Edit"
                  onClick={() => {
                    navigate("/dashboard/settings");
                  }}
                >
                  <AiFillEdit />
                </IconBtn>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
                <div className="flex flex-col gap-4 md:gap-8 w-full">
                  <div>
                    <p>NSUT Roll Number</p>
                    <p className="text-[#838894]">
                      {globaluser?.roll
                        ? `${globaluser?.roll}`
                        : "Add Roll Number"}
                    </p>
                  </div>

                  <div>
                    <p>DLI Number</p>
                    <p className="text-[#838894]">
                      {globaluser?.dli
                        ? `${globaluser?.dli}`
                        : "Add DLI Number"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:gap-8 w-full">
                  <div>
                    <p>Father's Name</p>
                    <p className="text-[#838894]">
                      {globaluser?.fatherName
                        ? `${globaluser?.fatherName}`
                        : "Add Father's Name"}
                    </p>
                  </div>
                  <div>
                    <p>Mother's Name</p>
                    <p className="text-[#838894]">
                      {globaluser?.motherName
                        ? `${globaluser?.motherName}`
                        : "Add Mother's Name"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        <div className="flex flex-col gap-4 justify-between items-center text-white bg-red-800 p-4 md:p-8 rounded-lg w-full">
          <div className="flex flex-col gap-6 justify-between w-full">
            <div className="flex flex-row w-full justify-between items-center sm:gap-8">
              <p className="text-lg">Profile Details</p>
              <button
                onClick={() => {
                  window.location.href = "/dashboard/settings";
                }}
              >
                <div className="flex flex-row items-center gap-2">
                  <AiFillEdit />
                  Edit
                </div>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
              <div className="flex flex-col gap-4 md:gap-8 w-full">
                <div>
                  <p>Email</p>
                  <p className="text-[#838894]">{globaluser?.email}</p>
                </div>

                <div>
                  <p>Gender</p>
                  <p className="text-[#838894]">
                    {globaluser?.gender
                      ? `${globaluser?.gender}`
                      : "Add Gender"}
                  </p>
                </div>

                <div>
                  <p>Date Of Birth</p>
                  <p className="text-[#838894]">
                    {globaluser?.dob ? `${globaluser?.dob}` : "Add DOB"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:gap-8 w-full">
                <div>
                  <p>Contact</p>
                  <p className="text-[#838894]">
                    {globaluser?.contact
                      ? `${globaluser?.contact}`
                      : "Add Contact"}
                  </p>
                </div>

                <div>
                  <p>Address</p>
                  <p className="text-[#838894]">
                    {globaluser?.address
                      ? `${globaluser?.address}`
                      : "Add Address"}
                  </p>
                </div>
                <div>
                  <p>Blood Type</p>
                  <p className="text-[#838894]">
                    {globaluser?.blood
                      ? `${globaluser?.blood}`
                      : "Add Blood Type"}
                  </p>
                </div>
                {/* {!loggedInTeacher && (
                  <div>
                    <p>Company</p>
                    <p className="text-[#838894]">
                      {globaluser?.company
                        ? `${globaluser?.company}`
                        : "Add Company"}
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
