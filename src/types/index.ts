import type { toast as toastRef } from '@betfinio/components/ui';
import type { QueryClient } from '@tanstack/react-query';
import type { i18n } from 'i18next';
import type { FC, PropsWithChildren } from 'react';
import type { Address, WriteContractReturnType } from 'viem';
import type { Config } from 'wagmi';
export interface BetfinProvider {
	key: string;
	url: string;
}

export interface Manifest {
	environment: 'development' | 'production';
	context: string;
	remotes: Record<string, string>;
	sidebar: Record<string, boolean>;
	swipeLuxApiKey?: string;
}
export type RemoteModule =
	| 'betfinio_context'
	| 'betfinio_staking'
	| 'betfinio_roulette'
	| 'betfinio_affiliate'
	| 'betfinio_statistics'
	| 'betfinio_lottery'
	| 'betfinio_predict'
	| 'betfinio_luro'
	| 'betfinio_stones'
	| 'betfinio_academy'
	| 'betfinio_app';

// common modules
export interface I18nModule {
	default: i18n;
}

export interface ContextTranslationsModule {
	sharedLang: {
		[key: string]: any;
	};
}

// app modules
export interface AppModule {
	default: React.ComponentType;
}

export interface AppSidebarModule {
	default: React.ComponentType;
}

// context modules

export interface ContextConfigModule {
	wagmiConfig: Config;
	queryClient: QueryClient;
	supabaseClient: any;
}

export type InviteCode = Partial<{
	inviter: Address;
	parent: Address;
	type: string;
}>;

export type InviteRef = Partial<{
	inviter: number;
	parent: number;
	type: 'S' | 'N';
	side: 'L' | 'R';
}>;

export interface TreeMember {
	member: Address;
	parent: Address;
	inviter: Address;
	side: string;
	left: Address | null;
	right: Address | null;
	isMatching: boolean;
	isInviting: boolean;

	volume: bigint;
	volumeLeft: bigint;
	volumeRight: bigint;
	volumeDirect: bigint;
	volumeLinear: bigint;

	bets: bigint;
	betsLeft: bigint;
	betsRight: bigint;

	matchedLeft: bigint;
	matchedRight: bigint;
	countLeft: bigint;
	countRight: bigint;
	countDirect: bigint;
	countLinear: bigint;

	betsDirect: bigint;
	betsLinear: bigint;

	stakingDirect: bigint;
	stakingLinear: bigint;

	linearLevel: number;
	binaryLevel: number;
	totalMatched: bigint;
}

export type MintResult = { error: string } | { address: Address; inviter: Address; parent: Address };

export interface ContextApiModule {
	fetchBalance: (address: Address, config: Config, block?: bigint) => Promise<bigint>;
	fetchAllowance: (address: Address, config: Config) => Promise<bigint>;
	fetchUsername: (member: Address, supabase?: any, user?: Address) => Promise<string>;
	isMember: (address: Address, config: Config) => Promise<boolean>;
	increaseAllowance: (config: Config) => Promise<WriteContractReturnType>;
	mint: (address: Address, inviter: Address, parent: Address, config: Config) => Promise<WriteContractReturnType>;
}
export interface ContextGqlModule {
	fetchRegistrationDate: (address: Address) => Promise<number>;
	fetchTreeMember: (address: Address) => Promise<TreeMember>;
}
export interface ContextGlobalsModule {
	TOKEN_ADDRESS: Address;
	ETHSCAN: string;
}
export interface ContextUtilsModule {
	validateRef: (search: Record<string, unknown>) => Record<string, unknown>;
	handleCodeMint: (code: InviteCode, address: Address) => Promise<MintResult>;
	handleRefMint: (ref: InviteRef, address: Address, config: Config) => Promise<MintResult>;
}

export interface ContextContextModule {
	GlobalContextProvider: React.ComponentType<PropsWithChildren>;
	AllowanceProvider: React.ComponentType<PropsWithChildren>;
	useChatbot: () => {
		minimize: () => void;
		maximize: () => void;
		toggle: () => void;
	};
}

export interface ContextMemberProfileComponentModule {
	default: FC<{ toast: typeof toastRef }>;
}

export interface ContextQueryModule {
	useOpenProfile: () => {
		open: (address: Address) => void;
		close: () => void;
	};
}

// roulette modules

export interface RouletteSingleModule {
	RoulettePage: React.ComponentType;
}

export interface RouletteLiveIndexModule {
	IndexLiveRoulette: React.ComponentType;
}

export interface RouletteLiveTableModule {
	RouletteLiveTable: React.ComponentType;
}

// staking modules

export interface StakingConservativeModule {
	ConservativeStakingPage: React.ComponentType;
}

export interface StakingDynamicModule {
	DynamicStakingPage: React.ComponentType;
}

// predict modules

export interface PredictModule {
	PredictPage: React.ComponentType;
}

// luro modules

export interface LuroModule {
	LuroPage: React.ComponentType;
}

// stones modules

export interface StonesModule {
	default: React.ComponentType;
}

// affiliate modules

export interface AffiliateModule {
	AffiliatePage: React.ComponentType;
	LinearTreePage: React.ComponentType;
	BinaryTreePage: React.ComponentType;
}

// lottery modules

export interface LotteryModule {
	LotteryPage: React.ComponentType;
	HistoryRoundPage: React.ComponentType;
}

// statistics modules

export interface StatisticsModule {
	StatisticsPage: React.ComponentType;
}

// academy modules

export interface AcademyModule {
	AdvancedPage: React.ComponentType;
	SectionPage: React.ComponentType;
	LessonPage: React.ComponentType;
	EventsPage: React.ComponentType;
	Layout: React.ComponentType;
	DocsPage: React.ComponentType;
	CreatePage: React.ComponentType;
}
