export type Post = {
	id: string
	title: string
	content: string
	topImage: string | null
	published: boolean
	author: {
		name: string
	}
	createdAt: Date
}

export type PostCardProps = {post: Post}