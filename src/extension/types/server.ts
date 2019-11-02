import {CreateNodecgInstance} from 'ts-nodecg/server';

import {ReplicantMap, MessageMap} from './nodecg';
import {Configschema} from './configschema';

export type NodeCG = CreateNodecgInstance<
	'kuso-marathon-layouts',
	Configschema,
	ReplicantMap,
	MessageMap
>;
