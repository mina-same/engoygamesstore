"use client"; // This line allows the use of hooks like useState

import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { FaPhoneAlt, FaEnvelope, FaTicketAlt } from "react-icons/fa";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Add validation logic here
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill in all fields.");
      return;
    }
    // console.log("Form submitted:", formData);
  };

  return (
    <section className="px-8 py-14 lg:py-16">
      <div className="container rounded-lg mx-auto text-center bg-white p-10">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-base lg:!text-2xl"
        >
          Customer Care
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 text-2xl lg:text-5xl font-bold"
        >
          We&apos;re Here to Help
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          Whether it&apos;s a question about our services, a request for
          technical assistance, or suggestions for improvement, our team is
          eager to hear from you.
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861009.5379097238!2d53.94857525!3d24.354006899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e48dfb1ab12bd%3A0x33d32f56c0080aa7!2z2KfZhNil2YXYp9ix2KfYqiDYp9mE2LnYsdio2YrYqSDYp9mE2YXYqtit2K_YqQ!5e0!3m2!1sar!2seg!4v1730647292708!5m2!1sar!2seg"
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 lg:max-w-sm"
          >
            <Typography
              variant="small"
              className="text-left !font-semibold !text-gray-600"
            >
              Select Options for Business Engagement
            </Typography>
            <div className="flex gap-4">
              <Button variant="outlined" className="max-w-fit border-gray-500">
                General inquiry
              </Button>
              <Button variant="outlined" className="max-w-fit border-gray-500">
                Product Support
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Last Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-gray-900"
              >
                Your Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="name@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-gray-900"
              >
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="gray"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button type="submit" className="w-full" color="gray">
              Send message
            </Button>
          </form>
        </div>

        <div className="p-8 pt-14">
          <div className="flex flex-col justify-between md:flex-row">
            {/* Left Section: Heading and Paragraph */}
            <div className="md:w-1/2 text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                Get in Touch
              </h2>
              <p className="text-gray-500 mt-2">
                You need more information? Check what other persons are saying
                about our product. They are very happy with their purchase.
              </p>
            </div>

            {/* Right Section: Contact Details */}
            <div className="md:w-1/2 mt-6 md:mt-0 pl-[200px]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-gray-700" />
                  <span className="text-gray-800 font-medium">
                    +1 (424) 535 3523
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-gray-700" />
                  <span className="text-gray-800 font-medium">
                    hello@mail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaTicketAlt className="text-gray-700" />
                  <span className="text-gray-800 font-medium">
                    Open Support Ticket
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
