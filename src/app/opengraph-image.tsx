import { ImageResponse } from "next/og";

export const alt = "SSCICTS - Choose your arena";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #07110f 40%, #1b2a14 100%)",
          color: "#e9eee3",
        }}
      >
        <div style={{ fontSize: 34, color: "#9cb07a" }}>Sri Sumangala College ICT Society</div>
        <div style={{ fontSize: 140, fontWeight: 800, lineHeight: 1, marginTop: 24 }}>Choose your arena.</div>
        <div style={{ fontSize: 36, color: "#ffa629", marginTop: 36 }}>Gaming · Quiz · Graphic Design · Word Ad Making</div>
      </div>
    ),
    size,
  );
}
