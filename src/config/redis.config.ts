import { Redis } from "ioredis";
import { serverConfig } from "./index.js";

// singleton pattern to connect to redis

function connectToRedis(): () => Redis {
    let connection: Redis | undefined;

    const host = serverConfig.REDIS_HOST;
    const port = serverConfig.REDIS_PORT;

    if (!host || !port) {
        throw new Error("Redis host or port is missing");
    }

    const redisClient = {
        host,
        port,
        maxRetriesPerRequest: null,
    };

    return () => {
        if (!connection) {
            connection = new Redis(redisClient);
        }

        return connection;
    };
}

export const getRedisConnObject = connectToRedis();

