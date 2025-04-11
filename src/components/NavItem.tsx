import { cn as cx } from '@betfinio/components/lib';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@betfinio/components/ui';
import { useSidebar } from '@betfinio/components/ui';
import { Link, useLocation } from '@tanstack/react-router';
import { ChevronDownIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mfQueryClient } from '../config/query';
import { useContextManifest } from '../lib/query/mf';
export interface NavItemProps {
	icon?: ReactNode;
	label: string;
	href: string;
	soon?: boolean;
	active?: boolean;
	children?: NavItemProps[];
	disabled?: boolean;
	className?: string;
	external?: boolean;
	onClick?: () => void;
}

const NavItem: FC<NavItemProps> = ({ icon, label, href, children, external = false, disabled = !external, onClick }) => {
	const { t } = useTranslation('shared', { keyPrefix: 'sidebar' });
	const { pathname } = useLocation();
	const isActive = (href: string) => pathname === href;
	const [isOpen, setIsOpen] = useState(false);
	const { state: sidebarState, setOpen, setOpenMobile } = useSidebar();
	const { data: manifest } = useContextManifest(mfQueryClient);
	console.log(manifest?.sidebar);

	// Close collapsible when sidebar state changes
	useEffect(() => {
		if (sidebarState === 'collapsed') {
			setIsOpen(false);
		}
	}, [sidebarState]);

	const labelTranslated = t(label as string, { defaultValue: label });
	const handleOnClick = () => {
		console.log('clicked');
		setOpenMobile(false);
		if (onClick) {
			onClick();
		}
	};

	if (!manifest?.sidebar[label] && label !== 'more') return null;

	if (external) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton tooltip={labelTranslated} asChild>
					<a href={href} target={'_blank'} rel="noreferrer">
						{icon || <div className={'w-6'} />} {labelTranslated}
					</a>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	if (children) {
		return (
			<Collapsible className="group/collapsible" open={isOpen} onOpenChange={setIsOpen}>
				<SidebarGroup>
					<SidebarMenuItem className="group-data-[state=open]/collapsible:rounded-b-none">
						<SidebarMenuButton tooltip={labelTranslated} asChild>
							<CollapsibleTrigger className="flex gap-2 p-2 h-10 w-full items-center" onClick={() => setOpen(true)}>
								{icon} {labelTranslated}
								<div className="flex grow justify-end">
									<ChevronDownIcon className="w-4 h-4 bg-foreground/20 rounded-xs transition-transform group-data-[state=open]/collapsible:rotate-180" />
								</div>
							</CollapsibleTrigger>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<CollapsibleContent>
						<SidebarGroupContent className="gap-1 flex flex-col bg-sidebar-item/10 p-2 rounded-lg rounded-t-none">
							{children.map((item, index) => (
								<NavItem key={index} {...item} className={cx('pl-6 gap-3!')} active={isActive(item.href)} />
							))}
						</SidebarGroupContent>
					</CollapsibleContent>
				</SidebarGroup>
			</Collapsible>
		);
	}

	if (disabled) {
		return (
			<SidebarMenuItem className="opacity-50 cursor-not-allowed">
				<SidebarMenuButton tooltip={labelTranslated}>
					{icon} {labelTranslated}
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	return (
		<SidebarMenuItem>
			<SidebarMenuButton tooltip={labelTranslated} asChild onClick={handleOnClick}>
				<Link to={href}>
					{icon} {labelTranslated}
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};

export default NavItem;
