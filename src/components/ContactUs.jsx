import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactUs = () => {
  const shopDetails = [
    {
      branch: "Royapettah Branch",
      address: "No. 313, Pycrofts Road, Royapettah, Chennai - 14",
      phone: "+91 94447 65603",
      phone2: "+91 73389 81585", // ⭐ Secondary phone
      email: "santhoshfoam1977@gmail.com",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6442876324663!2d80.26490417482088!3d13.058299412971992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526622908fac7b%3A0x30d1c804dc32915e!2sSanthosh%20Foam%20%26%20Furnishings!5e0!3m2!1sen!2sin!4v1759398325759!5m2!1sen!2sin",
    },
    {
      branch: "Ambattur Branch",
      address: "No. 14, MTH Road, Ambattur, Chennai",
      phone: "+91 94447 65603",
      phone2: "+91 93826 81399", // ⭐ Secondary phone (optional)
      email: "santhoshfoam1977@gmail.com",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.5450583427914!2d80.13739037482178!3d13.127981811430974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52634fd33facfd%3A0x51f2821670f1993d!2sSanthosh%20Form!5e0!3m2!1sen!2sin!4v1759398490118!5m2!1sen!2sin",
    },
  ];

  return (
    <section className="bg-[#F9F5EC] py-20 px-4 md:px-12 max-w-6xl mx-auto">

      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#C00000] mb-12 relative inline-block">
        Contact Us
        <span className="block w-20 h-1 bg-[#FDD700] mt-2 rounded-full"></span>
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {shopDetails.map((shop, idx) => (
          <div
            key={idx}
            className="
              bg-white/90 backdrop-blur-sm 
              p-8 rounded-2xl 
              border border-[#FDD700] 
              shadow-md hover:shadow-xl 
              transition-all duration-300
            "
          >
            {/* Branch Name */}
            <h3 className="text-2xl font-bold text-[#C00000] mb-4 flex items-center gap-2">
              📍 {shop.branch}
            </h3>

            {/* Contact Details */}
            <div className="space-y-4 text-gray-900">

              {/* Address */}
              <p className="flex items-start gap-3 leading-relaxed">
                <MapPin className="text-[#FDD700] w-6 h-6 mt-1" />
                <span><strong>Address:</strong> {shop.address}</span>
              </p>

              {/* Primary Phone */}
              <p className="flex items-center gap-3">
                <Phone className="text-[#FDD700] w-6 h-6" />
                <a href={`tel:${shop.phone}`} className="text-[#C00000] font-semibold">
                  {shop.phone}
                </a>
              </p>

              {/* Secondary Phone (optional) */}
              {shop.phone2 && (
                <p className="flex items-center gap-3 ml-9">
                  <Phone className="text-[#C00000] w-5 h-5 opacity-70" />
                  <a href={`tel:${shop.phone2}`} className="text-[#C00000] font-medium">
                    {shop.phone2}
                  </a>
                </p>
              )}

              {/* Email */}
              <p className="flex items-center gap-3">
                <Mail className="text-[#FDD700] w-6 h-6" />
                <a href={`mailto:${shop.email}`} className="text-[#C00000] font-semibold">
                  {shop.email}
                </a>
              </p>
            </div>

            {/* Google Map */}
            <div className="w-full h-64 overflow-hidden rounded-xl shadow-inner mt-6">
              <iframe
                src={shop.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${shop.branch}`}
              ></iframe>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactUs;
