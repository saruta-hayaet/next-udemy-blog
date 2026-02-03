'use client'
import { useEffect } from "react";
import { useState, useActionState } from "react";
import { updatePost } from "@/lib/actions/updatePost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


type Props = {
	post: {
		id: string;
		title: string;
		content: string;
		topImage?: string | null;
		published: boolean;
	}
}

export default function EditPostFormPage({post}: Props) {
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [contentLength, setContentLength] = useState(0);
	const [published, setPublished] = useState(post.published);
	const [preview, setPreview] = useState(false);
	const [imagePreview, setImagePreview] = useState(post.topImage || null);

	const [state, formAction] = useActionState(updatePost, {
		success: false, errors: {}
	})

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setContent(value);
		setContentLength(value.length);
	}

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if(file){
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
		}
	}

	useEffect(() => {
		return() => {
			if(imagePreview && imagePreview !== post.topImage){
				URL.revokeObjectURL(imagePreview);
			}
		}
	}, [imagePreview, post.topImage])


	return (
		<div className="container mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">新記事作成(Markdown対応)</h1>
			<form action={formAction} className="space-y-4">
				<div className="">
					<Label htmlFor="title">タイトル</Label>
					<Input type="text" id="title" name="title" placeholder="タイトルを入力してください" value={title} onChange={(e) => setTitle(e.target.value)} required />
					{state.errors?.title && (
						<p className="text-red-500 text-sm mt-1">{state.errors.title.join(',')}</p>
					)}
				</div>
				<div>
					<Label htmlFor="topImage">トップ画像</Label>
					<Input
					type="file"
					id="topImage"
					accept="image/*"
					name="topImage"
					onChange={handleImageChange}
					/>
					{imagePreview && (
						<div className="mt-2">
							<Image src={imagePreview} alt={post.title} width={100} height={100} sizes="200px" className="2-[200px]" priority />
						</div>
					)}
					{state.errors.topImage && (
						<p className="text-red-500 text-sm mt-1">{state.errors.topImage.join(',')}</p>
					)}
				</div>
				<div className="">
					<Label htmlFor="content">内容(Markdown対応)</Label>
					<TextareaAutosize id="content" name="content" className="w-full border p-2" placeholder="Markdownで内容を入力してください" minRows={8} value={content} onChange={ handleContentChange } required />
					{state.errors.content && (
						<p className="text-red-500 text-sm mt-1">{state.errors.content.join(',')}</p>
					)}
				</div>
				<div className="text-right text-sm text-gray-500 mt-1">
					文字数：{content.length}
				</div>
				<Button type="button" onClick={() => setPreview(!preview)}>
					{preview ? "プレビューを閉じる" : "プレビューを表示"}
				</Button>
				{preview && (
					<div className="border p-4 bg-gray-50 prose max-w-none">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeHighlight]}
							skipHtml={false} // HTMLスキップを無効化
							unwrapDisallowed={true} // Markdownの改行を解釈
						>{content}</ReactMarkdown>
					</div>
				)}
				<RadioGroup value={published.toString()} name="published" onValueChange={(value) => setPublished(value === 'true')}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="true" id="published1" />
						<Label htmlFor="published1">公開</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="false" id="published2" />
						<Label htmlFor="published2">非公開</Label>
					</div>
				</RadioGroup>

				<Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">更新する</Button>
				<input type="hidden" name="postId" value={post.id} />
				<input type="hidden" name="oldImageUrl" value={post.topImage || ''} />
			</form>
		</div>
	)
}
