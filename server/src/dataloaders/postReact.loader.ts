import DataLoader from "dataloader";

import { PostReact, PostReactModel } from "../models/PostReact.model";

type BatchPostReact = (ids: readonly string[]) => Promise<PostReact[]>;

const batchPostReacts: BatchPostReact = async (ids) => {
  const postReacts: PostReact[] = await PostReactModel.find({
    _id: {
      $in: ids,
    },
  });

  const postReactMap: Record<string, PostReact> = {};

  postReacts.forEach((postReact) => {
    postReactMap[postReact._id] = postReact;
  });

  const resolvedPostReacts: PostReact[] = ids.map((id) => postReactMap[id]);

  return resolvedPostReacts;
};

export const postReactLoader = () =>
  new DataLoader<any, PostReact>(batchPostReacts);
