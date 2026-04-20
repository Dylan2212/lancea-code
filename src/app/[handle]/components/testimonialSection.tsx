import { TestimonialData } from "@/src/types"
import React from "react"
import { motion } from "framer-motion"
import TitleText from "./titleText"
import { DisplayTestimonial } from "../../lancrdashboard/testimonials/components/displayTestimonial"

const TestimonialSection = React.forwardRef<HTMLElement, { testimonials: TestimonialData[]}>(
  ({ testimonials }, ref) => {
    return (
      <section id="testimonials" ref={ref} className="w-full py-20 bg-white flex justify-center px-6">
        <div className="w-full flex flex-col gap-8">
          <TitleText mainTitle="My Testimonials" bgTitle="Testimonials"/>
          <div className="flex flex-wrap items-center justify-center gap-8
           md:gap-20">
            {testimonials.map((testimonial) => {
              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-[325px] flex items-center justify-center bg-white/60 backdrop-blur-xl rounded-2xl min-h-[225px] border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <DisplayTestimonial name={testimonial.name} text={testimonial.body}/>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
)

TestimonialSection.displayName = "TestimonialSection"

export default TestimonialSection