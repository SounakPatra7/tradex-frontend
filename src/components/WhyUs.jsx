import React from 'react';

const features = [
  {
    title: "Realistic Targets",
    description:
      "Many prop firms set the bar unrealistically high just to disqualify traders. We don’t. Our profit targets are carefully crafted using real market data and trader performance trends. This ensures that our goals are both motivating and achievable for traders of all levels. We focus on consistent performance, not short-term miracles.",
  },
  {
    title: "No Restrictions",
    description:
      "We give you total freedom over your trading. Trade any lot size, at any time, using any strategy that works best for you—no limitations on instruments, time frames, or risk styles. Whether you're trading during London open or holding overnight, you’re in control. You trade. We support.",
  },
  {
    title: "Unlimited Time",
    description:
      "Unlike most firms that pressure you with 30-day or 60-day challenges, we offer an unlimited time model. This means you can take your time to plan your trades, wait for ideal setups, and pass the evaluation at your own pace. There’s no ticking clock—just smart trading.",
  },
  {
    title: "Profit Split",
    description:
      "We believe your effort should be fairly rewarded. Our 80% profit split means that the vast majority of what you earn goes straight to you. Unlike other firms with hidden fees or smaller shares, we’re fully transparent and committed to making your success profitable for *you*, not just us.",
  },
  {
    title: "Bi-Weekly Payout",
    description:
      "You worked hard—why wait? We offer bi-weekly payouts to ensure you receive your earnings promptly and regularly. With two payout windows per month, you can rely on consistent income and enjoy the fruits of your trading performance without delays or complications.",
  },
  {
    title: "Scaling Plan",
    description:
      "As you prove your skills and consistency, we’ll help you grow. Our structured scaling plan boosts your capital over time, rewarding great performance with access to larger accounts. This helps you increase your profits without putting more of your own capital at risk. We grow with you.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-900 to-purple-800 text-white text-center py-16 px-5">
      <h1 className="text-5xl font-bold mb-10">Why Us</h1>
      <div className="grid gap-6 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 rounded-xl p-6 text-left hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="text-2xl text-fuchsia-400 font-bold mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
