import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	cn,
	useSidebar,
} from '@betfinio/components';
import { BetLogo, BetfinLogo } from '@betfinio/components/icons';
import { Link } from '@tanstack/react-router';
import { Globe, MessageCircleIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { games, navigation, others } from '../config/links';
import { mfQueryClient } from '../config/query';
import i18n from '../i18n';
import { useContextManifest, useLoadRemoteModule } from '../lib/query/mf';
import type { ContextContextModule, RemoteModule } from '../types';
import NavItem from './NavItem';

const MODULE: RemoteModule = 'betfinio_context';

const languages: Record<string, any> = {
	en: 'English',
	cs: 'Čeština',
	ru: 'Русский',
	es: 'Español',
};

const links = [...navigation, ...games];

const CustomSidebar = () => {
	const { t, i18n: sharedI18n } = useTranslation('shared', { keyPrefix: 'sidebar' });
	const { data: manifest } = useContextManifest(mfQueryClient);
	const { state } = useSidebar();
	const chatbot = useLoadRemoteModule<ContextContextModule>(mfQueryClient, MODULE, 'lib/context');

	if (!chatbot || !manifest) return null;

	const { toggle: toggleChatbot } = chatbot.useChatbot();
	const handleSupport = () => {
		toggleChatbot();
	};

	const handleLanguageChange = async (lang: string) => {
		await i18n.changeLanguage(lang);
	};

	const minimized = state === 'collapsed';
	return (
		<Sidebar variant="floating" collapsible="icon" wrapperClassName="md:block" className="border-border">
			<SidebarHeader>
				<AnimatePresence mode="wait">
					{minimized ? (
						<motion.div className="px-3 h-[54px] py-2 flex items-center justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<Link to={'/app'}>
								<BetLogo />
							</Link>
						</motion.div>
					) : (
						<motion.div
							className="flex h-[54px] flex-row items-center gap-2 px-3 p-2 w-full justify-between"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Link to={'/app'}>
								<BetfinLogo className="w-24" />
							</Link>
							<SidebarTrigger />
						</motion.div>
					)}
				</AnimatePresence>
				<Separator />
			</SidebarHeader>

			<SidebarContent>
				<SidebarMenu className="gap-2">
					{links.map((link, index) => (
						<NavItem key={index} {...link} />
					))}
					<Separator orientation="horizontal" className="opacity-0" />
					{others.map((other, index) => (
						<NavItem key={index} {...other} />
					))}
					<SidebarMenuItem onClick={handleSupport}>
						<SidebarMenuButton tooltip={t('support')}>
							<MessageCircleIcon className="text-foreground" />
							<span>{t('support')}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
			<Separator orientation="horizontal" className="" />

			<SidebarFooter>
				<SidebarMenu className="gap-2">
					<Select value={sharedI18n.language} onValueChange={handleLanguageChange}>
						<SelectTrigger className={cn('w-full flex flex-row items-center justify-between gap-2', minimized && 'h-8')} minimized={minimized}>
							<div className={cn('flex flex-row items-center justify-start gap-2 w-full', minimized && 'justify-center h-8')}>
								<Globe className={cn('w-4 h-4')} />
								{!minimized && <SelectValue placeholder={'Language'} />}
							</div>
						</SelectTrigger>
						<SelectContent>
							{Object.keys(languages).map((lang) => (
								<SelectItem key={lang} value={lang}>
									{languages[lang]}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default CustomSidebar;
