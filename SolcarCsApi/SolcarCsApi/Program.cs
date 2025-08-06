var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.MapGet("/nitur", async (HttpResponse resp) =>
{
    using var client = new HttpClient();
    var url = "https://monitoringapi.solaredge.com/equipment/3861554/list?api_key=3W9B73EATYOHNPCQJIJ51F8CLGKKPYWG";

    var request = new HttpRequestMessage(HttpMethod.Get, url);
    request.Headers.Add("X-Custom-Kobi", "Hari");

    var response = await client.SendAsync(request);
    var json = await response.Content.ReadAsStringAsync();

    resp.Headers.Append("X-Custom-Kobi", "Hari");


    return Results.Content(json, "application/json");

});

app.Run();

