import React from 'react';

const phases = [
  { icon: '📈', title: 'Phase 1', desc: 'Many prop firms set the bar unrealistically high just to disqualify traders. We don’t. Our profit targets are carefully crafted using real market data and trader performance trends. This ensures that our goals are both motivating and achievable for traders of all levels. We focus on consistent performance, not short-term miracles.' },
  { icon: '🧠', title: 'Phase 2', desc: 'Many prop firms set the bar unrealistically high just to disqualify traders. We don’t. Our profit targets are carefully crafted using real market data and trader performance trends. This ensures that our goals are both motivating and achievable for traders of all levels. We focus on consistent performance, not short-term miracles.' },
  { icon: '👑', title: 'Trader', desc: 'Many prop firms set the bar unrealistically high just to disqualify traders. We don’t. Our profit targets are carefully crafted using real market data and trader performance trends. This ensures that our goals are both motivating and achievable for traders of all levels. We focus on consistent performance, not short-term miracles.' },
];

const Arrow = () => (
  <div className="text-2xl text-gray-300 mx-4">→</div>
);

const HowItWorksPage = () => {
  return (
    <div className="w-full text-center bg-gradient-to-r from-[#2e035f] to-[#0e034b] text-white py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-5xl text-white mb-12 font-bold">How It Works</h1>
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {phases.map((phase, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`bg-purple-700 text-white p-6 rounded-3xl shadow-lg w-full sm:w-[300px] hover:shadow-purple-500 text-left hover:-translate-y-1 transition-transform duration-300
                  ${idx === 0 || idx === 2 ? '-translate-y-3' : ''}`}
              >
                <div className="text-3xl mb-2">{phase.icon}</div>
                <h2 className="text-xl font-bold text-fuchsia-400 ">{phase.title}</h2>
                <p className="text-sm">{phase.desc}</p>
              </div>
              {idx < phases.length - 1 && (
                <div className="hidden sm:block">
                  <Arrow />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
  
  
  
};

export default HowItWorksPage;