import { useLiveSyncProjects } from "@/lib/store/liveSyncProjects";
import { useLiveSyncStore } from "@/lib/store/liveSyncStore";

export function resetSyncStores () {
  useLiveSyncProjects.getState().resetSyncProjects()
  useLiveSyncStore.getState().resetSyncState()
}