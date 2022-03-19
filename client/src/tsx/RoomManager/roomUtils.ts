export const getTeamUserNames = (ids: number[], players: TName[]): string[] => {
    const names = ids.map((id) => players.find((p) => p.id === id)?.name);
    return names.filter((name) => !!name) as string[];
};

export const getUsersName = (r: TRoom, players: TName[]) => {
    return [...getTeamUserNames(r.teamA, players), ...getTeamUserNames(r.teamB, players)];
};
