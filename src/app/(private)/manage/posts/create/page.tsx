'use client'
import { useState, useActionState } from "react";
import { createPost } from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreatePage() {
	const [content, setContent] = useState('');
	const [contentLength, setContentLength] = useState(0);
	const [preview, setPreview] = useState(false);

	const [state, formAction] = useActionState(createPost, {
		success: false, errors: {}
	})

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setContent(value);
		setContentLength(value.length);
	}

	return (
		<div className="container mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">新記事作成(Markdown対応)</h1>
			<form action={formAction} className="space-y-4">
				<div className="">
					<Label htmlFor="title">タイトル</Label>
					<Input type="text" id="title" name="title" placeholder="タイトルを入力してください" required />
					{state.errors.title && (
						<p className="text-red-500 text-sm mt-1">{state.errors.name.join(',')}</p>
					)}
				</div>
				<div>
					<Label htmlFor="topImage">トップ画像</Label>
					<Input
					type="file"
					id="topImage"
					accept="image/*"
					name="topImage"
					/>
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
				<Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">投稿する</Button>
			</form>
		</div>
	)
}
