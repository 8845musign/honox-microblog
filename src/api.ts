import {Hono} from 'hono';
import {cors} from 'hono/cors';
import {type Bindings} from './bindings';
import * as model from './model';

const api = new Hono<{Bindings: Bindings}>();
api.use('/posts/*', cors());

api.get('/', (c) => {
	return c.json({message: 'Hello'});
});

api.get('/posts', async (c) => {
	const posts = await model.getPosts(c.env.BLOG_EXAMPLE);
	return c.json({posts, ok: true});
});

api.post('/posts', async (c) => {
	const parameter = await c.req.json<model.Param>();
	const newPost = await model.createPost(c.env.BLOG_EXAMPLE, parameter);
	if (!newPost) {
		return c.json({error: 'Can not create new post', ok: false}, 422);
	}

	return c.json({post: newPost, ok: true}, 201);
});

api.get('/posts/:id', async (c) => {
	const id = c.req.param('id');
	const post = await model.getPost(c.env.BLOG_EXAMPLE, id);
	if (!post) {
		return c.json({error: 'Not Found', ok: false}, 404);
	}

	return c.json({post, ok: true});
});

api.put('/posts/:id', async (c) => {
	const id = c.req.param('id');
	const post = await model.getPost(c.env.BLOG_EXAMPLE, id);
	if (!post) {
		// 204 No Content
		return new Response(null, {status: 204});
	}

	const parameter = await c.req.json<model.Param>();
	const success = await model.updatePost(c.env.BLOG_EXAMPLE, id, parameter);
	return c.json({ok: success});
});

api.delete('/posts/:id', async (c) => {
	const id = c.req.param('id');
	const post = await model.getPost(c.env.BLOG_EXAMPLE, id);
	if (!post) {
		// 204 No Content
		return new Response(null, {status: 204});
	}

	const success = await model.deletePost(c.env.BLOG_EXAMPLE, id);
	return c.json({ok: success});
});

export default api;
