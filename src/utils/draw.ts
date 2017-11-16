export enum Confederation {
  UEFA,
  CONMEBOL,
  CONCACAF,
  AFC,
  CAF
}

export interface Team {
  name: string;
  confederation: Confederation;
  drawn?: boolean;
}

function sortTeamsByConfederation(t1: Team, t2: Team): number {
  if (t1.confederation === t2.confederation) {
    return 0;
  } else {
    return t1.confederation === Confederation.UEFA ? 1 : 0;
  }
}

function availableGroupsForTeam(team: Team, potIndex: number, groups: Team[][]): Team[][] {
  return groups.filter((group) => {
    if (group[potIndex] !== undefined) {
      return false;
    } else if (team.confederation === Confederation.UEFA) {
      return true;
    } else {
      const conferedationsInGroup = group.map(t => t.confederation);
      return conferedationsInGroup.indexOf(team.confederation) === -1;
    }
  });
}

function lastResortGroupsForTeam(team: Team, potIndex: number, groups: Team[][]): Team[][] {
  return groups.filter(g => g[potIndex] === undefined);
}

export function getHostTeam(): Team {
  return { name: 'Rusia', confederation: Confederation.UEFA, drawn: true };
}

export function getTeamsInPots(): Team[][] {
  return [
    [
      { name: 'Alemania', confederation: Confederation.UEFA },
      { name: 'Polonia', confederation: Confederation.UEFA },
      { name: 'Portugal', confederation: Confederation.UEFA },
      { name: 'Francia', confederation: Confederation.UEFA },
      { name: 'Bélgica', confederation: Confederation.UEFA },
      { name: 'Argentina', confederation: Confederation.CONMEBOL },
      { name: 'Brasil', confederation: Confederation.CONMEBOL },
    ],
    [
      { name: 'España', confederation: Confederation.UEFA },
      { name: 'Perú', confederation: Confederation.CONMEBOL },
      { name: 'Suiza', confederation: Confederation.UEFA },
      { name: 'Inglaterra', confederation: Confederation.UEFA },
      { name: 'Colombia', confederation: Confederation.CONMEBOL },
      { name: 'Italia', confederation: Confederation.UEFA },
      { name: 'México', confederation: Confederation.CONCACAF },
      { name: 'Uruguay', confederation: Confederation.CONMEBOL },
    ],
    [
      { name: 'Croacia', confederation: Confederation.UEFA },
      { name: 'Dinamarca', confederation: Confederation.UEFA },
      { name: 'Islandia', confederation: Confederation.UEFA },
      { name: 'Costa Rica', confederation: Confederation.CONCACAF },
      { name: 'Tunez', confederation: Confederation.CAF },
      { name: 'Egipto', confederation: Confederation.CAF },
      { name: 'Senegal', confederation: Confederation.CAF },
      { name: 'Irán', confederation: Confederation.AFC },
    ],
    [
      { name: 'Serbia', confederation: Confederation.UEFA },
      { name: 'Nigeria', confederation: Confederation.CAF },
      { name: 'Japón', confederation: Confederation.AFC },
      { name: 'Panamá', confederation: Confederation.CONCACAF },
      { name: 'Costa de Marfil', confederation: Confederation.CAF },
      { name: 'Corea del Sur', confederation: Confederation.AFC },
      { name: 'Arabia Saudita', confederation: Confederation.AFC },
      { name: 'Honduras', confederation: Confederation.CONCACAF },
    ]
  ];
}

export function drawPot(potIndex: number, pot: Team[], groups: Team[][]): Team[][] {
  const modifiedGroups = [...groups];
  let availableTeams = pot.filter(t => !t.drawn);
  availableTeams = availableTeams.sort(sortTeamsByConfederation);

  availableTeams.forEach(team => {
    let availableGroups = availableGroupsForTeam(team, potIndex, modifiedGroups);
    if (availableGroups.length === 0) {
      availableGroups = lastResortGroupsForTeam(team, potIndex, modifiedGroups);
    }

    const randomIndex = Math.floor(Math.random() * availableGroups.length);
    const group = availableGroups[randomIndex];

    team.drawn = true;
    group[potIndex] = team;
  });

  return modifiedGroups;
}
