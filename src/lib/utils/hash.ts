export default function hash(number: number, seed: number = Math.random()): number {
	const x = Math.sin(number + seed) * 10000;
	return x - Math.floor(x);
}
