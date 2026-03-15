"use client";
import population from "../data/population.json";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentYear, setCurrentYear] = React.useState(0);
  const yearperpage = currentYear + 1;
  const [totalPopulation, settotalPopulation] = React.useState(0);
  const data = population.slice(currentYear, yearperpage);

  const [selectedValue, setSelectedValue] = useState<number>(10);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    setIsOpen(false); // Close menu after selection
  };

  const generateColorClass = (countryName: string) => {
    let hash = 0;

    for (let i = 0; i < countryName.length; i++) {
      hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 50%)`;
  };
  React.useEffect(() => {
    if (data.length > 0) {
      const total = data[0].Countries.slice(0, 10).reduce(
        (sum, country) => sum + Number(country.Population),
        0,
      );
      settotalPopulation(total);
    }
  }, [data]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <div className="max-w-5xl mx-auto">
          <div className="p-4">
            <p className="mb-2 text-sm text-gray-600">
              No of Countries: 
            </p>

            <div className="relative inline-block text-left">              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-24 px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
              >
                {selectedValue}
                <span className="ml-2 text-xs">▼</span>
              </button>              
              {isOpen && (
                <ul className="absolute z-10 w-24 mt-1 bg-white border border-gray-300 rounded shadow-xl">
                  <li
                    onClick={() => handleSelect(10)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    10
                  </li>
                  <li
                    onClick={() => handleSelect(15)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    15
                  </li>
                </ul>
              )}
            </div>
          </div>
          <span className="text-4xl font-bold mb-4 block text-center">
            World Population by Year
          </span>
          <table>
            <tbody>
              {data.map((item) => (
                <React.Fragment key={item.Year}>
                  <tr key={item.Year}>
                    <td className="text-center text-3xl font-bold text-gray-400">
                      {item.Year}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <AnimatePresence mode="popLayout">
                        <table className="border-separate border-spacing-y-2 w-full">
                          <tbody>
                            {item.Countries.toSorted(
                              (a, b) => b.Population - a.Population,
                            )
                              .slice(0, selectedValue)
                              .map((country) => (
                                <motion.tr
                                  key={country._id}
                                  layout
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                  }}
                                >
                                  <td className="w-32">{country.Country}</td>
                                  <td className="w-96 text-right relative">
                                    <motion.div
                                      className="absolute top-0 left-0 h-full"
                                      style={{
                                        backgroundColor: `${generateColorClass(country.Country)}`,
                                      }}
                                      animate={{
                                        width: `${totalPopulation > 0 ? (Number(country.Population) / totalPopulation) * 400 : 0}%`,
                                      }}
                                      transition={{
                                        duration: 0.8,
                                        ease: "linear",
                                      }}
                                    ></motion.div>
                                    <span className="relative z-10">
                                      {Number(
                                        country.Population,
                                      ).toLocaleString()}
                                    </span>
                                  </td>
                                </motion.tr>
                              ))}
                          </tbody>
                        </table>
                      </AnimatePresence>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 w-40"
              onClick={() => setCurrentYear((prev) => Math.max(prev - 1, 0))}
              disabled={currentYear <= 0}
            >
              Previous
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 w-40"
              onClick={() => setCurrentYear((prev) => prev + 1)}
              disabled={currentYear >= population.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
