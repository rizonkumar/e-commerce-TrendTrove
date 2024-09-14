import { assets } from "../assets/assets";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaBriefcase,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, url: "https://www.instagram.com/rizon__kumar/" },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/rizonkumarrahi/",
    },
    { icon: <FaGithub />, url: "https://github.com/rizonkumar/" },
    { icon: <FaTwitter />, url: "https://x.com/RizonKumar" },
    { icon: <MdEmail />, url: "mailto:rizon.kumar.rahi@gmail.com" },
    {
      icon: <FaBriefcase />,
      url: "https://rizonkumarrahi.in/",
    },
  ];

  return (
    <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <img src={assets?.logo} className="mb-4 w-32" alt="logo" />
            <p className="text-gray-600 mb-4">
              Elevating your style with curated fashion collections and
              exceptional customer service.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/" className="hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="/delivery" className="hover:text-gray-900">
                  Delivery
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">GET IN TOUCH</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-2xl flex items-center"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-gray-300" />
        <p className="text-center text-gray-600 text-sm py-4">
          © 2024 Made with <FaHeart className="inline text-red-500" /> by Rizon
          Kumar Rahi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
