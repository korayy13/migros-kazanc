type Props = {
  totalHourMoney: number;
  totalPackages: number;
  totalDailyBonus: number;
  monthlyBonus: number;
  vacationDays: number;
};

const PACKAGE_GOAL = 1500;

function TotalCard({
  totalHourMoney,
  totalPackages,
  totalDailyBonus,
  monthlyBonus,
  vacationDays,
}: Props) {
  const progress = Math.min(
    (totalPackages / PACKAGE_GOAL) * 100,
    100
  );

  const generalTotal =
    totalHourMoney +
    totalDailyBonus +
    monthlyBonus;

  const goalReached =
    totalPackages >= PACKAGE_GOAL;

  const workedDays =
    Math.max(
      1,
      31 - vacationDays
    );

  const averagePackage =
    totalPackages / workedDays;

  const averageHour =
    totalHourMoney / 177 / workedDays;

const cardStyle = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "12px",
  boxShadow:
    "0 3px 8px rgba(0,0,0,0.08)",
  textAlign: "center" as const,
};
  return (
    <div
      style={{
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, 1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div style={cardStyle}>
          <div style={{ fontSize: "20px" }}>
            💰
          </div>

          <p
            style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            Toplam Kazanç
          </p>

          <h2
             style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            {generalTotal.toFixed(0)} TL
          </h2>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "20px" }}>
            📦
          </div>

          <p
             style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            Toplam Paket
          </p>

          <h2 style={{ margin: 0 }}>
            {totalPackages}
          </h2>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "20px" }}>
            🎯
          </div>

          <p
             style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            Hedef
          </p>

          <h2 style={{ margin: 0 }}>
            %{progress.toFixed(0)}
          </h2>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "20px" }}>
            📈
          </div>

          <p
             style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            Aylık Bonus
          </p>

          <h2 style={{ margin: 0 }}>
            {monthlyBonus.toFixed(0)} TL
          </h2>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "20px" }}>
            🏖️
          </div>

          <p
             style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            İzin Günü
          </p>

          <h2
              style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            {vacationDays}
          </h2>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "20px" }}>
            📊
          </div>

          <p
              style={{
    margin: 0,
    fontSize: "22px",
  }}
          >
            Ort. Paket
          </p>

          <h2 style={{ margin: 0 }}>
            {averagePackage.toFixed(1)}
          </h2>
        </div>

       <div
  style={{
    ...cardStyle,
    gridColumn: "1 / span 2",
    maxWidth: "220px",
    margin: "0 auto",
  }}
>
  <div style={{ fontSize: "20px" }}>
    ⏰
  </div>

          <p
            style={{
              margin: "8px 0",
              color: "#666",
            }}
          >
            Ort. Saat
          </p>

          <h2 style={{ margin: 0 }}>
            {averageHour.toFixed(1)}
          </h2>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "18px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
          }}
        >
          Paket Hedefi
        </h3>

        <div
          style={{
            width: "100%",
            height: "16px",
            background: "#eee",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#ff6b00",
            }}
          />
        </div>

        <p>
          {totalPackages} / {PACKAGE_GOAL}
        </p>

        {goalReached && (
          <div
            style={{
              background: "#d4edda",
              color: "#155724",
              padding: "12px",
              borderRadius: "12px",
              marginTop: "px30"
            }}
          >
            🎉 Tebrikler!
            Hedefe ulaştın.
          </div>
        )}
      </div>
    </div>
  );
}

export default TotalCard;