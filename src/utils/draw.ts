export enum Confederation {
  CONMEBOL,
  UEFA,
  CONCACAF,
  CAF,
  AFC
}

export interface ITeam {
  name: string;
  confederation: Confederation;
  drawn?: boolean;
}

export type Group = ITeam[];
export type Pot = ITeam[];

type CompareFn = (a: ITeam, b: ITeam) => number;

function confederationOrdering(t1: ITeam, t2: ITeam): number {
  if (t1.confederation === t2.confederation) {
    return 0;
  } else if (t1.confederation > t2.confederation) {
    return 1;
  } else {
    return -1;
  }
}

// This is not perfect random ordering, but good enough
function seudoRandomOrdering(t1: ITeam, t2: ITeam): number {
  return .5 - Math.random();
}

function availableGroupsForTeam(team: ITeam, potIndex: number, groups: Group[]): Group[] {
  return groups.filter((group) => {
    if (group[potIndex] !== undefined) {
      return false;
    } else {
      const conferedationsInGroup = group.map((t) => t && t.confederation);

      if (team.confederation === Confederation.UEFA) {
        return conferedationsInGroup.filter((c) => c === Confederation.UEFA).length < 2;
      } else {
        return conferedationsInGroup.indexOf(team.confederation) === -1;
      }
    }
  });
}

function lastResortGroupsForTeam(team: ITeam, potIndex: number, groups: Group[]): Group[] {
  return groups.filter((group) => group[potIndex] === undefined);
}

function drawPotWithOrdering(potIndex: number, pot: Pot, groups: Group[], compareFn: CompareFn): boolean {
  const availableTeams = pot.sort(compareFn);

  for (let team of availableTeams) {
    const availableGroups = availableGroupsForTeam(team, potIndex, groups);

    if (availableGroups.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableGroups.length);
      const group = availableGroups[randomIndex];

      group[potIndex] = team;
    } else {
      // Draw became invalid, reset the changes made in the groups
      groups.forEach((group) => {
        group[potIndex] = undefined;
      });

      return false;
    }
  }

  return true;
}

export function getHostTeam(): ITeam {
  return { name: 'Rusia', confederation: Confederation.UEFA, drawn: true };
}

export function getTeamsInPots(): Pot[] {
  return [
    [
      { name: 'Alemania', confederation: Confederation.UEFA },
      { name: 'Brasil', confederation: Confederation.CONMEBOL },
      { name: 'Portugal', confederation: Confederation.UEFA },
      { name: 'Argentina', confederation: Confederation.CONMEBOL },
      { name: 'Bélgica', confederation: Confederation.UEFA },
      { name: 'Polonia', confederation: Confederation.UEFA },
      { name: 'Francia', confederation: Confederation.UEFA },
    ],
    [
      { name: 'España', confederation: Confederation.UEFA },
      { name: 'Inglaterra', confederation: Confederation.UEFA },
      { name: 'Colombia', confederation: Confederation.CONMEBOL },
      { name: 'México', confederation: Confederation.CONCACAF },
      { name: 'Uruguay', confederation: Confederation.CONMEBOL },
      { name: 'Perú', confederation: Confederation.CONMEBOL },
      { name: 'Suiza', confederation: Confederation.UEFA },
      { name: 'Croacia', confederation: Confederation.UEFA },
    ],
    [
      { name: 'Suecia', confederation: Confederation.UEFA },
      { name: 'Dinamarca', confederation: Confederation.UEFA },
      { name: 'Islandia', confederation: Confederation.UEFA },
      { name: 'Costa Rica', confederation: Confederation.CONCACAF },
      { name: 'Tunez', confederation: Confederation.CAF },
      { name: 'Egipto', confederation: Confederation.CAF },
      { name: 'Irán', confederation: Confederation.AFC },
      { name: 'Senegal', confederation: Confederation.CAF },
    ],
    [
      { name: 'Serbia', confederation: Confederation.UEFA },
      { name: 'Nigeria', confederation: Confederation.CAF },
      { name: 'Australia', confederation: Confederation.AFC },
      { name: 'Japón', confederation: Confederation.AFC },
      { name: 'Marruecos', confederation: Confederation.CAF },
      { name: 'Panamá', confederation: Confederation.CONCACAF },
      { name: 'Corea del Sur', confederation: Confederation.AFC },
      { name: 'Arabia Saudita', confederation: Confederation.AFC },
    ]
  ];
}

export function drawPot(potIndex: number, pot: Pot, groups: Group[]): Group[] {
  let success = drawPotWithOrdering(potIndex, pot, groups, confederationOrdering);

  // Just try a few attempts, then give up
  let attempts = 0;
  while (!success && attempts++ < 10) {
    success = drawPotWithOrdering(potIndex, pot, groups, seudoRandomOrdering);
  }

  return groups;
}
