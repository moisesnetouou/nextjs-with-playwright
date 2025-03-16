import { expect, test } from '@playwright/test'

test('has invalid credentials', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('username').fill('admin1')
  await page.getByPlaceholder('password').fill('1234567')
  await page
    .getByRole('button', {
      name: 'Sign In',
    })
    .click()

  await page.waitForLoadState('networkidle')

  await expect(page.getByText('Usuário ou senha inválidos')).toBeVisible()
})
