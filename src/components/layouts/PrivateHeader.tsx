import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import Setting from "@/components/layouts/Setting"
import { auth } from '@/auth';

export default async function PrivateHeader() {
	const session = await auth();
	if (!session?.user?.email) throw new Error ('不正なアクセスです');

	return (
		<header className="border-b bg-blue-200">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/dashboard" passHref className="text-xl font-bold">管理ページ</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Setting session={session} />
			</div>
		</header>
	)
}
