import {CreateNodecgConstructor, CreateNodecgInstance} from 'ts-nodecg/browser';

import {ReplicantMap, MessageMap} from '../extension/types/nodecg';
import {Configschema} from '../extension/types/configschema';

export interface FontFaceSet {
	status: 'loading' | 'loaded';
	ready: Promise<FontFaceSet>;
	check(font: string, text?: string): boolean;
	load(font: string, text?: string): Promise<void>;
}

export type NodecgInstance = CreateNodecgInstance<
	'kuso-marathon-layouts',
	Configschema,
	ReplicantMap,
	MessageMap
>;

export type NodecgConstructor = CreateNodecgConstructor<
	'kuso-marathon-layouts',
	Configschema,
	ReplicantMap,
	MessageMap
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
