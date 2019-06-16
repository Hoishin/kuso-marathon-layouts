export interface FontFaceSet {
	status: 'loading' | 'loaded';
	ready: Promise<FontFaceSet>;
	check(font: string, text?: string): boolean;
	load(font: string, text?: string): Promise<void>;
}

declare global {
	interface Document {
		fonts: FontFaceSet;
	}
}
