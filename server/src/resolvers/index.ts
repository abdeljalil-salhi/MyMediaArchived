import { PingResolver } from "./ping.resolver";
import { UserResolver } from "./user.resolver";

export const resolvers = [PingResolver, UserResolver] as const;
