import { PingResolver } from "./ping.resolver";
import { UserResolver } from "./user.resolver";
import { PostResolver } from "./post.resolver";

export const resolvers = [PingResolver, UserResolver, PostResolver] as const;
