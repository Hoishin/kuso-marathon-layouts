import {CreateNodecgInstance} from 'ts-nodecg/server';
import {ReplicantMap} from './nodecg';
import {Configschema} from './configschema';

export type NodeCG = CreateNodecgInstance<
	Configschema,
	'kuso-marathon-layouts',
	ReplicantMap,
	{}
>;
