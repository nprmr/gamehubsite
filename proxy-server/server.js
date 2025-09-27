import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", async (req, res) => {
    try {
        // убираем "/api" из начала пути
        const targetPath = req.originalUrl.replace(/^\/api/, "");
        const targetUrl = `https://gamehub-client.monkeyslab.ru${targetPath}`;

        console.log("➡️ Proxying:", targetUrl);

        const response = await fetch(targetUrl, {
            method: req.method,
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.text();
        res.status(response.status).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Proxy error" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Proxy server running on port ${PORT}`);
});
