import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deletePost } from "@/lib/actions/deletePost";

type DeletePostProps = {
	postId: string;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function deletePostDialog({postId, isOpen, onOpenChange}: DeletePostProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>本当に削除しますか?</AlertDialogTitle>
					<AlertDialogDescription>
						この動作は元に戻せません。記事は完全に削除され、データはサーバから削除されます。
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>キャンセル</AlertDialogCancel>
					<AlertDialogAction onClick={() => deletePost(postId)} className="bg-red-500 hover:bg-red-600">続行</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>

	)
}
