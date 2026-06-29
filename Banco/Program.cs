using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using UserCrudApi.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Agregar soporte para Controladores
builder.Services.AddControllers();

// 2. Configurar Entity Framework con Oracle Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseOracle(builder.Configuration.GetConnectionString("OracleDb")));


// 3. Configurar OpenAPI / Swagger con Diseño Premium y Metadatos
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "User Management & CRUD API",
        Description = "API RESTful robusta y moderna para la administración de usuarios, integrada con base de datos Oracle SQL y Entity Framework Core.",
        Contact = new OpenApiContact
        {
            Name = "Soporte Técnico de Banco",
            Email = "soporte@banco.com",
            Url = new Uri("https://github.com/WilgenSanchez")
        },
        License = new OpenApiLicense
        {
            Name = "MIT License",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });
});

var app = builder.Build();

// 4. Configurar el pipeline de solicitudes HTTP
// Habilitamos Swagger siempre para facilitar las pruebas del usuario
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "User API v1");
    c.RoutePrefix = string.Empty; // Carga Swagger en la raíz del backend (http://localhost:<puerto>/)
    c.DocumentTitle = "Banco - API de Gestión de Usuarios";
});

app.UseHttpsRedirection();

app.UseAuthorization();

// 5. Mapear los Controladores
app.MapControllers();

// 6. Migrar/Crear Base de Datos automáticamente al iniciar (Opcional/Conveniente para Desarrollo)
// Nota: En producción, las migraciones se controlan de forma más estricta.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        // Intentar crear la base de datos si no existe (EnsureCreated no utiliza migraciones y es ideal para pruebas rápidas)
        context.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error al intentar inicializar la base de datos de Oracle. Asegúrese de que la base de datos esté activa.");
    }
}

app.Run();
