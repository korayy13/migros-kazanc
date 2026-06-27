type DayData = {
  hour: number;
  pkg: number;
  vacation: boolean;
};

type Props = {
  daysData: DayData[];
  totalHourMoney: number;
  totalPackages: number;
  totalDailyBonus: number;
  monthlyBonus: number;
  vacationDays: number;
};

function Statistics({
  daysData,
  totalHourMoney,
  totalPackages,
  totalDailyBonus,
  monthlyBonus,
  vacationDays,
}: Props) {
  const workedDays = daysData.filter(
    (day) => !day.vacation && (day.hour > 0 || day.pkg > 0)
  ).length;

  const totalHours = daysData.reduce(
    (sum, day) => sum + day.hour,
    0
  );

  const averagePackage =
    workedDays > 0
      ? totalPackages / workedDays
      : 0;

  const averageHour =
    workedDays > 0
      ? totalHours / workedDays
      : 0;

  const totalIncome =
    totalHourMoney +
    totalDailyBonus +
    monthlyBonus;

  const bestDay = daysData.reduce(
    (best, day, index) => {
      const income =
        day.hour * 177;

      if (day.pkg > best.pkg) {
        return {
          day: index + 1,
          pkg: day.pkg,
          hour: day.hour,
          income,
        };
      }

      return best;
    },
    {
      day: 0,
      pkg: 0,
      hour: 0,
      income: 0,
    }
  );

  const worstDay = daysData.reduce(
    (worst, day, index) => {
      if (day.vacation || day.pkg === 0)
        return worst;

      const income =
        day.hour * 177;

      if (day.pkg < worst.pkg) {
        return {
          day: index + 1,
          pkg: day.pkg,
          hour: day.hour,
          income,
        };
      }

      return worst;
    },
    {
      day: 0,
      pkg: 999,
      hour: 0,
      income: 0,
    }
  );
  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 6px 18px rgba(0,0,0,.08)",
    textAlign: "center",
  };

  return (
    <div
      style={{
        padding: 15,
      }}
    >
      <h2
        style={{
          marginBottom: 20,
        }}
      >
        📊 İstatistikler
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(150px,1fr))",
          gap: 15,
        }}

      >
        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>🏆</div>
          <h3>{bestDay.day}. Gün</h3>
          <small>{bestDay.pkg} Paket</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>📉</div>
          <h3>{worstDay.day}. Gün</h3>
          <small>{worstDay.pkg} Paket</small>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            📦
          </div>
          <h3>{totalPackages}</h3>
          <small>Toplam Paket</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            ⏰
          </div>
          <h3>{totalHours}</h3>
          <small>Toplam Saat</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            💰
          </div>
          <h3>
            {totalIncome.toLocaleString()} TL
          </h3>
          <small>Toplam Kazanç</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            🎁
          </div>
          <h3>
            {(
              totalDailyBonus +
              monthlyBonus
            ).toLocaleString()}{" "}
            TL
          </h3>
          <small>Toplam Bonus</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            🏖️
          </div>
          <h3>{vacationDays}</h3>
          <small>İzin Günü</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            📈
          </div>
          <h3>
            {averagePackage.toFixed(1)}
          </h3>
          <small>Ort. Paket</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            ⏱️
          </div>
          <h3>
            {averageHour.toFixed(1)}
          </h3>
          <small>Ort. Saat</small>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 30 }}>
            📅
          </div>
          <h3>{workedDays}</h3>
          <small>Çalışılan Gün</small>
        </div>
      </div>
    </div>
  );
}

export default Statistics;