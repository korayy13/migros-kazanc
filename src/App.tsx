import TopBar from "./components/TopBar";
import MonthYearPicker from "./components/MonthYearPicker";
import DayCard from "./components/DayCard";
import TotalCard from "./components/TotalCard";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

type DayData = {
  hour: number;
  pkg: number;
};

const PACKAGE_GOAL = 1500;

const dailyBonusTable = [
  { pkg: 76, bonus: 4830 },
  { pkg: 70, bonus: 4320 },
  { pkg: 64, bonus: 3815 },
  { pkg: 59, bonus: 3390 },
  { pkg: 55, bonus: 3055 },
  { pkg: 49, bonus: 2550 },
  { pkg: 43, bonus: 2040 },
  { pkg: 38, bonus: 1595 },
  { pkg: 34, bonus: 1180 },
  { pkg: 28, bonus: 770 },
  { pkg: 24, bonus: 505 },
  { pkg: 20, bonus: 255 },
];

const monthlyBonusTable = [
  { pkg: 1800, bonus: 68575 },
  { pkg: 1600, bonus: 55698 },
  { pkg: 1400, bonus: 47970 },
  { pkg: 1200, bonus: 40300 },
  { pkg: 1000, bonus: 33408 },
  { pkg: 900, bonus: 27520 },
  { pkg: 800, bonus: 20224 },
  { pkg: 700, bonus: 12800 },
];

function getDailyBonus(pkg: number) {
  for (const item of dailyBonusTable) {
    if (pkg >= item.pkg) return item.bonus;
  }
  return 0;
}

function getMonthlyBonus(pkg: number) {
  for (const item of monthlyBonusTable) {
    if (pkg >= item.pkg) return item.bonus;
  }
  return 0;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function createMonthData(dayCount: number) {
  return Array.from({ length: dayCount }, () => ({
    hour: 0,
    pkg: 0,
  }));
}

function App() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const dayCount = getDaysInMonth(year, month);

  const getStorageKey = (
    selectedYear: number,
    selectedMonth: number
  ) => {
    return `migros-kazanc-${selectedYear}-${selectedMonth}`;
  };

  const [daysData, setDaysData] = useState<DayData[]>(
    createMonthData(dayCount)
  );

  const [celebrated, setCelebrated] =
    useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(
      getStorageKey(year, month)
    );

    const data = saved
      ? (JSON.parse(saved) as DayData[])
      : createMonthData(dayCount);

    Promise.resolve().then(() => {
      setDaysData(data);
    });
  }, [year, month]);

  useEffect(() => {
    localStorage.setItem(
      getStorageKey(year, month),
      JSON.stringify(daysData)
    );
  }, [daysData, year, month]);

  const totalHourMoney = daysData.reduce(
    (sum, day) => sum + day.hour * 177,
    0
  );

  const totalPackages = daysData.reduce(
    (sum, day) => sum + day.pkg,
    0
  );

  const totalDailyBonus = daysData.reduce(
    (sum, day) => sum + getDailyBonus(day.pkg),
    0
  );

  const monthlyBonus =
    getMonthlyBonus(totalPackages);

  useEffect(() => {
    if (
      totalPackages >= PACKAGE_GOAL &&
      !celebrated
    ) {
      confetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.6 },
      });

      setCelebrated(true);
    }

    if (totalPackages < PACKAGE_GOAL) {
      setCelebrated(false);
    }
  }, [totalPackages, celebrated]);

  const updateHour = (
    index: number,
    value: number
  ) => {
    const newData = [...daysData];
    newData[index].hour = value;
    setDaysData(newData);
  };

  const updatePkg = (
    index: number,
    value: number
  ) => {
    const newData = [...daysData];
    newData[index].pkg = value;
    setDaysData(newData);
  };

  return (
    <>
      <TopBar />

      <MonthYearPicker
        year={year}
        month={month}
        onYearChange={setYear}
        onMonthChange={setMonth}
      />

      <TotalCard
        totalHourMoney={totalHourMoney}
        totalPackages={totalPackages}
        totalDailyBonus={totalDailyBonus}
        monthlyBonus={monthlyBonus}
      />

      {daysData.map((dayData, index) => (
        <DayCard
          key={index}
          day={index + 1}
          hour={dayData.hour}
          pkg={dayData.pkg}
          bonus={getDailyBonus(dayData.pkg)}
          onHourChange={(value) =>
            updateHour(index, value)
          }
          onPkgChange={(value) =>
            updatePkg(index, value)
          }
        />
      ))}
    </>
  );
}

export default App;