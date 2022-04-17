const PROXY_CONFIG = [
    {
        context: [
            "/*",
            "/settingsapi",
            "/productapi",
        ],
        target: "http://localhost:127.0.0.1:8000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
