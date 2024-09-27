"use client";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

const Setting = () => {
  let globaluser = { fname: "Make", lname: " me" };

  const { register, handleSubmit } = useForm();

  const handleProfileSubmit = async (data: any) => {
    const id = toast.loading("Saving...");

    try {
      toast.dismiss(id);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.dismiss(id);
      console.error("ERROR MESSAGE - ", error.message);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col p-2 md:p-6 gap-10 w-[90%] mx-auto min-h-screen">
      <h1 className="text-black font-semibold text-4xl font-inter">
        Edit Profile
      </h1>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-row gap-4 justify-between items-center text-white bg-red-800 p-8 rounded-lg">
          <div className="flex flex-row gap-8 items-center justify-between">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${globaluser.fname}%20${globaluser.lname}`}
              alt="xyz"
              className="aspect-square w-20 rounded-full object-cover"
            />
            <div>
              <p className="text-lg my-1">
                {globaluser.fname} {globaluser.lname}
              </p>
              {/* <div className="flex flex-col md:flex-row gap-4 mt-2">
                <button
                  className="py-2 bg-richblack-700 text-[#C5C7D4] rounded-lg px-4 font-semibold"
                  onClick={handleClick}
                >
                  Select
                </button>
                <button
                  className="flex flex-row gap-2 items-center text-black bg-yellow-50 rounded-lg px-4 py-2 font-semibold"
                  onClick={handleFileUpload}
                >
                  <p>Upload</p>
                  <BiCloudUpload className="text-lg" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div> */}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleProfileSubmit)}>
          {/* {!loggedInTeacher && (
            <div className="flex flex-col gap-4 justify-between  text-white bg-red-800 p-8 rounded-lg my-4 ">
              <div className="flex flex-row gap-8 items-center justify-between">
                <div>
                  <p className="text-lg my-1 font-semibold font-inter">
                    Personal Details
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mt-4 w-[90%] md:w-[80%] gap-3">
                <div className="flex flex-col gap-8 w-[100%] md:w-[40%]">
                  <label htmlFor="rollNumber">
                    <p className="text-[#F1F2FF]">NSUT Roll Number</p>
                    <input
                      type="text"
                      name="roll"
                      id="roll"
                      placeholder="Enter NSUT Roll Number"
                      defaultValue={globaluser?.roll}
                      {...register("roll", { required: false })}
                      className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                    />
                  </label>
                  <label htmlFor="dli">
                    <p className="text-[#F1F2FF]">DLI Number</p>
                    <input
                      type="text"
                      name="dli"
                      id="dli"
                      placeholder="Enter DLI Number"
                      defaultValue={globaluser?.dli}
                      {...register("dli", { required: false })}
                      className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-8 w-[100%] md:w-[40%]">
                  <label htmlFor="father">
                    <p className="text-[#F1F2FF]">Father's Name</p>
                    <input
                      type="text"
                      name="father"
                      id="father"
                      placeholder="Enter Father's Name"
                      defaultValue={globaluser?.fatherName}
                      {...register("father")}
                      className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                    />
                  </label>
                  <label htmlFor="mother">
                    <p className="text-[#F1F2FF]">Mother's Name</p>
                    <input
                      type="text"
                      name="mother"
                      id="mother"
                      placeholder="Enter Mother's Name"
                      defaultValue={globaluser?.motherName}
                      {...register("mother")}
                      className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                    />
                  </label>
                </div>
              </div>
            </div>
          )} */}

          <div className="flex flex-col gap-4 justify-between  text-white bg-red-800 p-8 rounded-lg">
            <div className="flex flex-row gap-8 items-center justify-between">
              <div>
                <p className="text-lg my-1 font-semibold font-inter">
                  Profile Information
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:w-[80%] w-[90%] gap-3">
              <div className="flex flex-col gap-8 md:w-[40%] w-[100%]">
                <label htmlFor="firstName">
                  <p className="text-[#F1F2FF]">First Name</p>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    defaultValue={globaluser?.fname}
                    {...register("firstName", { required: false })}
                    className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                  />
                </label>
                <label htmlFor="lastname">
                  <p className="text-[#F1F2FF]">Last Name</p>
                  <input
                    type="text"
                    name="LastName"
                    id="lastname"
                    placeholder="Enter Last Name"
                    defaultValue={globaluser?.lname}
                    {...register("lastName", { required: false })}
                    className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                  />
                </label>

                <label htmlFor="address">
                  <p className="text-[#F1F2FF]">Address</p>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter Address"
                    defaultValue={globaluser?.address}
                    {...register("address")}
                    className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                  />
                </label>

                <label htmlFor="contact">
                  <p className="text-[#F1F2FF]">Contact Number</p>
                  <input
                    type="number"
                    name="phoneNumb"
                    id="contact"
                    placeholder="Enter Contact Number"
                    defaultValue={globaluser?.contact}
                    {...register("phoneNumb")}
                    className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-8 md:w-[40%] w-[100%]">
                <label htmlFor="bloodType">
                  <p className="text-[#F1F2FF]">Blood type</p>
                  <input
                    type="text"
                    name="bloodType"
                    id="bloodType"
                    placeholder="Enter Bloodtype"
                    defaultValue={globaluser?.blood}
                    {...register("bloodType")}
                    className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                  />
                </label>
                <label htmlFor="gender">
                  <p className="text-[#F1F2FF]">Gender</p>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    placeholder="Enter Gender"
                    defaultValue={globaluser?.gender}
                    {...register("gender")}
                    className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                  />
                </label>

                <label htmlFor="dob">
                  <p className="text-[#F1F2FF]">Date of Birth</p>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    placeholder="Enter dob"
                    defaultValue={globaluser?.dob}
                    {...register("dob")}
                    className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                  />
                </label>

                {/* {!loggedInTeacher && (
                  <>
                    <label htmlFor="rank">
                      <p className="text-[#F1F2FF]">Rank</p>
                      <input
                        type="text"
                        name="rank"
                        id="rank"
                        placeholder="Enter rank"
                        defaultValue={globaluser?.rank}
                        {...register("rank")}
                        className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                      />
                    </label>
                    <label htmlFor="company">
                      <p className="text-[#F1F2FF]">Company</p>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        placeholder="Enter company"
                        defaultValue={globaluser?.company}
                        {...register("company")}
                        className="bg-[#D3E3FD] p-2 rounded-md mt-3 focus:outline-none w-[100%] text-black font-medium"
                      />
                    </label>
                  </>
                )} */}
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse gap-4 mt-6">
            {/* To be edited */}
            <button
              className="bg-black text-white rounded-lg p-4 font-semibold"
              onClick={() => {
                window.location.href = "/dashboard/profile";
              }}
            >
              Cancel
            </button>
            <button
              className="flex flex-row items-center text-white bg-red-600 rounded-lg font-semibold p-4"
              type="submit"
            >
              <p>Save</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
