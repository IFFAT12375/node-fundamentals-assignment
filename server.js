const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Home route
    if (req.url === "/" && req.method === "GET") {
        return res.end(`
            <h1>Node.js Fundamentals</h1>
            <p>Basic HTTP Server is running.</p>
            <p>Try /about or /file</p>
        `);
    }

    // About route
    if (req.url === "/about" && req.method === "GET") {
        return res.end(`
            <h1>About</h1>
            <p>This server was built using Node.js http module.</p>
        `);
    }

    // Read file using fs
    if (req.url === "/file" && req.method === "GET") {
        const filePath = path.join(__dirname, "data", "message.txt");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.statusCode = 500;
                return res.end("Error reading file");
            }

            res.end(`
                <h1>File Content</h1>
                <p>${data}</p>
            `);
        });

        return;
    }

    // Write file using fs
    if (req.url === "/write" && req.method === "GET") {
        const filePath = path.join(__dirname, "data", "message.txt");

        fs.writeFile(
            filePath,
            "This content was written using Node.js fs module.",
            (err) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end("Error writing file");
                }

                res.end("File written successfully!");
            }
        );

        return;
    }

    // 404
    res.statusCode = 404;
    res.end("404 - Page Not Found");
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});