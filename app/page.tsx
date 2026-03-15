"use client";
import population from "../data/population.json";
import React from "react";


export default function Home() {
  const [currentYear, setCurrentYear] = React.useState(0);
  const yearperpage = currentYear + 1;
  const [totalPopulation, settotalPopulation] = React.useState(0);
  const data = population.slice(currentYear, yearperpage);

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
          <table>
            <tbody>
              {data.map((item) => (
                <React.Fragment key={item.Year}>
                  <tr key={item.Year}>
                    <td className="text-center text-3xl font-bold">{item.Year}</td>
                  </tr>
                  <tr>
                    <td>
                      <table className="border-separate border-spacing-y-2 w-full">
                        <tbody>
                          {item.Countries.toSorted(
                            (a, b) => b.Population - a.Population,
                          )
                            .slice(0, 10)
                            .map((country) => (
                              <tr key={country._id}>
                                <td
                                  className="w-32">
                                  {country.Country}
                                </td>
                                <td className="w-96 text-right relative">
                                  <div
                                    className="absolute top-0 left-0 h-full"
                                    style={{
                                      width: `${totalPopulation > 0 ? (Number(country.Population) / totalPopulation) * 400 : 0}%`,
                                      backgroundColor: `${generateColorClass(country.Country)}`,
                                    }}
                                  ></div>
                                  <span className="relative z-10">
                                    {Number(
                                      country.Population,
                                    ).toLocaleString()}
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
