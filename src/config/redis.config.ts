import { Redis } from "ioredis";
import { serverConfig } from "./index.js";

// singleton pattern to connect to redis

function connectToRedis() {
    try {
        let connection: Redis;

        const redisClient = {
            host: serverConfig.REDIS_HOST,
            port: serverConfig.REDIS_PORT,
        }

        return () => {
            if (!connection) {
                connection = new Redis(redisClient);
                return connection;

            }
            return connection;
        }

    } catch (error) {
        console.error("error connecting to redis", error);
        throw error;
    }
}

export const getRedisConnObject = connectToRedis();

