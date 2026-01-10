import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const STATIC_PATH = 'static';
const POSTS_PATH = join(STATIC_PATH, 'content', 'posts');
const DOCS_PATH = join(STATIC_PATH, 'content', 'docs');

interface Post {
	title: string;
	desc: string;
	date: string;
	slug: string;
	image: string | null;
	author: string;
	authoricon: string;
}

interface PostsIndex {
	[locale: string]: Post[];
}

interface DocEntry {
	slug: string;
	title: string;
}

interface DocsIndex {
	docs: DocEntry[];
}

/**
 * Generate posts index by scanning the posts directory
 * Mimics the ocelot backend's index generation logic
 */
export function generatePostsIndex(): PostsIndex {
	const postsIndex: PostsIndex = {};

	if (!existsSync(POSTS_PATH)) {
		return postsIndex;
	}

	const locales = readdirSync(POSTS_PATH);

	for (const locale of locales) {
		const localePath = join(POSTS_PATH, locale);

		// Skip files, only process directories
		try {
			const files = readdirSync(localePath);
			postsIndex[locale] = [];

			for (const file of files) {
				if (!file.endsWith('.md')) continue;

				const filePath = join(localePath, file);
				const text = readFileSync(filePath, 'utf-8');
				const lines = text.split('\n');

				// Extract metadata from first 6 lines
				const title = lines[0]?.trim() || '';
				const desc = lines[1]?.trim() || '';
				const date = lines[2]?.trim() || '';
				const author = lines[3]?.trim() || '';
				const authoricon = lines[5]?.trim() || ''; // Line 6 is author icon

				// Extract first imgur image URL from content
				let image: string | null = null;
				for (const line of lines) {
					if (line.includes('https://i.imgur.com')) {
						const match = line.match(/\((https:\/\/i\.imgur\.com[^)]+)\)/);
						if (match) {
							image = match[1];
							break;
						}
					}
				}

				postsIndex[locale].push({
					title,
					desc,
					date,
					slug: file.replace('.md', ''),
					image,
					author,
					authoricon
				});
			}

			// Sort by date (newest first)
			postsIndex[locale].sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});
		} catch {
			// Not a directory, skip
			continue;
		}
	}

	return postsIndex;
}

/**
 * Generate docs index by scanning the docs directory
 */
export function generateDocsIndex(): DocsIndex {
	const docs: DocEntry[] = [];

	if (!existsSync(DOCS_PATH)) {
		return { docs };
	}

	const files = readdirSync(DOCS_PATH);

	for (const file of files) {
		if (!file.endsWith('.md')) continue;

		const filePath = join(DOCS_PATH, file);
		const text = readFileSync(filePath, 'utf-8');
		const lines = text.split('\n');

		// Use first line as title, or derive from filename
		const firstLine = lines[0]?.trim() || '';
		const title = firstLine.startsWith('#')
			? firstLine.replace(/^#+\s*/, '')
			: firstLine || file.replace('.md', '');

		docs.push({
			slug: file.replace('.md', ''),
			title
		});
	}

	return { docs };
}
