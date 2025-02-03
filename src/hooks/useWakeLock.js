import { useState, useEffect } from "react";

const useWakeLock = () => {
    const [wakeLock, setWakeLock] = useState(null);

    // Function to request Wake Lock
    const requestWakeLock = async () => {
        try {
            if ("wakeLock" in navigator) {
                const lock = await navigator.wakeLock.request("screen");
                setWakeLock(lock);
                console.log("Wake Lock is active");

                // Handle automatic release
                lock.addEventListener("release", () => {
                    console.log("Wake Lock released");
                    setWakeLock(null);
                });
            } else {
                console.warn("Wake Lock API not supported in this browser.");
            }
        } catch (err) {
            console.error("Failed to activate wake lock:", err);
        }
    };

    // Function to release Wake Lock
    const releaseWakeLock = async () => {
        if (wakeLock) {
            await wakeLock.release();
            setWakeLock(null);
            console.log("Wake Lock manually released");
        }
    };

    // Reacquire Wake Lock if page visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (wakeLock && document.visibilityState === "visible") {
                requestWakeLock();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [wakeLock]);

    return { requestWakeLock, releaseWakeLock };
};

export default useWakeLock;
