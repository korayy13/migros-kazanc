import CalendarView from "./components/CalendarView";
import TopBar from "./components/TopBar";
import MonthYearPicker from "./components/MonthYearPicker";
import DayCard from "./components/DayCard";
import TotalCard from "./components/TotalCard";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import MainLayout from "./layouts/MainLayout";

import Packages from "./pages/Packages";
import Earnings from "./pages/Earnings";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

type DayData = {
  hour: number;
  pkg: number;
  vacation: boolean;
};

type PageType =
  | "dashboard"
  | "packages"
  | "earnings"
  | "expenses"
  | "statistics"
  | "settings"
  | "profile";

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
    vacation: false,
  }));
}

function App() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [currentPage, setCurrentPage] =
    useState<PageType>("dashboard");

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
   
    const [selectedDay, setSelectedDay] =
  useState<number | null>(null);
    

  useEffect(() => {
    const saved = localStorage.getItem(
      getStorageKey(year, month)
    );

    const data = saved
      ? (JSON.parse(saved) as DayData[])
      : createMonthData(dayCount);

    setDaysData(data);
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
    (sum, day) =>
      sum +
      (day.vacation
        ? 0
        : getDailyBonus(day.pkg)),
    0
  );

  const monthlyBonus =
    getMonthlyBonus(totalPackages);

  const vacationDays = daysData.filter(
    (day) => day.vacation
  ).length;

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

  const updateVacation = (
    index: number,
    value: boolean
  ) => {
    const newData = [...daysData];

    newData[index].vacation = value;

    if (value) {
      newData[index].hour = 0;
      newData[index].pkg = 0;
    }

    setDaysData(newData);
  };

  return (
    <MainLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {currentPage === "dashboard" && (
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
            vacationDays={vacationDays}
          />

          <CalendarView
  daysData={daysData}
  onDaySelect={(dayIndex) =>
    setSelectedDay(dayIndex)
  }
/>

{selectedDay !== null && (
  <>
    <div
      onClick={() =>
        setSelectedDay(null)
      }
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        zIndex: 999,
      }}
    />

    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform:
          "translate(-50%, -50%)",
        width: "95%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <DayCard
        day={selectedDay + 1}
        hour={
          daysData[selectedDay].hour
        }
        pkg={
          daysData[selectedDay].pkg
        }
        vacation={
          daysData[selectedDay]
            .vacation
        }
        bonus={
          daysData[selectedDay]
            .vacation
            ? 0
            : getDailyBonus(
                daysData[selectedDay]
                  .pkg
              )
        }
        onVacationChange={(value) =>
          updateVacation(
            selectedDay,
            value
          )
        }
        onHourChange={(value) =>
          updateHour(
            selectedDay,
            value
          )
        }
        onPkgChange={(value) =>
          updatePkg(
            selectedDay,
            value
          )
        }
      />

      <button
        onClick={() =>
          setSelectedDay(null)
        }
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "14px",
          background: "#ff6b00",
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Kapat
      </button>
    </div>
  </>
)}
        </>
      )}

      {currentPage === "packages" && <Packages />}
      {currentPage === "earnings" && <Earnings />}
      {currentPage === "expenses" && <Expenses />}
      {currentPage === "statistics" && <Statistics />}
      {currentPage === "settings" && <Settings />}
      {currentPage === "profile" && <Profile />}
    </MainLayout>
  );
}

export default App;