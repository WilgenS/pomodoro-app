using Microsoft.EntityFrameworkCore;
using UserCrudApi.Models;

namespace UserCrudApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar restricciones de unicidad
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Configuración adicional específica de Oracle
        modelBuilder.Entity<User>(entity =>
        {
            // Forzar que el ID sea auto-incremental usando la característica de identidad de Oracle 12c+
            entity.Property(e => e.Id)
                .UseIdentityColumn();
                
            // Configuramos un valor por defecto para la fecha de creación si no se provee
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }
}
