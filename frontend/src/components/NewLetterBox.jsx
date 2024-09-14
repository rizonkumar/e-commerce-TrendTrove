const NewLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Subscribe now & get 20% off
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our newsletter for exclusive deals, style tips, and new arrival
            updates.
          </p>
          <form
            className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3"
            onSubmit={onSubmitHandler}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
            <button
              className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition duration-300 ease-in-out"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLetterBox;
