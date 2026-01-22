const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //Reset DB and Create test user
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Helsinki User',
        username: 'hblovo',
        password: 'secretpassword123'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText(/log in to application/i)).toBeVisible()
  })

  describe('Login', () => {
    test('Succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('hblovo')
      await page.locator('input[name="Password"]').fill('secretpassword123')
      await page.getByRole('button', { name: /login/i }).click()

      await expect(page.getByText(/Helsinki User.*logged in/i)).toBeVisible()
    })

    test('Fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('wrong')
      await page.locator('input[name="Password"]').fill('wrong-password')
      await page.getByRole('button', { name: /login/i }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText(/wrong username or password/i)
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator('input[name="Username"]').fill('hblovo')
      await page.locator('input[name="Password"]').fill('secretpassword123')
      await page.getByRole('button', { name: /login/i }).click()
      await expect(page.getByText(/logged in/i)).toBeVisible()
    })

    test('A new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: /new blog/i }).click()

      const title = 'Playwright Robust Test'
      const author = 'Test Robot'

      await page.getByPlaceholder(/title/i).fill(title)
      await page.getByPlaceholder(/author/i).fill(author)
      await page.getByPlaceholder(/url/i).fill('http://test.com')

      await page.getByRole('button', { name: /create/i }).click()

      const newBlogDiv = page.locator('.blog').filter({ hasText: title })
      await expect(newBlogDiv).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: /new blog/i }).click()
        await page.getByPlaceholder(/title/i).fill('Another Blog')
        await page.getByPlaceholder(/author/i).fill('Some Author')
        await page.getByPlaceholder(/url/i).fill('http://url.com')
        await page.getByRole('button', { name: /create/i }).click()
        await expect(page.locator('.blog').first()).toBeVisible()
      })

      test('A blog can be liked', async ({ page }) => {
        const blogDiv = page.locator('.blog').filter({ hasText: /Another Blog/i })
        await blogDiv.getByRole('button', { name: /view/i }).click()
        await expect(blogDiv.getByText(/likes 0/i)).toBeVisible()

        await blogDiv.getByRole('button', { name: /like/i }).click()

        await expect(blogDiv.getByText(/likes 1/i)).toBeVisible()
      })
      test('A blog can be deleted', async ({ page }) => {
        const blogDiv = page.locator('.blog').filter({ hasText: /Another Blog/i })
        await blogDiv.getByRole('button', { name: /view/i }).click()

        page.on('dialog', dialog => dialog.accept())
        await blogDiv.getByRole('button', { name: /remove/i }).click()
        await expect(page.getByText(/Another Blog/i)).not.toBeVisible()
      })

      test('Blogs are ordered according to likes', async ({ page }) => {
        await page.getByRole('button', { name: /new blog/i }).click()
        await page.getByPlaceholder(/title/i).fill('Top Ranked Blog')
        await page.getByPlaceholder(/author/i).fill('Expert')
        await page.getByPlaceholder(/url/i).fill('http://top.com')
        await page.getByRole('button', { name: /create/i }).click()

        const topBlogDiv = page.locator('.blog').filter({ hasText: /Top Ranked Blog/i })
        await topBlogDiv.getByRole('button', { name: /view/i }).click()
        await topBlogDiv.getByRole('button', { name: /like/i }).click()
        await expect(topBlogDiv.getByText(/likes 1/i)).toBeVisible()

        const allBlogs = page.locator('.blog')
        await expect(allBlogs.first()).toContainText(/Top Ranked Blog/i)
        await expect(allBlogs.last()).toContainText(/Another Blog/i)
      })
    })
  })
})