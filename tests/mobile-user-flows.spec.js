const { test, expect } = require("@playwright/test");

test.describe("Mobile user journeys", () => {
  test("mobile navigation opens and closes correctly", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile project only");
    await page.goto("/");

    const toggle = page.locator(".toggle-menu");
    const menu = page.locator("#nav-menu");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toHaveClass(/is-open/);

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("video text block stays inside viewport and heading is fully readable", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile project only");
    await page.goto("/");

    const videoText = page.locator(".video .text");
    await videoText.scrollIntoViewIfNeeded();

    const layout = await videoText.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const heading = el.querySelector("h2");
      const headingRect = heading.getBoundingClientRect();

      return {
        cardInsideViewport:
          rect.left >= -0.5 && rect.right <= window.innerWidth + 0.5,
        headingInsideCard:
          headingRect.left >= rect.left - 0.5 &&
          headingRect.right <= rect.right + 0.5,
        headingTextWrap: getComputedStyle(heading).textWrap,
      };
    });

    expect(layout.cardInsideViewport).toBeTruthy();
    expect(layout.headingInsideCard).toBeTruthy();
    expect(layout.headingTextWrap).toBe("balance");
  });

  test("video actions stack vertically and use full width on mobile", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile project only");
    await page.goto("/");

    const actions = page.locator(".video .video-actions");
    await actions.scrollIntoViewIfNeeded();

    const metrics = await actions.evaluate((el) => {
      const style = getComputedStyle(el);
      const buttons = Array.from(el.querySelectorAll(".video-btn"));
      const buttonsWidth = buttons.map((btn) =>
        Math.round(btn.getBoundingClientRect().width),
      );
      const actionWidth = Math.round(el.getBoundingClientRect().width);

      return {
        direction: style.flexDirection,
        actionWidth,
        buttonsWidth,
      };
    });

    expect(metrics.direction).toBe("column");
    expect(metrics.buttonsWidth.length).toBeGreaterThan(0);
    metrics.buttonsWidth.forEach((width) => {
      expect(width).toBeGreaterThanOrEqual(metrics.actionWidth - 2);
    });
  });

  test("subscribe form becomes single column on mobile", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile project only");
    await page.goto("/");

    const subscribeForm = page.locator("#subscribe-form");
    await subscribeForm.scrollIntoViewIfNeeded();

    const gridTemplateColumns = await subscribeForm.evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns,
    );

    const columnCount = gridTemplateColumns
      .split(" ")
      .map((part) => part.trim())
      .filter(Boolean).length;

    expect(columnCount).toBe(1);
  });
});
