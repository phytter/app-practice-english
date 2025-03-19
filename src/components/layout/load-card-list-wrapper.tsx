import React from "react";
import EmptyList from "./empty-list";
import { CardSkeleton } from "./skeleton";

export function LoadCardListWrapper ({ loading, children }: {  loading: boolean } & React.PropsWithChildren) {

  if (loading) {
    return (
      Array.from({ length: 3 }).map((_value, itx) => <CardSkeleton key={itx} />)
    )
  }

  if (Array.isArray(children)) {
    return children.length
      ? children
      : <EmptyList />
  }

  return children;
}