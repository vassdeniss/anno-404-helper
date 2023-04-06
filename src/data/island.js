import { get, post } from './api.js';
import { addOwner, createGamePointer, filter } from './queries.js';

const endpoints = {
  catalog: '/classes/Island',
  byGameId: (gameId) => `/classes/Island${filter('game', gameId)}`,
};

export async function getIslands(gameId) {
  const islands = await get(endpoints.byGameId(gameId));
  return islands.results;
}

export async function createIsland(island) {
  addOwner(island);
  island.game = createGamePointer(island.game);

  return await post(endpoints.catalog, island);
}
