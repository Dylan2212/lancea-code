import React from "react";
import { motion } from "framer-motion";
import TitleText from "./titleText";

const AboutSection = React.forwardRef<HTMLElement, { bio: string }>(
  ({ bio }, ref) => {
    return (
      <section
        id="about"
        ref={ref}
        className="w-full py-20 bg-white flex justify-center px-6"
      >
        <div className="max-w-3xl w-full text-center flex flex-col gap-8">
          <TitleText bgTitle="About" mainTitle="About Me"/>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="bio-container text-start text-lg leading-tight text-gray-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </div>
      </section>
    );
  }
);

AboutSection.displayName = "AboutSection"

export default AboutSection
