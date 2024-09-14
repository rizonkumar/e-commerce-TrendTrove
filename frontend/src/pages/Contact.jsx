import React from "react";
import Title from "../components/Title";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaLaptopCode,
} from "react-icons/fa";

const Contact = () => {
  const handleStartConversation = () => {
    window.location.href = "mailto:rizon.kumar.rahi@gmail.com";
  };

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/rizonkumarrahi/",
    },
    { icon: <FaGithub />, url: "https://github.com/rizonkumar" },
    { icon: <FaTwitter />, url: "https://twitter.com/RizonKumar" },
  ];

  return (
    <div className="py-16 pt-12 lg:py-24 lg:pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Title text1="GET IN" text2="TOUCH" />
          <p className="mt-4 text-xl text-gray-500">
            Let's collaborate on your next digital venture
          </p>
        </div>

        <div className="relative z-0 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-300 to-sky-400 px-10 py-8 text-left">
          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
            <div className="flex-1">
              <h2 className="mb-4 font-serif text-2xl text-gray-900 md:text-3xl">
                Ready to Bring Your Ideas to Life?
              </h2>
              <p className="mb-4 text-sm text-gray-800 md:text-base">
                I'm a full-stack developer who's been building web apps for a
                couple of years. I'm really into React, Redux, Tailwind CSS,
                Express JS, and Prisma. I've used these tools to create some
                awesome websites. I also have experience working with Salesforce
                Commerce Cloud (SFCC) to build e-commerce platforms.
              </p>
              <ul className="mb-4 list-inside list-disc text-sm text-gray-800 md:text-base">
                <li>Skilled in React, Next.js, Node.js, and more</li>
                <li>Experienced with MySQL, MongoDB, and Prisma</li>
                <li>Proficient in various development tools and platforms</li>
              </ul>
              <p className="text-sm text-gray-800 md:text-base">
                Let's discuss how I can contribute to your project's success!
              </p>
            </div>
            <div>
              <button
                onClick={handleStartConversation}
                className="relative inline-flex h-12 w-max items-center gap-2 overflow-hidden rounded-xl border border-gray-950 bg-gray-900 px-6 text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
              >
                <span className="font-semibold">Start a Conversation</span>
                <FaEnvelope className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-semibold">
            Connect with me on:
          </h3>
          <div className="flex justify-center gap-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-gray-400 transition-colors duration-300 hover:text-emerald-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold">Coding Achievements</h3>
          <ul className="text-gray-600">
            <li>
              Built various projects, checkout my github profile for more
              details
            </li>
            <li>Ranked 96th Worldwide in LeetCode Weekly Contest 294</li>
            <li>Solved 700+ problems on LeetCode, GFG, and CodeStudio</li>
            <li>
              Achieved #1 GFG Rank at SRM Institute of Science and Technology
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            I'm seeking full-time opportunities as a Software Engineer or Full
            Stack Developer. Let's discuss how I can contribute to your team's
            success!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
