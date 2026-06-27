import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

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
  const chartData = daysData.map((day, index) => ({
    day: index + 1,
    paket: day.pkg,
    saat: day.hour,
    kazanc: day.hour * 177,
    bonus: day.pkg > 0 ? day.pkg : 0,
  }));

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 6px 18px rgba(0,0,0,.08)",
    textAlign: "center",
  };
  const CustomTooltip = ({
    active,
    payload,
  }: any) => {
    if (
      active &&
      payload &&
      payload.length
    ) {
      const data = payload[0].payload;

      return (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 12,
            boxShadow:
              "0 4px 15px rgba(0,0,0,.15)",
          }}
        >
          <strong>
            📅 {data.day}. Gün
          </strong>

          <br />

          📦 {data.paket} Paket

          <br />

          ⏰ {data.saat} Saat

          <br />

          💰 {data.kazanc} TL
        </div>
      );
    }

    return null;
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
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 20,
          marginTop: 25,
          boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          📦 Günlük Paket Grafiği
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid
              stroke="#ececec"
              strokeDasharray="5 5"
            />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="paket"
              stroke="#ff6b00"
              fill="#ff6b00"
              fillOpacity={0.18}
              strokeWidth={4}
              activeDot={{
                r: 7,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 20,
          marginTop: 25,
          boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          💰 Günlük Kazanç Grafiği
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              stroke="#ececec"
              strokeDasharray="5 5"
            />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="kazanc"
              stroke="#28a745"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 22,
          padding: 25,
          marginTop: 30,
          boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 30,
            fontSize: 28,
            textAlign: "center",
          }}
        >
          📊 Performans Analizi
        </h2>

        <h3
          style={{
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          ⏰ Günlük Çalışma Saati
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              stroke="#ececec"
              strokeDasharray="5 5"
            />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="saat"
              stroke="#007bff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
<div
  style={{
    background: "#fff",
    borderRadius: 22,
    padding: 24,
    marginTop: 30,
    boxShadow: "0 6px 18px rgba(0,0,0,.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      marginBottom: 20,
      textAlign: "center",
    }}
  >
    📋 Ay Özeti
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: 15,
    }}
  >
    <div>
      <strong>📦 Toplam Paket</strong>
      <p>{totalPackages}</p>
    </div>

    <div>
      <strong>💰 Toplam Kazanç</strong>
      <p>{totalIncome.toLocaleString()} TL</p>
    </div>

    <div>
      <strong>⏰ Toplam Saat</strong>
      <p>{totalHours}</p>
    </div>

    <div>
      <strong>📈 Günlük Ortalama Paket</strong>
      <p>{averagePackage.toFixed(1)}</p>
    </div>

    <div>
      <strong>🏆 En İyi Gün</strong>
      <p>
        {bestDay.day}. Gün ({bestDay.pkg} Paket)
      </p>
    </div>

    <div>
      <strong>📉 En Zayıf Gün</strong>
      <p>
        {worstDay.day}. Gün ({worstDay.pkg} Paket)
      </p>
    </div>
  </div>
</div>
    </div>
  );
}

export default Statistics;