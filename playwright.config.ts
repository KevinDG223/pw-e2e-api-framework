import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* En CI, desactivamos el paralelismo total para no saturar la Fake Store API */
  fullyParallel: !process.env.CI, 
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /* MUY IMPORTANTE: 1 solo worker en CI evita bloqueos por Rate Limit */
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    /* Definir la baseURL aquí permite que tus fixtures la consuman dinámicamente */
    baseURL: 'https://fakestoreapi.com',
    trace: 'on-first-retry',
    /* Agregamos headers globales recomendados */
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Tip de Portafolio: En CI, a veces basta con probar en un solo motor 
       para ahorrar tiempo, pero dejar los 3 demuestra rigor técnico. */
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
