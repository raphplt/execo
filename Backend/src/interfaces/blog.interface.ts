export default interface Iblog {
	save: any;
	slug: string;
	title: string;
	author: string;
	date: Date;
	cover: string;
	content: string;
	tags: Array<string>;
}
