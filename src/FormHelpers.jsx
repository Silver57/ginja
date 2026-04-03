import { C, F } from "./tokens";

export const labelStyle = {
  fontFamily: F.dm, fontSize: 14, fontWeight: 500, color: C.dark,
};

export const inputStyle = {
  width: "100%", border: `1px solid ${C.divider}`, borderRadius: 8,
  padding: "10px 16px", fontSize: 14, fontFamily: F.inter,
  color: C.dark, background: C.white, boxSizing: "border-box",
};

export function Field({ label, placeholder, type = "text", value, onChange, required }) {
  const id = label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span aria-hidden="true" style={{ color: "#c0392b", marginLeft: 2 }}>*</span>}</label>
      <input id={id} type={type} placeholder={placeholder} style={inputStyle} value={value ?? ""} onChange={onChange} required={required} aria-required={required ? "true" : undefined} />
    </div>
  );
}

export function Divider() {
  return <hr style={{ border: "none", borderTop: `1px solid ${C.divider}`, margin: 0 }} />;
}
