import { useState } from "react";

type PageType =
  | "dashboard"
  | "packages"
  | "earnings"
  | "expenses"
  | "statistics"
  | "settings"
  | "profile";

type Props = {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  children: React.ReactNode;
};

function MainLayout({
  currentPage,
  onPageChange,
  children,
}: Props) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const menuItem = (
    icon: string,
    label: string,
    page: PageType
  ) => (
    <div
      onClick={() => {
        onPageChange(page);
        setMenuOpen(false);
      }}
      style={{
        padding: "14px",
        borderRadius: "12px",
        marginBottom: "8px",
        cursor: "pointer",
        background:
          currentPage === page
            ? "rgba(255,255,255,.15)"
            : "transparent",
      }}
    >
      {icon} {label}
    </div>
  );

  return (
    <>
      {!menuOpen && (
        <button
          onClick={() =>
            setMenuOpen(true)
          }
          style={{
            position: "fixed",
            top: 15,
            left: 15,
            zIndex: 2000,
            border: "none",
            background: "#ff6b00",
            color: "white",
            width: 50,
            height: 50,
            borderRadius: 12,
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      {menuOpen && (
        <>
          <div
            onClick={() =>
              setMenuOpen(false)
            }
            style={{
              position: "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,.4)",
              zIndex: 999,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 280,
              height: "100vh",
              background: "#ff6b00",
              color: "white",
              padding: 20,
              zIndex: 1000,
              boxShadow:
                "0 0 25px rgba(0,0,0,.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h2>👤 Koray</h2>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                style={{
                  background:
                    "transparent",
                  border: "none",
                  color: "white",
                  fontSize: 28,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <p
              style={{
                marginBottom: 25,
                opacity: 0.9,
              }}
            >
              Kurye Yönetim Sistemi
            </p>

            {menuItem(
              "🏠",
              "Dashboard",
              "dashboard"
            )}

            {menuItem(
              "📦",
              "Paketler",
              "packages"
            )}

            {menuItem(
              "💰",
              "Kazançlar",
              "earnings"
            )}

            {menuItem(
              "🧾",
              "Gelir Gider",
              "expenses"
            )}

            {menuItem(
              "📊",
              "İstatistikler",
              "statistics"
            )}

            {menuItem(
              "⚙️",
              "Ayarlar",
              "settings"
            )}

            {menuItem(
              "👤",
              "Profil",
              "profile"
            )}
          </div>
        </>
      )}

      <div
        style={{
          paddingTop: 70,
        }}
      >
        {children}
      </div>
    </>
  );
}

export default MainLayout;