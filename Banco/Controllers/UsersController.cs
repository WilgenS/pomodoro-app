using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserCrudApi.Data;
using UserCrudApi.DTOs;
using UserCrudApi.Helpers;
using UserCrudApi.Models;

namespace UserCrudApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDto>))]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] bool includeInactive = false)
    {
        IQueryable<User> query = _context.Users;

        if (!includeInactive)
        {
            query = query.Where(u => u.IsActive);
        }

        var users = await query
            .OrderByDescending(u => u.CreatedAt)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                UpdatedAt = u.UpdatedAt
            })
            .ToListAsync();

        return Ok(users);
    }

    // GET: api/users/5
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound(new { message = $"Usuario con ID {id} no encontrado." });
        }

        var userDto = new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        };

        return Ok(userDto);
    }

    // POST: api/users
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(UserDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto createUserDto)
    {
        if (await _context.Users.AnyAsync(u => u.Username.ToLower() == createUserDto.Username.ToLower()))
        {
            return BadRequest(new { message = "El nombre de usuario ya está registrado." });
        }

        if (await _context.Users.AnyAsync(u => u.Email.ToLower() == createUserDto.Email.ToLower()))
        {
            return BadRequest(new { message = "El correo electrónico ya está registrado." });
        }

        var user = new User
        {
            Username = createUserDto.Username,
            Email = createUserDto.Email,
            PasswordHash = PasswordHelper.HashPassword(createUserDto.Password),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var userDto = new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt
        };

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
    }

    // PUT: api/users/5
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateUserDto)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound(new { message = $"Usuario con ID {id} no encontrado." });
        }

        // Validar unicidad si el nombre de usuario cambia
        if (!string.IsNullOrEmpty(updateUserDto.Username) && 
            updateUserDto.Username.ToLower() != user.Username.ToLower() &&
            await _context.Users.AnyAsync(u => u.Username.ToLower() == updateUserDto.Username.ToLower()))
        {
            return BadRequest(new { message = "El nombre de usuario ya está en uso." });
        }

        // Validar unicidad si el email cambia
        if (!string.IsNullOrEmpty(updateUserDto.Email) && 
            updateUserDto.Email.ToLower() != user.Email.ToLower() &&
            await _context.Users.AnyAsync(u => u.Email.ToLower() == updateUserDto.Email.ToLower()))
        {
            return BadRequest(new { message = "El correo electrónico ya está en uso." });
        }

        // Actualizar campos permitidos
        if (!string.IsNullOrEmpty(updateUserDto.Username))
        {
            user.Username = updateUserDto.Username;
        }

        if (!string.IsNullOrEmpty(updateUserDto.Email))
        {
            user.Email = updateUserDto.Email;
        }

        if (!string.IsNullOrEmpty(updateUserDto.Password))
        {
            user.PasswordHash = PasswordHelper.HashPassword(updateUserDto.Password);
        }

        if (updateUserDto.IsActive.HasValue)
        {
            user.IsActive = updateUserDto.IsActive.Value;
        }

        user.UpdatedAt = DateTime.UtcNow;

        _context.Entry(user).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await UserExists(id))
            {
                return NotFound(new { message = $"Usuario con ID {id} ya no existe." });
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/users/5
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteUser(int id, [FromQuery] bool hardDelete = false)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = $"Usuario con ID {id} no encontrado." });
        }

        if (hardDelete)
        {
            _context.Users.Remove(user);
        }
        else
        {
            user.IsActive = false;
            user.UpdatedAt = DateTime.UtcNow;
            _context.Entry(user).State = EntityState.Modified;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> UserExists(int id)
    {
        return await _context.Users.AnyAsync(e => e.Id == id);
    }
}
