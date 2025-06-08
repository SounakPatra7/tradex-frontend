import React from 'react';

const Title = () => {
  return (
    <section className="min-h-screen w-screen bg-gradient-to-r from-[#2e035f] to-[#0e034b] text-white pt-20">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <h1 className="text-6xl md:text-6xl font-bold leading-tight">
          Funding For <br />
          <span className="text-[#d68eff]">Forex Traders</span>
        </h1>
        <p className="text-gray-300 mt-4">
          Get real capital and receive <strong>80%</strong> of the profits.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-[#b70dc7] to-[#3432c4] text-white rounded-md transition-all duration-500 hover:from-[#9a0aab] hover:to-[#2a28a8] hover:-translate-y-0.5 hover:shadow-lg">
            Get Started
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-[#b70dc7]  to-[#3432c4] text-white rounded-md transition-all duration-500 hover:from-[#9a0aab] hover:to-[#2a28a8] hover:-translate-y-0.5 hover:shadow-lg">
            Join Our Discord
          </button>
        </div>
      </div>
    </section>
  );
};

export default Title;
