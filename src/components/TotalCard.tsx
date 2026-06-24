type Props = {
  totalHourMoney: number;
  totalPackages: number;
  totalDailyBonus: number;
  monthlyBonus: number;
};

const PACKAGE_GOAL = 1500;

function TotalCard({
  totalHourMoney,
  totalPackages,
  totalDailyBonus,
  monthlyBonus,
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

  return (
    <div className="total-card">
      <h2>Toplam Saat Kazancı</h2>
      <h1>{totalHourMoney.toFixed(2)} TL</h1>

      <hr />

      <h2>Toplam Paket</h2>
      <h1>{totalPackages}</h1>

      <hr />

      <h2>Toplam Günlük Bonus</h2>
      <h1>{totalDailyBonus.toFixed(2)} TL</h1>

      <hr />

      <h2>Aylık Paket Bonusu</h2>
      <h1>{monthlyBonus.toFixed(2)} TL</h1>

      <hr />

      <h2>Paket Hedefi</h2>

      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p>
        {totalPackages} / {PACKAGE_GOAL}
      </p>

      {goalReached && (
        <div className="success-box">
          🎉 Tebrikler! Paket hedefine ulaştın!
        </div>
      )}

      <hr />

      <h2>Genel Toplam</h2>

      <h1 style={{ color: "green" }}>
        {generalTotal.toFixed(2)} TL
      </h1>
    </div>
  );
}

export default TotalCard;