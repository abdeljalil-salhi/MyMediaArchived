import { ComponentProps, FC } from "react";

export const combineContexts = (...contexts: FC[]): FC => {
  return contexts.reduce(
    (AccumulatedContexts, CurrentContext: any) => {
      return ({ children }: ComponentProps<FC> | any): JSX.Element => {
        return (
          <AccumulatedContexts>
            <CurrentContext>{children}</CurrentContext>
          </AccumulatedContexts>
        );
      };
    },
    ({ children }: any) => <>{children}</>
  ) as any;
};
