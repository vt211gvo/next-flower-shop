
import { type Media, type CompleteMedia } from "@/lib/db/schema/media";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Media>) => void;

export const useOptimisticMedia = (
  media: CompleteMedia[],
  
) => {
  const [optimisticMedia, addOptimisticMedia] = useOptimistic(
    media,
    (
      currentState: CompleteMedia[],
      action: OptimisticAction<Media>,
    ): CompleteMedia[] => {
      const { data } = action;

      

      const optimisticMedia = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticMedia]
            : [...currentState, optimisticMedia];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticMedia } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticMedia, optimisticMedia };
};
