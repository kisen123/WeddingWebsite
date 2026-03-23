using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

const string FrontendCorsPolicy = "Frontend";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<WeddingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<WeddingDbContext>>();
    var db = scope.ServiceProvider.GetRequiredService<WeddingDbContext>();

    logger.LogInformation("Applying database migrations...");
    await db.Database.MigrateAsync();
    logger.LogInformation("Database migrations applied successfully.");
}

app.UseCors(FrontendCorsPolicy);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        service = "wedding-api",
        time = DateTimeOffset.UtcNow
    });
});

app.MapGet("/api/info", () =>
{
    return Results.Ok(new
    {
        couple = "Your Names",
        date = "2026-08-15",
        venue = "Your Venue",
        city = "Your City"
    });
});

app.MapPost("/api/rsvp", async (RsvpRequest request, WeddingDbContext db, ILogger<Program> logger) =>
{
    if (string.IsNullOrWhiteSpace(request.Name))
    {
        logger.LogWarning("RSVP rejected: Name is missing.");
        return Results.BadRequest(new { error = "Name is required." });
    }

    if (string.IsNullOrWhiteSpace(request.Email))
    {
        logger.LogWarning("RSVP rejected: Email is missing for guest '{Name}'.", request.Name);
        return Results.BadRequest(new { error = "Email is required." });
    }

    var entry = new RsvpEntry
    {
        Name = request.Name,
        Email = request.Email,
        Attending = request.Attending,
        DietaryRequirements = request.DietaryRequirements,
        SongRequest = request.SongRequest
    };

    db.RsvpEntries.Add(entry);
    await db.SaveChangesAsync();

    logger.LogInformation("RSVP saved for '{Name}' ({Email}), attending: {Attending}.", entry.Name, entry.Email, entry.Attending);

    return Results.Ok(new
    {
        message = "RSVP received",
        guest = request.Name
    });
});

app.MapGet("/api/rsvp", async (WeddingDbContext db, ILogger<Program> logger) =>
{
    var entries = await db.RsvpEntries.OrderByDescending(e => e.SubmittedAt).ToListAsync();
    logger.LogInformation("Returning {Count} RSVP entries.", entries.Count);
    return Results.Ok(entries);
});

app.Run();

public record RsvpRequest(
    string Name,
    string Email,
    bool Attending,
    string? DietaryRequirements,
    string? SongRequest
);