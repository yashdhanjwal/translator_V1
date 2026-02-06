import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Wait for dev server
        for i in range(10):
            try:
                await page.goto('http://localhost:3000')
                break
            except Exception:
                await asyncio.sleep(2)

        # Light mode screenshot
        await page.screenshot(path='light_mode.png')
        print("Captured light_mode.png")

        # Toggle Dark mode
        # The button has an aria-label or we can just use the class
        await page.evaluate("document.documentElement.classList.add('dark')")
        await asyncio.sleep(1) # wait for transition
        await page.screenshot(path='dark_mode.png')
        print("Captured dark_mode.png")

        # Test translation "blinking" / loading state
        # Type something
        await page.fill('textarea[placeholder*="Enter text"]', 'Hello world')
        # Wait for debounce or trigger if needed (it triggers on change/input)
        await asyncio.sleep(2)

        # Force a loading state if possible by mocking or just capturing while it's typing
        # But we want to see the loading overlay
        await page.screenshot(path='during_translation.png')
        print("Captured during_translation.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
