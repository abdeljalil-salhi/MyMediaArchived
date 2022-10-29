import DataLoader from "dataloader";

import { Message, MessageModel } from "../models/Message.model";

type BatchMessage = (ids: readonly string[]) => Promise<Message[]>;

const batchMessages: BatchMessage = async (ids) => {
  const messages: Message[] = await MessageModel.find({
    _id: {
      $in: ids,
    },
  });

  const messageMap: Record<string, Message> = {};

  messages.forEach((message) => {
    messageMap[message._id] = message;
  });

  const resolvedMessages: Message[] = ids.map((id) => messageMap[id]);

  return resolvedMessages;
};

export const messageLoader = () => new DataLoader<any, Message>(batchMessages);
