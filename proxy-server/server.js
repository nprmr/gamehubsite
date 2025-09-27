import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Проксируем все запросы /api/*
app.use("/api", async (req, res) => {
    const targetUrl = `https://gamehub-client.monkeyslab.ru${req.originalUrl}`;

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
        });

        const data = await response.text();

        res.set("Content-Type", response.headers.get("content-type") || "application/json");
        res.status(response.status).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Proxy error" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
