import { useState } from "react";

type Props = {
  day: number;
  hour: number;
  pkg: number;
  bonus: number;
  vacation: boolean;
  onVacationChange: (value: boolean) => void;
  onHourChange: (value: number) => void;
  onPkgChange: (value: number) => void;
};

function DayCard({
  day,
  hour,
  pkg,
  bonus,
  vacation,
  onVacationChange,
  onHourChange,
  onPkgChange,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const hourIncome = hour * 177;

  const totalIncome =
    hourIncome + bonus;

  return (
    <div
      style={{
        background: vacation
          ? "#f5f5f5"
          : "#fff",
        margin: "12px 15px",
        borderRadius: "20px",
        boxShadow:
          "0 6px 18px rgba(0,0,0,.08)",
        overflow: "hidden",
      }}
    >
      <div
        onClick={() =>
          setOpen(!open)
        }
        style={{
          padding: "18px",
          cursor: "pointer",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
            }}
          >
            📅 {day}. Gün
          </h3>

          {vacation ? (
            <p
              style={{
                margin: 0,
                color: "#d9534f",
                fontSize: 13,
              }}
            >
              🏖️ İzinli
            </p>
          ) : (
            <p
              style={{
                margin: 0,
                color: "#888",
                fontSize: 13,
              }}
            >
              {pkg} paket • {hour} saat
            </p>
          )}
        </div>

        <div
          style={{
            fontSize: 20,
          }}
        >
          {open ? "▲" : "▼"}
        </div>
      </div>

      {open && (
        <div
          style={{
            padding:
              "0 18px 18px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: "#d9534f",
              }}
            >
              İzinli Gün
            </span>

            <label
              style={{
                position:
                  "relative",
                display:
                  "inline-block",
                width: "52px",
                height: "28px",
              }}
            >
              <input
                type="checkbox"
                checked={vacation}
                onChange={(e) =>
                  onVacationChange(
                    e.target.checked
                  )
                }
                style={{
                  display: "none",
                }}
              />

              <span
                style={{
                  position:
                    "absolute",
                  inset: 0,
                  background:
                    vacation
                      ? "#ff6b00"
                      : "#ccc",
                  borderRadius:
                    "999px",
                  transition:
                    ".3s",
                }}
              />

              <span
                style={{
                  position:
                    "absolute",
                  top: "3px",
                  left: vacation
                    ? "27px"
                    : "3px",
                  width: "22px",
                  height: "22px",
                  background:
                    "white",
                  borderRadius:
                    "50%",
                  transition:
                    ".3s",
                }}
              />
            </label>
          </div>

          <input
            type="number"
            placeholder="Çalışılan Saat"
            value={hour || ""}
            disabled={vacation}
            onChange={(e) =>
              onHourChange(
                Number(
                  e.target.value
                )
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius:
                "12px",
              border:
                "1px solid #ddd",
              marginBottom:
                "10px",
              boxSizing:
                "border-box",
            }}
          />

          <input
            type="number"
            placeholder="Teslim Edilen Paket"
            value={pkg || ""}
            disabled={vacation}
            onChange={(e) =>
              onPkgChange(
                Number(
                  e.target.value
                )
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius:
                "12px",
              border:
                "1px solid #ddd",
              marginBottom:
                "15px",
              boxSizing:
                "border-box",
            }}
          />

          {!vacation && (
            <>
              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: 10,
                  marginBottom:
                    12,
                }}
              >
                <div
                  style={{
                    background:
                      "rgba(255,107,0,.1)",
                    padding: 12,
                    borderRadius:
                      12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color:
                        "#777",
                    }}
                  >
                    Saat Kazancı
                  </div>

                  <strong>
                    {hourIncome.toFixed(
                      0
                    )}{" "}
                    TL
                  </strong>
                </div>

                <div
                  style={{
                    background:
                      "rgba(0,180,90,.1)",
                    padding: 12,
                    borderRadius:
                      12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color:
                        "#777",
                    }}
                  >
                    Günlük Bonus
                  </div>

                  <strong>
                    {bonus.toFixed(
                      0
                    )}{" "}
                    TL
                  </strong>
                </div>
              </div>

              <div
                style={{
                  background:
                    "#ff6b00",
                  color:
                    "white",
                  padding: 14,
                  borderRadius:
                    14,
                  textAlign:
                    "center",
                  fontWeight:
                    700,
                }}
              >
                💰 Günlük Toplam:{" "}
                {totalIncome.toFixed(
                  0
                )}{" "}
                TL
              </div>
            </>
          )}

          {vacation && (
            <div
              style={{
                background:
                  "rgba(220,53,69,.1)",
                padding: 14,
                borderRadius:
                  12,
                color:
                  "#d9534f",
                fontWeight:
                  700,
                textAlign:
                  "center",
              }}
            >
              🏖️ İzinli Gün
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DayCard;