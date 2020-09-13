export function toQueryString(params: any): string {
	if (!params) return '';

	const output: string[] = [];

	for (const key in params) {
		if (params[key] !== undefined) {
			output.push(`${key}=${params[key]}`);
		}
	}

	return output.length ? '?' + output.join('&') : '';
}
