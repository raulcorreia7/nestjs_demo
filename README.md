# 🛠️ Engineering Exercise: Photo Gallery Service

## 🎯 Objective

Design and implement a backend service that fetches, caches, persists, and serves photo data from a third-party API.

Your goal is to demonstrate:
- Clean modular architecture
- Practical use of caching and external APIs
- Sensible trade-offs in API and DB design
- Good engineering principles: separation of concerns, testability, maintainability

---

## 🧱 Functional Requirements

### 1. `GET /photos/:albumId`
- Fetch photos for a given album from:  
  `https://jsonplaceholder.typicode.com/photos?albumId=x`
- Cache the result per `albumId` for 10 minutes
- Save new results to a Postgres DB (de-dupe by `photo.id`)
- Return data to the client

### 2. `GET /photos/:albumId/local`
- Return all photos for the album from your local DB only

---

## 📐 System Design Expectations

- **Language & Framework:** TypeScript, NestJS
- **HTTP Client:** Axios
- **Cache:** Use `@nestjs/cache-manager` or a custom Map
- **Database:** PostgreSQL (via TypeORM or Prisma)
- **Code Design:** 
  - `PhotosController`: Routing layer
  - `PhotosService`: Business logic
  - `JsonPlaceholderService`: HTTP integration with third-party
  - `PhotoRepository`: Encapsulate DB interactions
- **Testability:** Use dependency injection to allow mocking services in unit tests

---

## 🧪 Engineering Goals

### ✅ Focus On:
- Modular folder structure (e.g. `photos/` feature module)
- Clear responsibility boundaries
- Graceful handling of third-party failures (timeouts, retries)
- Avoid over-fetching (cache-first strategy)
- Logging where it matters (e.g., API hit, cache miss)
- Basic validation and error handling
- Sensible use of TypeScript types (don’t overdo)

---

## 🗃️ Suggested DB Table

```sql
CREATE TABLE photos (
  id INT PRIMARY KEY,
  album_id INT NOT NULL,
  title TEXT,
  url TEXT,
  thumbnail_url TEXT
);
```
---

## 💡 Bonus (If Time Permits)
	•	Add GET /photos with optional albumId filter and pagination
	•	Add DELETE /photos/:id to remove photos from the DB
	•	Add unit tests for PhotosService with mocked third-party and repository
	•	Add a CLI script or cron-ready service to pre-fetch and store album photos
	•	Add request logging and performance timing
	•	Add a simple metrics endpoint like GET /health or GET /metrics

---

## 🧠 Evaluation Criteria
	•	✅ Clear separation of concerns and clean architecture
	•	✅ Idiomatic, modern TypeScript usage
	•	✅ Proper use of caching and third-party consumption
	•	✅ Reliable and readable error handling
	•	✅ Good balance of performance and simplicity
	•	✅ Easily testable and extensible design
	•	✅ Sensible trade-offs and engineering judgment