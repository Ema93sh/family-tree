import app from "app";
import BrowserWindow from "browser-window";
import fileUrl from "file-url";
import path from "path";

require("crash-reporter").start();

let mainWindow = null;

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    let indexFile = fileUrl(path.join(__dirname, "index.html"));

    mainWindow.loadUrl(indexFile);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});
