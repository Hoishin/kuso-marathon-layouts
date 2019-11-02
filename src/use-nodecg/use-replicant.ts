import {useEffect, useState} from 'react';
import _ from 'lodash';
import {Replicant} from 'ts-nodecg/browser';

import {ReplicantMap} from '../extension/types/nodecg';

export const useReplicant = <TRepName extends keyof ReplicantMap>(
	replicant: Replicant<
		'kuso-marathon-layouts',
		ReplicantMap,
		TRepName,
		ReplicantMap[TRepName] | undefined
	>,
): [
	ReplicantMap[TRepName] | undefined,
	(newValue: ReplicantMap[TRepName]) => void,
] => {
	const [value, updateValue] = useState<ReplicantMap[TRepName] | undefined>(
		undefined,
	);

	const changeHandler = (newValue: ReplicantMap[TRepName]): void => {
		updateValue(_.clone(newValue));
	};

	useEffect(() => {
		replicant.on('change', changeHandler);
		return () => {
			replicant.removeListener('change', changeHandler);
		};
	}, [replicant]);

	return [
		value,
		(newValue) => {
			replicant.value = newValue;
		},
	];
};
