import React from 'react';
import PayoutImage from '../assets/payout-img.jpg';
import WhyUsImage from '../assets/payout-img2.avif';

const PayoutSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-indigo-900 to-purple-800 text-white text-center py-20 overflow-x-hidden">
      <div className="flex flex-col items-center gap-16 mb-16">
        <h2 className="text-5xl font-bold text-white">Pay Out</h2>

        {/* Section 1 */}
        <div className="flex flex-row justify-center  gap-8 w-full max-w-6xl flex-wrap sm:flex-nowrap">
          <div className="flex-1 max-w-lg min-w-[300px]">
            <img
              src={PayoutImage}
              alt="Pay Out"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex-1 max-w-lg text-fuchsia-400 font-bold text-left text-lg leading-relaxed px-4 min-w-[300px]">
            <p>
              Our Payout system is fast, fair, and fully automated to ensure a seamless
              experience for our users. Once the prediction round ends, results are instantly
              verified and winnings are instantly distributed to the winners based on the 
              predefined reward structure. There's no need for manual claim – payouts are
              processed in real time.Our Payout system is fast, fair, and fully automated to ensure a seamless
              experience for our users. Once the prediction round ends, results are instantly
              verified and winnings are instantly distributed to the winners based on the 
              predefined reward structure. There's no need for manual claim – payouts are
              processed in real time.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-row-reverse justify-center gap-8 w-full max-w-6xl flex-wrap sm:flex-nowrap">
          <div className="flex-1 max-w-lg min-w-[300px]">
            <img
              src={WhyUsImage}
              alt="Why Us"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex-1 max-w-lg text-fuchsia-400 font-bold text-left text-lg leading-relaxed px-4 min-w-[300px]">
            <p>
              At our stock prediction platform, we combine accuracy, transparency, and user-friendly
              design to give you the best prediction experience possible. Our system is built on
              real-time data and secure technology, ensuring fair gameplay and instant payouts.
              We value your trust, which is why we offer clear rules, no hidden charges, 
              and a dedicated support team ready to help whenever you need. At our stock prediction platform, we combine accuracy, transparency, and user-friendly
              design to give you the best prediction experience possible. Our system is built on
              real-time data and secure technology, ensuring fair gameplay and instant payouts.
              We value your trust, which is why we offer clear rules, no hidden charges, 
              and a dedicated support team ready to help whenever you need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutSection;
