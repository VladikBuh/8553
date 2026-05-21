import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type TravlPiinsAmfindsMark = 'none' | 'want' | 'visited';

export type TravlPiinsAmfindsNote = {
  travlPiinsAmfindsNoteId: string;
  travlPiinsAmfindsText: string;
  travlPiinsAmfindsAt: number;
};

type TravlPiinsAmfindsexpllrCtxValue = {
  travlPiinsAmfindsMarkById: Record<string, TravlPiinsAmfindsMark>;
  settravlPiinsAmfindsMarkById: React.Dispatch<
    React.SetStateAction<Record<string, TravlPiinsAmfindsMark>>
  >;
  travlPiinsAmfindsNotesById: Record<string, TravlPiinsAmfindsNote[]>;
  settravlPiinsAmfindsNotesById: React.Dispatch<
    React.SetStateAction<Record<string, TravlPiinsAmfindsNote[]>>
  >;
  travlPiinsAmfindsNoteDraftById: Record<string, string>;
  settravlPiinsAmfindsNoteDraftById: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
};

const TravlPiinsAmfindsexpllrCtx =
  createContext<TravlPiinsAmfindsexpllrCtxValue | null>(null);

export function TravlPiinsAmfindsexpllrProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [travlPiinsAmfindsMarkById, settravlPiinsAmfindsMarkById] = useState<
    Record<string, TravlPiinsAmfindsMark>
  >({});
  const [travlPiinsAmfindsNotesById, settravlPiinsAmfindsNotesById] = useState<
    Record<string, TravlPiinsAmfindsNote[]>
  >({});
  const [travlPiinsAmfindsNoteDraftById, settravlPiinsAmfindsNoteDraftById] =
    useState<Record<string, string>>({});

  const value = useMemo(
    () => ({
      travlPiinsAmfindsMarkById,
      settravlPiinsAmfindsMarkById,
      travlPiinsAmfindsNotesById,
      settravlPiinsAmfindsNotesById,
      travlPiinsAmfindsNoteDraftById,
      settravlPiinsAmfindsNoteDraftById,
    }),
    [
      travlPiinsAmfindsMarkById,
      travlPiinsAmfindsNotesById,
      travlPiinsAmfindsNoteDraftById,
    ],
  );

  return (
    <TravlPiinsAmfindsexpllrCtx.Provider value={value}>
      {children}
    </TravlPiinsAmfindsexpllrCtx.Provider>
  );
}

export function useTravlPiinsAmfindsexpllrctx() {
  const ctx = useContext(TravlPiinsAmfindsexpllrCtx);
  if (!ctx) {
    throw new Error('useTravlPiinsAmfindsexpllrctx must be used within provider');
  }
  return ctx;
}
