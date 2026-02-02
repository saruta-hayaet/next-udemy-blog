'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';
 
export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>ログイン</CardTitle>
			</CardHeader>
			<CardContent>
				<form action={formAction} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="email">メールアドレス</label>
						<Input type="email" id="email" name="email" required placeholder="メールアドレス" />
					</div>
					<div className="space-y-2">
						<label htmlFor="password">パスワード</label>
						<Input type="password" id="password" name="password" required placeholder="パスワード" />
					</div>
					<Button type="submit" className="w-full">ログイン</Button>
					<div className="flex h-8 items-end space-x-1">
          {errorMessage && (
						<div className="w-fll text-red-500">
              <p className="text-sm text-red-500">{errorMessage}</p>
						</div>
          )}
        </div>
				</form>
			</CardContent>
		</Card>
	)
}