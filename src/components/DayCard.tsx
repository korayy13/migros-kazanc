type Props = {
  day: number;
  hour: number;
  pkg: number;
  bonus: number;
  onHourChange: (value: number) => void;
  onPkgChange: (value: number) => void;
};

function DayCard({
  day,
  hour,
  pkg,
  bonus,
  onHourChange,
  onPkgChange,
}: Props) {
  return (
    <div className="day-card">
      <h3>{day}. Gün</h3>

      <input
        type="number"
        placeholder="Saat"
        value={hour || ""}
        onChange={(e) =>
          onHourChange(Number(e.target.value))
        }
      />

      <input
        type="number"
        placeholder="Paket"
        value={pkg || ""}
        onChange={(e) =>
          onPkgChange(Number(e.target.value))
        }
      />

      <p>
        Günlük Bonus: <strong>{bonus} TL</strong>
      </p>
    </div>
  );
}

export default DayCard;