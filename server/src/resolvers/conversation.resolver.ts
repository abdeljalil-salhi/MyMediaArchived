/*************************
 CONVERSATION RESOLVER
 - createConversation()
 - getConversation()
 - getUserConversations()
 *************************/

import {
  Resolver,
  FieldResolver,
  Root,
  Ctx,
  Mutation,
  UseMiddleware,
  Arg,
  Query,
  Int,
} from "type-graphql";

import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";
import { User } from "../models/User.model";
import { Conversation, ConversationModel } from "../models/Conversation.model";
import { Message } from "../models/Message.model";
import {
  ConversationResponse,
  PaginatedConversationsResponse,
} from "./res/conversation.res";
import { isValidID } from "../utils/isValidID";
import { CreateConversationInput } from "../models/inputs/CreateConversation.input";
import { unauthorizedError, unhandledError } from "./errors.resolvers";

@Resolver(Conversation)
export class ConversationResolver {
  @FieldResolver(() => User)
  public ownerObj(
    @Root() conversation: Conversation,
    @Ctx() context: MyContext
  ) {
    return context.userLoader.load(conversation.owner?.toString());
  }

  @FieldResolver(() => [User])
  public membersObj(
    @Root() conversation: Conversation,
    @Ctx() context: MyContext
  ) {
    return context.userLoader.loadMany(conversation.members as string[]);
  }

  @FieldResolver(() => Message)
  public lastMessageObj(
    @Root() conversation: Conversation,
    @Ctx() context: MyContext
  ) {
    return context.messageLoader.load(conversation.lastMessage?.toString());
  }

  @FieldResolver(() => User)
  public lastSenderObj(
    @Root() conversation: Conversation,
    @Ctx() context: MyContext
  ) {
    return context.userLoader.load(conversation.lastSender?.toString());
  }

  @Mutation(() => ConversationResponse)
  @UseMiddleware(isAuth)
  public async createConversation(
    @Ctx() context: MyContext,
    @Arg("input") input: CreateConversationInput
  ): Promise<ConversationResponse> {
    if (!isValidID(input.receiver) || !isValidID(input.sender))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        conversation: null,
      };

    if (context.user.id === input.sender || context.user.isAdmin) {
      try {
        const conversationSender = await ConversationModel.create({
          owner: input.sender,
          members: [input.sender, input.receiver],
          lastSender: input.sender,
        });

        const conversationReceiver = await ConversationModel.create({
          owner: input.receiver,
          members: [input.receiver, input.sender],
          lastSender: input.sender,
        });

        if (!conversationSender || !conversationReceiver)
          return {
            errors: [
              {
                field: "conversation",
                message: "Conversation cannot be created",
              },
            ],
            conversation: null,
          };

        return {
          errors: [],
          conversation: conversationSender,
        };
      } catch (err: unknown) {
        return {
          errors: unhandledError(err as Error),
          conversation: null,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        conversation: null,
      };
  }

  // @Query(() => ConversationResponse)
  // public async getConversation(
  //   @Arg("userId") userId: User["_id"],
  //   @Arg("members") members: Conversation["members"]
  // ): Promise<ConversationResponse> {
  //   if (!isValidID(userId))
  //     return {
  //       errors: [
  //         {
  //           field: "id",
  //           message: "Invalid ID",
  //         },
  //       ],
  //       conversation: null,
  //     };

  //   try {
  //     const conversation = await ConversationModel.findOne({
  //       $and: [
  //         { owner: userId },
  //         { members: { $all: members } },
  //         { members: { $size: members.length } },
  //       ],
  //     });

  //     if (!conversation)
  //       return {
  //         errors: [
  //           {
  //             field: "conversation",
  //             message: "Conversation not found",
  //           },
  //         ],
  //         conversation: null,
  //       };

  //     return {
  //       errors: [],
  //       conversation,
  //     };
  //   } catch (err: unknown) {
  //     return {
  //       errors: unhandledError(err as Error),
  //       conversation: null,
  //     };
  //   }
  // }

  @Query(() => PaginatedConversationsResponse)
  @UseMiddleware(isAuth)
  public async getUserConversations(
    @Arg("userId") userId: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() context: MyContext
  ): Promise<PaginatedConversationsResponse> {
    if (!isValidID(userId))
      return {
        errors: [
          {
            field: "id",
            message: "Invalid ID",
          },
        ],
        conversations: [],
        hasMore: false,
      };

    const realLimit = Math.min(50, limit);
    const hasMoreLimit = Math.min(50, limit) + 1;

    if (context.user.id === userId || context.user.isAdmin) {
      try {
        const conversations = await ConversationModel.find(
          cursor
            ? {
                $and: [
                  { owner: userId },
                  {
                    timestamp: {
                      $lt: Number(cursor),
                    },
                  },
                ],
              }
            : { owner: userId }
        )
          .limit(hasMoreLimit)
          .sort({ timestamp: -1 });

        if (!conversations)
          return {
            errors: [
              {
                field: "conversations",
                message: "Conversations cannot be found",
              },
            ],
            conversations: [],
            hasMore: false,
          };

        return {
          errors: [],
          conversations: conversations.slice(0, realLimit),
          hasMore: conversations.length === hasMoreLimit,
        };
      } catch (err: unknown) {
        return {
          errors: unhandledError(err as Error),
          conversations: [],
          hasMore: false,
        };
      }
    } else
      return {
        errors: unauthorizedError(),
        conversations: [],
        hasMore: false,
      };
  }
}
