"use client";

import {
  IconDashboard,
  IconDatabase,
  IconFilter,
  IconMap,
  IconReport,
  IconWorldWww,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Interactive Wealth Maps",
      description:
        "Explore real-time property ownership and net worth data across all U.S. counties and cities with zoomable, filterable maps.",
      icon: <IconMap />,
    },
    {
      title: "Rich External Integrations",
      description:
        "Connect with data providers like Zillow, Redfin, IRS, and Census APIs to enrich internal datasets and expand visibility.",
      icon: <IconWorldWww />,
    },
    {
      title: "Tailored Corporate Dashboards",
      description:
        "Offer HR, finance, and leadership teams instant insights into employee wealth distribution and strategic real estate opportunities.",
      icon: <IconDashboard />,
    },
    {
      title: "Powerful Filters and Search",
      description:
        "Segment by region, income bracket, property type, or net worth percentile to analyze wealth trends at scale.",
      icon: <IconFilter />,
    },
    {
      title: "Live Trends & Analytics",
      description:
        "Get real-time calculations of average home value, asset distribution, and ownership patterns across your workforce or region.",
      icon: <IconDatabase />,
    },
    {
      title: "Customizable Reports & Exports",
      description:
        "Generate comprehensive reports with custom metrics and export data in multiple formats for seamless integration with your existing systems.",
      icon: <IconReport />,
    },
  ];
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: "easeOut",
      }}
      className={cn(
        "group/feature relative flex cursor-pointer flex-col rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-neutral-900",
      )}
    >
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.3 + index * 0.1,
        }}
        className="relative z-10 mb-4 text-neutral-600 dark:text-neutral-400"
      >
        {icon}
      </motion.div>
      <div className="relative z-10 mb-2 px-4 text-lg font-bold">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "1.5rem" }}
          transition={{
            duration: 0.4,
            delay: 0.4 + index * 0.1,
          }}
          className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700"
        />
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.5 + index * 0.1,
          }}
          className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100"
        >
          {title}
        </motion.span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.6 + index * 0.1,
        }}
        className="relative z-10 text-sm text-neutral-600 dark:text-neutral-300"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
