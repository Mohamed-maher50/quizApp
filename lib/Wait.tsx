import React, { ReactNode } from "react";
interface WaitProps<T> {
  promise: Promise<T>;
  children: (data: T) => ReactNode;
}
async function Wait<T>({ promise, children }: WaitProps<T>) {
  const data = await promise;

  return <>{data && children(data)}</>;
}

export default Wait;
