type DayData = {
  hour: number;
  pkg: number;
  vacation: boolean;
};

type Props = {
  daysData: DayData[];
  onDaySelect: (dayIndex: number) => void;
};

function CalendarView({
  daysData,
  onDaySelect,
}: Props) {
  const today = new Date().getDate();

  return (
    <div
      style={{
        background: "#fff",
        margin: "15px",
        padding: "15px",
        borderRadius: "20px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 15,
        }}
      >
        📅 Takvim Görünümü
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(7, 1fr)",
          gap: "8px",
        }}
      >
        {daysData.map((day, index) => {
          const dayNumber = index + 1;

          let background = "#f3f3f3";

          if (day.vacation) {
            background = "#d9534f";
          } else if (day.pkg >= 70) {
            background = "#28a745";
          } else if (day.pkg >= 50) {
            background = "#ffc107";
          } else if (day.pkg >= 30) {
            background = "#ff9800";
          } else if (day.pkg > 0) {
            background = "#dc3545";
          }

          if (day.vacation) {
            background =
              "#d9534f";
          }

          return (
            <div
              key={index}
              onClick={() => onDaySelect(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              style={{
                height: 80,
                borderRadius: 16,
                background,
                color:
                  background === "#f3f3f3"
                    ? "#333"
                    : "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                border:
                  dayNumber === today
                    ? "3px solid #2196f3"
                    : "none",
                cursor: "pointer",
                transition: "all .2s ease",
                boxShadow: "0 4px 10px rgba(0,0,0,.15)",
              }}
            >
              <>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {dayNumber}
                </div>

                {day.vacation ? (
                  <div
                    style={{
                      fontSize: 11,
                    }}
                  >
                    🏖️
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                      }}
                    >
                      📦 {day.pkg}
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                      }}
                    >
                      ⏰ {day.hour}
                    </div>
                  </>
                )}
              </>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 15,
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
          fontSize: 13,
        }}
      >
        <span>⬜ Boş Gün</span>
        <span>🟧 Çalışılmış Gün</span>
        <span>🟥 İzinli Gün</span>
        <span>🟦 Bugün</span>
      </div>
    </div>
  );
}

export default CalendarView;