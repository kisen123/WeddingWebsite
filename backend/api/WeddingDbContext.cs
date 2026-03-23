using Microsoft.EntityFrameworkCore;

public class WeddingDbContext(DbContextOptions<WeddingDbContext> options) : DbContext(options)
{
    public DbSet<RsvpEntry> RsvpEntries => Set<RsvpEntry>();
}
