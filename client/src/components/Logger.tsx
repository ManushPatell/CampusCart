import {useEffect} from "react"

export default function Logger() {
    useEffect(() => {
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error("Failed to log visit:", err));
  }, []);

    return null
}