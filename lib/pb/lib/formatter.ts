import { ClientResponseError } from "pocketbase";

export function stringify(value: unknown) {
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
}

export function formatPocketBaseError(error: ClientResponseError) {
	const status = error.status;
	const responseMessage = error.response?.message;
	const responseData = error.response?.data;

	const fieldIssues = responseData && typeof responseData === "object"
		? Object.entries(responseData as Record<string, unknown>)
			.map(([field, issue]) => {
				if (issue && typeof issue === "object" && "message" in issue) {
					const issueMessage =
						(issue as { message?: string }).message;
					return `${field}: ${issueMessage ?? stringify(issue)}`;
				}
				return `${field}: ${stringify(issue)}`;
			})
		: [];

	return [
		`PocketBase auth failed (status ${status || 0}).`,
		responseMessage ? `Message: ${responseMessage}.` : "",
		fieldIssues.length > 0 ? `Fields: ${fieldIssues.join("; ")}.` : "",
	].filter(Boolean).join(" ");
}

export function formatAuthError(error: unknown) {
	if (error instanceof ClientResponseError) {
		return formatPocketBaseError(error);
	}

	if (error instanceof Error) {
		return error.message;
	}

	return stringify(error);
}
