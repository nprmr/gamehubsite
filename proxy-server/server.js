import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// чтобы проксировать body у POST/PUT
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS (на всякий)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

// Прокси: сохраняем /api в пути
app.use("/api", async (req, res) => {
    try {
        const targetUrl = `https://gamehub-client.monkeyslab.ru${req.originalUrl}`; // ← здесь /api остается
        console.log("➡️ Proxying:", req.method, targetUrl);

        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                // пробрасываем базовые заголовки (при необходимости добавь другие)
                "Content-Type": req.headers["content-type"] || "application/json",
                Authorization: req.headers["authorization"] || "",
            },
            // тело пробрасываем только когда оно есть
            body: ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body),
        });

        const text = await response.text(); // может быть json/текст
        // передадим тип контента дальше
        const ct = response.headers.get("content-type") || "application/json; charset=utf-8";
        res.status(response.status).set("Content-Type", ct).send(text);
    } catch (e) {
        console.error("Proxy error:", e);
        res.status(500).json({ error: "Proxy error" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Proxy server running on ${PORT}`);
});
