import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const Text = styled.div`
	white-space: nowrap;
`;

const FitText = React.forwardRef<
	HTMLDivElement,
	{
		children: string;
		className?: string;
		style?: React.CSSProperties;
	}
>(({children, className, style}, ref: React.Ref<HTMLDivElement>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	const fit = () => {
		const container = containerRef.current;
		const text = textRef.current;

		if (!container || !text) {
			return;
		}

		const maxWidth = container.clientWidth;
		const currentWidth = text.clientWidth;
		const applyingScaleX = Math.min(maxWidth / currentWidth, 1);
		text.style.transform = `scaleX(${applyingScaleX})`;
	};

	useEffect(() => {
		const text = textRef.current;
		if (!text) {
			return undefined;
		}
		const {font} = getComputedStyle(text);
		if (!font) {
			fit();
			return undefined;
		}
		let cancelled = false;
		document.fonts.load(font).then(() => {
			if (!cancelled) {
				fit();
			}
		});
		return () => {
			cancelled = true;
		};
	});

	return (
		<Container
			className={className}
			ref={(el) => {
				if (typeof ref === 'function') {
					ref(el);
				} else if (ref) {
					// @ts-ignore
					ref.current = el;
				}
				// @ts-ignore
				containerRef.current = el;
			}}
			style={style}
		>
			<Text ref={textRef}>{children}</Text>
		</Container>
	);
});

export default FitText;
