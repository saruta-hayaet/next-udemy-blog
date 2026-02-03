import { z } from "zod";

export const postSchema = z.object({
	title: z.string()
		.min(3, {message: "タイトルは3文字以上である必要があります"}).max(255, {message: "タイトルは255文字以内にしてください"}),
	content: z.string()
		.min(10, {message: "内容は10文字以上である必要があります"}),
	topImage: z.instanceof(File).nullable().optional()
})