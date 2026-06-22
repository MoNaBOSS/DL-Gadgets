import { ImageResponse } from "next/og";

export const alt = "DL Gadgets | Your Tech Revolution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", height: "100%", width: "100%", background: "#020617", color: "white", padding: "70px", position: "relative", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
      <div style={{ display: "flex", position: "absolute", right: 75, bottom: 70, height: 230, width: 230, borderRadius: 999, background: "linear-gradient(135deg, #22d3ee, #34d399)", opacity: 0.85 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 5, color: "#a5f3fc" }}>MALTA ELECTRONICS STORE</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 86, fontWeight: 900, letterSpacing: -4 }}>DL<span style={{ color: "#67e8f9" }}>GADGETS</span></div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 34, color: "#cbd5e1" }}>Your Tech Revolution | Online Store</div>
        <div style={{ display: "flex", marginTop: 52, borderRadius: 18, background: "#67e8f9", color: "#082f49", padding: "16px 24px", fontSize: 24, fontWeight: 800, alignSelf: "flex-start" }}>Browse. Request. Confirm.</div>
      </div>
    </div>,
    size,
  );
}
