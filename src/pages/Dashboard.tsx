function Dashboard() {
  const today = new Date();

  const date = today.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 6px 18px rgba(0,0,0,.08)",
  };

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1
        style={{
          marginBottom: 5,
        }}
      >
        👋 Hoş Geldin
      </h1>

      <p
        style={{
          color: "#666",
          marginTop: 0,
          marginBottom: 25,
        }}
      >
        {date}
      </p>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        <div style={cardStyle}>
          <h2>🔥 Bugünkü Durum</h2>

          <p>📦 Paket: 0</p>

          <p>⏰ Saat: 0</p>

          <p>💰 Kazanç: 0 TL</p>
        </div>

        <div style={cardStyle}>
          <h2>📊 Bu Ay</h2>

          <p>📦 Toplam Paket</p>

          <p>💰 Toplam Kazanç</p>

          <p>🎁 Toplam Bonus</p>
        </div>

        <div style={cardStyle}>
          <h2>⚡ Hızlı İşlemler</h2>

          <button
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: "none",
              marginBottom: 10,
              background: "#ff6b00",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            📅 Takvime Git
          </button>

          <button
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: "none",
              marginBottom: 10,
              background: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            📊 İstatistikler
          </button>

          <button
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: "none",
              background: "#28a745",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ⚙️ Ayarlar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;