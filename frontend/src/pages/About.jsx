import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewLetterBox from "../components/NewLetterBox";

const About = () => {
  return (
    <div>
      <div className="border-t pt-8 text-center text-2xl">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col gap-16 md:flex-row">
        <img
          src={assets.about_img}
          alt="about-img"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ea
            inventore voluptatibus sint.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            voluptate, eaque nobis obcaecati quidem doloribus.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Voluptatibus aliquid sit exercitationem quibusdam quia fuga.
            Magni necessitatibus praesentium sed! Eligendi, quia corporis.
          </p>
        </div>
      </div>
      <div className="py-4 text-xl">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="mb-20 flex flex-col text-sm md:flex-row">
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b className="">Quality Assurance :</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
            aliquid in pariatur?
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b className="">Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
            aliquid in pariatur?
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b className="">Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
            aliquid in pariatur?
          </p>
        </div>
      </div>
      <NewLetterBox />
    </div>
  );
};

export default About;
