import {CreateNodecgConstructor, CreateNodecgInstance} from 'ts-nodecg/browser';
import {ReplicantMap} from '../extension/types/nodecg';
import {Configschema} from '../extension/types/configschema';

export interface FontFaceSet {
	status: 'loading' | 'loaded';
	ready: Promise<FontFaceSet>;
	check(font: string, text?: string): boolean;
	load(font: string, text?: string): Promise<void>;
}

export type NodecgInstance = CreateNodecgInstance<
	Configschema,
	'kuso-marathon-layouts',
	ReplicantMap,
	{},
	false
>;

export type NodecgConstructor = CreateNodecgConstructor<
	Configschema,
	'kuso-marathon-layouts',
	ReplicantMap,
	{},
	false
>;

declare global {
	const nodecg: NodecgInstance;
	const NodeCG: NodecgConstructor;

	interface Window {
		nodecg: NodecgInstance;
		NodeCG: NodecgConstructor;
	}

	interface Document {
		fonts: FontFaceSet;
	}
}
