using Microsoft.AspNetCore.SignalR;

namespace Chat_SignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task EnviarMensaje(string usuario, string mensaje)
        {
            await Clients.All.SendAsync("RecibirMensaje",usuario, mensaje);
        }
    }
}
