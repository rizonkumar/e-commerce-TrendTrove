import { assets } from "../assets/assets";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaBriefcase,
  FaHeart,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
    { icon: <FaBriefcase />, url: "https://rizonkumarrahi.in/" },
  ];

  return (
    <footer className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <img src={assets?.logo} className="mb-4 w-32" alt="Forever logo" />
            <p className="mb-4 text-gray-600">
              Elevating your style with curated fashion collections and
              exceptional customer service.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold">COMPANY</h3>
            <ul className="space-y-2 text-gray-600">
              {["Home", "About", "Contact", "Our Policy"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="transition-colors duration-300 hover:text-gray-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold">GET IN TOUCH</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-600 transition-colors duration-300 hover:text-gray-900"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="mb-4 border-gray-300" />
        <p className="text-center text-sm text-gray-600">
          © 2024 Made with <FaHeart className="inline text-red-500" /> by Rizon
          Kumar Rahi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
