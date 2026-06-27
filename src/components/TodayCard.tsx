type Props = {
  hour: number;
  pkg: number;
  bonus: number;
};

function TodayCard({
  hour,
  pkg,
  bonus,
}: Props) {
  const total = hour * 177 + bonus;

  return (
    <div
      style={{
        margin: "15px",
        padding: "20px",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg,#ff7a18,#ffb347)",
        color: "white",
        boxShadow:
          "0 10px 25px rgba(255,107,0,.25)",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 15,
        }}
      >
        🔥 Bugün
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-around",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 26,
            }}
          >
            📦
          </div>

          <strong
            style={{
              fontSize: 22,
            }}
          >
            {pkg}
          </strong>

          <div
            style={{
              fontSize: 12,
            }}
          >
            Paket
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 26,
            }}
          >
            ⏰
          </div>

          <strong
            style={{
              fontSize: 22,
            }}
          >
            {hour}
          </strong>

          <div
            style={{
              fontSize: 12,
            }}
          >
            Saat
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 26,
            }}
          >
            💰
          </div>

          <strong
            style={{
              fontSize: 22,
            }}
          >
            {total.toFixed(0)}
          </strong>

          <div
            style={{
              fontSize: 12,
            }}
          >
            TL
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;