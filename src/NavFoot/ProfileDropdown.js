const ProfileDropdown = ({ userProfile }) => (
  <div className="absolute right-0 mt-2 bg-white/80 backdrop-blur-md shadow-lg rounded-lg py-2 w-56">
    <div className="px-4 py-2 text-gray-800">
      <p>
        <strong>Full Name:</strong> {userProfile.fullname}
      </p>
      <p>
        <strong>Email:</strong> {userProfile.email}
      </p>
      <p>
        <strong>Login ID:</strong> {userProfile.loginid}
      </p>
      <p>
        <strong>Country:</strong> {userProfile.country}
      </p>
      <p>
        <strong>Language:</strong> {userProfile.language}
      </p>
      <p>
        <strong>Timezone:</strong> {userProfile.timezone}
      </p>
      <p>
        <strong>Broker:</strong> {userProfile.broker}
      </p>
      <p>
        <strong>Created At:</strong> {userProfile.created_at}
      </p>
      <p>
        <strong>Local Currencies:</strong> {userProfile.local_currencies}
      </p>
    </div>
  </div>
);

export default ProfileDropdown;
