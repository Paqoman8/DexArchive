import axios from 'axios';

// Création de l'instance axios pour PokeAPI
const pokeapi = axios.create({
	// baseURL de l'API
	baseURL: 'https://pokeapi.co/api/v2',
	// timeout en ms
	timeout: 10000,
	// en-têtes par défaut
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
});

// Permet de stocker un token si besoin (ex: proxys, APIs privées)
pokeapi.authToken = null;
pokeapi.setAuthToken = function (token) {
	this.authToken = token;
};

// Interceptor de requête : injecte Authorization si présent
pokeapi.interceptors.request.use(
	config => {
		if (pokeapi.authToken) {
			config.headers.Authorization = `Bearer ${pokeapi.authToken}`;
		}
		// ...vous pouvez ajouter du logging ici si besoin...
		return config;
	},
	error => Promise.reject(error)
);

// Interceptor de réponse : retourne directement response.data et normalise les erreurs
pokeapi.interceptors.response.use(
	response => response.data,
	error => {
		// Normalisation minimale des erreurs
		if (error.response) {
			return Promise.reject({
				status: error.response.status,
				data: error.response.data
			});
		}
		return Promise.reject({ message: error.message });
	}
);

// Helpers utiles
export async function getPokemon(identifier) {
	// identifier peut être un nom ou un id
	return pokeapi.get(`/pokemon/${encodeURIComponent(identifier)}`);
}

export async function getResource(path, params = {}) {
	// path ex: '/ability/65' ou '/pokemon'
	return pokeapi.get(path, { params });
}

export async function getPokemons(limit = 20) {
    // Remarque : pokeapi.interceptors.response retourne response.data
    // Avant : const pokemons = pokeapi.get(`/pokemon`); return pokemons.results
    // Correction : attendre la réponse et retourner soit la structure complète soit .results
    const data = await pokeapi.get(`/pokemon?limit=${limit}`);
	
    // Si vous voulez uniquement la liste : return data.results;
    return data;
}

// Ajout : récupère les données d'un Pokémon à partir d'une URL complète ou d'un path relatif.
// - Si url commence par le baseURL configuré sur l'instance axios, on enlève cette partie.
// - Sinon on passe la valeur telle quelle à pokeapi.get() (permet les chemins relatifs comme '/pokemon/1').
// export async function getPokemonData(url: string) {
// 	if (!url) {
// 		throw new Error('getPokemonData: url param is required');
// 	}
// 	// Récupère le baseURL configuré sur l'instance (si présent)
// 	const base = pokeapi.defaults && pokeapi.defaults.baseURL ? String(pokeapi.defaults.baseURL) : 'https://pokeapi.co/api/v2';

// 	let path = url;

// 	try {
// 		// Normalise les deux pour comparaison simple (supprime slash final)
// 		const normalize = (s: string) => s.replace(/\/+$/, '');

// 		// Si l'URL fournie commence par le baseURL, on transforme en chemin relatif
// 		if (normalize(path).startsWith(normalize(base))) {
// 			path = path.slice(normalize(base).length);
// 			if (!path.startsWith('/')) path = '/' + path;
// 		}
// 	} catch (e) {
// 		// En cas d'erreur de parsing, on continue en utilisant la valeur fournie
// 	}

// 	// Appelle l'instance axios avec le path (ou l'URL relative) pour profiter des interceptors/config
// 	return pokeapi.get(path);
// }

// Ajout : méthode générique qui fait la même chose que getPokemonData mais nommée de manière générique
export async function fetchResourceByUrl(url: string) {
	if (!url) {
		throw new Error('fetchResourceByUrl: url param is required');
	}

	// Récupère le baseURL configuré sur l'instance (si présent)
	const base = pokeapi.defaults && pokeapi.defaults.baseURL ? String(pokeapi.defaults.baseURL) : 'https://pokeapi.co/api/v2';

	let path = url;

	try {
		const normalize = (s: string) => s.replace(/\/+$/, '');

		if (normalize(path).startsWith(normalize(base))) {
			path = path.slice(normalize(base).length);
			if (!path.startsWith('/')) path = '/' + path;
		}
	} catch (e) {
		// ignore and use provided url
	}

	// Utilise l'instance pokeapi pour que les interceptors et la configuration soient appliqués
	return pokeapi.get(path);
}

// Ajout d'un export par défaut et exposition de l'instance pour un import plus simple
const pokeapiService = {
	pokeapi,
	setAuthToken: pokeapi.setAuthToken,
	getPokemon,
	getResource,
	getPokemons,
	// getPokemonData,
	fetchResourceByUrl
};

export default pokeapiService;