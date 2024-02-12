// eslint-disable-next-line @typescript-eslint/naming-convention
const PREFIX = 'v1:post:';

declare global {
	interface Crypto {
		randomUUID(): string;
	}
}

export type Post = {
	id: string;
	title: string;
	body: string;
};

export type Param = {
	title: string;
	body: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const generateID = (key: string) => {
	return `${PREFIX}${key}`;
};

export const getPosts = async (KV: KVNamespace): Promise<Post[]> => {
	const list = await KV.list({prefix: PREFIX});
	const keys = list.keys;
	const posts: Post[] = [];

	const length = keys.length;
	for (let i = 0; i < length; i++) {
		const value = await KV.get(keys[i].name);
		if (value) {
			const post = JSON.parse(value) as Post;
			posts.push(post);
		}
	}

	return posts;
};

export const getPost = async (
	KV: KVNamespace,
	id: string,
): Promise<Post | undefined> => {
	const value = await KV.get(generateID(id));
	if (!value) return;
	const post = JSON.parse(value) as Post;
	return post;
};

export const createPost = async (
	KV: KVNamespace,
	parameter: Param,
): Promise<Post | undefined> => {
	if (!(parameter?.title && parameter?.body)) {
		return;
	}

	const id = crypto.randomUUID();
	const newPost: Post = {id, title: parameter.title, body: parameter.body};
	await KV.put(generateID(id), JSON.stringify(newPost));
	return newPost;
};

export const updatePost = async (
	KV: KVNamespace,
	id: string,
	parameter: Param,
): Promise<boolean> => {
	const post = await getPost(KV, id);
	if (!post) return false;

	post.title = parameter.title;
	post.body = parameter.body;
	await KV.put(generateID(id), JSON.stringify(post));
	return true;
};

export const deletePost = async (
	KV: KVNamespace,
	id: string,
): Promise<boolean> => {
	const post = await getPost(KV, id);
	if (!post) return false;
	await KV.delete(generateID(id));
	return true;
};
