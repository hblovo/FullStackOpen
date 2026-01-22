const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('hblovo')
      await page.locator('input[name="Password"]').fill('secretpassword123')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Helsinki User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('wrong')
      await page.locator('input[name="Password"]').fill('wrong-password')

      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')

      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })
})
