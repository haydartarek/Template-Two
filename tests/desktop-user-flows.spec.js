const { test, expect } = require("@playwright/test");

test.describe("Desktop user journeys", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop-only suite");
    await page.goto("/");
  });

  test("loads main sections and dynamic footer year", async ({ page }) => {
    await expect(page).toHaveTitle(/Kasper/);

    await expect(page.locator("#home")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#portfolio")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#pricing")).toBeVisible();
    await expect(page.locator("#subscribe")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    const year = String(new Date().getFullYear());
    await expect(page.locator(".footer .year")).toHaveText(year);
  });

  test("updates header state and back-to-top behavior while scrolling", async ({
    page,
  }) => {
    const header = page.locator("#top-header");
    const toTop = page.locator(".to-top");

    await page.evaluate(() => window.scrollTo(0, 900));
    await expect(header).toHaveClass(/is-scrolled/);
    await expect(toTop).toHaveClass(/is-visible/);

    await toTop.click();
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)), {
        timeout: 3000,
      })
      .toBeLessThan(5);
  });

  test("hero slider supports arrows and bullets", async ({ page }) => {
    const title = page.locator(".landing .content h1");
    const initialTitle = (await title.textContent()) || "";

    await page.locator(".landing .next-slide").click();
    await expect(title).not.toHaveText(initialTitle);

    await page.locator('.landing .bullets button[data-slide="0"]').click();
    await expect(title).toContainText("Hello World");
  });

  test("portfolio filters show matching cards only", async ({ page }) => {
    const cards = page.locator(".portfolio .imgs-container .box");
    await expect(cards).toHaveCount(8);

    await page.locator('.portfolio .shuffle button[data-filter="app"]').click();
    await expect(
      page.locator('.portfolio .shuffle button[data-filter="app"]'),
    ).toHaveClass(/active/);

    const visibleAfterAppFilter = await page
      .locator(".portfolio .imgs-container .box:not(.is-hidden)")
      .count();
    expect(visibleAfterAppFilter).toBe(2);

    await page.locator('.portfolio .shuffle button[data-filter="all"]').click();
    const visibleAfterReset = await page
      .locator(".portfolio .imgs-container .box:not(.is-hidden)")
      .count();
    expect(visibleAfterReset).toBe(8);
  });

  test("subscribe form validates and accepts valid email", async ({ page }) => {
    const emailInput = page.locator("#subscribe-email");
    const submit = page.locator('#subscribe-form input[type="submit"]');
    const feedback = page.locator("#subscribe-feedback");

    await submit.click();
    await expect(feedback).toContainText("Please enter a valid email address.");

    await emailInput.fill("hello@example.com");
    await submit.click();

    await expect(feedback).toContainText("Thanks for subscribing");
    await expect(emailInput).toHaveValue("");
  });

  test("contact form validates required fields and submits successfully", async ({
    page,
  }) => {
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const submit = page.locator('#contact-form input[type="submit"]');
    const feedback = page.locator("#contact-feedback");

    await submit.click();
    await expect(feedback).toContainText(
      "Please complete all fields with valid information.",
    );

    await page.fill("#contact-name", "Haydar");
    await page.fill("#contact-email", "haydar@example.com");
    await page.fill("#contact-message", "I need a full branding package.");
    await submit.click();

    await expect(feedback).toContainText(
      "Message sent successfully. We will get back to you soon.",
    );
    await expect(page.locator("#contact-name")).toHaveValue("");
  });

  test("video section CTA links and reveal settings are wired", async ({
    page,
  }) => {
    const videoText = page.locator(".video .text");
    await videoText.scrollIntoViewIfNeeded();

    await expect(page.locator(".video .video-btn-primary")).toHaveAttribute(
      "href",
      "#portfolio",
    );
    await expect(page.locator(".video .video-btn-outline")).toHaveAttribute(
      "href",
      "#contact",
    );

    const revealFrom = await videoText.evaluate((el) =>
      getComputedStyle(el).getPropertyValue("--reveal-from").trim(),
    );
    const transition = await videoText.evaluate(
      (el) => getComputedStyle(el).transitionTimingFunction,
    );

    expect(revealFrom).toContain("-38%");
    expect(transition).toContain("cubic-bezier");
  });
});
