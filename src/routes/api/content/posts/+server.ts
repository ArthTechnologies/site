import { json } from '@sveltejs/kit';
import { generatePostsIndex } from '$lib/server/content';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const index = generatePostsIndex();
	return json(index);
};
