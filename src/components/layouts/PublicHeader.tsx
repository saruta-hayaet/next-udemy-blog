import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SearchBox from '@/components/post/SearchBox';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'

export default function PublicHeader() {
	return (
		<div>
			<header className="border-b bg-blue-200">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href="/" passHref>
									BLOG
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<div className="flex itmes-center gap-4">
						<SearchBox />
						<Button variant="outline" asChild>
							<Link href="/login">ログイン</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/register">新規登録</Link>
						</Button>
					</div>
				</div>
			</header>
			</div>
    );
}
