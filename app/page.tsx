"use client";
import population from "../data/population.json";
import React from "react";

export default function Home() {
  const [currentYear, setCurrentYear] = React.useState(0);
  const yearperpage = currentYear + 1;
  const data = population.slice(currentYear, yearperpage);
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
                                <td className="w-96 text-right">
                                  {Number(country.Population).toLocaleString()}
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
