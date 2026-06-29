using System.ComponentModel.DataAnnotations;

namespace UserCrudApi.DTOs;

public class UpdateUserDto
{
    [StringLength(50, MinimumLength = 3, ErrorMessage = "El nombre de usuario debe tener entre 3 y 50 caracteres.")]
    public string? Username { get; set; }

    [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
    [StringLength(100, ErrorMessage = "El correo electrónico no puede superar los 100 caracteres.")]
    public string? Email { get; set; }

    [StringLength(100, MinimumLength = 6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres.")]
    public string? Password { get; set; }

    public bool? IsActive { get; set; }
}
