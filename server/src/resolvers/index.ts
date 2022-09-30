import { PingResolver } from "./ping.resolver";
import { UserResolver } from "./user.resolver";
import { PostResolver } from "./post.resolver";
import { UploadResolver } from "./upload.resolver";
import { ConversationResolver } from "./conversation.resolver";

export const resolvers = [
  PingResolver,
  UserResolver,
  PostResolver,
  UploadResolver,
  ConversationResolver,
] as const;
