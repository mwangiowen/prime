import telegramIcon from "../assets/telegramicon.png";

const SignInTelegramLinks = ({ oauthUrl }) => (
  <>
    <a
      href={oauthUrl}
      className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
    >
      Sign-In/Signup
    </a>
    <a
      href="https://t.me/+JhrZnJHbz701YWU8"
      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={telegramIcon}
        alt="Telegram Icon"
        className="h-6 w-6 rounded-full mr-2"
      />
      Join Telegram
    </a>
  </>
);

export default SignInTelegramLinks;
