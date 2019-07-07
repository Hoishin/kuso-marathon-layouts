import {useEffect, useState} from 'react';
import _ from 'lodash';
import {ReplicantBrowser} from 'ts-nodecg/helper/replicant';

export const useReplicant = <TSchema, TRepName extends string>(
	replicant: ReplicantBrowser<TSchema, 'kuso-marathon-layouts', TRepName>,
): [TSchema | undefined, (newValue: TSchema) => void] => {
	const [value, updateValue] = useState<TSchema | undefined>(undefined);

	const changeHandler = (newValue: TSchema): void => {
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
