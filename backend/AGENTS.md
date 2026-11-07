# Backend: Wedding.Api

.NET 9 minimal API (`backend/api/Program.cs`) with EF Core + Npgsql. Stores RSVPs.

## Run

```bash
docker compose up db -d                              # Postgres only (repo root)
dotnet run --project backend/api                     # API on http://localhost:5050 (Swagger at /swagger)
docker compose up --watch                            # or the whole stack
```

Connection string: `ConnectionStrings:Default` (`appsettings.Development.json`, or the
`ConnectionStrings__Default` env var in docker-compose). Migrations are applied
automatically on startup.

## Endpoints

| Method | Path          | Notes                                             |
| ------ | ------------- | ------------------------------------------------- |
| GET    | `/api/health` | liveness                                          |
| GET    | `/api/info`   | placeholder data                                  |
| POST   | `/api/rsvp`   | `RsvpRequest` → `RsvpEntry`; name + email required |
| GET    | `/api/rsvp`   | **unauthenticated list of all RSVPs**             |

## Schema changes

1. Edit `RsvpEntry.cs` / `WeddingDbContext.cs`.
2. `dotnet tool restore` (or `dotnet tool install -g dotnet-ef`), then
   `dotnet ef migrations add <Name> --project backend/api`.
3. Commit the generated files in `backend/api/Migrations/`. Never edit old migrations.

Keep `RsvpRequest` (backend) and `RsvpPayload` (`frontend/src/api.ts`) in sync.

## Known gaps before go-live

- `GET /api/rsvp` exposes guest data publicly; protect or remove it.
- CORS allows only `http://localhost:5173`; production origin missing.
- Frontend `getWeddingProgram()` calls `/api/program`, but the API serves `/api/info`.
- Hosting: production is static GitHub Pages and can't run this API. A host (or a
  serverless/form-service alternative) is still to be decided.
