
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import ParticlesBackground from "../components/ParticlesBackground";
import avator3 from "../assets/avator3.png";

emailjs.init(import.meta.env.VITE_PUBLIC_KEY);

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const required = ["name", "email", "idea"];
    const newErrors = {};

    required.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "Fill this field";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          idea: formData.idea,
        },
        PUBLIC_KEY
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        idea: "",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Side */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={avator3}
            alt="Contact"
            className="w-72 md:w-[400px] rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Get In Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1">
                Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-500"
                } text-white`}
              />

              {errors.name && (
                <p className="text-red-500 text-xs">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-500"
                } text-white`}
              />

              {errors.email && (
                <p className="text-red-500 text-xs">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Idea */}
            <div className="flex flex-col">
              <label className="mb-1">
                Explain Your Idea{" "}
                <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={5}
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                placeholder="Enter Your Idea"
                className={`p-3 rounded-md bg-white/10 border ${
                  errors.idea
                    ? "border-red-500"
                    : "border-gray-500"
                } text-white`}
              />

              {errors.idea && (
                <p className="text-red-500 text-xs">
                  {errors.idea}
                </p>
              )}
            </div>

            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully ✅"
                  : "Something went wrong ❌"}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold transition"
            >
              {status === "sending"
                ? "Sending..."
                : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

