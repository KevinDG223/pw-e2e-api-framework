# 🧪 Playwright API Testing Framework

End-to-end API testing framework built with Playwright, designed to simulate real-world QA automation scenarios including purchase flows, product validation, and cart operations.

---

## 🚀 Tech Stack

- Playwright (API Testing)
- TypeScript
- GitHub Actions (CI)

## 🎯 Objective

This project demonstrates how to build a scalable and reliable API automation framework using Playwright.

It focuses on:
- End-to-end API validation
- Test architecture (API Object Model)
- CI/CD integration
- Handling real-world issues like external API blocking (Cloudflare)

## 🧪 Test Coverage

The framework includes automated tests for:

- Product listing and validation
- Cart creation and updates
- Purchase flow simulation
- API response validation (status, structure, data integrity)

## ⚙️ How It Works

- Tests call API layer (AOM)
- API layer handles requests via Playwright
- Mock/local API ensures deterministic responses
- Assertions validate status, structure, and data integrity

## 🧱 Architecture

The project follows an API Object Model (AOM) pattern:

/api → API logic abstraction  
/tests → Test cases  
/utils → Request handling and helpers  

This separation improves:
- Maintainability
- Reusability
- Scalability
