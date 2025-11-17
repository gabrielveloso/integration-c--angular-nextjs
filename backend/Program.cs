var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<InMemorySessionStore>();

// CORS 
builder.Services.AddCors(options => {
    options.AddPolicy("AllowLocal", policy => {
        policy.WithOrigins(
            "https://api.test:7186",
            "http://api.test:5186/",
            "https://app.test:3000",
            "http://admin.test:4200",
            "http://user.test:4201"

        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("AllowLocal");
app.UseAuthorization();

app.MapControllers();

app.Run();
