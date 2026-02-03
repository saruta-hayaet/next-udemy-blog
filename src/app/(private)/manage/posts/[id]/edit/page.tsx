import { auth } from "@/auth"
import { getOwnPost } from "@/lib/ownPost"
import { Post } from "@/types/post"
import { notFound } from "next/navigation"
import EditPostForm from "./EditPostForm"

type Params = {
	params: Promise<{id: string}>
}

export default async function EditPage({params}: Params) {
	const session = await auth();
	const userId = session?.user?.id;

	if(!session?.user?.email || !userId) {
		throw new Error('不正なアクセスです');
	}

	const {id} = await params
	const post = await getOwnPost(userId, id) as Post

	if(!post){
		notFound()
	}

	return (
		<>
			<EditPostForm post={post} />
		</>
	)
}
