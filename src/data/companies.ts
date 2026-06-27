export type Company = {
  id: string;
  name: string;
  hourPrice: number;
  defaultGoal: number;

  dailyBonus: {
    pkg: number;
    bonus: number;
  }[];

  monthlyBonus: {
    pkg: number;
    bonus: number;
  }[];
};

export const companies: Company[] = [
  {
    id: "migros",
    name: "Migros",
    hourPrice: 177,
    defaultGoal: 1500,

    dailyBonus: [
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
    ],

    monthlyBonus: [
      { pkg: 1800, bonus: 68575 },
      { pkg: 1600, bonus: 55698 },
      { pkg: 1400, bonus: 47970 },
      { pkg: 1200, bonus: 40300 },
      { pkg: 1000, bonus: 33408 },
      { pkg: 900, bonus: 27520 },
      { pkg: 800, bonus: 20224 },
      { pkg: 700, bonus: 12800 },
    ],
  },

  {
    id: "yemeksepeti",
    name: "Yemeksepeti",
    hourPrice: 0,
    defaultGoal: 1200,
    dailyBonus: [],
    monthlyBonus: [],
  },

  {
    id: "getir",
    name: "Getir",
    hourPrice: 0,
    defaultGoal: 1200,
    dailyBonus: [],
    monthlyBonus: [],
  },

  {
    id: "trendyolgo",
    name: "Trendyol Go",
    hourPrice: 0,
    defaultGoal: 1200,
    dailyBonus: [],
    monthlyBonus: [],
  },

  {
    id: "hepsijet",
    name: "HepsiJET",
    hourPrice: 0,
    defaultGoal: 1200,
    dailyBonus: [],
    monthlyBonus: [],
  },
];