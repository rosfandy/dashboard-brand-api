import puppeteer, { Browser } from "puppeteer";
import { platform } from "os";

const getFirefoxPath = (): string => {
    switch (platform()) {
        case "win32":
            return "C:\\Program Files\\Mozilla Firefox\\firefox.exe"
        case "darwin":
            return "/Applications/Firefox.app/Contents/MacOS/firefox"
        default:
            return "/usr/bin/firefox"
    }
}

export const launchBrowser = async (): Promise<Browser> => {
    return puppeteer.launch({
        browser: "firefox",
        executablePath: getFirefoxPath(),
        headless: true,
    })
}

export const DEFAULT_USER_AGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
