import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import ProfileDropdown from "./ProfileDropdown";

const UserProfile = ({
  user,
  userProfile,
  loading,
  profileOpen,
  toggleProfileMenu,
}) => {
  return (
    <div className="relative">
      {loading ? (
        <div className="flex items-center space-x-2">
          <PuffLoader color="#000000" size={24} />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2"
          >
            <img
              src={userProfile?.avatar || "/assets/logo.jpg"}
              alt="Profile Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>{userProfile?.fullname}</span>
            <FaChevronDown className="text-gray-600" />
          </button>

          {profileOpen && <ProfileDropdown userProfile={userProfile} />}
        </>
      )}
    </div>
  );
};

export default UserProfile;
