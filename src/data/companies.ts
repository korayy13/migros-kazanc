export type BonusRow = {
  pkg: number;
  bonus: number;
};

export type Company = {
  id: string;
  name: string;
  hourPrice: number;
  packagePrice: number;
  dailyBonusTable: BonusRow[];
  monthlyBonusTable: BonusRow[];
};
export const companies: Company[] = [
{
  id: "migros",
  name: "Migros Hemen",
  hourPrice: 177,
  packagePrice: 0,

  dailyBonusTable: [
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

  monthlyBonusTable: [
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
  id: "getir",
  name: "Getir",
  hourPrice: 185,
  packagePrice: 0,

  dailyBonusTable: [],

  monthlyBonusTable: [],
},
{
  id: "trendyol",
  name: "Trendyol Go",
  hourPrice: 180,
  packagePrice: 0,
  dailyBonusTable: [],
  monthlyBonusTable: [],
},
{
  id: "trendyol",
  name: "Trendyol Go",
  hourPrice: 180,
  packagePrice: 0,
  dailyBonusTable: [],
  monthlyBonusTable: [],
},
{
  id: "trendyol",
  name: "Trendyol Go",
  hourPrice: 180,
  packagePrice: 0,
  dailyBonusTable: [],
  monthlyBonusTable: [],
},
];