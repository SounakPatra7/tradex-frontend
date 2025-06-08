import React from 'react';
import { FaSignInAlt, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

const steps = [
  {
    icon: <FaSignInAlt />,
    label: 'Login',
    desc: 'Sign in to your account to start predicting the stock market outcomes.',
  },
  {
    icon: <FaChartLine />,
    label: 'Predict',
    desc: 'Analyze trends and make your predictions on stock movements.',
  },
  {
    icon: <FaMoneyBillWave />,
    label: 'Earn',
    desc: 'Get rewarded instantly based on the accuracy of your predictions.',
  },
];

const Arrow = () => (
  <div className="hidden sm:block text-4xl text-white">
    <HiArrowNarrowRight />
  </div>
);

const ProcessPage = () => {
  return (
    <div className="w-full py-20 text-center bg-gradient-to-r from-[#2e035f] to-[#0e034b] text-white">
      <h1 className="text-5xl text-white mb-12 font-bold">Process</h1>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="bg-purple-700 text-white p-6 rounded-3xl shadow-lg max-w-xs w-full hover:shadow-purple-500 hover:-translate-y-1 transition-transform duration-300 text-left">
              <div className="text-6xl mb-4 mx-auto">{step.icon}</div>
              <h2 className="text-2xl font-semibold mb-2">{step.label}</h2>
              <p className="text-sm">{step.desc}</p>
            </div>
            {idx < steps.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProcessPage;
