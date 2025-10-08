"use client";

interface HeaderProps {
  isEnglish: boolean;
  setIsEnglish: (value: boolean) => void;
}

export default function Header({ isEnglish, setIsEnglish }: HeaderProps) {
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  return (
      <header className="wrap" style={{ position: "relative", marginTop: "50px" }}>
        {/* Language Toggle Button */}
        <div style={{
          position: "absolute",
          top: "-20px",
          right: "10px",
          zIndex: 1000
        }}>
          <button
            onClick={toggleLanguage}
            style={{
              background: isEnglish ? "#fbbf24" : "#1e293b",
              color: isEnglish ? "#0f172a" : "#f8fafc",
              border: "2px solid #fbbf24",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
            }}
          >
            {isEnglish ? "العربية" : "English"}
          </button>
        </div>

      <nav style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "stretch"
      }}>
        {/* Top row - Empty for cleaner look */}
        <div></div>
        
            {/* Middle row - 6 navigation pills */}
            <div style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <a href="#plans" className="tag" style={{whiteSpace: "nowrap", flexShrink: 0, fontSize: "14px", padding: "6px 12px"}}>
                {isEnglish ? "Plans" : "الباقات"}
              </a>
              <a href="#hof" className="tag" style={{whiteSpace: "nowrap", flexShrink: 0, fontSize: "14px", padding: "6px 12px"}}>
                {isEnglish ? "Achievements" : "قاعة الإنجازات"}
              </a>
              <a href="#certs" className="tag" style={{whiteSpace: "nowrap", flexShrink: 0, fontSize: "14px", padding: "6px 12px"}}>
                {isEnglish ? "Certificates" : "الشهادات"}
              </a>
              <a href="#cv" className="tag" style={{whiteSpace: "nowrap", flexShrink: 0, fontSize: "14px", padding: "6px 12px"}}>
                {isEnglish ? "About" : "السيرة"}
              </a>
              <a 
                href="https://www.instagram.com/waleed_alhalfawy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="tag" 
                style={{
                  whiteSpace: "nowrap", 
                  flexShrink: 0, 
                  fontSize: "14px", 
                  padding: "6px 12px",
                  background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a6.2 6.2 0 01-6.2 6.2H7.8C4.6 22 2 19.4 2 16.2V7.8A6.2 6.2 0 017.8 2zm-.2 2A4.4 4.4 0 003.2 7.6v8.8a4.4 4.4 0 004.4 4.4h8.8a4.4 4.4 0 004.4-4.4V7.6a4.4 4.4 0 00-4.4-4.4H7.6zM12 6.8a5.2 5.2 0 110 10.4 5.2 5.2 0 010-10.4zm0 2a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zm5.8-3.2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
                {isEnglish ? "Instagram" : "إنستغرام"}
              </a>
            </div>
        
      </nav>
    </header>
  );
}
