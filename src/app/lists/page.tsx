import React from "react";
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers
} from "../actions/likeActions";
import ListsTab from "./ListsTab";

export default async function ListsPage({
  searchParams
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const params = await searchParams;
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(params.type);

  return (
    <div>
      <ListsTab
        members={members}
        likeIds={likeIds}
      />
    </div>
  );
}
