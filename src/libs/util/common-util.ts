// json load
export async function jsonLoader(url: string) {
	try {
		const data = (await import(url)) as any;
		if (data && data.default) return data.default;
		else return null;
	} catch (e) {
		console.error(e);
	}
}
