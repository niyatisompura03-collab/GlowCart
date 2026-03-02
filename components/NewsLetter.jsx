import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14 bg-white dark:bg-slate-950 transition-colors">
      <h1 className="md:text-4xl text-2xl font-medium text-gray-900 dark:text-gray-100">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-gray-500/80 dark:text-gray-400 pb-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-gray-500/30 dark:border-gray-800 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500 dark:text-gray-300 dark:bg-slate-900"
          type="text"
          placeholder="Enter your email id"
        />
        <button className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-hover rounded-md rounded-l-none transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
