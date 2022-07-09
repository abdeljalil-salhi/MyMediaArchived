import { PingResolver } from "./ping.resolver";
import { UserResolver } from "./user.resolver";
import { PostResolver } from "./post.resolver";
import { UploadResolver } from "./upload.resolver";

export const resolvers = [
  PingResolver,
  UserResolver,
  PostResolver,
  UploadResolver,
] as const;
