import { WebSocketServer } from "ws";
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({
    port: 8080,
    // Add connection limits to prevent DDoS
    maxPayload: 100 * 1024, // 100KB max message size
    perMessageDeflate: false
});

// Track connections per IP to prevent abuse
const connectionCounts = new Map<string, number>();
const MAX_CONNECTIONS_PER_IP = 10;

wss.on("connection", async (socket, request) => {
    try {
        // Get client IP
        const clientIp = request.socket.remoteAddress || 'unknown';
        
        // Check connection limit
        const currentConnections = connectionCounts.get(clientIp) || 0;
        if (currentConnections >= MAX_CONNECTIONS_PER_IP) {
            socket.close(1008, "Too many connections from this IP");
            return;
        }
        
        // Increment connection count
        connectionCounts.set(clientIp, currentConnections + 1);
        
        // Clean up on disconnect
        socket.on('close', () => {
            const count = connectionCounts.get(clientIp) || 0;
            if (count <= 1) {
                connectionCounts.delete(clientIp);
            } else {
                connectionCounts.set(clientIp, count - 1);
            }
        });

        // Don't create a user on every connection - this is a security issue
        // Users should authenticate properly
        socket.send("Hi there, you are connected to the server");
        
    } catch (error) {
        console.error("WebSocket connection error:", error);
        socket.close(1011, "Internal server error");
    }
})