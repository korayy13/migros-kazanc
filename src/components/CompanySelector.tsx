import type { Company } from "../data/companies";

type Props = {
  companies: Company[];
  selectedCompany: Company;
  onChange: (company: Company) => void;
};

function CompanySelector({
  companies,
  selectedCompany,
  onChange,
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 18,
        marginBottom: 20,
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 12,
        }}
      >
        🚚 Çalışılan Firma
      </h3>
      <div
  style={{
    display: "grid",
    gap: 12,
  }}
>
  {companies.map((company) => {
    const selected =
      company.id === selectedCompany.id;

    return (
      <div
        key={company.id}
        onClick={() => onChange(company)}
        style={{
          padding: 16,
          borderRadius: 16,
          cursor: "pointer",
          border: selected
            ? "2px solid #ff6b00"
            : "2px solid #ddd",
          background: selected
            ? "#fff4eb"
            : "#fff",
          transition: "0.2s",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          🚚 {company.name}
        </div>

        <div
          style={{
            marginTop: 8,
            color: "#666",
          }}
        >
          ⏰ {company.hourPrice} TL / Saat
        </div>

        <div
          style={{
            color: "#666",
          }}
        >
          📦 {company.packagePrice} TL / Paket
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
}

export default CompanySelector;