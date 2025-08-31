import React from "react";

const MapSection: React.FC = () => {
  return (
    <div className="w-full h-[40vh]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.2014260121405!2d85.33471431709938!3d27.64923912318449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb17006b1eb773%3A0x1d8dc86e58c286f!2sMamba%20cafe%20%26%20smoking%20Bites!5e0!3m2!1sen!2snp!4v1756632936308!5m2!1sen!2snp"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapSection;
