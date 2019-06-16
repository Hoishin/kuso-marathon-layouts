import React from 'react';

export type FunctionComponentWithClassName<P = {}> = React.FunctionComponent<
	{className?: string} & P
>;
