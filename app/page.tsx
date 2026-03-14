"use client";
import population from "../data/population.json";
import React from "react";
import crypto from 'crypto';

export default function Home() {
  const [currentYear, setCurrentYear] = React.useState(0);
  const yearperpage = currentYear + 1;
  const [totalPopulation,settotalPopulation] = React.useState(0);
  const data = population.slice(currentYear, yearperpage);
  const bgColors = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500",
  "bg-lime-500", "bg-green-500", "bg-emerald-500", "bg-teal-500",
  "bg-cyan-500", "bg-sky-500", "bg-blue-500", "bg-indigo-500",
  "bg-violet-500", "bg-purple-500", "bg-fuchsia-500",
  "bg-pink-500", "bg-rose-500", "bg-slate-500", "bg-zinc-500", "bg-neutral-500"
];

const generateColorClass = (countryName: string) => {
  
  const hash = crypto.createHash('sha256').update(countryName).digest('hex');   
  const decimal = parseInt(hash.substring(0, 8), 16);    
  return bgColors[decimal % 20]; 
};
  React.useEffect(() => {
    if (data.length > 0) {
      const total = data[0].Countries.slice(0, 10).reduce(
        (sum, country) => sum + Number(country.Population),
        0
      );
      settotalPopulation(total);
    }
  }, [data]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <table>
            <tbody>
              {data.map((item) => (
                <React.Fragment key={item.Year}>
                  <tr key={item.Year}>
                    <td>{item.Year}</td>
                  </tr>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          {item.Countries.toSorted(
                            (a, b) => b.Population - a.Population,
                          )
                            .slice(0, 10)
                            .map((country) => (
                              <tr key={country._id}>
                                <td className="w-32">{country.Country}</td>
                                <td className="w-96 text-right relative">
                                  <div
                                    className={`absolute top-0 left-0 h-full ${generateColorClass(country.Country)}`}
                                    style={{ width: `${totalPopulation > 0 ? (Number(country.Population) / totalPopulation) * 100 : 0}%` }}
                                  ></div>
                                  <span className="relative z-10">
                                    {Number(country.Population).toLocaleString()}
                                  </span>                                  
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <button
            className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            onClick={() => setCurrentYear((prev) => Math.max(prev - 1, 0))}
            disabled={currentYear <= 0}
          >
            Previous Year
          </button>
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => setCurrentYear((prev) => prev + 1)}
            disabled={currentYear >= population.length - 1}
          >
            Next Year
          </button>          
        </div>
      </main>
    </div>
  );
}
