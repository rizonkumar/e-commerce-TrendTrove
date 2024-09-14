import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets?.exchange_icon,
      title: "Easy Exchange Policy",
      description:
        "Hassle-free exchanges within 30 days of purchase. Your satisfaction is our priority.",
    },
    {
      icon: assets?.quality_icon,
      title: "7 Days Return Policy",
      description:
        "Full refunds available for unopened items returned within 7 days. Shop with confidence.",
    },
    {
      icon: assets?.support_img,
      title: "24/7 Customer Support",
      description:
        "Our dedicated team is always ready to assist you. Get help anytime, anywhere.",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Our Customer Policies
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={policy.icon}
                className="w-16 h-16 mx-auto mb-4"
                alt={policy.title}
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {policy.title}
              </h3>
              <p className="text-gray-600">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
