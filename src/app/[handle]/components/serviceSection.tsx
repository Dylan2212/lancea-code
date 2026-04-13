import { ServicesData } from "@/src/types"
import React from "react"
import { motion } from "framer-motion"
import TitleText from "./titleText"
import DisplayServiceCard from "../../lancrdashboard/services/components/displayServiceCard"


const ServiceSection = React.forwardRef<HTMLElement, { services: ServicesData[]}>(
  ({ services }, ref) => {
    return (
      <section id="services" ref={ref} className="w-full py-20 bg-white flex justify-center px-6">
        <div className="w-full flex flex-col gap-8">
          <TitleText mainTitle="My Services" bgTitle="Services"/>
          <div className="flex flex-wrap items-center justify-center gap-8
           md:gap-20">
            {services.map((service) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <DisplayServiceCard price={service.price} title={service.title} description={service.description}/>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
)

ServiceSection.displayName = "ServiceSection"

export default ServiceSection