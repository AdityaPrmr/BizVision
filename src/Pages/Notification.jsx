import { useState, useEffect } from "react";

const Notification = ({ message, type = "info", duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const colors = {
        success: { bg: "#DFF6DD", text: "#2E7D32", border: "#1B5E20", icon: "✅" },
        error: { bg: "#FDECEA", text: "#D32F2F", border: "#B71C1C", icon: "❌" },
        warning: { bg: "#FFF3CD", text: "#856404", border: "#FF8F00", icon: "⚠️" },
        info: { bg: "#D9EDF7", text: "#0C5460", border: "#117A8B", icon: "ℹ️" }
    };

    const current = colors[type] || colors.info;

    const style = {
        position: "fixed",
        top: "15px",
        right: "15px",
        background: current.bg,
        color: current.text,
        padding: "15px 25px",
        borderRadius: "10px",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        fontSize: "16px",
        fontWeight: "bold",
        zIndex: 1000,
        borderLeft: `7px solid ${current.border}`,
        display: "flex",
        alignItems: "center",
        gap: "15px",
        minHeight: "60px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(30px)",
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"
    };

    return (
        <div style={style}>
            <span style={{ fontSize: "22px" }}>{current.icon}</span>
            {message}
        </div>
    );
};

export default Notification;
