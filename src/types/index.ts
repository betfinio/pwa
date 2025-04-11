import type { QueryClient, UseQueryResult } from '@tanstack/react-query';
import type { i18n } from 'i18next';
import type { PropsWithChildren } from 'react';
import type { Address } from 'viem';
import type { Config } from 'wagmi';

export interface BetfinProvider {
	key: string;
	url: string;
}

export interface Manifest {
	context: string;
	remotes: Record<string, string>;
	sidebar: Record<string, boolean>;
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
	| 'betfinio_academy';

// common modules
export interface I18nModule {
	default: i18n;
}

export interface ContextTranslationsModule {
	sharedLang: {
		[key: string]: any;
	};
}

// context modules

export interface ContextConfigModule {
	wagmiConfig: Config;
	queryClient: QueryClient;
}
export interface ContextApiModule {
	fetchBalance: (address: Address, config: Config, block?: bigint) => Promise<bigint>;
	fetchAllowance: (address: Address, config: Config) => Promise<bigint>;
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
