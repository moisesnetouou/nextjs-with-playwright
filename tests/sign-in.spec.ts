import { expect, test } from '@playwright/test'

test('has invalid credentials', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('username').fill('admin1')
  await page.getByPlaceholder('password').fill('1234567')

  await page.getByRole('button', { name: 'Sign In' }).click()

  page.waitForLoadState('networkidle')

  await expect(page.getByText('Usuário ou senha inválidos')).toBeVisible()
})

test('has valid credentials', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('username').fill('admin')
  await page.getByPlaceholder('password').fill('123456')
  await page
    .getByRole('button', {
      name: 'Sign In',
    })
    .click()

  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('redirects to sign-in when not authenticated', async ({ page }) => {
  await page.goto('/dashboard')

  await expect(page).toHaveURL('/')
})

test('persists session via cookies', async ({ page, context }) => {
  await context.addCookies([
    {
      name: '@test-project:user',
      value: JSON.stringify({ username: 'admin' }),
      url: 'http://localhost:3000',
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
    },
  ])

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})
