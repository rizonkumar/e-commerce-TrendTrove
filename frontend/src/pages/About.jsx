import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewLetterBox from "../components/NewLetterBox";
import {
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaTshirt,
  FaLeaf,
  FaHeart,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <Title text1={"OUR"} text2={"STORY"} />
          <p className="mt-4 text-xl text-gray-500">
            Crafting Style, Delivering Smiles
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center gap-16 lg:flex-row">
          <div className="lg:w-1/2">
            <img
              src={assets.about_img}
              alt="About Forever"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-6 text-gray-600 lg:w-1/2">
            <h3 className="text-3xl font-semibold text-gray-900">
              Redefining Fashion, One Garment at a Time
            </h3>
            <p>
              At Forever, we believe that clothing is more than just fabric—it's
              an expression of individuality and a source of confidence. Founded
              in 2024 by Rizon Kumar Rahi, our journey began with a simple
              vision: to create high-quality, stylish clothing that empowers
              people to look and feel their best.
            </p>
            <p>
              Our team of passionate designers and skilled artisans work
              tirelessly to bring you collections that blend timeless elegance
              with contemporary trends. We source the finest materials and
              employ sustainable practices to ensure that our garments not only
              look great but also stand the test of time.
            </p>
            <div className="mt-8">
              <h4 className="text-2xl font-semibold text-gray-900">
                Our Mission
              </h4>
              <p className="mt-4">
                To inspire confidence and self-expression through fashion, while
                fostering a community that values sustainability, inclusivity,
                and exceptional customer experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Quality Assurance",
                description:
                  "We never compromise on quality, ensuring each piece meets our rigorous standards.",
              },
              {
                icon: <FaClock />,
                title: "Convenience",
                description:
                  "Shop anytime, anywhere with our user-friendly website and mobile app.",
              },
              {
                icon: <FaHeadset />,
                title: "Exceptional Service",
                description:
                  "Our dedicated support team is always ready to assist you with any queries.",
              },
              {
                icon: <FaTshirt />,
                title: "Diverse Collections",
                description:
                  "From casual wear to formal attire, we have styles for every occasion.",
              },
              {
                icon: <FaLeaf />,
                title: "Sustainability Focus",
                description:
                  "We're committed to reducing our environmental impact through eco-friendly practices.",
              },
              {
                icon: <FaHeart />,
                title: "Community-Driven",
                description:
                  "We value our customers and actively engage with our fashion-forward community.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-6 shadow-md transition duration-300 hover:shadow-xl"
              >
                <div className="mb-4 text-4xl text-indigo-600">{item.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NewLetterBox />
    </div>
  );
};

export default About;
