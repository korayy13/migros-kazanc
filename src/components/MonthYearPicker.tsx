type Props = {
  year: number;
  month: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
};

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

function MonthYearPicker({
  year,
  month,
  onYearChange,
  onMonthChange,
}: Props) {
  return (
    <div className="picker-card">
      <select
        value={year}
        onChange={(e) =>
          onYearChange(Number(e.target.value))
        }
      >
        <option value={2025}>2025</option>
        <option value={2026}>2026</option>
        <option value={2027}>2027</option>
      </select>

      <select
        value={month}
        onChange={(e) =>
          onMonthChange(Number(e.target.value))
        }
      >
        {months.map((item, index) => (
          <option
            key={index}
            value={index}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MonthYearPicker;