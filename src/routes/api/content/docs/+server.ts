import { json } from '@sveltejs/kit';
import { generateDocsIndex } from '$lib/server/content';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const index = generateDocsIndex();
	return json(index);
};
